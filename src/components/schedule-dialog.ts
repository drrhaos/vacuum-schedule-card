import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule, Room } from "../types";
import { translate, getDayNames } from "../utils/i18n";

@customElement("vacuum-schedule-dialog")
export class ScheduleDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Boolean }) public open = false;
  @property({ attribute: false }) public schedule?: Schedule;
  @property({ attribute: false }) public rooms: Room[] = [];
  @property() public error?: string;

  @state() private _newSchedule: Partial<Schedule> = {
    enabled: true,
    days: [],
    time: "09:00",
    rooms: [],
  };

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has("schedule") || changedProperties.has("open")) {
      if (this.open && this.schedule) {
        this._newSchedule = {
          enabled: this.schedule.enabled,
          days: [...this.schedule.days],
          time: this.schedule.time,
          rooms: [...this.schedule.rooms],
          name: this.schedule.name,
        };
      } else if (this.open && !this.schedule) {
        this._newSchedule = {
          enabled: true,
          days: [],
          time: "09:00",
          rooms: [],
        };
      }
    }
  }

  private _t(key: string): string {
    return translate(key, this.hass);
  }

  private _getDayNames(): string[] {
    return getDayNames(this.hass);
  }

  private _toggleDay(day: number): void {
    if (!this._newSchedule.days) {
      this._newSchedule.days = [];
    }
    const index = this._newSchedule.days.indexOf(day);
    if (index > -1) {
      this._newSchedule.days.splice(index, 1);
    } else {
      this._newSchedule.days.push(day);
    }
    this.requestUpdate();
  }

  private _isDaySelected(day: number): boolean {
    return this._newSchedule.days?.includes(day) || false;
  }

  private _handleClose(): void {
    this.dispatchEvent(new CustomEvent("dialog-close"));
  }

  private _handleSave(): void {
    if (!this._newSchedule.days || this._newSchedule.days.length === 0) {
      this.dispatchEvent(new CustomEvent("error", { detail: { message: this._t("error_no_days") } }));
      return;
    }

    if (!this._newSchedule.time) {
      this.dispatchEvent(new CustomEvent("error", { detail: { message: this._t("error_no_time") } }));
      return;
    }

    const schedule: Schedule = {
      id: this.schedule?.id || `schedule_${Date.now()}`,
      enabled: this._newSchedule.enabled ?? true,
      days: this._newSchedule.days,
      time: this._newSchedule.time,
      rooms: this._newSchedule.rooms || [],
      name: this._newSchedule.name,
    };

    this.dispatchEvent(new CustomEvent("schedule-save", { detail: { schedule, oldSchedule: this.schedule } }));
  }

  private _handleTimeChange(e: Event): void {
    this._newSchedule.time = (e.target as HTMLInputElement).value;
  }

  private _handleToggleAllRooms(e: Event): void {
    const checked = (e.target as HTMLInputElement).checked;
    if (checked) {
      this._newSchedule.rooms = this.rooms.map(r => r.id);
    } else {
      this._newSchedule.rooms = [];
    }
    this.requestUpdate();
  }

  private _handleToggleRoom(roomId: number, e: Event): void {
    if (!this._newSchedule.rooms) {
      this._newSchedule.rooms = [];
    }
    const checked = (e.target as HTMLInputElement).checked;
    if (checked) {
      if (!this._newSchedule.rooms.includes(roomId)) {
        this._newSchedule.rooms.push(roomId);
      }
    } else {
      const index = this._newSchedule.rooms.indexOf(roomId);
      if (index > -1) {
        this._newSchedule.rooms.splice(index, 1);
      }
    }
    this.requestUpdate();
  }

  private _handleEnabledChange(e: Event): void {
    this._newSchedule.enabled = (e.target as HTMLInputElement).checked;
  }

  render() {
    if (!this.open) {
      return html``;
    }

    return html`
      <div class="dialog" @click=${(e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("dialog")) {
          this._handleClose();
        }
      }}>
        <div class="dialog-content">
          <div class="dialog-header">
            ${this.schedule ? this._t("edit_schedule") : this._t("add_schedule_title")}
          </div>

          ${this.error ? html`<div class="error">${this.error}</div>` : ""}

          <div class="form-group">
            <label class="form-label">${this._t("days_label")}</label>
            <div class="days-selector">
              ${this._getDayNames().map((dayName, index) => html`
                <button
                  class="day-button ${this._isDaySelected(index) ? "selected" : ""}"
                  @click=${() => this._toggleDay(index)}
                >
                  ${dayName}
                </button>
              `)}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">${this._t("time_label")}</label>
            <input
              type="time"
              class="time-input"
              .value=${this._newSchedule.time || "09:00"}
              @input=${this._handleTimeChange}
            />
          </div>

          <div class="form-group">
            <label class="form-label">${this._t("rooms_label")} (${this.rooms.length} ${this._t("rooms_available")})</label>
            <div class="rooms-selector">
              ${this.rooms.length > 0 ? html`
                <div class="select-all-rooms">
                  <label>
                    <input
                      type="checkbox"
                      class="room-checkbox"
                      .checked=${this._newSchedule.rooms?.length === this.rooms.length}
                      @change=${this._handleToggleAllRooms}
                    />
                    ${this._t("select_all")}
                  </label>
                </div>
                ${this.rooms.map((room) => html`
                  <div class="room-item">
                    <input
                      type="checkbox"
                      class="room-checkbox"
                      .checked=${this._newSchedule.rooms?.includes(room.id) || false}
                      @change=${(e: Event) => this._handleToggleRoom(room.id, e)}
                    />
                    <span>${room.name} (ID: ${room.id})</span>
                  </div>
                `)}
              ` : html`<div class="content">${this._t("rooms_not_found")}</div>`}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              <input
                type="checkbox"
                .checked=${this._newSchedule.enabled ?? true}
                @change=${this._handleEnabledChange}
              />
              ${this._t("enabled")}
            </label>
          </div>

          <div class="dialog-actions">
            <ha-button class="button-secondary" @click=${this._handleClose}>
              ${this._t("cancel")}
            </ha-button>
            <ha-button @click=${this._handleSave}>
              ${this._t("save")}
            </ha-button>
          </div>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .dialog {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: var(--ha-dialog-backdrop, var(--mdc-dialog-scrim-color)) !important;
        display: flex !important;
        align-items: center;
        justify-content: center;
        z-index: 99999 !important;
        pointer-events: auto;
      }
      .dialog-content {
        background: var(--card-background-color, var(--ha-card-background, var(--primary-background-color))) !important;
        border-radius: var(--ha-card-border-radius, 8px);
        padding: 24px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: var(--ha-card-box-shadow);
        position: relative;
        z-index: 100000;
      }
      .dialog-header {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 24px;
        color: var(--primary-text-color);
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
      .form-group {
        margin-bottom: 16px;
      }
      .form-label {
        display: block;
        margin-bottom: 8px;
        color: var(--primary-text-color);
        font-weight: 500;
        font-size: 14px;
        line-height: 1.5;
      }
      .days-selector {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-top: 4px;
      }
      .day-button {
        flex: 1;
        min-width: 56px;
        min-height: 56px;
        padding: 12px 8px;
        border: 2px solid var(--divider-color, var(--ha-card-border-color));
        border-radius: var(--ha-card-border-radius, 4px);
        background: var(--card-background-color, var(--ha-card-background));
        color: var(--primary-text-color);
        cursor: pointer;
        text-align: center;
        transition: all 0.2s;
        font-size: 14px;
        font-weight: 500;
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      @media (hover: hover) and (pointer: fine) {
        .day-button:hover {
          border-color: var(--primary-color, var(--mdc-theme-primary));
        }
      }
      .day-button:active {
        border-color: var(--primary-color, var(--mdc-theme-primary));
        opacity: 0.8;
      }
      .day-button.selected {
        background: var(--primary-color, var(--mdc-theme-primary));
        color: var(--text-primary-color, var(--mdc-theme-on-primary));
        border-color: var(--primary-color, var(--mdc-theme-primary));
      }
      .time-input {
        width: 100%;
        padding: 16px;
        min-height: 56px;
        border: 1px solid var(--divider-color, var(--ha-card-border-color));
        border-radius: var(--ha-card-border-radius, 4px);
        font-size: 18px;
        background: var(--card-background-color, var(--ha-card-background));
        color: var(--primary-text-color);
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      .rooms-selector {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 200px;
        overflow-y: auto;
        padding: 8px;
        border: 1px solid var(--divider-color, var(--ha-card-border-color));
        border-radius: var(--ha-card-border-radius, 4px);
        background: var(--card-background-color, var(--ha-card-background));
      }
      .room-item {
        display: flex;
        align-items: center;
        padding: 16px;
        min-height: 56px;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.2s;
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      @media (hover: hover) and (pointer: fine) {
        .room-item:hover {
          background: var(--divider-color, var(--ha-card-border-color));
          opacity: 0.8;
        }
      }
      .room-item:active {
        background: var(--divider-color, var(--ha-card-border-color));
        opacity: 0.6;
      }
      .room-checkbox {
        margin-right: 8px;
      }
      .select-all-rooms {
        margin-bottom: 12px;
        padding: 12px;
        border-bottom: 1px solid var(--divider-color, var(--ha-card-border-color));
        font-size: 14px;
      }
      .dialog-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        margin-top: 24px;
      }
      .dialog-actions ha-button {
        min-height: 56px;
        padding: 16px 24px;
        font-size: 16px;
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      .button-secondary {
        --mdc-theme-primary: var(--secondary-text-color);
      }
      .content {
        color: var(--primary-text-color);
        font-size: 14px;
        line-height: 1.5;
      }
      ha-button {
        --mdc-theme-primary: var(--primary-color, var(--mdc-theme-primary));
        --mdc-theme-on-primary: var(--text-primary-color, var(--mdc-theme-on-primary));
      }
    `;
  }
}

