import type { HomeAssistant } from "custom-card-helpers";

/**
 * Получает все сущности через API endpoint /api/states
 */
export async function getAllEntitiesFromAPI(
  hass: HomeAssistant
): Promise<Record<string, any> | null> {
  try {
    const token = hass.auth?.data?.access_token || hass.auth?.accessToken;
    if (!token) {
      console.warn("Токен авторизации не найден для получения сущностей");
      return null;
    }

    // Получаем базовый URL из window.location
    const baseUrl = window.location.origin;
    const apiUrl = `${baseUrl}/api/states`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.warn(`Не удалось получить список сущностей: ${response.status}`);
      return null;
    }

    const entities = await response.json();

    // Преобразуем массив в объект для удобства поиска
    const entitiesMap: Record<string, any> = {};
    if (Array.isArray(entities)) {
      entities.forEach((entity: any) => {
        if (entity.entity_id) {
          entitiesMap[entity.entity_id] = entity;
        }
      });
    }

    return entitiesMap;
  } catch (error) {
    console.warn("Ошибка получения сущностей через API:", error);
    return null;
  }
}

/**
 * Получает токен авторизации из hass
 */
export function getAuthToken(hass: HomeAssistant): string | null {
  return hass.auth?.data?.access_token || hass.auth?.accessToken || null;
}

