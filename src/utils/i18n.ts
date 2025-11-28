import { translations } from "../translations";
import type { HomeAssistant } from "custom-card-helpers";

/**
 * Получает язык из hass
 */
export function getLanguage(hass?: HomeAssistant): string {
  if (!hass) return "en";
  const lang = hass.language || hass.locale?.language || "en";
  return lang.startsWith("ru") ? "ru" : "en";
}

/**
 * Получает перевод по ключу
 */
export function translate(key: string, hass?: HomeAssistant): string {
  const lang = getLanguage(hass);
  return translations[lang]?.[key] || translations.en[key] || key;
}

/**
 * Получает имена дней недели
 */
export function getDayNames(hass?: HomeAssistant): string[] {
  const dayNamesStr = translate("day_names", hass);
  return dayNamesStr.split(",");
}

