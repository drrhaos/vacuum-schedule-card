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
 * Использует задокументированную команду call_service из WebSocket API
 * Согласно документации: https://developers.home-assistant.io/docs/api/websocket
 */
export declare function createOrUpdateAutomation(hass: HomeAssistant, automation: any): Promise<boolean>;
/**
 * Удаляет автоматизацию
 * Использует задокументированную команду call_service из WebSocket API
 * Согласно документации: https://developers.home-assistant.io/docs/api/websocket
 */
export declare function deleteAutomation(hass: HomeAssistant, automationId: string): Promise<boolean>;
/**
 * Создает объект автоматизации из расписания
 */
export declare function createAutomationFromSchedule(schedule: Schedule, day: number, entity: string, dayNames: string[], scheduleTitle: string): any;
