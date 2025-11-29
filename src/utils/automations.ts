import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule } from "../types";

/**
 * Получает список всех автоматизаций используя подход, похожий на lovelace-auto-entities
 * Использует hass.callWS для получения данных через WebSocket API
 * Согласно документации: https://developers.home-assistant.io/docs/api/websocket
 * 
 * Подход основан на примере из lovelace-auto-entities:
 * https://github.com/thomasloven/lovelace-auto-entities
 */
export async function getAllAutomations(
  hass: HomeAssistant
): Promise<any[]> {
  try {
    // Сначала получаем все автоматизации из hass.states (как в lovelace-auto-entities)
    const automationEntities = Object.keys(hass.states).filter(
      (entityId) => entityId.startsWith("automation.")
    );

    if (automationEntities.length === 0) {
      return [];
    }

    // Используем hass.callWS для получения конфигураций автоматизаций
    // Это стандартный способ, используемый в lovelace-auto-entities
    const automationConfigs: any[] = [];
    
    for (const entityId of automationEntities) {
      const automationId = entityId.replace("automation.", "");
      
      try {
        // Используем hass.callWS вместо прямого доступа к connection.sendMessagePromise
        // Это более надежный и стандартный способ (как в lovelace-auto-entities)
        // Пробуем разные варианты команд для получения конфигурации
        let config: any = null;
        
        // Вариант 1: config/automation/config/get (новый формат)
        try {
          config = await hass.callWS<any>({
            type: "config/automation/config/get",
            automation_id: automationId,
          });
        } catch (e1: any) {
          // Вариант 2: config/automation/get (альтернативный формат)
          try {
            config = await hass.callWS<any>({
              type: "config/automation/get",
              automation_id: automationId,
            });
          } catch (e2: any) {
            // Вариант 3: automation/get (старый формат)
            try {
              config = await hass.callWS<any>({
                type: "automation/get",
                automation_id: automationId,
              });
            } catch (e3: any) {
              // Если все варианты не работают, используем данные из hass.states
              const state = hass.states[entityId];
              if (state) {
                config = {
                  id: state.attributes?.id || automationId,
                  alias: state.attributes?.friendly_name || automationId,
                  _entity_id: entityId,
                  _state: state.state,
                  _attributes: state.attributes,
                };
              }
            }
          }
        }

        if (config) {
          automationConfigs.push(config);
        }
      } catch (error: any) {
        // Для любых других ошибок используем данные из hass.states
        const state = hass.states[entityId];
        if (state) {
          automationConfigs.push({
            id: state.attributes?.id || automationId,
            alias: state.attributes?.friendly_name || automationId,
            _entity_id: entityId,
            _state: state.state,
            _attributes: state.attributes,
          });
        }
      }
    }

    if (automationConfigs.length > 0) {
      console.log(`Получено ${automationConfigs.length} конфигураций автоматизаций`);
      return automationConfigs;
    }

    // Fallback: возвращаем объекты из состояний
    return automationEntities.map((entityId) => {
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

    console.log(`Попытка ${isUpdate ? "обновить" : "создать"} автоматизацию:`, {
      id: automation.id,
      alias: automation.alias,
      hasTrigger: !!automation.trigger,
      hasAction: !!automation.action,
    });

    // Используем hass.callWS для создания/обновления автоматизации (как в lovelace-auto-entities)
    try {
      // Для создания используем команду config/automation/create
      // Для обновления - config/automation/update (если доступен) или удаляем и создаем заново
      const commandType = isUpdate ? "config/automation/update" : "config/automation/create";
      
      try {
        await hass.callWS({
          type: commandType,
          id: automation.id,
          alias: automation.alias,
          description: automation.description,
          trigger: automation.trigger,
          condition: automation.condition || [],
          action: automation.action,
          mode: automation.mode || "single",
        });

        // Перезагружаем автоматизации для обновления кеша
        try {
          await hass.callService("automation", "reload");
          await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (reloadError) {
          console.warn("Не удалось перезагрузить автоматизации:", reloadError);
        }
        console.log(`Автоматизация ${automation.id} успешно ${isUpdate ? "обновлена" : "создана"}`);
        return true;
      } catch (error: any) {
        // Если update не работает, пробуем удалить и создать заново
        if (isUpdate && (error.code === "unknown_command" || error.message?.includes("unknown_command"))) {
          console.log("Пробуем удалить и создать заново...");
          try {
            // Удаляем старую автоматизацию
            await hass.callWS({
              type: "config/automation/delete",
              automation_id: automation.id,
            });
            
            // Создаем новую автоматизацию
            await hass.callWS({
              type: "config/automation/create",
              id: automation.id,
              alias: automation.alias,
              description: automation.description,
              trigger: automation.trigger,
              condition: automation.condition || [],
              action: automation.action,
              mode: automation.mode || "single",
            });

            try {
              await hass.callService("automation", "reload");
              await new Promise((resolve) => setTimeout(resolve, 500));
            } catch (reloadError) {
              console.warn("Не удалось перезагрузить автоматизации:", reloadError);
            }
            console.log(`Автоматизация ${automation.id} успешно обновлена (удалена и создана заново)`);
            return true;
          } catch (deleteError: any) {
            console.warn("Ошибка при попытке удалить автоматизацию:", deleteError);
          }
        }
        
        console.error(
          `Не удалось ${isUpdate ? "обновить" : "создать"} автоматизацию ${automation.id}:`,
          error
        );
        return false;
      }
    } catch (error: any) {
      console.error(
        `Ошибка ${isUpdate ? "обновления" : "создания"} автоматизации ${automation.id}:`,
        error
      );
      return false;
    }
  } catch (error) {
    console.error(`Ошибка создания автоматизации ${automation.id}:`, error);
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
    // Используем hass.callWS для удаления автоматизации (как в lovelace-auto-entities)
    try {
      await hass.callWS({
        type: "config/automation/delete",
        automation_id: automationId,
      });

      // Перезагружаем автоматизации для обновления кеша
      try {
        await hass.callService("automation", "reload");
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (reloadError) {
        console.warn("Не удалось перезагрузить автоматизации:", reloadError);
      }
      return true;
    } catch (error: any) {
      // Если команда не поддерживается, пробуем через сервис
      if (error.code === "unknown_command" || error.message?.includes("unknown_command")) {
        try {
          await hass.callService("automation", "delete", {
            id: automationId,
          });
          return true;
        } catch (serviceError) {
          console.warn(`Не удалось удалить автоматизацию ${automationId}:`, serviceError);
          return false;
        }
      }
      console.warn(`Не удалось удалить автоматизацию ${automationId}:`, error);
      return false;
    }
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

