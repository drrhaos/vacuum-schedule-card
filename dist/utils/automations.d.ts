import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule } from "../types";
/**
 * Получает список всех автоматизаций через hass.callApi()
 * Использует официальный метод из hass объекта согласно документации:
 * https://developers.home-assistant.io/docs/frontend/data
 */
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
 *
 * Примечание: В официальной документации Home Assistant нет задокументированных методов
 * для создания/обновления автоматизаций через REST API или WebSocket API.
 * Эта функция всегда возвращает false, так как использует только задокументированные методы.
 */
export declare function createOrUpdateAutomation(hass: HomeAssistant, automation: any): Promise<boolean>;
/**
 * Удаляет автоматизацию
 *
 * Примечание: В официальной документации Home Assistant нет задокументированных методов
 * для удаления автоматизаций через REST API или WebSocket API.
 * Эта функция всегда возвращает false, так как использует только задокументированные методы.
 */
export declare function deleteAutomation(hass: HomeAssistant, automationId: string): Promise<boolean>;
/**
 * Создает объект автоматизации из расписания
 */
export declare function createAutomationFromSchedule(schedule: Schedule, day: number, entity: string, dayNames: string[], scheduleTitle: string): any;
