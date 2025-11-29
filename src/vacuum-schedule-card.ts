import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { VacuumScheduleCardConfig, Schedule, Room } from "./types";
import {
  getScheduleAutomations,
  parseScheduleFromAutomation,
  createOrUpdateAutomation,
  deleteAutomation,
  createAutomationFromSchedule,
} from "./utils/automations";
import { loadRooms } from "./utils/rooms";
import { formatDays, formatRooms } from "./utils/formatters";
import { translate, getDayNames } from "./utils/i18n";

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
  private _config?: VacuumScheduleCardConfig;
  
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
    this._loadSchedules();
    this._loadRooms();
  }

  private _unsubscribeAutomations?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    if (this.hass) {
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

    // Сначала отписываемся от предыдущей подписки, если она есть
    if (this._unsubscribeAutomations) {
      try {
        this._unsubscribeAutomations();
      } catch (e) {
        // Игнорируем ошибки при отписке
      }
      this._unsubscribeAutomations = undefined;
    }

    // Подписываемся на изменения состояний автоматизаций через WebSocket
    // Согласно документации: https://developers.home-assistant.io/docs/api/websocket
    try {
      // Используем hass.callWS для подписки на события через WebSocket API
      if (this.hass.connection && typeof (this.hass.connection as any).subscribeEvents === "function") {
        try {
          const unsubscribe = (this.hass.connection as any).subscribeEvents(
            (event: any) => {
              const entityId = event.event?.data?.entity_id;
              if (entityId && entityId.startsWith("automation.vacuum_schedule_")) {
                // Автоматизация изменилась, перезагружаем расписания
                this._loadSchedules();
              }
            },
            "state_changed"
          );
          
          // Проверяем, что unsubscribe является функцией
          if (typeof unsubscribe === "function") {
            this._unsubscribeAutomations = unsubscribe;
          } else {
            // Если unsubscribe не функция, создаем обертку
            this._unsubscribeAutomations = () => {
              // Пытаемся отписаться через WebSocket команду
              if (this.hass.connection) {
                try {
                  // Отписка происходит автоматически при переподключении
                } catch (e) {
                  // Игнорируем ошибки
                }
              }
            };
          }
        } catch (error: any) {
          // Если subscribeEvents не работает, просто не подписываемся
          console.warn("Не удалось подписаться на события:", error);
        }
      }
    } catch (error) {
      console.warn("Не удалось подписаться на изменения автоматизаций:", error);
    }
  }

  private async _loadRooms(): Promise<void> {
    if (!this.hass || !this.entity) return;

    this._rooms = await loadRooms(this.hass, this.entity, (key) => this._t(key));
    this.requestUpdate();
  }

  private async _loadSchedules(): Promise<void> {
    if (!this.hass) return;

    this._loading = true;
    this._error = undefined;

    try {
      const automationsMap = new Map<string, Schedule>();
      const scheduleAutomations = await getScheduleAutomations(this.hass);

      for (const automationConfig of scheduleAutomations) {
        try {
          const configId = automationConfig.id || "";
          
          if (!configId) {
            continue;
          }
          
          if (!configId.startsWith("vacuum_schedule_") || !configId.includes("_day_")) {
            continue;
          }

          let automationState = null;
          const directEntityId = `automation.${configId}`;
          if (this.hass.states[directEntityId]) {
            automationState = this.hass.states[directEntityId];
          } else {
            for (const entityId in this.hass.states) {
              if (!entityId.startsWith("automation.")) continue;
              
              const state = this.hass.states[entityId];
              if (state.attributes?.id === configId) {
                automationState = state;
                break;
              }
            }
          }

          const parsed = parseScheduleFromAutomation(automationConfig, automationState);
          if (!parsed) {
            continue;
          }

          let schedule = automationsMap.get(parsed.scheduleId);
          if (!schedule) {
            schedule = {
              id: parsed.scheduleId,
              enabled: parsed.enabled,
              days: [],
              time: parsed.time,
              rooms: parsed.rooms,
            };
            automationsMap.set(parsed.scheduleId, schedule);
          }

          if (!schedule.days.includes(parsed.day)) {
            schedule.days.push(parsed.day);
          }
          if (parsed.rooms.length > 0) {
            schedule.rooms = parsed.rooms;
          }
          if (automationState) {
            schedule.enabled = automationState.state === "on";
          } else if (parsed.enabled) {
            schedule.enabled = true;
          }
        } catch (e: any) {
          const errorId = automationConfig?.id || automationConfig?._entity_id || "неизвестно";
          console.error(`[Vacuum Schedule Card] Ошибка обработки автоматизации ${errorId}:`, e);
        }
      }

      // Сортируем дни в каждом расписании
      for (const schedule of automationsMap.values()) {
        schedule.days.sort((a, b) => a - b);
      }

      this._schedules = Array.from(automationsMap.values());
    } catch (error) {
      this._error = `${this._t("error_loading")} ${error}`;
      console.error(this._error);
    } finally {
      this._loading = false;
      this.requestUpdate();
    }
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
      ],
      computeLabel: (schema: any) => {
        if (schema.name === "entity") {
          return "Vacuum Entity";
        }
        return undefined;
      },
      computeHelper: (schema: any) => {
        if (schema.name === "entity") {
          return "Select the vacuum entity to manage schedules for";
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
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: rgba(0, 0, 0, 0.5) !important;
        display: flex !important;
        align-items: center;
        justify-content: center;
        z-index: 99999 !important;
        pointer-events: auto;
      }
      .dialog-content {
        background: var(--card-background-color, #fff) !important;
        border-radius: 8px;
        padding: 24px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        position: relative;
        z-index: 100000;
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
      .rooms-selector {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 200px;
        overflow-y: auto;
        padding: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        border-radius: 4px;
      }
      .room-item {
        display: flex;
        align-items: center;
        padding: 8px;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.2s;
      }
      .room-item:hover {
        background: var(--divider-color, rgba(0,0,0,0.05));
      }
      .room-checkbox {
        margin-right: 8px;
      }
      .select-all-rooms {
        margin-bottom: 8px;
        padding: 8px;
        border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.12));
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

  private _t(key: string): string {
    return translate(key, this.hass);
  }

  private _getDayNames(): string[] {
    return getDayNames(this.hass);
  }

  private _formatDays(days: number[]): string {
    const dayNames = this._getDayNames();
    return formatDays(days, dayNames, {
      noDays: this._t("no_days"),
      everyDay: this._t("every_day"),
    });
  }

  private _formatRooms(roomIds: number[]): string {
    return formatRooms(roomIds, this._rooms, this._t("all_rooms"));
  }

  render() {
    if (!this.hass || !this.entity) {
      return html`<div class="card">
        <div class="content">${this._t("error_no_entity")}</div>
      </div>`;
    }

    const state = this.hass.states[this.entity];
    if (!state) {
      return html`<div class="card">
        <div class="content">${this._t("error_entity_not_found")} ${this.entity} ${this._t("not_found")}</div>
      </div>`;
    }

    return html`
      <ha-card>
        <div class="card">
          <div class="header">
            <span>${this._t("schedule_title")}</span>
            <span>${this._schedules.length} ${this._t("schedules_count")}</span>
          </div>
          
          ${this._error && !this._showAddDialog ? html`<div class="error">${this._error}</div>` : ""}
          
          ${this._loading
            ? html`<div class="loading">${this._t("loading")}</div>`
            : html`
                <div class="schedules-list">
                  ${this._schedules.length === 0
                    ? html`<div class="content">${this._t("no_schedules")}</div>`
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
                                  ? ` • ${this._formatRooms(schedule.rooms)}`
                                  : ` • ${this._t("all_rooms")}`}
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
                  ${this._t("add_schedule")}
                </ha-button>
              `}
        </div>
      </ha-card>
      ${this._showAddDialog ? html`
        <div class="dialog" @click=${(e: MouseEvent) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains("dialog")) {
            this._closeDialog();
          }
        }}>
          <div class="dialog-content">
            <div class="dialog-header">
              ${this._editingSchedule ? this._t("edit_schedule") : this._t("add_schedule_title")}
            </div>

            ${this._error ? html`<div class="error">${this._error}</div>` : ""}

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
                @input=${(e: Event) => {
                  this._newSchedule.time = (e.target as HTMLInputElement).value;
                }}
              />
            </div>

            <div class="form-group">
              <label class="form-label">${this._t("rooms_label")} (${this._rooms.length} ${this._t("rooms_available")})</label>
              <div class="rooms-selector">
                ${this._rooms.length > 0 ? html`
                  <div class="select-all-rooms">
                    <label>
                      <input
                        type="checkbox"
                        class="room-checkbox"
                        .checked=${this._newSchedule.rooms?.length === this._rooms.length}
                        @change=${(e: Event) => {
                          if ((e.target as HTMLInputElement).checked) {
                            this._newSchedule.rooms = this._rooms.map(r => r.id);
                          } else {
                            this._newSchedule.rooms = [];
                          }
                          this.requestUpdate();
                        }}
                      />
                      ${this._t("select_all")}
                    </label>
                  </div>
                  ${this._rooms.map((room) => html`
                    <div class="room-item">
                      <input
                        type="checkbox"
                        class="room-checkbox"
                        .checked=${this._newSchedule.rooms?.includes(room.id) || false}
                        @change=${(e: Event) => {
                          if (!this._newSchedule.rooms) {
                            this._newSchedule.rooms = [];
                          }
                          const checked = (e.target as HTMLInputElement).checked;
                          if (checked) {
                            if (!this._newSchedule.rooms.includes(room.id)) {
                              this._newSchedule.rooms.push(room.id);
                            }
                          } else {
                            const index = this._newSchedule.rooms.indexOf(room.id);
                            if (index > -1) {
                              this._newSchedule.rooms.splice(index, 1);
                            }
                          }
                          this.requestUpdate();
                        }}
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
                  @change=${(e: Event) => {
                    this._newSchedule.enabled = (e.target as HTMLInputElement).checked;
                  }}
                />
                ${this._t("enabled")}
              </label>
            </div>

            <div class="dialog-actions">
              <ha-button class="button-secondary" @click=${this._closeDialog}>
                ${this._t("cancel")}
              </ha-button>
              <ha-button @click=${this._saveSchedule}>
                ${this._t("save")}
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
    this._error = undefined;
    this._showAddDialog = true;
    this.requestUpdate();
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
    this._error = undefined;
    this._newSchedule = {
      enabled: true,
      days: [],
      time: "09:00",
      rooms: [],
    };
    this.requestUpdate();
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
    if (!this.hass) return;

    const updatedSchedule = { ...schedule, enabled };
    this._schedules = this._schedules.map(s =>
      s.id === schedule.id ? updatedSchedule : s
    );
    this.requestUpdate();
    
    // Обновляем автоматизации
    await this._updateAutomationsForSchedule(updatedSchedule, schedule);
  }

  private async _deleteSchedule(schedule: Schedule): Promise<void> {
    if (!this.hass) return;

    if (!confirm(this._t("delete_confirm"))) {
      return;
    }

    // Удаляем автоматизации для этого расписания
    for (const day of schedule.days) {
      await this._deleteAutomation(schedule.id, day);
    }

    this._schedules = this._schedules.filter(s => s.id !== schedule.id);
    this.requestUpdate();
  }

  private async _createAutomation(schedule: Schedule, day: number): Promise<void> {
    if (!this.hass) {
      console.warn("[Vacuum Schedule Card] Не удалось создать автоматизацию: hass недоступен");
      return;
    }

    const automation = createAutomationFromSchedule(
      schedule,
      day,
      this.entity,
      this._getDayNames(),
      this._t("schedule_title")
    );

    console.log(`[Vacuum Schedule Card] Создание/обновление автоматизации:`, {
      id: automation.id,
      alias: automation.alias,
      day: day,
      time: schedule.time,
      rooms: schedule.rooms,
    });

    const success = await createOrUpdateAutomation(this.hass, automation);
    if (success) {
      console.log(`[Vacuum Schedule Card] Автоматизация ${automation.id} успешно создана/обновлена`);
    } else {
      console.error(`[Vacuum Schedule Card] Не удалось создать/обновить автоматизацию ${automation.id}`);
    }
  }

  private async _deleteAutomation(scheduleId: string, day: number): Promise<void> {
    if (!this.hass) {
      console.warn("[Vacuum Schedule Card] Не удалось удалить автоматизацию: hass недоступен");
      return;
    }

    const automationId = `vacuum_schedule_${scheduleId}_day_${day}`;
    console.log(`[Vacuum Schedule Card] Удаление автоматизации: ${automationId}`);
    
    const success = await deleteAutomation(this.hass, automationId);
    if (success) {
      console.log(`[Vacuum Schedule Card] Автоматизация ${automationId} успешно удалена`);
    } else {
      console.error(`[Vacuum Schedule Card] Не удалось удалить автоматизацию ${automationId}`);
    }
  }

  private async _updateAutomationsInBackground(schedule: Schedule, oldSchedule?: Schedule): Promise<void> {
    try {
      // Создаем/обновляем автоматизации
      console.log("[Vacuum Schedule Card] Начало обновления автоматизаций для расписания");
      await this._updateAutomationsForSchedule(schedule, oldSchedule);
      console.log("[Vacuum Schedule Card] Автоматизации успешно обновлены");
      
      // Перезагружаем автоматизации для обновления кеша
      try {
        console.log("[Vacuum Schedule Card] Перезагрузка автоматизаций...");
        await this.hass.callService("automation", "reload");
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("[Vacuum Schedule Card] Автоматизации перезагружены");
      } catch (reloadError) {
        console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:", reloadError);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Перезагружаем расписания из автоматизаций для синхронизации
      console.log("[Vacuum Schedule Card] Перезагрузка расписаний для синхронизации...");
      await this._loadSchedules();
      console.log("[Vacuum Schedule Card] Расписания перезагружены");
      console.log("[Vacuum Schedule Card] Расписание успешно сохранено");
    } catch (error) {
      console.error("[Vacuum Schedule Card] Ошибка обновления автоматизаций:", error);
      throw error;
    }
  }

  private async _updateAutomationsForSchedule(schedule: Schedule, oldSchedule?: Schedule): Promise<void> {
    console.log("[Vacuum Schedule Card] Обновление автоматизаций для расписания:", {
      scheduleId: schedule.id,
      enabled: schedule.enabled,
      days: schedule.days,
      oldDays: oldSchedule?.days,
    });

    if (!schedule.enabled) {
      console.log("[Vacuum Schedule Card] Расписание отключено, удаляем все автоматизации");
      const daysToDelete = oldSchedule ? oldSchedule.days : schedule.days;
      console.log(`[Vacuum Schedule Card] Дней для удаления: ${daysToDelete.length}`);
      for (const day of daysToDelete) {
        await this._deleteAutomation(schedule.id, day);
      }
      return;
    }

    // Удаляем старые автоматизации, если расписание редактировалось
    if (oldSchedule) {
      const daysToRemove = oldSchedule.days.filter(d => !schedule.days.includes(d));
      if (daysToRemove.length > 0) {
        console.log(`[Vacuum Schedule Card] Удаление автоматизаций для дней, которые больше не в расписании: ${daysToRemove.join(", ")}`);
        for (const day of daysToRemove) {
          await this._deleteAutomation(schedule.id, day);
        }
      }
    }

    // Создаем/обновляем автоматизации для каждого дня
    console.log(`[Vacuum Schedule Card] Создание/обновление автоматизаций для ${schedule.days.length} дней`);
    for (const day of schedule.days) {
      await this._createAutomation(schedule, day);
    }
    console.log("[Vacuum Schedule Card] Все автоматизации для расписания обновлены");
  }

  private async _saveSchedule(): Promise<void> {
    console.log("[Vacuum Schedule Card] Начало сохранения расписания");
    
    if (!this._newSchedule.days || this._newSchedule.days.length === 0) {
      console.warn("[Vacuum Schedule Card] Ошибка: не выбраны дни");
      this._error = this._t("error_no_days");
      return;
    }

    if (!this._newSchedule.time) {
      console.warn("[Vacuum Schedule Card] Ошибка: не указано время");
      this._error = this._t("error_no_time");
      return;
    }

    if (!this.hass) {
      console.warn("[Vacuum Schedule Card] Ошибка: hass недоступен");
      this._error = this._t("error_no_hass");
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

    const isEdit = !!this._editingSchedule;
    console.log(`[Vacuum Schedule Card] ${isEdit ? "Обновление" : "Создание"} расписания:`, {
      id: schedule.id,
      time: schedule.time,
      days: schedule.days,
      rooms: schedule.rooms,
      enabled: schedule.enabled,
    });

    let schedules = [...this._schedules];
    const oldSchedule = this._editingSchedule;
    
    if (this._editingSchedule) {
      const index = schedules.findIndex(s => s.id === this._editingSchedule!.id);
      if (index > -1) {
        schedules[index] = schedule;
        console.log(`[Vacuum Schedule Card] Расписание обновлено в списке (индекс ${index})`);
      }
    } else {
      schedules.push(schedule);
      console.log(`[Vacuum Schedule Card] Расписание добавлено в список (всего: ${schedules.length})`);
    }

    // Обновляем локальное состояние и закрываем диалог сразу
    this._schedules = schedules;
    this._closeDialog();
    this._error = undefined;
    this.requestUpdate();
    
    console.log("[Vacuum Schedule Card] Расписание добавлено в список, создание автоматизаций в фоне...");
    
    // Создаем/обновляем автоматизации в фоне (не блокируем UI)
    this._updateAutomationsInBackground(schedule, oldSchedule).catch((error) => {
      console.error("[Vacuum Schedule Card] Ошибка создания автоматизаций:", error);
      this._error = `${this._t("error_saving")} ${error}`;
      this.requestUpdate();
    });
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

