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
    /**
     * Получает статус pylesos_state из сущности sensor.pylesos_state
     */
    getPylesosState(): string | undefined;
    isButtonDisabled(buttonType: "start" | "stop" | "pause" | "return", vacuumState: string): boolean;
    getStateLabel(state: string): string;
    /**
     * Получает сообщение об ошибке из атрибутов пылесоса
     * Возвращает undefined, если ошибки нет или нет конкретного сообщения об ошибке
     */
    getError(): string | undefined;
    /**
     * Получает список ID комнат, которые сейчас убираются
     * Проверяет различные возможные атрибуты пылесоса
     */
    getCurrentCleaningRooms(): number[];
}
