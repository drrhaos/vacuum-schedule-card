import { LitElement, PropertyValues, TemplateResult, CSSResultGroup } from "lit";
import type { HomeAssistant } from "custom-card-helpers";
export declare class VacuumScheduleCard extends LitElement {
    hass: HomeAssistant;
    entity: string;
    private _schedules;
    private _rooms;
    private _showAddDialog;
    private _editingSchedule;
    private _newSchedule;
    private _getLanguage;
    private _t;
    private get DAYS();
    static get styles(): CSSResultGroup;
    connectedCallback(): void;
    protected updated(changedProperties: PropertyValues): void;
    private _loadSchedules;
    private _loadRooms;
    private _openAddDialog;
    private _closeDialog;
    private _toggleDay;
    private _toggleRoom;
    private _saveSchedule;
    private _saveSchedules;
    private _createOrUpdateAutomation;
    private _getWeekdayName;
    private _getDaysText;
    private _getRoomNames;
    private _toggleSchedule;
    private _deleteSchedule;
    private _editSchedule;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "vacuum-schedule-card": VacuumScheduleCard;
    }
}
