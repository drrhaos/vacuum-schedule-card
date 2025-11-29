import { LitElement } from "lit";
import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule, Room } from "../types";
export declare class ScheduleDialog extends LitElement {
    hass: HomeAssistant;
    open: boolean;
    schedule?: Schedule;
    rooms: Room[];
    hiddenRooms: number[];
    error?: string;
    private _newSchedule;
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    private _t;
    private _getDayNames;
    private _handleClose;
    private _handleSave;
    private _handleDayToggle;
    private _handleTimeChange;
    private _handleToggleAllRooms;
    private _handleToggleRoom;
    private _handleEnabledChange;
    private _handleNameChange;
    render(): import("lit-html").TemplateResult<1>;
    static get styles(): import("lit").CSSResult;
}
