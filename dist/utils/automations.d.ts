import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule } from "../types";
/**
 * Получает конфигурацию автоматизации через WebSocket или REST API
 */
export declare function getAutomationConfig(hass: HomeAssistant, automationEntityId: string): Promise<any | null>;
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
/**
 * Создает или обновляет автоматизацию
 */
export declare function createOrUpdateAutomation(hass: HomeAssistant, automation: any): Promise<boolean>;
/**
 * Удаляет автоматизацию
 */
export declare function deleteAutomation(hass: HomeAssistant, automationId: string): Promise<boolean>;
/**
 * Создает объект автоматизации из расписания
 */
export declare function createAutomationFromSchedule(schedule: Schedule, day: number, entity: string, dayNames: string[], scheduleTitle: string): any;
