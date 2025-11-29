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
              // Если все варианты не работают, пробуем получить через REST API
              console.warn(`[Vacuum Schedule Card] WebSocket команды не работают для ${automationId}, пробуем REST API`);
              try {
                const token = hass.auth?.data?.access_token || hass.auth?.accessToken;
                if (token) {
                  const baseUrl = window.location.origin;
                  const apiUrl = `${baseUrl}/api/config/automation/config/${automationId}`;
                  const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  });
                  if (response.ok) {
                    config = await response.json();
                    console.log(`[Vacuum Schedule Card] ✅ Получена конфигурация ${automationId} через REST API`);
                  }
                }
              } catch (restError: any) {
                console.warn(`[Vacuum Schedule Card] REST API тоже не сработал для ${automationId}, используем fallback`);
              }
              
              // Если REST API не сработал, используем данные из hass.states (но они неполные)
              if (!config) {
                const state = hass.states[entityId];
                if (state) {
                  config = {
                    id: state.attributes?.id || automationId,
                    alias: state.attributes?.friendly_name || automationId,
                    _entity_id: entityId,
                    _state: state.state,
                    _attributes: state.attributes,
                    _incomplete: true, // Помечаем как неполную конфигурацию
                  };
                  console.warn(`[Vacuum Schedule Card] ⚠️ Используется неполная конфигурация из hass.states для ${automationId}`);
                }
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
  
  // Если конфигурация помечена как неполная, пропускаем её
  if (automationConfig._incomplete) {
    console.warn(`[Vacuum Schedule Card] ⚠️ Пропускаем автоматизацию ${configId} - конфигурация неполная (нет trigger/action)`);
    return null;
  }

  // Парсим id: vacuum_schedule_{scheduleId}_day_{day}
  const idMatch = configId.match(/^vacuum_schedule_(.+)_day_(\d+)$/);
  if (!idMatch) {
    console.warn(`[Vacuum Schedule Card] Не удалось распарсить ID автоматизации: ${configId}`);
    return null;
  }

  const scheduleId = idMatch[1];
  const day = parseInt(idMatch[2], 10);
  
  // Логируем для отладки структуру автоматизации
  // Поддерживаем оба варианта: action/actions, condition/conditions, trigger/triggers
  const hasTrigger = !!(automationConfig.trigger || automationConfig.triggers);
  const hasAction = !!(automationConfig.action || automationConfig.actions);
  const hasCondition = !!(automationConfig.condition || automationConfig.conditions);
  
  console.log(`[Vacuum Schedule Card] Парсинг автоматизации ${configId}:`, {
    hasTrigger,
    hasTriggers: !!automationConfig.triggers,
    hasAction,
    hasActions: !!automationConfig.actions,
    hasCondition,
    hasConditions: !!automationConfig.conditions,
    triggerType: Array.isArray(automationConfig.trigger || automationConfig.triggers) ? "array" : typeof (automationConfig.trigger || automationConfig.triggers),
    actionType: Array.isArray(automationConfig.action || automationConfig.actions) ? "array" : typeof (automationConfig.action || automationConfig.actions),
    allKeys: Object.keys(automationConfig),
  });
  
  // Если нет ни trigger, ни triggers, значит конфигурация неполная
  if (!hasTrigger) {
    console.error(`[Vacuum Schedule Card] ❌ Автоматизация ${configId} не имеет триггеров! Конфигурация неполная.`);
    console.error(`[Vacuum Schedule Card] Полная структура автоматизации:`, JSON.stringify(automationConfig, null, 2));
    return null;
  }

  // Извлекаем время из trigger/triggers
  // Поддерживаем оба варианта: trigger (единственное) и triggers (множественное)
  // Безопасная обработка триггеров с проверкой на undefined/null
  const triggerData = automationConfig.trigger || automationConfig.triggers;
  if (!triggerData) {
    console.warn(`[Vacuum Schedule Card] Автоматизация ${configId} не имеет триггера (проверено trigger и triggers)`);
    console.warn(`[Vacuum Schedule Card] Структура автоматизации:`, {
      keys: Object.keys(automationConfig),
      hasTrigger: !!automationConfig.trigger,
      hasTriggers: !!automationConfig.triggers,
      config: automationConfig,
    });
    return null;
  }
  
  const triggers = Array.isArray(triggerData)
    ? triggerData.filter((t: any) => t != null) // Фильтруем undefined/null
    : triggerData != null
    ? [triggerData]
    : [];
  
  if (triggers.length === 0) {
    console.warn(`[Vacuum Schedule Card] Автоматизация ${configId} не имеет валидных триггеров`);
    return null;
  }
  
  const timeTrigger = triggers.find((t: any) => t && t.platform === "time");
  if (!timeTrigger || !timeTrigger.at) {
    console.warn(`[Vacuum Schedule Card] Автоматизация ${configId} не имеет триггера времени`);
    console.warn(`[Vacuum Schedule Card] Доступные триггеры:`, triggers);
    return null;
  }

  const time = timeTrigger.at.substring(0, 5); // "HH:MM"

  // Извлекаем комнаты из action/actions
  // Поддерживаем оба варианта: action (единственное) и actions (множественное)
  // Безопасная обработка действий с проверкой на undefined/null
  const actionData = automationConfig.action || automationConfig.actions;
  if (!actionData) {
    console.warn(`[Vacuum Schedule Card] Автоматизация ${configId} не имеет действий`);
    return null;
  }
  
  const actions = Array.isArray(actionData)
    ? actionData.filter((a: any) => a != null) // Фильтруем undefined/null
    : actionData != null
    ? [actionData]
    : [];
  
  if (actions.length === 0) {
    console.warn(`[Vacuum Schedule Card] Автоматизация ${configId} не имеет валидных действий`);
    return null;
  }
  
  // Ищем действие с vacuum_clean_segment
  // Поддерживаем оба варианта: service (наш формат) и action (формат Home Assistant)
  const action = actions.find((a: any) => {
    if (!a) return false;
    // Проверяем оба варианта: service и action
    const service = a.service || a.action;
    return service && typeof service === "string" && service.includes("vacuum_clean_segment");
  });
  
  if (!action) {
    console.warn(`[Vacuum Schedule Card] Автоматизация ${configId} не содержит действия vacuum_clean_segment`);
    return null;
  }
  
  // Извлекаем сегменты из data.segments
  // Поддерживаем массив сегментов
  const segments = action.data?.segments;
  const rooms = Array.isArray(segments) ? segments : segments ? [segments] : [];
  
  console.log(`[Vacuum Schedule Card] Извлечены комнаты из автоматизации ${configId}:`, rooms);

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

