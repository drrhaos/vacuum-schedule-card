import { LitElement } from "lit";
import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule, Room } from "../types";
export declare class ScheduleList extends LitElement {
    hass: HomeAssistant;
    schedules: Schedule[];
    rooms: Room[];
    private _t;
    private _formatDays;
    private _formatRooms;
    private _handleEdit;
    private _handleDelete;
    private _handleToggle;
    render(): import("lit-html").TemplateResult<1>;
    static get styles(): import("lit").CSSResult;
}
