import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule, VacuumIntegration } from "../types";
import {
  getScheduleAutomations,
  parseScheduleFromAutomation,
  createOrUpdateAutomation,
  deleteAutomation,
  createAutomationFromSchedule,
  reloadAutomations,
} from "../utils/automations";
import { getDayNames } from "../utils/i18n";
import { AUTOMATION_PREFIX } from "../constants";

export class ScheduleService {
  constructor(
    private hass: HomeAssistant,
    private entity: string,
    private integration: VacuumIntegration,
    private getTranslation: (key: string) => string
  ) {}

  async loadSchedules(): Promise<Schedule[]> {
    const automationsMap = new Map<string, Schedule>();
    const scheduleAutomations = await getScheduleAutomations(this.hass);

    for (const automationConfig of scheduleAutomations) {
      try {
        const configId = automationConfig.id || "";
        
        if (!configId || !configId.startsWith(AUTOMATION_PREFIX) || !configId.includes("_day_")) {
          continue;
        }

        let automationState = null;
        const directEntityId = `automation.${configId}`;
        if (this.hass.states[directEntityId]) {
          automationState = this.hass.states[directEntityId];
        } else {
          for (const entityId in this.hass.states) {
            if (!entityId.startsWith("automation.")) continue;
            
            const state = this.hass.states[entityId];
            if (state.attributes?.id === configId) {
              automationState = state;
              break;
            }
          }
        }

        const parsed = parseScheduleFromAutomation(automationConfig, automationState);
        
        if (!parsed || (automationConfig as any)._incomplete) {
          continue;
        }

        const scheduleId = parsed.scheduleId;
        if (!scheduleId) {
          continue;
        }

        if (!automationsMap.has(scheduleId)) {
          automationsMap.set(scheduleId, {
            id: scheduleId,
            enabled: parsed.enabled || false,
            days: [],
            time: parsed.time || "09:00",
            rooms: parsed.rooms || [],
            name: (automationConfig as any).alias || undefined,
            cleaning_type: parsed.cleaning_type || "vacuum_and_mop",
          });
        }

        const schedule = automationsMap.get(scheduleId)!;
        if (!schedule.days.includes(parsed.day)) {
          schedule.days.push(parsed.day);
        }
        if (parsed.rooms.length > 0) {
          schedule.rooms = parsed.rooms;
        }
        if (parsed.cleaning_type) {
          schedule.cleaning_type = parsed.cleaning_type;
        }
        if (automationState) {
          schedule.enabled = automationState.state === "on";
        } else if (parsed.enabled) {
          schedule.enabled = true;
        }
      } catch (e: any) {
        const errorId = automationConfig?.id || automationConfig?._entity_id || "неизвестно";
        console.error(`[Vacuum Schedule Card] Ошибка обработки автоматизации ${errorId}:`, e);
      }
    }

    const schedules = Array.from(automationsMap.values());
    
    for (const schedule of schedules) {
      schedule.days.sort((a, b) => a - b);
    }

    return schedules;
  }

  async saveSchedule(schedule: Schedule, oldSchedule?: Schedule): Promise<void> {
    await this.updateAutomationsForSchedule(schedule, oldSchedule);
    await reloadAutomations(this.hass);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  async deleteSchedule(schedule: Schedule): Promise<void> {
    for (const day of schedule.days) {
      await this.deleteAutomationForDay(schedule.id, day);
    }
    await reloadAutomations(this.hass);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  async toggleSchedule(schedule: Schedule, enabled: boolean): Promise<void> {
    const updatedSchedule = { ...schedule, enabled };
    await this.updateAutomationsForSchedule(updatedSchedule, schedule);
    await reloadAutomations(this.hass);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  private async updateAutomationsForSchedule(schedule: Schedule, oldSchedule?: Schedule): Promise<void> {
    if (!schedule.enabled) {
      const daysToDelete = oldSchedule ? oldSchedule.days : schedule.days;
      for (const day of daysToDelete) {
        await this.deleteAutomationForDay(schedule.id, day);
      }
      return;
    }

    if (oldSchedule) {
      const daysToRemove = oldSchedule.days.filter(d => !schedule.days.includes(d));
      for (const day of daysToRemove) {
        await this.deleteAutomationForDay(schedule.id, day);
      }
    }

    const dayNames = getDayNames(this.hass);
    for (const day of schedule.days) {
      await this.createAutomationForDay(schedule, day, dayNames);
    }
  }

  private async createAutomationForDay(schedule: Schedule, day: number, dayNames: string[]): Promise<void> {
    const automation = createAutomationFromSchedule(
      schedule,
      day,
      this.entity,
      dayNames,
      this.getTranslation("schedule_title"),
      this.integration
    );

    const success = await createOrUpdateAutomation(this.hass, automation);
    if (!success) {
      console.error(`[Vacuum Schedule Card] Не удалось создать/обновить автоматизацию ${automation.id}`);
    }
  }

  private async deleteAutomationForDay(scheduleId: string, day: number): Promise<void> {
    const automationId = `${AUTOMATION_PREFIX}${scheduleId}_day_${day}`;
    const success = await deleteAutomation(this.hass, automationId);
    if (!success) {
      console.error(`[Vacuum Schedule Card] Не удалось удалить автоматизацию ${automationId}`);
    }
  }
}

