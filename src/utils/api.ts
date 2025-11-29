import type { HomeAssistant } from "custom-card-helpers";

export async function getAllEntitiesFromAPI(
  hass: HomeAssistant
): Promise<Record<string, any> | null> {
  try {
    const token = hass.auth?.data?.access_token || hass.auth?.accessToken;
    if (!token) {
      console.warn("Токен авторизации не найден для получения сущностей");
      return null;
    }

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

export function getAuthToken(hass: HomeAssistant): string | null {
  return hass.auth?.data?.access_token || hass.auth?.accessToken || null;
}

export function getBaseUrl(): string {
  return window.location.origin;
}

export async function createOrUpdateAutomationREST(
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

    const requestBody: any = {
      id: automation.id,
      alias: automation.alias,
      description: automation.description,
      triggers: Array.isArray(automation.trigger) ? automation.trigger : [automation.trigger],
      conditions: Array.isArray(automation.condition) ? automation.condition : (automation.condition ? [automation.condition] : []),
      actions: Array.isArray(automation.action) ? automation.action : [automation.action],
      mode: automation.mode || "single",
    };
    
    if (requestBody.actions && Array.isArray(requestBody.actions)) {
      requestBody.actions = requestBody.actions.map((act: any) => {
        if (act.service && !act.action) {
          const newAct = { ...act };
          newAct.action = act.service;
          delete newAct.service;
          return newAct;
        }
        return act;
      });
    }

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
        `[Vacuum Schedule Card] Ошибка REST API при создании/обновлении автоматизации ${automation.id}:`,
        response.status,
        errorText
      );
      return false;
    }

    await response.json().catch(() => null);
    return true;
  } catch (error: any) {
    console.error(
      `[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса для автоматизации ${automation.id}:`,
      error
    );
    return false;
  }
}

export async function deleteAutomationREST(
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
        `[Vacuum Schedule Card] Ошибка REST API при удалении автоматизации ${automationId}:`,
        response.status,
        errorText
      );
      return false;
    }

    return true;
  } catch (error: any) {
    console.error(
      `[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса на удаление автоматизации ${automationId}:`,
      error
    );
    return false;
  }
}

