export interface VacuumScheduleCardConfig {
  entity: string;
  type: string;
  show_room_ids?: boolean; // Показывать ID комнат на кнопках
  room_icons?: Record<number, string>; // Иконки для комнат по ID: { 16: "🛋️", 17: "🛏️" }
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
}

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

