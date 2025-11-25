import { LitElement } from "lit";
import type { HomeAssistant } from "custom-card-helpers";
interface VacuumScheduleCardConfig {
    entity: string;
    type: string;
}
declare class VacuumScheduleCard extends LitElement {
    hass: HomeAssistant;
    entity: string;
    private _schedules;
    private _loading;
    private _error?;
    private _config?;
    private _schedulesEntityId?;
    setConfig(config: VacuumScheduleCardConfig): void;
    connectedCallback(): void;
    private _loadSchedules;
    getCardSize(): number;
    static get styles(): import("lit").CSSResult;
    private _getDayNames;
    private _formatDays;
    render(): import("lit-html").TemplateResult<1>;
    private _addSchedule;
}
declare global {
    interface HTMLElementTagNameMap {
        "vacuum-schedule-card": VacuumScheduleCard;
    }
    interface Window {
        customCards?: Array<{
            type: string;
            name: string;
            description: string;
            preview?: boolean;
        }>;
    }
}
export { VacuumScheduleCard };
