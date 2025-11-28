import type { HomeAssistant } from "custom-card-helpers";
/**
 * Получает язык из hass
 */
export declare function getLanguage(hass?: HomeAssistant): string;
/**
 * Получает перевод по ключу
 */
export declare function translate(key: string, hass?: HomeAssistant): string;
/**
 * Получает имена дней недели
 */
export declare function getDayNames(hass?: HomeAssistant): string[];
