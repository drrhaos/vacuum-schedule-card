import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule, CleaningType } from "../types";
import type {
  AutomationConfig,
  AutomationTrigger,
  AutomationCondition,
  AutomationAction,
  AutomationState,
} from "../types/automation";
import {
  createOrUpdateAutomationREST,
  deleteAutomationREST,
} from "./api";
import { AUTOMATION_PREFIX } from "../constants";

/**
 * Перезагружает автоматизации в Home Assistant
 */
export async function reloadAutomations(hass: HomeAssistant): Promise<void> {
  try {
    await hass.callService("automation", "reload");
    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:", error);
  }
}

/**
 * Фильтрует hass.states для получения автоматизаций расписаний
 */
function filterScheduleAutomations(hass: HomeAssistant): AutomationConfig[] {
  const filteredAutomations: AutomationConfig[] = [];
  
  for (const entityId in hass.states) {
    if (!entityId.startsWith("automation.")) {
      continue;
    }
    
    const state = hass.states[entityId];
    if (!state || !state.attributes) {
      continue;
    }
    
    const automationId = state.attributes.id || "";
    if (!automationId.includes(AUTOMATION_PREFIX)) {
      continue;
    }
    
    filteredAutomations.push({
      id: automationId,
      alias: (state.attributes.friendly_name as string) || automationId,
      _entity_id: entityId,
      _state: state.state,
      _attributes: state.attributes,
      _from_states: true,
    } as AutomationConfig);
  }
  
  return filteredAutomations;
}

export async function getScheduleAutomations(
  hass: HomeAssistant
): Promise<AutomationConfig[]> {
  try {
    const filteredFromStates = filterScheduleAutomations(hass);
    
    if (filteredFromStates.length > 0) {
      const automationConfigs: AutomationConfig[] = [];
      
      for (const filteredAutomation of filteredFromStates) {
        const automationId = filteredAutomation.id;
        
        try {
          let config: AutomationConfig | null = null;
          
          try {
            config = await hass.callWS<AutomationConfig>({
              type: "config/automation/config/get",
              automation_id: automationId,
            });
          } catch (e1: any) {
            try {
              config = await hass.callWS<AutomationConfig>({
                type: "config/automation/get",
                automation_id: automationId,
              });
            } catch (e2: any) {
              try {
                config = await hass.callWS<AutomationConfig>({
                  type: "automation/get",
                  automation_id: automationId,
                });
              } catch (e3: any) {
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
                    }
                  }
                } catch (restError: any) {
                  // Игнорируем ошибки REST API
                }
              }
            }
          }
          
          if (config && config.id) {
            automationConfigs.push(config);
          } else {
            automationConfigs.push(filteredAutomation);
          }
        } catch (error: any) {
          automationConfigs.push(filteredAutomation);
        }
      }
      
      if (automationConfigs.length > 0) {
        return automationConfigs;
      }
    }
    
    return [];
  } catch (error: any) {
    console.warn("[Vacuum Schedule Card] Ошибка получения списка автоматизаций:", error);
    return [];
  }
}

export async function getAutomationConfig(
  hass: HomeAssistant,
  automationId: string
): Promise<AutomationConfig | null> {
  const scheduleAutomations = await getScheduleAutomations(hass);
  const automation = scheduleAutomations.find((a) => a.id === automationId);
  
  return automation || null;
}

function getCleaningTypeFromService(service: string): CleaningType {
  if (service.includes("vacuum_mop_segment") || service.includes("vacuum_mop")) {
    return "mop";
  }
  if (service.includes("vacuum_clean_and_mop_segment") || service.includes("vacuum_clean_and_mop")) {
    return "vacuum_and_mop";
  }
  return "vacuum";
}

/**
 * Парсит расписание из конфигурации автоматизации
 */
export function parseScheduleFromAutomation(
  automationConfig: AutomationConfig,
  automationState: AutomationState | null
): { scheduleId: string; day: number; time: string; rooms: number[]; enabled: boolean; cleaning_type?: CleaningType } | null {
  const configId = automationConfig.id || "";
  if (!configId.startsWith("vacuum_schedule_") || !configId.includes("_day_")) {
    return null;
  }
  
  if (automationConfig._incomplete) {
    return null;
  }

  const idMatch = configId.match(/^vacuum_schedule_(.+)_day_(\d+)$/);
  if (!idMatch) {
    return null;
  }

  const scheduleId = idMatch[1];
  const day = parseInt(idMatch[2], 10);
  
  const hasTrigger = !!(automationConfig.trigger || automationConfig.triggers);
  const hasAction = !!(automationConfig.action || automationConfig.actions);

  if (!hasTrigger || !hasAction) {
    return null;
  }

  const triggerData = automationConfig.trigger || automationConfig.triggers;
  if (!triggerData) {
    return null;
  }
  
  const triggers = Array.isArray(triggerData)
    ? triggerData.filter((t: any) => t != null)
    : triggerData != null
    ? [triggerData]
    : [];
  
  if (triggers.length === 0) {
    return null;
  }
  
  const timeTrigger = triggers.find((t: any) => t && t.platform === "time");
  if (!timeTrigger || !timeTrigger.at) {
    return null;
  }

  const time = timeTrigger.at.substring(0, 5);

  const actionData = automationConfig.action || automationConfig.actions;
  if (!actionData) {
    return null;
  }
  
  const actions = Array.isArray(actionData)
    ? actionData.filter((a: any) => a != null)
    : actionData != null
    ? [actionData]
    : [];
  
  if (actions.length === 0) {
    return null;
  }
  
  // Ищем любое действие, связанное с пылесосом (vacuum, mop, clean_and_mop)
  const action = actions.find((a: any) => {
    if (!a) return false;
    const service = a.service || a.action;
    if (!service || typeof service !== "string") return false;
    return service.includes("vacuum_clean_segment") || 
           service.includes("vacuum_mop_segment") || 
           service.includes("vacuum_clean_and_mop_segment") ||
           service === "vacuum.start" ||
           service.includes("vacuum_mop") ||
           service.includes("vacuum_clean_and_mop");
  });
  
  if (!action) {
    return null;
  }
  
  const service = (action.service || action.action) as string;
  const cleaningType = getCleaningTypeFromService(service);
  const segments = action.data?.segments;
  const rooms = Array.isArray(segments) ? segments : segments ? [segments] : [];

  return {
    scheduleId,
    day,
    time,
    rooms,
    enabled: automationState?.state === "on",
    cleaning_type: cleaningType,
  };
}

export async function createOrUpdateAutomation(
  hass: HomeAssistant,
  automation: any
): Promise<boolean> {
  try {
    const scheduleAutomations = await getScheduleAutomations(hass);
    const existingAutomation = scheduleAutomations.find((a) => a.id === automation.id);
    const isUpdate = !!existingAutomation;

    const restSuccess = await createOrUpdateAutomationREST(hass, automation);
    
    if (restSuccess) {
      await reloadAutomations(hass);
      return true;
    }

    try {
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

        await reloadAutomations(hass);
        return true;
      } catch (error: any) {
        if (isUpdate && (error.code === "unknown_command" || error.message?.includes("unknown_command"))) {
          try {
            await hass.callWS({
              type: "config/automation/delete",
              automation_id: automation.id,
            });
            
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

            await reloadAutomations(hass);
            return true;
          } catch (deleteError: any) {
            // Игнорируем ошибки удаления
          }
        }
        
        console.error(`[Vacuum Schedule Card] Ошибка ${isUpdate ? "обновления" : "создания"} автоматизации ${automation.id}:`, error);
        return false;
      }
    } catch (error: any) {
      console.error(`[Vacuum Schedule Card] Ошибка ${isUpdate ? "обновления" : "создания"} автоматизации ${automation.id}:`, error);
      return false;
    }
  } catch (error) {
    console.error(`[Vacuum Schedule Card] Ошибка создания автоматизации ${automation.id}:`, error);
    return false;
  }
}

export async function deleteAutomation(
  hass: HomeAssistant,
  automationId: string
): Promise<boolean> {
  try {
    const restSuccess = await deleteAutomationREST(hass, automationId);
    
    if (restSuccess) {
      await reloadAutomations(hass);
      return true;
    }

    try {
      await hass.callWS({
        type: "config/automation/delete",
        automation_id: automationId,
      });

      await reloadAutomations(hass);
      return true;
    } catch (error: any) {
      if (error.code === "unknown_command" || error.message?.includes("unknown_command")) {
        try {
          await hass.callService("automation", "delete", {
            id: automationId,
          });
          return true;
        } catch (serviceError) {
          console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${automationId}:`, serviceError);
          return false;
        }
      }
      console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${automationId}:`, error);
      return false;
    }
  } catch (error) {
    console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${automationId}:`, error);
    return false;
  }
}

function getServiceName(cleaningType: CleaningType = "vacuum"): string {
  switch (cleaningType) {
    case "mop":
      return "dreame_vacuum.vacuum_mop_segment";
    case "vacuum_and_mop":
      return "dreame_vacuum.vacuum_clean_and_mop_segment";
    case "vacuum":
    default:
      return "dreame_vacuum.vacuum_clean_segment";
  }
}

export function createAutomationFromSchedule(
  schedule: Schedule,
  day: number,
  entity: string,
  dayNames: string[],
  scheduleTitle: string
): AutomationConfig {
  const automationId = `${AUTOMATION_PREFIX}${schedule.id}_day_${day}`;
  const dayName = getWeekdayName(day);
  const [hours, minutes] = schedule.time.split(":").map(Number);
  const cleaningType = schedule.cleaning_type || "vacuum";
  const serviceName = getServiceName(cleaningType);

  // Если комнаты не выбраны, используем обычный сервис без _segment
  let action: AutomationAction;
  if (schedule.rooms.length === 0) {
    // Для всех комнат используем обычные сервисы
    switch (cleaningType) {
      case "mop":
        action = {
          service: "dreame_vacuum.vacuum_mop",
          target: {
            entity_id: entity,
          },
        };
        break;
      case "vacuum_and_mop":
        action = {
          service: "dreame_vacuum.vacuum_clean_and_mop",
          target: {
            entity_id: entity,
          },
        };
        break;
      case "vacuum":
      default:
        action = {
          service: "vacuum.start",
          target: {
            entity_id: entity,
          },
        };
        break;
    }
  } else {
    // Для конкретных комнат используем сервисы с _segment
    action = {
      service: serviceName,
      target: {
        entity_id: entity,
      },
      data: {
        segments: schedule.rooms,
      },
    };
  }

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
    action: [action],
    mode: "single",
  };
}

function getWeekdayName(day: number): string {
  const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return dayNames[day] || "mon";
}

