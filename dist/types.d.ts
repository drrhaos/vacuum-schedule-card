export interface VacuumScheduleCardConfig {
    entity: string;
    type: string;
    title?: string;
    hidden_rooms?: number[];
    show_room_ids?: boolean;
    room_icons?: Record<number, string | {
        entity_id: string;
    }>;
}
export interface Schedule {
    id: string;
    enabled: boolean;
    days: number[];
    time: string;
    rooms: number[];
    name?: string;
}
export interface Room {
    id: number;
    name: string;
    icon?: string;
    entity_id?: string;
}
export interface Translations {
    [key: string]: {
        [key: string]: string;
    };
}
