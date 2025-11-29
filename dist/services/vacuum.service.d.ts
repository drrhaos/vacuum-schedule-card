import type { HomeAssistant } from "custom-card-helpers";
export interface VacuumControl {
    start(rooms?: number[]): Promise<void>;
    stop(): Promise<void>;
    pause(): Promise<void>;
    returnToBase(): Promise<void>;
}
export declare class VacuumService implements VacuumControl {
    private hass;
    private entity;
    constructor(hass: HomeAssistant, entity: string);
    start(rooms?: number[]): Promise<void>;
    stop(): Promise<void>;
    pause(): Promise<void>;
    returnToBase(): Promise<void>;
    getState(): string;
    isButtonDisabled(buttonType: "start" | "stop" | "pause" | "return", vacuumState: string): boolean;
    getStateLabel(state: string): string;
    /**
     * Получает список ID комнат, которые сейчас убираются
     * Проверяет различные возможные атрибуты пылесоса
     */
    getCurrentCleaningRooms(): number[];
}
