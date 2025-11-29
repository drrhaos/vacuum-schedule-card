import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule } from "../types";
import {
  createOrUpdateAutomationViaREST,
  deleteAutomationViaREST,
} from "./api";

/**
 * Получает список всех автоматизаций используя подход, похожий на lovelace-auto-entities
 * Использует hass.callWS для получения данных через WebSocket API
 * Согласно документации: https://developers.home-assistant.io/docs/api/websocket
 * 
 * Подход основан на примере из lovelace-auto-entities:
 * https://github.com/thomasloven/lovelace-auto-entities
 * 
 * Примечание: lovelace-auto-entities НЕ использует функции создания/обновления/удаления автоматизаций,
 * так как это карточка только для отображения сущностей. В нашем проекте мы используем эти функции,
 * так как наша карточка должна управлять автоматизациями расписаний.
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
      console.log(`[Vacuum Schedule Card] ✅ УСПЕШНО получено ${automationConfigs.length} конфигураций автоматизаций`);
      
      // Подробное логирование списка автоматизаций с акцентом на ID
      console.group("[Vacuum Schedule Card] Список всех автоматизаций (фильтрация по ID):");
      automationConfigs.forEach((config, index) => {
        const automationId = config.id || config._entity_id || "неизвестно";
        console.log(`${index + 1}. ID: ${automationId}`);
        console.log(`   Alias: ${config.alias || config._attributes?.friendly_name || "нет"}`);
        console.log(`   Entity ID: ${config._entity_id || "нет"}`);
        console.log(`   State: ${config._state || config.state || "неизвестно"}`);
        if (config.trigger) {
          console.log(`   Trigger: ${JSON.stringify(config.trigger).substring(0, 100)}...`);
        }
        if (config.action) {
          console.log(`   Action: ${JSON.stringify(config.action).substring(0, 100)}...`);
        }
        if (automationId.includes("vacuum_schedule")) {
          console.log(`   ⭐ Относится к расписаниям уборки (фильтр по ID: ${automationId})`);
        }
      });
      console.groupEnd();
      
      // Подтверждение успешного получения
      const scheduleAutomations = automationConfigs.filter(config => {
        const id = config.id || config._entity_id || "";
        return id.includes("vacuum_schedule");
      });
      console.log(`[Vacuum Schedule Card] Найдено автоматизаций расписаний (по ID): ${scheduleAutomations.length}`);
      
      return automationConfigs;
    }

    // Fallback: возвращаем объекты из состояний
    const fallbackAutomations = automationEntities.map((entityId) => {
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
    
    // Логирование для fallback
    console.log(`[Vacuum Schedule Card] ⚠️ Используется fallback: получено ${fallbackAutomations.length} автоматизаций из hass.states`);
    console.group("[Vacuum Schedule Card] Список автоматизаций (fallback, фильтрация по ID):");
    fallbackAutomations.forEach((automation, index) => {
      const automationId = automation.id || "неизвестно";
      console.log(`${index + 1}. ID: ${automationId}`);
      console.log(`   Entity ID: ${automation._entity_id}`);
      console.log(`   Alias: ${automation.alias}`);
      console.log(`   State: ${automation._state}`);
      if (automationId.includes("vacuum_schedule")) {
        console.log(`   ⭐ Относится к расписаниям уборки (фильтр по ID: ${automationId})`);
      }
    });
    console.groupEnd();
    
    // Подтверждение успешного получения в fallback режиме
    const scheduleAutomations = fallbackAutomations.filter(automation => {
      const id = automation.id || "";
      return id.includes("vacuum_schedule");
    });
    console.log(`[Vacuum Schedule Card] Найдено автоматизаций расписаний (по ID, fallback): ${scheduleAutomations.length}`);
    
    return fallbackAutomations;
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
 * Использует REST API как основной метод (POST /api/config/automation/config/{automation_id})
 * Согласно документации: https://developers.home-assistant.io/docs/api/rest
 * 
 * Fallback на WebSocket API если REST API не работает
 * 
 * Примечание: lovelace-auto-entities не использует такие функции, так как только отображает сущности.
 * В нашем проекте мы управляем автоматизациями, поэтому используем эти функции.
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

    console.log(`[Vacuum Schedule Card] Попытка ${isUpdate ? "обновить" : "создать"} автоматизацию:`, {
      id: automation.id,
      alias: automation.alias,
      hasTrigger: !!automation.trigger,
      hasAction: !!automation.action,
      trigger: automation.trigger,
      action: automation.action,
    });

    // Пробуем использовать REST API как основной метод
    console.log(`[Vacuum Schedule Card] Используем REST API для ${isUpdate ? "обновления" : "создания"} автоматизации`);
    const restSuccess = await createOrUpdateAutomationViaREST(hass, automation);
    
    if (restSuccess) {
      // Перезагружаем автоматизации для обновления кеша
      try {
        await hass.callService("automation", "reload");
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (reloadError) {
        console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:", reloadError);
      }
      console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${automation.id} успешно ${isUpdate ? "обновлена" : "создана"} через REST API`);
      console.log(`[Vacuum Schedule Card] Детали автоматизации:`, {
        id: automation.id,
        alias: automation.alias,
        trigger: automation.trigger,
        condition: automation.condition,
        action: automation.action,
      });
      return true;
    }

    // Если REST API не сработал, пробуем WebSocket API как fallback
    console.log(`[Vacuum Schedule Card] REST API не сработал, пробуем WebSocket API как fallback`);
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
          console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:", reloadError);
        }
        console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${automation.id} успешно ${isUpdate ? "обновлена" : "создана"} через WebSocket API`);
        console.log(`[Vacuum Schedule Card] Детали автоматизации:`, {
          id: automation.id,
          alias: automation.alias,
          trigger: automation.trigger,
          condition: automation.condition,
          action: automation.action,
        });
        return true;
      } catch (error: any) {
        // Если update не работает, пробуем удалить и создать заново
        if (isUpdate && (error.code === "unknown_command" || error.message?.includes("unknown_command"))) {
          console.log("[Vacuum Schedule Card] Пробуем удалить и создать заново через WebSocket...");
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
              console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:", reloadError);
            }
            console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${automation.id} успешно обновлена (удалена и создана заново через WebSocket)`);
            console.log(`[Vacuum Schedule Card] Детали автоматизации:`, {
              id: automation.id,
              alias: automation.alias,
              trigger: automation.trigger,
              condition: automation.condition,
              action: automation.action,
            });
            return true;
          } catch (deleteError: any) {
            console.warn("[Vacuum Schedule Card] Ошибка при попытке удалить автоматизацию:", deleteError);
          }
        }
        
        console.error(
          `[Vacuum Schedule Card] ❌ Не удалось ${isUpdate ? "обновить" : "создать"} автоматизацию ${automation.id} через WebSocket:`,
          error
        );
        console.error(`[Vacuum Schedule Card] Детали ошибки:`, {
          code: error.code,
          message: error.message,
          automation: {
            id: automation.id,
            alias: automation.alias,
          },
        });
        return false;
      }
    } catch (error: any) {
      console.error(
        `[Vacuum Schedule Card] ❌ Ошибка ${isUpdate ? "обновления" : "создания"} автоматизации ${automation.id}:`,
        error
      );
      return false;
    }
  } catch (error) {
    console.error(`[Vacuum Schedule Card] Ошибка создания автоматизации ${automation.id}:`, error);
    return false;
  }
}

/**
 * Удаляет автоматизацию
 * Использует REST API как основной метод (DELETE /api/config/automation/config/{automation_id})
 * Согласно документации: https://developers.home-assistant.io/docs/api/rest
 * 
 * Fallback на WebSocket API если REST API не работает
 * 
 * Примечание: lovelace-auto-entities не использует такие функции, так как только отображает сущности.
 * В нашем проекте мы управляем автоматизациями, поэтому используем эти функции.
 */
export async function deleteAutomation(
  hass: HomeAssistant,
  automationId: string
): Promise<boolean> {
  try {
    console.log(`[Vacuum Schedule Card] Попытка удалить автоматизацию: ${automationId}`);
    
    // Пробуем использовать REST API как основной метод
    console.log(`[Vacuum Schedule Card] Используем REST API для удаления автоматизации`);
    const restSuccess = await deleteAutomationViaREST(hass, automationId);
    
    if (restSuccess) {
      // Перезагружаем автоматизации для обновления кеша
      try {
        await hass.callService("automation", "reload");
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (reloadError) {
        console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:", reloadError);
      }
      console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${automationId} успешно удалена через REST API`);
      return true;
    }

    // Если REST API не сработал, пробуем WebSocket API как fallback
    console.log(`[Vacuum Schedule Card] REST API не сработал, пробуем WebSocket API как fallback`);
    try {
      await hass.callWS({
        type: "config/automation/delete",
        automation_id: automationId,
      });

      console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${automationId} успешно удалена через WebSocket API`);

      // Перезагружаем автоматизации для обновления кеша
      try {
        await hass.callService("automation", "reload");
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (reloadError) {
        console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:", reloadError);
      }
      return true;
    } catch (error: any) {
      // Если команда не поддерживается, пробуем через сервис
      if (error.code === "unknown_command" || error.message?.includes("unknown_command")) {
        try {
          await hass.callService("automation", "delete", {
            id: automationId,
          });
          console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${automationId} удалена через сервис`);
          return true;
        } catch (serviceError) {
          console.warn(`[Vacuum Schedule Card] ❌ Не удалось удалить автоматизацию ${automationId} через сервис:`, serviceError);
          return false;
        }
      }
      console.warn(`[Vacuum Schedule Card] ❌ Не удалось удалить автоматизацию ${automationId} через WebSocket:`, error);
      return false;
    }
  } catch (error) {
    console.warn(`[Vacuum Schedule Card] ❌ Ошибка удаления автоматизации ${automationId}:`, error);
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

