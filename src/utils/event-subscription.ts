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
export function subscribeToStateChanges(
  hass: HomeAssistant,
  entityId: string,
  callback: () => void
): StateChangeSubscription | null {
  if (!hass?.connection) {
    return null;
  }

  try {
    if (typeof (hass.connection as any).subscribeEvents === "function") {
      const unsubscribe = (hass.connection as any).subscribeEvents(
        (event: any) => {
          const changedEntityId = event.event?.data?.entity_id;
          if (changedEntityId === entityId) {
            callback();
          }
        },
        "state_changed"
      );

      if (typeof unsubscribe === "function") {
        return {
          unsubscribe: () => {
            try {
              unsubscribe();
            } catch (error) {
              // Игнорируем ошибки при отписке
            }
          },
        };
      }
    }
  } catch (error) {
    console.warn("[Vacuum Schedule Card] Ошибка подписки на изменения состояния:", error);
  }

  return null;
}

/**
 * Подписывается на изменения состояния сущностей по паттерну
 * @param hass - экземпляр Home Assistant
 * @param pattern - паттерн для фильтрации entity_id (например, "automation.vacuum_schedule_")
 * @param callback - функция обратного вызова при изменении состояния
 * @returns функция для отписки от событий
 */
export function subscribeToStateChangesByPattern(
  hass: HomeAssistant,
  pattern: string,
  callback: () => void
): StateChangeSubscription | null {
  if (!hass?.connection) {
    return null;
  }

  try {
    if (typeof (hass.connection as any).subscribeEvents === "function") {
      const unsubscribe = (hass.connection as any).subscribeEvents(
        (event: any) => {
          const entityId = event.event?.data?.entity_id;
          if (entityId && entityId.startsWith(pattern)) {
            callback();
          }
        },
        "state_changed"
      );

      if (typeof unsubscribe === "function") {
        return {
          unsubscribe: () => {
            try {
              unsubscribe();
            } catch (error) {
              // Игнорируем ошибки при отписке
            }
          },
        };
      }
    }
  } catch (error) {
    console.warn("[Vacuum Schedule Card] Ошибка подписки на изменения состояния:", error);
  }

  return null;
}

