/**
 * Константы для Vacuum Schedule Card
 */
export declare const CARD_NAME = "vacuum-schedule-card";
export declare const CARD_TITLE = "Vacuum Schedule Card";
export declare const CARD_DESCRIPTION = "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0434\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044F \u0443\u0431\u043E\u0440\u043A\u0438 \u043F\u044B\u043B\u0435\u0441\u043E\u0441\u0430";
/**
 * Префиксы для автоматизаций расписания
 */
export declare const AUTOMATION_PREFIX = "vacuum_schedule_";
export declare const AUTOMATION_ID_PATTERN = "vacuum_schedule_schedule_";
/**
 * Статусы задачи, при которых кнопки выбора комнат активны
 */
export declare const ACTIVE_BUTTON_TASK_STATUSES: readonly string[];
/**
 * Логирование
 */
export declare const LOG_PREFIX = "[Vacuum Schedule Card]";
/**
 * Дефолтные значения
 */
export declare const DEFAULT_TITLE = "\u041F\u044B\u043B\u0435\u0441\u043E\u0441";
export declare const DEFAULT_CARD_SIZE = 3;
/**
 * Grid options для карточки
 */
export declare const GRID_OPTIONS: {
    readonly rows: 3;
    readonly columns: 6;
    readonly min_rows: 2;
    readonly max_rows: 6;
    readonly min_columns: 3;
    readonly max_columns: 12;
};
