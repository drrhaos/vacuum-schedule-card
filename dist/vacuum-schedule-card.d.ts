import { LitElement } from "lit";
import type { HomeAssistant } from "custom-card-helpers";
declare class VacuumScheduleCard extends LitElement {
    hass: HomeAssistant;
    entity: string;
    static get styles(): import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
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
