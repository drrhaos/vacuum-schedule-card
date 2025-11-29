import { LitElement } from "lit";
import type { HomeAssistant } from "custom-card-helpers";
import type { VacuumScheduleCardConfig } from "./types";
declare class VacuumScheduleCard extends LitElement {
    hass: HomeAssistant;
    entity: string;
    private _schedules;
    private _loading;
    private _error?;
    private _showAddDialog;
    private _editingSchedule?;
    private _rooms;
    private _selectedRoomsForControl;
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
    getGridOptions(): {
        rows: number;
        columns: number;
        min_rows: number;
        max_rows: number;
        min_columns: number;
        max_columns: number;
    };
    static getStubConfig(): VacuumScheduleCardConfig;
    static getConfigForm(): {
        schema: {
            name: string;
            required: boolean;
            selector: {
                entity: {
                    domain: string;
                };
            };
        }[];
        computeLabel: (schema: any) => "Vacuum Entity" | undefined;
        computeHelper: (schema: any) => "Select the vacuum entity to manage schedules for" | undefined;
    };
    static get styles(): import("lit").CSSResult;
    private _t;
    private _getDayNames;
    private _formatDays;
    private _formatRooms;
    private _shouldShowRoomIds;
    private _getRoomIcon;
    private _renderControlPanel;
    private _toggleRoom;
    private _toggleAllRooms;
    private _startVacuum;
    private _stopVacuum;
    private _pauseVacuum;
    private _returnToBase;
    render(): import("lit-html").TemplateResult<1>;
    private _addSchedule;
    private _toggleDay;
    private _isDaySelected;
    private _closeDialog;
    private _editSchedule;
    private _toggleSchedule;
    private _deleteSchedule;
    private _createAutomation;
    private _deleteAutomation;
    private _updateAutomationsInBackground;
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
