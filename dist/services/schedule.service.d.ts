import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule } from "../types";
export declare class ScheduleService {
    private hass;
    private entity;
    private getTranslation;
    constructor(hass: HomeAssistant, entity: string, getTranslation: (key: string) => string);
    loadSchedules(): Promise<Schedule[]>;
    saveSchedule(schedule: Schedule, oldSchedule?: Schedule): Promise<void>;
    deleteSchedule(schedule: Schedule): Promise<void>;
    toggleSchedule(schedule: Schedule, enabled: boolean): Promise<void>;
    private updateAutomationsForSchedule;
    private createAutomationForDay;
    private deleteAutomationForDay;
}
