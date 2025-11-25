import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";

interface VacuumScheduleCardConfig {
  entity: string;
  type: string;
}

interface Schedule {
  id: string;
  enabled: boolean;
  days: number[]; // 0 = воскресенье, 1 = понедельник, ..., 6 = суббота
  time: string; // HH:MM формат
  rooms: number[]; // ID комнат
  name?: string; // Опциональное имя расписания
}

@customElement("vacuum-schedule-card")
class VacuumScheduleCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property() public entity!: string;
  @state() private _schedules: Schedule[] = [];
  @state() private _loading = false;
  @state() private _error?: string;
  @state() private _showAddDialog = false;
  @state() private _editingSchedule?: Schedule;
  private _config?: VacuumScheduleCardConfig;
  private _schedulesEntityId?: string;
  
  // Форма нового расписания
  @state() private _newSchedule: Partial<Schedule> = {
    enabled: true,
    days: [],
    time: "09:00",
    rooms: [],
  };

  public setConfig(config: VacuumScheduleCardConfig): void {
    if (!config.entity) {
      throw new Error("Entity must be specified");
    }
    this._config = config;
    this.entity = config.entity;
    // Формируем entity_id для input_text helper
    const entityName = config.entity.replace("vacuum.", "");
    this._schedulesEntityId = `input_text.vacuum_schedules_${entityName}`;
    this._loadSchedules();
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.hass && this._schedulesEntityId) {
      this._loadSchedules();
    }
  }

  private async _loadSchedules(): Promise<void> {
    if (!this.hass || !this._schedulesEntityId) return;

    this._loading = true;
    this._error = undefined;

    try {
      const state = this.hass.states[this._schedulesEntityId];
      if (state && state.state) {
        try {
          this._schedules = JSON.parse(state.state) || [];
        } catch (e) {
          console.error("Ошибка парсинга расписаний:", e);
          this._schedules = [];
        }
      } else {
        this._schedules = [];
      }
    } catch (error) {
      this._error = `Ошибка загрузки расписаний: ${error}`;
      console.error(this._error);
    } finally {
      this._loading = false;
    }
  }

  public getCardSize(): number {
    return 3;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .card {
        padding: 16px;
        background: var(--card-background-color, #fff);
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .header {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 16px;
        color: var(--primary-text-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .content {
        color: var(--primary-text-color);
      }
      .error {
        color: var(--error-color, #f44336);
        padding: 8px;
        background: var(--error-background-color, rgba(244, 67, 54, 0.1));
        border-radius: 4px;
        margin-bottom: 16px;
      }
      .loading {
        text-align: center;
        padding: 16px;
        color: var(--secondary-text-color);
      }
      .schedules-list {
        margin-top: 16px;
      }
      .schedule-item {
        padding: 12px;
        margin-bottom: 8px;
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: background 0.2s;
      }
      .schedule-item:hover {
        background: var(--divider-color, rgba(0,0,0,0.05));
      }
      .schedule-actions {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .action-button {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 4px 8px;
        color: var(--secondary-text-color);
        font-size: 18px;
      }
      .action-button:hover {
        color: var(--primary-color);
      }
      .toggle-switch {
        margin-right: 8px;
      }
      .schedule-info {
        flex: 1;
      }
      .schedule-time {
        font-weight: bold;
        font-size: 16px;
      }
      .schedule-days {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
      .add-button {
        margin-top: 16px;
        width: 100%;
      }
      ha-button {
        --mdc-theme-primary: var(--primary-color);
      }
      .dialog {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .dialog-content {
        background: var(--card-background-color, #fff);
        border-radius: 8px;
        padding: 24px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
      }
      .dialog-header {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        color: var(--primary-text-color);
      }
      .form-group {
        margin-bottom: 16px;
      }
      .form-label {
        display: block;
        margin-bottom: 8px;
        color: var(--primary-text-color);
        font-weight: 500;
      }
      .days-selector {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .day-button {
        flex: 1;
        min-width: 50px;
        padding: 8px;
        border: 2px solid var(--divider-color, rgba(0,0,0,0.12));
        border-radius: 4px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        cursor: pointer;
        text-align: center;
        transition: all 0.2s;
      }
      .day-button:hover {
        border-color: var(--primary-color);
      }
      .day-button.selected {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: var(--primary-color);
      }
      .time-input {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        border-radius: 4px;
        font-size: 16px;
      }
      .dialog-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        margin-top: 24px;
      }
      .button-secondary {
        --mdc-theme-primary: var(--secondary-text-color);
      }
    `;
  }

  private _getDayNames(): string[] {
    return ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  }

  private _formatDays(days: number[]): string {
    const dayNames = this._getDayNames();
    if (days.length === 0) return "Нет дней";
    if (days.length === 7) return "Каждый день";
    return days.map(d => dayNames[d]).join(", ");
  }

  render() {
    if (!this.hass || !this.entity) {
      return html`<div class="card">
        <div class="content">Ошибка: не указаны hass или entity</div>
      </div>`;
    }

    const state = this.hass.states[this.entity];
    if (!state) {
      return html`<div class="card">
        <div class="content">Ошибка: сущность ${this.entity} не найдена</div>
      </div>`;
    }

    return html`
      <ha-card>
        <div class="card">
          <div class="header">
            <span>Расписание уборки</span>
            <span>${this._schedules.length} расписаний</span>
          </div>
          
          ${this._error && !this._showAddDialog ? html`<div class="error">${this._error}</div>` : ""}
          
          ${this._loading
            ? html`<div class="loading">Загрузка...</div>`
            : html`
                <div class="schedules-list">
                  ${this._schedules.length === 0
                    ? html`<div class="content">Нет расписаний. Добавьте первое расписание.</div>`
                    : this._schedules.map(
                        (schedule) => html`
                          <div class="schedule-item" @click=${() => this._editSchedule(schedule)}>
                            <div class="schedule-info">
                              <div class="schedule-time">
                                ${schedule.enabled ? "✅" : "⏸️"} ${schedule.time}
                              </div>
                              <div class="schedule-days">
                                ${this._formatDays(schedule.days)}
                                ${schedule.rooms.length > 0
                                  ? ` • ${schedule.rooms.length} комнат`
                                  : ""}
                              </div>
                            </div>
                            <div class="schedule-actions" @click=${(e: MouseEvent) => e.stopPropagation()}>
                              <ha-switch
                                class="toggle-switch"
                                .checked=${schedule.enabled}
                                @change=${(e: Event) => this._toggleSchedule(schedule, (e.target as HTMLInputElement).checked)}
                              ></ha-switch>
                              <button
                                class="action-button"
                                @click=${() => this._deleteSchedule(schedule)}
                                title="Удалить"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        `
                      )}
                </div>
                
                <ha-button class="add-button" @click=${this._addSchedule}>
                  + Добавить расписание
                </ha-button>
              `}
        </div>
      </ha-card>

      ${this._showAddDialog ? html`
        <div class="dialog" @click=${(e: MouseEvent) => {
          if (e.target === e.currentTarget) {
            this._closeDialog();
          }
        }}>
          <div class="dialog-content">
            <div class="dialog-header">
              ${this._editingSchedule ? "Редактировать расписание" : "Добавить расписание"}
            </div>

            ${this._error ? html`<div class="error">${this._error}</div>` : ""}

            <div class="form-group">
              <label class="form-label">Дни недели</label>
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
              <label class="form-label">Время</label>
              <input
                type="time"
                class="time-input"
                .value=${this._newSchedule.time || "09:00"}
                @input=${(e: Event) => {
                  this._newSchedule.time = (e.target as HTMLInputElement).value;
                }}
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                <input
                  type="checkbox"
                  .checked=${this._newSchedule.enabled ?? true}
                  @change=${(e: Event) => {
                    this._newSchedule.enabled = (e.target as HTMLInputElement).checked;
                  }}
                />
                Включено
              </label>
            </div>

            <div class="dialog-actions">
              <ha-button class="button-secondary" @click=${this._closeDialog}>
                Отмена
              </ha-button>
              <ha-button @click=${this._saveSchedule}>
                Сохранить
              </ha-button>
            </div>
          </div>
        </div>
      ` : ""}
    `;
  }

  private _addSchedule(): void {
    this._newSchedule = {
      enabled: true,
      days: [],
      time: "09:00",
      rooms: [],
    };
    this._editingSchedule = undefined;
    this._showAddDialog = true;
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

  private _closeDialog(): void {
    this._showAddDialog = false;
    this._editingSchedule = undefined;
    this._newSchedule = {
      enabled: true,
      days: [],
      time: "09:00",
      rooms: [],
    };
  }

  private _editSchedule(schedule: Schedule): void {
    this._editingSchedule = schedule;
    this._newSchedule = {
      enabled: schedule.enabled,
      days: [...schedule.days],
      time: schedule.time,
      rooms: [...schedule.rooms],
      name: schedule.name,
    };
    this._showAddDialog = true;
    this._error = undefined;
  }

  private async _toggleSchedule(schedule: Schedule, enabled: boolean): Promise<void> {
    if (!this.hass || !this._schedulesEntityId) return;

    const schedules = this._schedules.map(s =>
      s.id === schedule.id ? { ...s, enabled } : s
    );

    try {
      await this.hass.callService("input_text", "set_value", {
        entity_id: this._schedulesEntityId,
        value: JSON.stringify(schedules),
      });
      
      this._schedules = schedules;
    } catch (error) {
      this._error = `Ошибка обновления: ${error}`;
      console.error("Ошибка обновления расписания:", error);
    }
  }

  private async _deleteSchedule(schedule: Schedule): Promise<void> {
    if (!this.hass || !this._schedulesEntityId) return;

    if (!confirm("Удалить это расписание?")) {
      return;
    }

    const schedules = this._schedules.filter(s => s.id !== schedule.id);

    try {
      await this.hass.callService("input_text", "set_value", {
        entity_id: this._schedulesEntityId,
        value: JSON.stringify(schedules),
      });
      
      this._schedules = schedules;
    } catch (error) {
      this._error = `Ошибка удаления: ${error}`;
      console.error("Ошибка удаления расписания:", error);
    }
  }

  private async _saveSchedule(): Promise<void> {
    if (!this._newSchedule.days || this._newSchedule.days.length === 0) {
      this._error = "Выберите хотя бы один день";
      return;
    }

    if (!this._newSchedule.time) {
      this._error = "Укажите время";
      return;
    }

    if (!this.hass || !this._schedulesEntityId) {
      this._error = "Ошибка: hass не доступен";
      return;
    }

    const schedule: Schedule = {
      id: this._editingSchedule?.id || `schedule_${Date.now()}`,
      enabled: this._newSchedule.enabled ?? true,
      days: this._newSchedule.days,
      time: this._newSchedule.time,
      rooms: this._newSchedule.rooms || [],
      name: this._newSchedule.name,
    };

    let schedules = [...this._schedules];
    if (this._editingSchedule) {
      const index = schedules.findIndex(s => s.id === this._editingSchedule!.id);
      if (index > -1) {
        schedules[index] = schedule;
      }
    } else {
      schedules.push(schedule);
    }

    try {
      await this.hass.callService("input_text", "set_value", {
        entity_id: this._schedulesEntityId,
        value: JSON.stringify(schedules),
      });
      
      this._schedules = schedules;
      this._closeDialog();
      this._error = undefined;
    } catch (error) {
      this._error = `Ошибка сохранения: ${error}`;
      console.error("Ошибка сохранения расписания:", error);
    }
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

// Явная регистрация элемента - выполняется сразу при загрузке модуля
// В ES модулях customElements и window всегда доступны
if (!customElements.get("vacuum-schedule-card")) {
  customElements.define("vacuum-schedule-card", VacuumScheduleCard);
}

// Регистрация карточки для HACS (как в vacuum-card и body-miscale-card)
window.customCards = window.customCards || [];
window.customCards.push({
  preview: true,
  type: "vacuum-schedule-card",
  name: "Vacuum Schedule Card",
  description: "Карточка для создания расписания уборки пылесоса",
});

// Экспорт для совместимости
export { VacuumScheduleCard };
