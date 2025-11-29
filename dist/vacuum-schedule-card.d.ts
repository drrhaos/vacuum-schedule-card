import { LitElement } from "lit";
import type { HomeAssistant } from "custom-card-helpers";
import type { VacuumScheduleCardConfig } from "./types";
import "./components/control-panel";
import "./components/schedule-list";
import "./components/schedule-dialog";
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
    private _scheduleService?;
    private _unsubscribeAutomations?;
    setConfig(config: VacuumScheduleCardConfig): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _subscribeToAutomationChanges;
    private _loadRooms;
    private _loadSchedules;
    private _t;
    private _handleRoomToggled;
    private _handleAllRoomsToggled;
    private _handleScheduleEdit;
    private _handleScheduleDelete;
    private _deleteSchedule;
    private _handleScheduleToggle;
    private _handleScheduleSave;
    private _handleDialogClose;
    private _handleError;
    private _handleAddSchedule;
    render(): import("lit-html").TemplateResult<1>;
    getCardSize(): number;
    getGridOptions(): {
        readonly rows: 3;
        readonly columns: 6;
        readonly min_rows: 2;
        readonly max_rows: 6;
        readonly min_columns: 3;
        readonly max_columns: 12;
    };
    static getStubConfig(): VacuumScheduleCardConfig;
    static getConfigForm(): {
        schema: ({
            name: string;
            required: boolean;
            selector: {
                entity: {
                    domain: string;
                };
                text?: undefined;
            };
        } | {
            name: string;
            required: boolean;
            selector: {
                text: {};
                entity?: undefined;
            };
        })[];
        computeLabel: (schema: any) => "Vacuum Entity" | "Card Title" | undefined;
        computeHelper: (schema: any) => "Select the vacuum entity to manage schedules for" | "Custom title for the card (optional). If not specified, default title will be used." | undefined;
    };
    static get styles(): import("lit").CSSResult;
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
