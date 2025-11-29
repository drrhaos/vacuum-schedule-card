import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule } from "../types";
export declare function getAllAutomations(hass: HomeAssistant): Promise<any[]>;
/**
 * Получает конфигурацию автоматизации по ID из списка всех автоматизаций
 * Использует только задокументированный эндпоинт /api/config/automation
 */
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
export declare function createOrUpdateAutomation(hass: HomeAssistant, automation: any): Promise<boolean>;
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
export declare function deleteAutomation(hass: HomeAssistant, automationId: string): Promise<boolean>;
/**
 * Создает объект автоматизации из расписания
 */
export declare function createAutomationFromSchedule(schedule: Schedule, day: number, entity: string, dayNames: string[], scheduleTitle: string): any;
