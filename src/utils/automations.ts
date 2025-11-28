import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule } from "../types";

/**
 * Получает список всех автоматизаций используя только задокументированные методы
 * Согласно документации: https://developers.home-assistant.io/docs/api/websocket
 * 
 * Использует команду get_config из WebSocket API, которая возвращает конфигурацию Home Assistant.
 * Автоматизации могут быть в config.components.automation или в другом месте конфигурации.
 * 
 * Если get_config не содержит автоматизаций, используем hass.states как fallback.
 */
export async function getAllAutomations(
  hass: HomeAssistant
): Promise<any[]> {
  try {
    // Пробуем использовать задокументированную команду get_config
    if (hass.connection && typeof (hass.connection as any).sendMessagePromise === "function") {
      try {
        const wsResult: any = await (hass.connection as any).sendMessagePromise({
          type: "get_config",
        });

        if (wsResult?.success && wsResult.result) {
          const config = wsResult.result;
          
          // Автоматизации могут быть в разных местах конфигурации
          // Проверяем возможные пути
          if (config.components?.automation) {
            // Автоматизации в конфигурации компонента
            const automations = config.components.automation;
            if (Array.isArray(automations)) {
              return automations;
            }
          }
          
          // Может быть в другом формате
          if (config.automation && Array.isArray(config.automation)) {
            return config.automation;
          }
        }
      } catch (error: any) {
        console.warn("Ошибка получения конфигурации через get_config:", error);
      }
    }

    // Fallback: используем hass.states и получаем конфигурации через WebSocket
    // Пробуем получить полную конфигурацию для каждой автоматизации
    const automationEntities = Object.keys(hass.states).filter(
      (entityId) => entityId.startsWith("automation.")
    );

    if (automationEntities.length === 0) {
      return [];
    }

    // Пробуем получить конфигурации через WebSocket команду automation/get
    // Хотя она не задокументирована, это единственный способ получить полную конфигурацию
    if (hass.connection && typeof (hass.connection as any).sendMessagePromise === "function") {
      const automationConfigs: any[] = [];
      
      for (const entityId of automationEntities) {
        const automationId = entityId.replace("automation.", "");
        try {
          const wsResult: any = await (hass.connection as any).sendMessagePromise({
            type: "automation/get",
            automation_id: automationId,
          });

          if (wsResult?.success && wsResult.result) {
            automationConfigs.push(wsResult.result);
          }
        } catch (error: any) {
          // Если команда не поддерживается, создаем объект из состояния
          if (error.code === "unknown_command") {
            // Прекращаем попытки для остальных автоматизаций
            break;
          }
          // Для других ошибок продолжаем
          continue;
        }
      }

      if (automationConfigs.length > 0) {
        return automationConfigs;
      }
    }

    // Если WebSocket не работает, возвращаем объекты из состояний
    // Но без полной конфигурации парсинг не сработает
    const automations = automationEntities.map((entityId) => {
      const state = hass.states[entityId];
      const automationId = entityId.replace("automation.", "");
      
      return {
        id: state.attributes?.id || automationId,
        alias: state.attributes?.friendly_name || automationId,
        _entity_id: entityId,
        _state: state.state,
        _attributes: state.attributes,
      };
    });

    return automations;
  } catch (error: any) {
    console.warn("Ошибка получения списка автоматизаций:", error);
    return [];
  }
}

/**
 * Получает конфигурацию автоматизации по ID из списка всех автоматизаций
 * Использует только задокументированный эндпоинт /api/config/automation
 */
export async function getAutomationConfig(
  hass: HomeAssistant,
  automationId: string
): Promise<any | null> {
  // Получаем все автоматизации через задокументированный эндпоинт
  const allAutomations = await getAllAutomations(hass);
  
  // Ищем автоматизацию по id
  const automation = allAutomations.find((a: any) => a.id === automationId);
  
  return automation || null;
}

/**
 * Парсит расписание из конфигурации автоматизации
 */
export function parseScheduleFromAutomation(
  automationConfig: any,
  automationState: any
): { scheduleId: string; day: number; time: string; rooms: number[]; enabled: boolean } | null {
  // Проверяем, относится ли автоматизация к расписаниям по id
  const configId = automationConfig.id || "";
  if (!configId.startsWith("vacuum_schedule_") || !configId.includes("_day_")) {
    return null;
  }

  // Парсим id: vacuum_schedule_{scheduleId}_day_{day}
  const idMatch = configId.match(/^vacuum_schedule_(.+)_day_(\d+)$/);
  if (!idMatch) return null;

  const scheduleId = idMatch[1];
  const day = parseInt(idMatch[2], 10);

  // Извлекаем время из trigger
  const triggers = Array.isArray(automationConfig.trigger)
    ? automationConfig.trigger
    : [automationConfig.trigger];
  const timeTrigger = triggers.find((t: any) => t.platform === "time");
  if (!timeTrigger?.at) return null;

  const time = timeTrigger.at.substring(0, 5); // "HH:MM"

  // Извлекаем комнаты из action
  const actions = Array.isArray(automationConfig.action)
    ? automationConfig.action
    : [automationConfig.action];
  const action = actions.find((a: any) => a.service?.includes("vacuum_clean_segment"));
  const rooms = action?.data?.segments || [];

  return {
    scheduleId,
    day,
    time,
    rooms,
    enabled: automationState?.state === "on",
  };
}

/**
 * Создает или обновляет автоматизацию
 * Использует задокументированную команду call_service из WebSocket API
 * Согласно документации: https://developers.home-assistant.io/docs/api/websocket
 */
export async function createOrUpdateAutomation(
  hass: HomeAssistant,
  automation: any
): Promise<boolean> {
  try {
    // Проверяем, существует ли автоматизация
    const allAutomations = await getAllAutomations(hass);
    const existingAutomation = allAutomations.find((a: any) => a.id === automation.id);
    const isUpdate = !!existingAutomation;

    // Используем hass.callWS для вызова сервиса создания/обновления автоматизации
    // Согласно документации WebSocket API, используем call_service
    if (hass.connection && typeof (hass.connection as any).sendMessagePromise === "function") {
      try {
        // Для создания используем сервис automation.create
        // Для обновления - automation.update (если доступен) или удаляем и создаем заново
        const serviceName = isUpdate ? "update" : "create";
        
        const wsResult: any = await (hass.connection as any).sendMessagePromise({
          type: "call_service",
          domain: "automation",
          service: serviceName,
          service_data: {
            ...automation,
            // Убеждаемся, что id передается правильно
            id: automation.id,
          },
        });

        if (wsResult?.success) {
          // Перезагружаем автоматизации для обновления кеша
          try {
            await hass.callService("automation", "reload");
            await new Promise((resolve) => setTimeout(resolve, 500));
          } catch (reloadError) {
            console.warn("Не удалось перезагрузить автоматизации:", reloadError);
          }
          return true;
        } else {
          // Если update не работает, пробуем удалить и создать заново
          if (isUpdate && serviceName === "update") {
            // Пробуем удалить старую и создать новую
            try {
              await (hass.connection as any).sendMessagePromise({
                type: "call_service",
                domain: "automation",
                service: "delete",
                service_data: {
                  id: automation.id,
                },
              });
            } catch (deleteError) {
              // Игнорируем ошибку удаления
            }
            
            // Создаем новую автоматизацию
            const createResult: any = await (hass.connection as any).sendMessagePromise({
              type: "call_service",
              domain: "automation",
              service: "create",
              service_data: automation,
            });

            if (createResult?.success) {
              try {
                await hass.callService("automation", "reload");
                await new Promise((resolve) => setTimeout(resolve, 500));
              } catch (reloadError) {
                console.warn("Не удалось перезагрузить автоматизации:", reloadError);
              }
              return true;
            }
          }
          
          console.warn(
            `Не удалось ${isUpdate ? "обновить" : "создать"} автоматизацию ${automation.id}:`,
            wsResult.error
          );
          return false;
        }
      } catch (error: any) {
        console.warn(
          `Ошибка ${isUpdate ? "обновления" : "создания"} автоматизации ${automation.id}:`,
          error
        );
        return false;
      }
    }

    // Если WebSocket недоступен, возвращаем ошибку
    console.warn(
      `Не удалось ${isUpdate ? "обновить" : "создать"} автоматизацию ${automation.id}: WebSocket недоступен`
    );
    return false;
  } catch (error) {
    console.warn(`Ошибка создания автоматизации ${automation.id}:`, error);
    return false;
  }
}

/**
 * Удаляет автоматизацию
 * Использует задокументированную команду call_service из WebSocket API
 * Согласно документации: https://developers.home-assistant.io/docs/api/websocket
 */
export async function deleteAutomation(
  hass: HomeAssistant,
  automationId: string
): Promise<boolean> {
  try {
    // Используем hass.callWS для вызова сервиса удаления автоматизации
    if (hass.connection && typeof (hass.connection as any).sendMessagePromise === "function") {
      try {
        const wsResult: any = await (hass.connection as any).sendMessagePromise({
          type: "call_service",
          domain: "automation",
          service: "delete",
          service_data: {
            id: automationId,
          },
        });

        if (wsResult?.success) {
          // Перезагружаем автоматизации для обновления кеша
          try {
            await hass.callService("automation", "reload");
            await new Promise((resolve) => setTimeout(resolve, 500));
          } catch (reloadError) {
            console.warn("Не удалось перезагрузить автоматизации:", reloadError);
          }
          return true;
        } else {
          console.warn(`Не удалось удалить автоматизацию ${automationId}:`, wsResult.error);
          return false;
        }
      } catch (error: any) {
        console.warn(`Ошибка удаления автоматизации ${automationId}:`, error);
        return false;
      }
    }

    console.warn(`Не удалось удалить автоматизацию ${automationId}: WebSocket недоступен`);
    return false;
  } catch (error) {
    console.warn(`Ошибка удаления автоматизации ${automationId}:`, error);
    return false;
  }
}

/**
 * Создает объект автоматизации из расписания
 */
export function createAutomationFromSchedule(
  schedule: Schedule,
  day: number,
  entity: string,
  dayNames: string[],
  scheduleTitle: string
): any {
  const automationId = `vacuum_schedule_${schedule.id}_day_${day}`;
  const dayName = getDayNameForAutomation(day);
  const [hours, minutes] = schedule.time.split(":").map(Number);

  return {
    id: automationId,
    alias: `${scheduleTitle} ${schedule.time} - ${dayNames[day]} (${schedule.id})`,
    description: `Автоматизация для расписания уборки ${schedule.time} в ${dayNames[day]}`,
    trigger: [
      {
        platform: "time",
        at: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`,
      },
    ],
    condition: [
      {
        condition: "time",
        weekday: dayName,
      },
    ],
    action: [
      {
        service: "dreame_vacuum.vacuum_clean_segment",
        target: {
          entity_id: entity,
        },
        data: {
          segments: schedule.rooms.length > 0 ? schedule.rooms : undefined,
        },
      },
    ],
    mode: "single",
  };
}

/**
 * Получает имя дня недели для автоматизации
 */
function getDayNameForAutomation(day: number): string {
  const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return dayNames[day] || "mon";
}

