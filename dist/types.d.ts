export interface VacuumScheduleCardConfig {
    entity: string;
    type: string;
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
}
export interface Translations {
    [key: string]: {
        [key: string]: string;
    };
}
