import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule } from "../types";
/**
 * Перезагружает автоматизации в Home Assistant
 */
export declare function reloadAutomations(hass: HomeAssistant): Promise<void>;
export declare function getScheduleAutomations(hass: HomeAssistant): Promise<any[]>;
export declare function getAutomationConfig(hass: HomeAssistant, automationId: string): Promise<any | null>;
/**
 * Парсит расписание из конфигурации автоматизации
 */
export declare function parseScheduleFromAutomation(automationConfig: any, automationState: any): {
    scheduleId: string;
    day: number;
    time: string;
    rooms: number[];
    enabled: boolean;
} | null;
export declare function createOrUpdateAutomation(hass: HomeAssistant, automation: any): Promise<boolean>;
export declare function deleteAutomation(hass: HomeAssistant, automationId: string): Promise<boolean>;
export declare function createAutomationFromSchedule(schedule: Schedule, day: number, entity: string, dayNames: string[], scheduleTitle: string): any;
