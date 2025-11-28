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
    private _showAddDialog;
    private _editingSchedule?;
    private _rooms;
    private _config?;
    private _newSchedule;
    setConfig(config: VacuumScheduleCardConfig): void;
    private _unsubscribeAutomations?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _subscribeToAutomationChanges;
    private _loadRooms;
    private _loadSchedules;
    getCardSize(): number;
    static get styles(): import("lit").CSSResult;
    private _getLanguage;
    private _t;
    private _getDayNames;
    private _formatDays;
    private _formatRooms;
    render(): import("lit-html").TemplateResult<1>;
    private _addSchedule;
    private _toggleDay;
    private _isDaySelected;
    private _closeDialog;
    private _editSchedule;
    private _toggleSchedule;
    private _deleteSchedule;
    private _getDayNameForAutomation;
    private _createAutomation;
    private _deleteAutomation;
    private _updateAutomationsForSchedule;
    private _saveSchedule;
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
