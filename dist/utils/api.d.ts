import type { HomeAssistant } from "custom-card-helpers";
/**
 * Получает все сущности через API endpoint /api/states
 */
export declare function getAllEntitiesFromAPI(hass: HomeAssistant): Promise<Record<string, any> | null>;
/**
 * Получает токен авторизации из hass
 */
export declare function getAuthToken(hass: HomeAssistant): string | null;
