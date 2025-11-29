export interface VacuumScheduleCardConfig {
  entity: string;
  type: string;
  title?: string; // Кастомный заголовок карточки
  hidden_rooms?: number[]; // Список ID комнат, которые нужно скрыть из выбора
  show_room_ids?: boolean; // Показывать ID комнат на кнопках
  room_icons?: Record<number, string | { entity_id: string }>; // Иконки для комнат по ID: { 16: "🛋️", 17: { entity_id: "sensor.living_room" } }
}

export interface Schedule {
  id: string;
  enabled: boolean;
  days: number[]; // 0 = воскресенье, 1 = понедельник, ..., 6 = суббота
  time: string; // HH:MM формат
  rooms: number[]; // ID комнат
  name?: string; // Опциональное имя расписания
}

export interface Room {
  id: number;
  name: string;
  icon?: string; // Иконка из entity или кастомная
  entity_id?: string; // Entity ID для получения иконки из Home Assistant
}

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

