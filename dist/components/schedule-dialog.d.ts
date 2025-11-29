import { LitElement } from "lit";
import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule, Room } from "../types";
export declare class ScheduleDialog extends LitElement {
    hass: HomeAssistant;
    open: boolean;
    schedule?: Schedule;
    rooms: Room[];
    error?: string;
    private _newSchedule;
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    private _t;
    private _getDayNames;
    private _toggleDay;
    private _isDaySelected;
    private _handleClose;
    private _handleSave;
    private _handleTimeChange;
    private _handleToggleAllRooms;
    private _handleToggleRoom;
    private _handleEnabledChange;
    render(): import("lit-html").TemplateResult<1>;
    static get styles(): import("lit").CSSResult;
}
