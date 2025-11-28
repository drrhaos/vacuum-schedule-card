import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule } from "../types";

/**
 * Получает конфигурацию автоматизации через WebSocket или REST API
 */
export async function getAutomationConfig(
  hass: HomeAssistant,
  automationEntityId: string
): Promise<any | null> {
  let automationConfig: any = null;

  if (hass.connection && typeof (hass.connection as any).sendMessagePromise === "function") {
    try {
      // Используем WebSocket API для получения конфигурации автоматизации
      const wsResult: any = await (hass.connection as any).sendMessagePromise({
        type: "automation/get",
        automation_id: automationEntityId,
      });

      if (wsResult?.success && wsResult.result) {
        automationConfig = wsResult.result;
        return automationConfig;
      }
    } catch (wsError: any) {
      // Если WebSocket не поддерживает automation/get, пробуем REST API как fallback
      if (wsError.code !== "unknown_command") {
        console.warn(`WebSocket API не сработал для ${automationEntityId}:`, wsError);
      }
    }
  }

  // Fallback на REST API
  const token = hass.auth?.data?.access_token || hass.auth?.accessToken;
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`/api/config/automation/config/${automationEntityId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      automationConfig = await response.json();
      return automationConfig;
    } else if (response.status === 404) {
      return null;
    } else {
      console.warn(`Ошибка получения конфигурации для ${automationEntityId}: ${response.status}`);
      return null;
    }
  } catch (e) {
    console.warn(`Не удалось получить конфигурацию для ${automationEntityId}:`, e);
    return null;
  }
}

/**
 * Парсит расписание из конфигурации автоматизации
 */
export function parseScheduleFromAutomation(
  automationConfig: any,
  automationState: any
): { scheduleId: string; day: number; time: string; rooms: number[]; enabled: boolean } | null {
  // Проверяем, относится ли автоматизация к расписаниям по id
  const configId = automationConfig.id || "";
  if (!configId.startsWith("vacuum_schedule_") || !configId.includes("_day_")) {
    return null;
  }

  // Парсим id: vacuum_schedule_{scheduleId}_day_{day}
  const idMatch = configId.match(/^vacuum_schedule_(.+)_day_(\d+)$/);
  if (!idMatch) return null;

  const scheduleId = idMatch[1];
  const day = parseInt(idMatch[2], 10);

  // Извлекаем время из trigger
  const triggers = Array.isArray(automationConfig.trigger)
    ? automationConfig.trigger
    : [automationConfig.trigger];
  const timeTrigger = triggers.find((t: any) => t.platform === "time");
  if (!timeTrigger?.at) return null;

  const time = timeTrigger.at.substring(0, 5); // "HH:MM"

  // Извлекаем комнаты из action
  const actions = Array.isArray(automationConfig.action)
    ? automationConfig.action
    : [automationConfig.action];
  const action = actions.find((a: any) => a.service?.includes("vacuum_clean_segment"));
  const rooms = action?.data?.segments || [];

  return {
    scheduleId,
    day,
    time,
    rooms,
    enabled: automationState?.state === "on",
  };
}

/**
 * Создает или обновляет автоматизацию
 */
export async function createOrUpdateAutomation(
  hass: HomeAssistant,
  automation: any
): Promise<boolean> {
  const token = hass.auth?.data?.access_token || hass.auth?.accessToken;
  if (!token) {
    console.warn("Токен авторизации не найден для создания автоматизации");
    return false;
  }

  try {
    // Получаем все автоматизации
    let response = await fetch(`/api/config/automation/config`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.warn(`Не удалось получить список автоматизаций:`, response.status);
      return false;
    }

    let allAutomations: any[] = await response.json();
    if (!Array.isArray(allAutomations)) {
      console.warn("Автоматизации не в формате массива (file-based)");
      return false;
    }

    // Ищем существующую автоматизацию
    const existingIndex = allAutomations.findIndex((a: any) => a.id === automation.id);

    if (existingIndex >= 0) {
      // Обновляем существующую
      allAutomations[existingIndex] = automation;
    } else {
      // Добавляем новую
      allAutomations.push(automation);
    }

    // Отправляем обновленный массив обратно
    response = await fetch(`/api/config/automation/config`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(allAutomations),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(
        `Не удалось ${existingIndex >= 0 ? "обновить" : "создать"} автоматизацию ${automation.id}:`,
        response.status,
        errorText
      );
      return false;
    }

    // Перезагружаем автоматизации для обновления кеша
    try {
      await hass.callService("automation", "reload");
      // Небольшая задержка для применения изменений
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (reloadError) {
      console.warn("Не удалось перезагрузить автоматизации:", reloadError);
    }

    return true;
  } catch (error) {
    console.warn(`Ошибка создания автоматизации ${automation.id}:`, error);
    return false;
  }
}

/**
 * Удаляет автоматизацию
 */
export async function deleteAutomation(
  hass: HomeAssistant,
  automationId: string
): Promise<boolean> {
  const token = hass.auth?.data?.access_token || hass.auth?.accessToken;
  if (!token) {
    console.warn("Токен авторизации не найден для удаления автоматизации");
    return false;
  }

  try {
    // Получаем все автоматизации
    let response = await fetch(`/api/config/automation/config`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.warn(`Не удалось получить список автоматизаций:`, response.status);
      return false;
    }

    let allAutomations: any[] = await response.json();
    if (!Array.isArray(allAutomations)) {
      console.warn("Автоматизации не в формате массива (file-based)");
      return false;
    }

    // Удаляем автоматизацию из массива
    allAutomations = allAutomations.filter((a: any) => a.id !== automationId);

    // Отправляем обновленный массив обратно
    response = await fetch(`/api/config/automation/config`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(allAutomations),
    });

    if (!response.ok) {
      console.warn(`Не удалось удалить автоматизацию ${automationId}:`, response.status);
      return false;
    }

    // Перезагружаем автоматизации для обновления кеша
    try {
      await hass.callService("automation", "reload");
      // Небольшая задержка для применения изменений
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (reloadError) {
      console.warn("Не удалось перезагрузить автоматизации:", reloadError);
    }

    return true;
  } catch (error) {
    console.warn(`Ошибка удаления автоматизации ${automationId}:`, error);
    return false;
  }
}

/**
 * Создает объект автоматизации из расписания
 */
export function createAutomationFromSchedule(
  schedule: Schedule,
  day: number,
  entity: string,
  dayNames: string[],
  scheduleTitle: string
): any {
  const automationId = `vacuum_schedule_${schedule.id}_day_${day}`;
  const dayName = getDayNameForAutomation(day);
  const [hours, minutes] = schedule.time.split(":").map(Number);

  return {
    id: automationId,
    alias: `${scheduleTitle} ${schedule.time} - ${dayNames[day]} (${schedule.id})`,
    description: `Автоматизация для расписания уборки ${schedule.time} в ${dayNames[day]}`,
    trigger: [
      {
        platform: "time",
        at: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`,
      },
    ],
    condition: [
      {
        condition: "time",
        weekday: dayName,
      },
    ],
    action: [
      {
        service: "dreame_vacuum.vacuum_clean_segment",
        target: {
          entity_id: entity,
        },
        data: {
          segments: schedule.rooms.length > 0 ? schedule.rooms : undefined,
        },
      },
    ],
    mode: "single",
  };
}

/**
 * Получает имя дня недели для автоматизации
 */
function getDayNameForAutomation(day: number): string {
  const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return dayNames[day] || "mon";
}

