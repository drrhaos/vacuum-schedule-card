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

/**
 * Получает базовый URL Home Assistant
 */
export function getBaseUrl(): string {
  return window.location.origin;
}

/**
 * Создает или обновляет автоматизацию через REST API
 * Использует POST /api/config/automation/config/{automation_id}
 * Согласно документации: https://developers.home-assistant.io/docs/api/rest
 */
export async function createOrUpdateAutomationViaREST(
  hass: HomeAssistant,
  automation: any
): Promise<boolean> {
  try {
    const token = getAuthToken(hass);
    if (!token) {
      console.warn("[Vacuum Schedule Card] Токен авторизации не найден для создания автоматизации");
      return false;
    }

    const baseUrl = getBaseUrl();
    const apiUrl = `${baseUrl}/api/config/automation/config/${automation.id}`;

    // Подготавливаем тело запроса согласно документации
    // Home Assistant использует формат: triggers, conditions, actions (множественное число)
    // И в actions используется action вместо service
    const requestBody: any = {
      id: automation.id,
      alias: automation.alias,
      description: automation.description,
      triggers: Array.isArray(automation.trigger) ? automation.trigger : [automation.trigger],
      conditions: Array.isArray(automation.condition) ? automation.condition : (automation.condition ? [automation.condition] : []),
      actions: Array.isArray(automation.action) ? automation.action : [automation.action],
      mode: automation.mode || "single",
    };
    
    // Преобразуем actions: заменяем service на action для совместимости с форматом Home Assistant
    // В примере используется action: dreame_vacuum.vacuum_clean_segment вместо service
    if (requestBody.actions && Array.isArray(requestBody.actions)) {
      requestBody.actions = requestBody.actions.map((act: any) => {
        if (act.service && !act.action) {
          // Создаем копию без изменения исходного объекта
          const newAct = { ...act };
          newAct.action = act.service;
          // Удаляем service, оставляем только action (как в примере)
          delete newAct.service;
          return newAct;
        }
        return act;
      });
    }

    console.log(`[Vacuum Schedule Card] Отправка REST API запроса на создание/обновление автоматизации:`, {
      url: apiUrl,
      automationId: automation.id,
      triggersCount: requestBody.triggers?.length || 0,
      conditionsCount: requestBody.conditions?.length || 0,
      actionsCount: requestBody.actions?.length || 0,
    });
    console.log(`[Vacuum Schedule Card] Тело запроса:`, JSON.stringify(requestBody, null, 2));

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[Vacuum Schedule Card] ❌ Ошибка REST API при создании/обновлении автоматизации ${automation.id}:`,
        response.status,
        errorText
      );
      return false;
    }

    const result = await response.json().catch(() => null);
    console.log(`[Vacuum Schedule Card] ✅ REST API запрос успешно выполнен для автоматизации ${automation.id}`, result);
    return true;
  } catch (error: any) {
    console.error(
      `[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса для автоматизации ${automation.id}:`,
      error
    );
    return false;
  }
}

/**
 * Удаляет автоматизацию через REST API
 * Использует DELETE /api/config/automation/config/{automation_id}
 */
export async function deleteAutomationViaREST(
  hass: HomeAssistant,
  automationId: string
): Promise<boolean> {
  try {
    const token = getAuthToken(hass);
    if (!token) {
      console.warn("[Vacuum Schedule Card] Токен авторизации не найден для удаления автоматизации");
      return false;
    }

    const baseUrl = getBaseUrl();
    const apiUrl = `${baseUrl}/api/config/automation/config/${automationId}`;

    console.log(`[Vacuum Schedule Card] Отправка REST API запроса на удаление автоматизации:`, {
      url: apiUrl,
      automationId,
    });

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[Vacuum Schedule Card] ❌ Ошибка REST API при удалении автоматизации ${automationId}:`,
        response.status,
        errorText
      );
      return false;
    }

    console.log(`[Vacuum Schedule Card] ✅ REST API запрос на удаление успешно выполнен для автоматизации ${automationId}`);
    return true;
  } catch (error: any) {
    console.error(
      `[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса на удаление автоматизации ${automationId}:`,
      error
    );
    return false;
  }
}

