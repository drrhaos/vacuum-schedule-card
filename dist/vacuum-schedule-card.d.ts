import { LitElement } from "lit";
import type { HomeAssistant } from "custom-card-helpers";
export declare class VacuumScheduleCard extends LitElement {
    hass: HomeAssistant;
    entity: string;
    static get styles(): import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
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
