import { LitElement } from "lit";
import type { HomeAssistant } from "custom-card-helpers";
import type { Room } from "../types";
export declare class ControlPanel extends LitElement {
    hass: HomeAssistant;
    entity: string;
    rooms: Room[];
    selectedRooms: number[];
    hiddenRooms: number[];
    showRoomIds: boolean;
    roomIcons: Record<number, string>;
    private _vacuumService?;
    connectedCallback(): void;
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    private _t;
    private _getVacuumState;
    private _isButtonDisabled;
    private _getStateLabel;
    private _getRoomIcon;
    private _handleStart;
    private _handleStop;
    private _handlePause;
    private _handleReturnToBase;
    private _toggleRoom;
    private _toggleAllRooms;
    render(): import("lit-html").TemplateResult<1>;
    static get styles(): import("lit").CSSResult;
}
