import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule } from "../types";

/**
 * Получает список всех автоматизаций через hass.callApi()
 * Использует официальный метод из hass объекта согласно документации:
 * https://developers.home-assistant.io/docs/frontend/data
 */
export async function getAllAutomations(
  hass: HomeAssistant
): Promise<any[]> {
  try {
    // Используем hass.callApi() вместо прямых fetch запросов
    // Путь должен быть без /api/ префикса, так как callApi сам добавляет его
    const automations = await hass.callApi("GET", "config/automation");
    
    // REST API может вернуть массив или объект (для file-based конфигурации)
    if (Array.isArray(automations)) {
      return automations;
    } else if (typeof automations === "object" && automations !== null) {
      // Если это объект, преобразуем в массив
      return Object.values(automations);
    }

    console.warn("Автоматизации не в ожидаемом формате");
    return [];
  } catch (error: any) {
    console.warn("Ошибка получения списка автоматизаций:", error);
    return [];
  }
}

/**
 * Получает конфигурацию автоматизации по ID из списка всех автоматизаций
 * Использует только задокументированный эндпоинт /api/config/automation
 */
export async function getAutomationConfig(
  hass: HomeAssistant,
  automationId: string
): Promise<any | null> {
  // Получаем все автоматизации через задокументированный эндпоинт
  const allAutomations = await getAllAutomations(hass);
  
  // Ищем автоматизацию по id
  const automation = allAutomations.find((a: any) => a.id === automationId);
  
  return automation || null;
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
 * 
 * Примечание: В официальной документации Home Assistant нет задокументированных методов
 * для создания/обновления автоматизаций через REST API или WebSocket API.
 * Эта функция всегда возвращает false, так как использует только задокументированные методы.
 */
export async function createOrUpdateAutomation(
  hass: HomeAssistant,
  automation: any
): Promise<boolean> {
  console.warn(
    `Не удалось создать/обновить автоматизацию ${automation.id}: нет задокументированного API метода для создания/обновления автоматизаций в Home Assistant`
  );
  return false;
}

/**
 * Удаляет автоматизацию
 * 
 * Примечание: В официальной документации Home Assistant нет задокументированных методов
 * для удаления автоматизаций через REST API или WebSocket API.
 * Эта функция всегда возвращает false, так как использует только задокументированные методы.
 */
export async function deleteAutomation(
  hass: HomeAssistant,
  automationId: string
): Promise<boolean> {
  console.warn(
    `Не удалось удалить автоматизацию ${automationId}: нет задокументированного API метода для удаления автоматизаций в Home Assistant`
  );
  return false;
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

