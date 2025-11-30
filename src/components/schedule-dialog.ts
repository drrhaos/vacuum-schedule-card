import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule, Room, CleaningType } from "../types";
import { translate, getDayNames } from "../utils/i18n";

@customElement("vacuum-schedule-dialog")
export class ScheduleDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Boolean }) public open = false;
  @property({ attribute: false }) public schedule?: Schedule;
  @property({ attribute: false }) public rooms: Room[] = [];
  @property({ attribute: false }) public hiddenRooms: number[] = [];
  @property() public error?: string;

  @state() private _newSchedule: Partial<Schedule> = {
    enabled: true,
    days: [],
    time: "09:00",
    rooms: [],
    cleaning_type: "vacuum_and_mop",
  };

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has("schedule") || changedProperties.has("open")) {
      if (this.open && this.schedule) {
        // Фильтруем скрытые комнаты из существующего расписания
        const visibleRooms = this.rooms.filter(room => !this.hiddenRooms.includes(room.id));
        const validRooms = this.schedule.rooms.filter(roomId => 
          visibleRooms.some(room => room.id === roomId)
        );
        this._newSchedule = {
          enabled: this.schedule.enabled,
          days: [...this.schedule.days],
          time: this.schedule.time,
          rooms: validRooms,
          name: this.schedule.name,
          cleaning_type: this.schedule.cleaning_type || "vacuum_and_mop",
        };
      } else if (this.open && !this.schedule) {
        this._newSchedule = {
          enabled: true,
          days: [],
          time: "09:00",
          rooms: [],
          cleaning_type: "vacuum_and_mop",
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

  private _handleClose(): void {
    this.dispatchEvent(new CustomEvent("dialog-close"));
  }

  private _handleSave(): void {
    if (!this._newSchedule.time) {
      this.error = this._t("error_time_required") || "Время обязательно";
      return;
    }

    if (!this._newSchedule.days || this._newSchedule.days.length === 0) {
      this.error = this._t("error_days_required") || "Выберите хотя бы один день";
      return;
    }

    this.error = undefined;
    this.dispatchEvent(
      new CustomEvent("schedule-save", {
        detail: {
          schedule: {
            id: this.schedule?.id,
            enabled: this._newSchedule.enabled ?? true,
            days: this._newSchedule.days || [],
            time: this._newSchedule.time || "09:00",
            rooms: this._newSchedule.rooms || [],
            name: this._newSchedule.name,
            cleaning_type: this._newSchedule.cleaning_type || "vacuum_and_mop",
          },
        },
      })
    );
  }

  private _handleDayToggle(day: number): void {
    if (!this._newSchedule.days) {
      this._newSchedule.days = [];
    }
    const index = this._newSchedule.days.indexOf(day);
    if (index === -1) {
      this._newSchedule.days.push(day);
    } else {
      this._newSchedule.days.splice(index, 1);
    }
    this.requestUpdate();
  }

  private _handleTimeChange(e: Event): void {
    this._newSchedule.time = (e.target as HTMLInputElement).value;
  }

  private _handleToggleAllRooms(e: Event): void {
    const checked = (e.target as HTMLInputElement).checked;
    const visibleRooms = this.rooms.filter(room => !this.hiddenRooms.includes(room.id));
    if (checked) {
      this._newSchedule.rooms = visibleRooms.map(r => r.id);
    } else {
      this._newSchedule.rooms = [];
    }
    this.requestUpdate();
  }

  private _handleToggleRoom(roomId: number, e: Event): void {
    if (!this._newSchedule.rooms) {
      this._newSchedule.rooms = [];
    }
    const checkbox = e.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this._newSchedule.rooms.includes(roomId)) {
        this._newSchedule.rooms.push(roomId);
      }
    } else {
      const index = this._newSchedule.rooms.indexOf(roomId);
      if (index !== -1) {
        this._newSchedule.rooms.splice(index, 1);
      }
    }
    this.requestUpdate();
  }

  private _handleEnabledChange(e: Event): void {
    this._newSchedule.enabled = (e.target as HTMLInputElement).checked;
  }

  private _handleNameChange(e: Event): void {
    this._newSchedule.name = (e.target as HTMLInputElement).value || undefined;
  }

  private _handleCleaningTypeChange(e: Event): void {
    this._newSchedule.cleaning_type = (e.target as HTMLSelectElement).value as CleaningType;
    this.requestUpdate();
  }

  render() {
    if (!this.open) {
      return html``;
    }

    const dayNames = this._getDayNames();
    const visibleRooms = this.rooms.filter(room => !this.hiddenRooms.includes(room.id));

    return html`
      <div class="dialog" @click=${this._handleClose}>
        <div class="dialog-content" @click=${(e: Event) => e.stopPropagation()}>
          <div class="dialog-header">
            ${this.schedule ? this._t("edit_schedule") : this._t("add_schedule")}
          </div>

          ${this.error ? html`<div class="error">${this.error}</div>` : ""}

          <div class="form-group">
            <label class="form-label">${this._t("name_label")}</label>
            <input
              type="text"
              class="form-input"
              .value=${this._newSchedule.name || ""}
              @input=${this._handleNameChange}
              placeholder=${this._t("name_placeholder") || "Название расписания (необязательно)"}
            />
          </div>

          <div class="form-group">
            <label class="form-label">${this._t("days_label")}</label>
            <div class="days-selector">
              ${dayNames.map((name, index) => {
                const day = index === 0 ? 0 : index;
                return html`
                  <button
                    class="day-button ${this._newSchedule.days?.includes(day) ? "selected" : ""}"
                    @click=${() => this._handleDayToggle(day)}
                  >
                    ${name}
                  </button>
                `;
              })}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">${this._t("time_label")}</label>
            <input
              type="time"
              class="form-input"
              .value=${this._newSchedule.time || "09:00"}
              @input=${this._handleTimeChange}
            />
          </div>

          <div class="form-group">
            <label class="form-label">${this._t("cleaning_type_label")}</label>
            <select
              class="form-input"
              .value=${this._newSchedule.cleaning_type || "vacuum_and_mop"}
              @change=${this._handleCleaningTypeChange}
            >
              <option value="vacuum">${this._t("cleaning_type_vacuum")}</option>
              <option value="mop">${this._t("cleaning_type_mop")}</option>
              <option value="vacuum_and_mop">${this._t("cleaning_type_vacuum_and_mop")}</option>
            </select>
          </div>

          <div class="form-group">
            ${(() => {
              return html`
                <label class="form-label">${this._t("rooms_label")} (${visibleRooms.length} ${this._t("rooms_available")})</label>
                <div class="rooms-selector">
                  ${visibleRooms.length > 0 ? html`
                    <div class="select-all-rooms">
                      <label>
                        <input
                          type="checkbox"
                          class="room-checkbox"
                          .checked=${this._newSchedule.rooms?.length === visibleRooms.length && visibleRooms.length > 0}
                          @change=${this._handleToggleAllRooms}
                        />
                        ${this._t("select_all")}
                      </label>
                    </div>
                    ${visibleRooms.map((room) => html`
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
              `;
            })()}
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
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .day-button:hover {
          background: var(--primary-color);
          color: var(--text-primary-color, var(--primary-text-color));
          border-color: var(--primary-color);
        }
      }
      .day-button:active {
        transform: scale(0.95);
      }
      .day-button.selected {
        background: var(--primary-color);
        color: var(--text-primary-color, var(--primary-text-color));
        border-color: var(--primary-color);
      }
      .form-input {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid var(--divider-color, var(--ha-card-border-color));
        border-radius: var(--ha-card-border-radius, 4px);
        background: var(--card-background-color, var(--ha-card-background));
        color: var(--primary-text-color);
        font-size: 16px;
        font-family: inherit;
        box-sizing: border-box;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      .form-input:focus {
        outline: none;
        border-color: var(--primary-color);
      }
      .rooms-selector {
        max-height: 300px;
        overflow-y: auto;
        border: 2px solid var(--divider-color, var(--ha-card-border-color));
        border-radius: var(--ha-card-border-radius, 4px);
        padding: 12px;
        background: var(--card-background-color, var(--ha-card-background));
        margin-top: 4px;
      }
      .room-item {
        padding: 12px;
        margin-bottom: 8px;
        border-radius: var(--ha-card-border-radius, 4px);
        background: var(--card-background-color, var(--ha-card-background));
        cursor: pointer;
        transition: all 0.2s;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .room-item:hover {
          background: var(--primary-color);
          color: var(--text-primary-color, var(--primary-text-color));
        }
      }
      .room-item:active {
        transform: scale(0.98);
      }
      .room-checkbox {
        margin-right: 12px;
        width: 20px;
        height: 20px;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      .select-all-rooms {
        padding-bottom: 12px;
        margin-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, var(--ha-card-border-color));
        font-weight: 500;
      }
      .select-all-rooms label {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      .room-item label {
        display: flex;
        align-items: center;
        cursor: pointer;
        width: 100%;
      }
      .room-item span {
        flex: 1;
        color: var(--primary-text-color);
        font-size: 14px;
      }
      .dialog-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        margin-top: 24px;
      }
      .button-secondary {
        --mdc-theme-primary: var(--secondary-text-color);
      }
      .content {
        text-align: center;
        padding: 24px;
        color: var(--secondary-text-color);
      }
    `;
  }
}
