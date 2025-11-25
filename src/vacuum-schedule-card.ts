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
  private _config?: VacuumScheduleCardConfig;
  private _schedulesEntityId?: string;

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
          
          ${this._error ? html`<div class="error">${this._error}</div>` : ""}
          
          ${this._loading
            ? html`<div class="loading">Загрузка...</div>`
            : html`
                <div class="schedules-list">
                  ${this._schedules.length === 0
                    ? html`<div class="content">Нет расписаний. Добавьте первое расписание.</div>`
                    : this._schedules.map(
                        (schedule) => html`
                          <div class="schedule-item">
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
    `;
  }

  private _addSchedule(): void {
    // TODO: Открыть диалог добавления расписания
    console.log("Добавить расписание");
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
