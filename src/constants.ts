/**
 * Константы для Vacuum Schedule Card
 */

export const CARD_NAME = "vacuum-schedule-card";
export const CARD_TITLE = "Vacuum Schedule Card";
export const CARD_DESCRIPTION = "Карточка для создания расписания уборки пылесоса";

/**
 * Префиксы для автоматизаций расписания
 */
export const AUTOMATION_PREFIX = "vacuum_schedule_";
export const AUTOMATION_ID_PATTERN = `${AUTOMATION_PREFIX}schedule_`;

/**
 * Статусы задачи, при которых кнопки выбора комнат активны
 */
export const ACTIVE_BUTTON_TASK_STATUSES: readonly string[] = [
  // Английские статусы
  "unknown",
  "completed",
  // Русские статусы (переведенные Home Assistant)
  "неизвестно",
  "завершено",
  // Пустые значения
  "",
  "null",
  "undefined",
  "none",
];

/**
 * Логирование
 */
export const LOG_PREFIX = "[Vacuum Schedule Card]";

/**
 * Дефолтные значения
 */
export const DEFAULT_TITLE = "Пылесос";
export const DEFAULT_CARD_SIZE = 3;

/**
 * Grid options для карточки
 */
export const GRID_OPTIONS = {
  rows: 3,
  columns: 6,
  min_rows: 2,
  max_rows: 6,
  min_columns: 3,
  max_columns: 12,
} as const;

