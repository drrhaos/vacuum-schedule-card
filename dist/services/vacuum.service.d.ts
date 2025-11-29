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
    getAdditionalState(): string | undefined;
    isButtonDisabled(buttonType: "start" | "stop" | "pause" | "return", vacuumState: string): boolean;
    getStateLabel(state: string): string;
    /**
     * Получает сообщение об ошибке из атрибутов пылесоса
     * Возвращает undefined, если ошибки нет или нет конкретного сообщения об ошибке
     */
    getError(): string | undefined;
    /**
     * Получает статус задачи из сущности sensor.{entity_name}_task_status
     * Например, для vacuum.pylesos ищет sensor.pylesos_task_status
     * Возвращает значение состояния или undefined, если сущность не найдена
     */
    getTaskStatus(): string | undefined;
    /**
     * Получает список ID комнат, которые сейчас убираются
     * Проверяет различные возможные атрибуты пылесоса
     */
    getCurrentCleaningRooms(): number[];
}
