import type { HomeAssistant } from "custom-card-helpers";
/**
 * Утилита для подписки на события изменения состояния в Home Assistant
 */
export interface StateChangeSubscription {
    unsubscribe: () => void;
}
/**
 * Подписывается на изменения состояния конкретной сущности
 * @param hass - экземпляр Home Assistant
 * @param entityId - ID сущности для отслеживания
 * @param callback - функция обратного вызова при изменении состояния
 * @returns функция для отписки от событий
 */
export declare function subscribeToStateChanges(hass: HomeAssistant, entityId: string, callback: () => void): StateChangeSubscription | null;
/**
 * Подписывается на изменения состояния сущностей по паттерну
 * @param hass - экземпляр Home Assistant
 * @param pattern - паттерн для фильтрации entity_id (например, "automation.vacuum_schedule_")
 * @param callback - функция обратного вызова при изменении состояния
 * @returns функция для отписки от событий
 */
export declare function subscribeToStateChangesByPattern(hass: HomeAssistant, pattern: string, callback: () => void): StateChangeSubscription | null;
