import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { VacuumScheduleCardConfig, Schedule, Room } from "./types";
import { ScheduleService } from "./services/schedule.service";
import { loadRooms } from "./utils/rooms";
import { translate } from "./utils/i18n";
import "./components/control-panel";
import "./components/schedule-list";
import "./components/schedule-dialog";

@customElement("vacuum-schedule-card")
class VacuumScheduleCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property() public entity!: string;
  @state() private _schedules: Schedule[] = [];
  @state() private _loading = false;
  @state() private _error?: string;
  @state() private _showAddDialog = false;
  @state() private _editingSchedule?: Schedule;
  @state() private _rooms: Room[] = [];
  @state() private _selectedRoomsForControl: number[] = [];
  private _config?: VacuumScheduleCardConfig;
  private _scheduleService?: ScheduleService;
  private _unsubscribeAutomations?: () => void;

  public setConfig(config: VacuumScheduleCardConfig): void {
    if (!config.entity) {
      throw new Error("Entity must be specified");
    }
    this._config = config;
    this.entity = config.entity;
    if (this.hass) {
      this._scheduleService = new ScheduleService(this.hass, this.entity, (key) => this._t(key));
      this._loadSchedules();
      this._loadRooms();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.hass && this.entity) {
      this._scheduleService = new ScheduleService(this.hass, this.entity, (key) => this._t(key));
      this._loadSchedules();
      this._loadRooms();
      this._subscribeToAutomationChanges();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._unsubscribeAutomations && typeof this._unsubscribeAutomations === "function") {
      try {
        this._unsubscribeAutomations();
      } catch (error) {
        console.warn("Ошибка при отписке от изменений автоматизаций:", error);
      }
      this._unsubscribeAutomations = undefined;
    }
  }

  private _subscribeToAutomationChanges(): void {
    if (!this.hass?.connection) return;

    if (this._unsubscribeAutomations) {
      try {
        this._unsubscribeAutomations();
      } catch (e) {
        // Игнорируем ошибки при отписке
      }
      this._unsubscribeAutomations = undefined;
    }

    try {
      if (this.hass.connection && typeof (this.hass.connection as any).subscribeEvents === "function") {
        try {
          const unsubscribe = (this.hass.connection as any).subscribeEvents(
            (event: any) => {
              const entityId = event.event?.data?.entity_id;
              if (entityId && entityId.startsWith("automation.vacuum_schedule_")) {
                this._loadSchedules();
              }
            },
            "state_changed"
          );
          
          if (typeof unsubscribe === "function") {
            this._unsubscribeAutomations = unsubscribe;
          } else {
            this._unsubscribeAutomations = () => {
              // Отписка происходит автоматически при переподключении
            };
          }
        } catch (error: any) {
          console.warn("Не удалось подписаться на события:", error);
        }
      }
    } catch (error) {
      console.warn("Не удалось подписаться на изменения автоматизаций:", error);
    }
  }

  private async _loadRooms(): Promise<void> {
    if (!this.hass || !this.entity) return;
    this._rooms = await loadRooms(
      this.hass,
      this.entity,
      (key) => this._t(key),
      this._config?.room_icons
    );
    this.requestUpdate();
  }

  private async _loadSchedules(): Promise<void> {
    if (!this.hass || !this._scheduleService) return;

    this._loading = true;
    this._error = undefined;

    try {
      this._schedules = await this._scheduleService.loadSchedules();
    } catch (error) {
      this._error = `${this._t("error_loading")} ${error}`;
      console.error(this._error);
    } finally {
      this._loading = false;
      this.requestUpdate();
    }
  }

  private _t(key: string): string {
    return translate(key, this.hass);
  }

  private _handleRoomToggled(e: CustomEvent): void {
    const { roomId, selected } = e.detail;
    if (selected) {
      this._selectedRoomsForControl = [...this._selectedRoomsForControl, roomId];
    } else {
      this._selectedRoomsForControl = this._selectedRoomsForControl.filter(id => id !== roomId);
    }
    this.requestUpdate();
  }

  private _handleAllRoomsToggled(): void {
    if (this._selectedRoomsForControl.length === 0) {
      this._selectedRoomsForControl = this._rooms.map(r => r.id);
    } else {
      this._selectedRoomsForControl = [];
    }
    this.requestUpdate();
  }

  private _handleScheduleEdit(e: CustomEvent): void {
    this._editingSchedule = e.detail.schedule;
    this._showAddDialog = true;
    this._error = undefined;
    this.requestUpdate();
  }

  private _handleScheduleDelete(e: CustomEvent): void {
    const schedule = e.detail.schedule;
    if (!confirm(this._t("delete_confirm"))) {
      return;
    }
    this._deleteSchedule(schedule);
  }

  private async _deleteSchedule(schedule: Schedule): Promise<void> {
    if (!this._scheduleService) return;

    this._schedules = this._schedules.filter(s => s.id !== schedule.id);
    this.requestUpdate();

    try {
      await this._scheduleService.deleteSchedule(schedule);
      await this._loadSchedules();
    } catch (error) {
      console.error("[Vacuum Schedule Card] Ошибка удаления расписания:", error);
      this._error = `${this._t("error_deleting") || "Ошибка удаления"}: ${error}`;
      this.requestUpdate();
    }
  }

  private async _handleScheduleToggle(e: CustomEvent): Promise<void> {
    const { schedule, enabled } = e.detail;
    if (!this._scheduleService) return;

    const updatedSchedule = { ...schedule, enabled };
    this._schedules = this._schedules.map(s =>
      s.id === schedule.id ? updatedSchedule : s
    );
    this.requestUpdate();

    try {
      await this._scheduleService.toggleSchedule(schedule, enabled);
      await this._loadSchedules();
    } catch (error) {
      console.error("[Vacuum Schedule Card] Ошибка переключения расписания:", error);
      this._error = `${this._t("error_toggling") || "Ошибка переключения"}: ${error}`;
      this.requestUpdate();
    }
  }

  private _handleScheduleSave(e: CustomEvent): void {
    const { schedule, oldSchedule } = e.detail;
    if (!this._scheduleService) return;

    let schedules = [...this._schedules];
    
    if (oldSchedule) {
      const index = schedules.findIndex(s => s.id === oldSchedule.id);
      if (index > -1) {
        schedules[index] = schedule;
      }
    } else {
      schedules.push(schedule);
    }

    this._schedules = schedules;
    this._showAddDialog = false;
    this._editingSchedule = undefined;
    this._error = undefined;
    this.requestUpdate();

    this._scheduleService.saveSchedule(schedule, oldSchedule)
      .then(() => this._loadSchedules())
      .catch((error) => {
        console.error("[Vacuum Schedule Card] Ошибка сохранения расписания:", error);
        this._error = `${this._t("error_saving")} ${error}`;
        this.requestUpdate();
      });
  }

  private _handleDialogClose(): void {
    this._showAddDialog = false;
    this._editingSchedule = undefined;
    this._error = undefined;
    this.requestUpdate();
  }

  private _handleError(e: CustomEvent): void {
    this._error = e.detail.message;
    this.requestUpdate();
  }

  private _handleAddSchedule(): void {
    this._editingSchedule = undefined;
    this._showAddDialog = true;
    this._error = undefined;
    this.requestUpdate();
  }

  render() {
    if (!this.hass || !this.entity) {
      return html`<ha-card>
        <div class="content">${this._t("error_no_entity")}</div>
      </ha-card>`;
    }

    const state = this.hass.states[this.entity];
    if (!state) {
      return html`<ha-card>
        <div class="content">${this._t("error_entity_not_found")} ${this.entity} ${this._t("not_found")}</div>
      </ha-card>`;
    }

    return html`
      <ha-card>
        <vacuum-control-panel
          .hass=${this.hass}
          .entity=${this.entity}
          .rooms=${this._rooms}
          .selectedRooms=${this._selectedRoomsForControl}
          .hiddenRooms=${this._config?.hidden_rooms || []}
          .showRoomIds=${this._config?.show_room_ids || false}
          .roomIcons=${this._config?.room_icons || {}}
          @room-toggled=${this._handleRoomToggled}
          @all-rooms-toggled=${this._handleAllRoomsToggled}
          @error=${this._handleError}
        ></vacuum-control-panel>
        
        <div class="header">
          <span>${this._config?.title || this._t("schedule_title")}</span>
          <span>${this._schedules.length} ${this._t("schedules_count")}</span>
        </div>
          
        ${this._error && !this._showAddDialog ? html`<div class="error">${this._error}</div>` : ""}
          
        ${this._loading
          ? html`<div class="loading">${this._t("loading")}</div>`
          : html`
              <vacuum-schedule-list
                .hass=${this.hass}
                .schedules=${this._schedules}
                .rooms=${this._rooms}
                @schedule-edit=${this._handleScheduleEdit}
                @schedule-delete=${this._handleScheduleDelete}
                @schedule-toggle=${this._handleScheduleToggle}
              ></vacuum-schedule-list>
              
              <ha-button class="add-button" @click=${this._handleAddSchedule}>
                ${this._t("add_schedule")}
              </ha-button>
            `}
      </ha-card>
      <vacuum-schedule-dialog
        .hass=${this.hass}
        .open=${this._showAddDialog}
        .schedule=${this._editingSchedule}
        .rooms=${this._rooms}
        .hiddenRooms=${this._config?.hidden_rooms || []}
        .error=${this._error}
        @schedule-save=${this._handleScheduleSave}
        @dialog-close=${this._handleDialogClose}
        @error=${this._handleError}
      ></vacuum-schedule-dialog>
    `;
  }

  public getCardSize(): number {
    return 3;
  }

  public getGridOptions() {
    return {
      rows: 3,
      columns: 6,
      min_rows: 2,
      max_rows: 6,
      min_columns: 3,
      max_columns: 12,
    };
  }

  static getStubConfig(): VacuumScheduleCardConfig {
    return {
      entity: "vacuum.example",
      type: "custom:vacuum-schedule-card",
      title: undefined,
      hidden_rooms: [],
      show_room_ids: false,
      room_icons: {},
    };
  }

  static getConfigForm() {
    return {
      schema: [
        {
          name: "entity",
          required: true,
          selector: {
            entity: {
              domain: "vacuum",
            },
          },
        },
        {
          name: "title",
          required: false,
          selector: {
            text: {},
          },
        },
      ],
      computeLabel: (schema: any) => {
        if (schema.name === "entity") {
          return "Vacuum Entity";
        }
        if (schema.name === "title") {
          return "Card Title";
        }
        return undefined;
      },
      computeHelper: (schema: any) => {
        if (schema.name === "entity") {
          return "Select the vacuum entity to manage schedules for";
        }
        if (schema.name === "title") {
          return "Custom title for the card (optional). If not specified, default title will be used.";
        }
        return undefined;
      },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      ha-card {
        padding: 16px;
        overflow: hidden;
        position: relative;
      }
      .header {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 16px;
        color: var(--primary-text-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 1.5;
      }
      .content {
        color: var(--primary-text-color);
        font-size: 14px;
        line-height: 1.5;
      }
      .error {
        color: var(--error-color, var(--state-error-color));
        padding: 12px 16px;
        background: var(--error-background-color);
        border-radius: var(--ha-card-border-radius, 4px);
        margin-bottom: 16px;
        font-size: 14px;
        line-height: 1.5;
      }
      .loading {
        text-align: center;
        padding: 24px 16px;
        color: var(--secondary-text-color);
        font-size: 14px;
      }
      .add-button {
        margin-top: 20px;
        width: 100%;
        min-height: 56px;
        font-size: 16px;
        padding: 16px;
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      ha-button {
        --mdc-theme-primary: var(--primary-color, var(--mdc-theme-primary));
        --mdc-theme-on-primary: var(--text-primary-color, var(--mdc-theme-on-primary));
      }
    `;
  }
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

if (!customElements.get("vacuum-schedule-card")) {
  customElements.define("vacuum-schedule-card", VacuumScheduleCard);
}

window.customCards = window.customCards || [];
window.customCards.push({
  preview: true,
  type: "vacuum-schedule-card",
  name: "Vacuum Schedule Card",
  description: "Карточка для создания расписания уборки пылесоса",
});

export { VacuumScheduleCard };

