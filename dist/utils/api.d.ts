import type { HomeAssistant } from "custom-card-helpers";
/**
 * Получает все сущности через API endpoint /api/states
 */
export declare function getAllEntitiesFromAPI(hass: HomeAssistant): Promise<Record<string, any> | null>;
/**
 * Получает токен авторизации из hass
 */
export declare function getAuthToken(hass: HomeAssistant): string | null;
/**
 * Получает базовый URL Home Assistant
 */
export declare function getBaseUrl(): string;
/**
 * Создает или обновляет автоматизацию через REST API
 * Использует POST /api/config/automation/config/{automation_id}
 * Согласно документации: https://developers.home-assistant.io/docs/api/rest
 */
export declare function createOrUpdateAutomationViaREST(hass: HomeAssistant, automation: any): Promise<boolean>;
/**
 * Удаляет автоматизацию через REST API
 * Использует DELETE /api/config/automation/config/{automation_id}
 */
export declare function deleteAutomationViaREST(hass: HomeAssistant, automationId: string): Promise<boolean>;
