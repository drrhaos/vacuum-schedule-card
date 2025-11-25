import {
  LitElement,
  html,
  css,
  PropertyValues,
  TemplateResult,
  CSSResultGroup,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";

interface Schedule {
  id: string;
  dayOfWeek: number[]; // 0 = Monday, 6 = Sunday
  time: string; // HH:MM format
  rooms: number[]; // Room IDs
  enabled: boolean;
}

interface Room {
  id: number;
  name: string;
}

interface Translations {
  cardTitle: string;
  add: string;
  editSchedule: string;
  newSchedule: string;
  dayOfWeek: string;
  time: string;
  rooms: string;
  enabled: string;
  cancel: string;
  save: string;
  delete: string;
  deleteConfirm: string;
  noSchedules: string;
  clickToAdd: string;
  selectDayAndRooms: string;
  scheduleCreated: string;
  scheduleSaved: string;
  createAutomation: string;
  trigger: string;
  condition: string;
  action: string;
  roomsLabel: string;
  daily: string;
  weekdays: string;
  weekend: string;
  cleaning: string;
  at: string;
  automaticCleaning: string;
  days: string[];
  defaultRooms: string[];
  roomPrefix: string;
}

const translations: Record<string, Translations> = {
  ru: {
    cardTitle: "Расписание уборки",
    add: "Добавить",
    editSchedule: "Редактировать расписание",
    newSchedule: "Новое расписание",
    dayOfWeek: "День недели",
    time: "Время",
    rooms: "Комнаты",
    enabled: "Включено",
    cancel: "Отмена",
    save: "Сохранить",
    delete: "Удалить",
    deleteConfirm: "Удалить это расписание?",
    noSchedules: "Нет расписаний. Нажмите \"Добавить\" для создания.",
    clickToAdd: "Нажмите \"Добавить\" для создания.",
    selectDayAndRooms: "Пожалуйста, выберите день недели и комнаты",
    scheduleCreated: "Расписание создано",
    scheduleSaved: "Расписание \"{alias}\" сохранено.",
    createAutomation: "Для автоматического запуска создайте автоматизацию:",
    trigger: "Триггер",
    condition: "Условие",
    action: "Действие",
    roomsLabel: "Комнаты",
    daily: "Ежедневно",
    weekdays: "Будни",
    weekend: "Выходные",
    cleaning: "Уборка",
    at: "в",
    automaticCleaning: "Автоматическая уборка для расписания",
    days: [
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
      "Воскресенье",
    ],
    defaultRooms: ["Гостиная", "Спальня", "Кухня", "Ванная"],
    roomPrefix: "Комната",
  },
  en: {
    cardTitle: "Cleaning Schedule",
    add: "Add",
    editSchedule: "Edit Schedule",
    newSchedule: "New Schedule",
    dayOfWeek: "Day of Week",
    time: "Time",
    rooms: "Rooms",
    enabled: "Enabled",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    deleteConfirm: "Delete this schedule?",
    noSchedules: "No schedules. Click \"Add\" to create one.",
    clickToAdd: "Click \"Add\" to create.",
    selectDayAndRooms: "Please select day of week and rooms",
    scheduleCreated: "Schedule Created",
    scheduleSaved: "Schedule \"{alias}\" saved.",
    createAutomation: "To automatically run, create an automation:",
    trigger: "Trigger",
    condition: "Condition",
    action: "Action",
    roomsLabel: "Rooms",
    daily: "Daily",
    weekdays: "Weekdays",
    weekend: "Weekend",
    cleaning: "Cleaning",
    at: "at",
    automaticCleaning: "Automatic cleaning for schedule",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    defaultRooms: ["Living Room", "Bedroom", "Kitchen", "Bathroom"],
    roomPrefix: "Room",
  },
};

class VacuumScheduleCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public entity!: string;

  @state() private _schedules: Schedule[] = [];

  @state() private _rooms: Room[] = [];

  @state() private _showAddDialog = false;

  @state() private _editingSchedule: Schedule | null = null;

  @state() private _newSchedule: Partial<Schedule> = {
    dayOfWeek: [],
    time: "09:00",
    rooms: [],
    enabled: true,
  };

  private _getLanguage(): string {
    if (!this.hass) return "en";
    const locale = this.hass.locale?.language || this.hass.language || "en";
    return locale.startsWith("ru") ? "ru" : "en";
  }

  private _t(key: keyof Translations, params?: Record<string, string>): string {
    const lang = this._getLanguage();
    const translation = translations[lang] || translations.en;
    let text = translation[key] as string;
    
    if (params) {
      Object.keys(params).forEach((param) => {
        text = text.replace(`{${param}}`, params[param]);
      });
    }
    
    return text;
  }

  private get DAYS(): string[] {
    const lang = this._getLanguage();
    const translation = translations[lang] || translations.en;
    return translation.days;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
        padding: 16px;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .card-title {
        font-size: 20px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .add-button {
        background-color: var(--primary-color);
        color: var(--text-primary-color);
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
      }

      .add-button:hover {
        opacity: 0.9;
      }

      .schedule-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .schedule-item {
        background-color: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .schedule-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .schedule-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
      }

      .schedule-days {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
      }

      .day-badge {
        background-color: var(--primary-color);
        color: var(--text-primary-color);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
      }

      .schedule-time {
        font-size: 18px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .schedule-rooms {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
        margin-top: 4px;
      }

      .room-badge {
        background-color: var(--accent-color);
        color: var(--text-primary-color);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
      }

      .schedule-actions {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .toggle-switch {
        position: relative;
        width: 48px;
        height: 24px;
      }

      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 24px;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
      }

      input:checked + .slider {
        background-color: var(--primary-color);
      }

      input:checked + .slider:before {
        transform: translateX(24px);
      }

      .delete-button {
        background-color: var(--error-color);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
      }

      .delete-button:hover {
        opacity: 0.9;
      }

      .disabled {
        opacity: 0.5;
      }

      .dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      .dialog {
        background-color: var(--card-background-color);
        border-radius: 8px;
        padding: 24px;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
      }

      .dialog-header {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 20px;
        color: var(--primary-text-color);
      }

      .form-group {
        margin-bottom: 16px;
      }

      .form-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .day-checkboxes {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      .day-checkbox {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .time-input {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        font-size: 16px;
        background-color: var(--input-fill-color);
        color: var(--primary-text-color);
      }

      .room-checkboxes {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        max-height: 200px;
        overflow-y: auto;
      }

      .room-checkbox {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 24px;
      }

      .button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }

      .button-primary {
        background-color: var(--primary-color);
        color: var(--text-primary-color);
      }

      .button-secondary {
        background-color: var(--secondary-background-color);
        color: var(--primary-text-color);
      }

      .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: var(--secondary-text-color);
      }

      .empty-state-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._loadSchedules();
    this._loadRooms();
    
    // Try to load from localStorage as fallback
    if (this._schedules.length === 0 && this.entity) {
      try {
        const stored = localStorage.getItem(`vacuum_schedules_${this.entity}`);
        if (stored) {
          this._schedules = JSON.parse(stored);
        }
      } catch (e) {
        // Ignore
      }
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has("entity") && this.entity) {
      this._loadSchedules();
      this._loadRooms();
    }
  }

  private async _loadSchedules(): Promise<void> {
    // Load schedules from input_text helper
    const schedulesEntity = `input_text.vacuum_schedules_${this.entity?.replace(
      "vacuum.",
      ""
    )}`;
    try {
      const state = this.hass.states[schedulesEntity];
      if (state && state.state) {
        this._schedules = JSON.parse(state.state);
      } else {
        // Initialize empty schedules
        this._schedules = [];
      }
    } catch (e) {
      this._schedules = [];
    }
  }

  private async _loadRooms(): Promise<void> {
    // Try to get rooms from the vacuum entity attributes
    try {
      const vacuumState = this.hass.states[this.entity];
      const lang = this._getLanguage();
      const translation = translations[lang] || translations.en;
      const defaultRooms = translation.defaultRooms;
      
      if (vacuumState?.attributes?.rooms) {
        this._rooms = vacuumState.attributes.rooms.map(
          (room: any, index: number) => ({
            id: room.id || index + 1,
            name: room.name || `${this._t("roomPrefix")} ${index + 1}`,
          })
        );
      } else {
        // Fallback: create default rooms
        this._rooms = defaultRooms.map((name: string, index: number) => ({
          id: index + 1,
          name: name,
        }));
      }
    } catch (e) {
      this._rooms = [];
    }
  }

  private _openAddDialog(): void {
    this._newSchedule = {
      dayOfWeek: [],
      time: "09:00",
      rooms: [],
      enabled: true,
    };
    this._editingSchedule = null;
    this._showAddDialog = true;
  }

  private _closeDialog(): void {
    this._showAddDialog = false;
    this._editingSchedule = null;
  }

  private _toggleDay(day: number): void {
    const schedule = this._editingSchedule || this._newSchedule;
    if (!schedule) return;

    if (!schedule.dayOfWeek) {
      schedule.dayOfWeek = [];
    }

    const index = schedule.dayOfWeek.indexOf(day);
    if (index > -1) {
      schedule.dayOfWeek.splice(index, 1);
    } else {
      schedule.dayOfWeek.push(day);
    }
    this.requestUpdate();
  }

  private _toggleRoom(roomId: number): void {
    const schedule = this._editingSchedule || this._newSchedule;
    if (!schedule) return;

    if (!schedule.rooms) {
      schedule.rooms = [];
    }

    const index = schedule.rooms.indexOf(roomId);
    if (index > -1) {
      schedule.rooms.splice(index, 1);
    } else {
      schedule.rooms.push(roomId);
    }
    this.requestUpdate();
  }

  private async _saveSchedule(): Promise<void> {
    const schedule = this._editingSchedule || this._newSchedule;
    if (!schedule || !schedule.dayOfWeek?.length || !schedule.rooms?.length) {
      alert(this._t("selectDayAndRooms"));
      return;
    }

    const newSchedule: Schedule = {
      id: this._editingSchedule?.id || `schedule_${Date.now()}`,
      dayOfWeek: schedule.dayOfWeek,
      time: schedule.time || "09:00",
      rooms: schedule.rooms,
      enabled: schedule.enabled !== false,
    };

    if (this._editingSchedule) {
      const index = this._schedules.findIndex(
        (s) => s.id === this._editingSchedule!.id
      );
      if (index > -1) {
        this._schedules[index] = newSchedule;
      }
    } else {
      this._schedules.push(newSchedule);
    }

    await this._saveSchedules();
    await this._createOrUpdateAutomation(newSchedule);
    this._closeDialog();
  }

  private async _saveSchedules(): Promise<void> {
    // Save schedules to input_text helper
    const schedulesEntity = `input_text.vacuum_schedules_${this.entity?.replace(
      "vacuum.",
      ""
    )}`;
    
    try {
      await this.hass.callService("input_text", "set_value", {
        entity_id: schedulesEntity,
        value: JSON.stringify(this._schedules),
      });
    } catch (e) {
      // If entity doesn't exist, try to create it or use localStorage as fallback
      console.log("Could not save to input_text, using localStorage as fallback");
      localStorage.setItem(
        `vacuum_schedules_${this.entity}`,
        JSON.stringify(this._schedules)
      );
    }
  }

  private async _createOrUpdateAutomation(schedule: Schedule): Promise<void> {
    const automationId = `vacuum_schedule_${schedule.id}`;
    const daysText = this._getDaysText(schedule.dayOfWeek);
    const automationAlias = `${this._t("cleaning")} ${daysText} ${this._t("at")} ${schedule.time}`;

    // Create automation for each day
    for (const day of schedule.dayOfWeek) {
      const dayAutomationId = `${automationId}_day_${day}`;
      const dayName = this.DAYS[day];
      
      const automation = {
        id: dayAutomationId,
        alias: `${automationAlias} (${dayName})`,
        description: `${this._t("automaticCleaning")} ${schedule.id}`,
        trigger: [
          {
            platform: "time",
            at: schedule.time,
          },
        ],
        condition: [
          {
            condition: "time",
            weekday: [this._getWeekdayName(day)],
          },
        ],
        action: [
          {
            service: "dreame_vacuum.vacuum_clean_segment",
            target: {
              entity_id: this.entity,
            },
            data: {
              segments: schedule.rooms,
            },
          },
        ],
        mode: "single",
      };

      try {
        // Try to create/update automation via REST API
        const auth = (this.hass as any).auth;
        const token = auth?.data?.hassTokens?.access_token || auth?.data?.access_token;
        
        if (token) {
          const response = await fetch(
            `/api/config/automation/config/${dayAutomationId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(automation),
            }
          );

          if (!response.ok && response.status !== 404) {
            throw new Error(`HTTP ${response.status}`);
          }
        } else {
          throw new Error("No auth token available");
        }
      } catch (e) {
        console.log("Could not create automation automatically. User will need to create it manually.");
        // Show helpful notification to user with automation details
        const roomNames = this._getRoomNames(schedule.rooms).join(", ");
        const dayName = this.DAYS[day];
        const message = `${this._t("scheduleSaved", { alias: automationAlias })}\n\n${this._t("createAutomation")}\n- ${this._t("trigger")}: ${this._t("time")} ${schedule.time}\n- ${this._t("condition")}: ${this._t("dayOfWeek")} - ${dayName}\n- ${this._t("action")}: dreame_vacuum.vacuum_clean_segment\n- ${this._t("roomsLabel")}: ${roomNames} (ID: ${schedule.rooms.join(", ")})`;
        
        this.hass.callService("persistent_notification", "create", {
          title: this._t("scheduleCreated"),
          message: message,
          notification_id: `vacuum_schedule_${schedule.id}_${day}`,
        });
      }
    }
  }

  private _getWeekdayName(day: number): string {
    const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    return weekdays[day];
  }

  private _getDaysText(days: number[]): string {
    if (days.length === 0) return "";
    if (days.length === 7) return this._t("daily");
    if (days.length === 5 && days.every((d) => d < 5)) return this._t("weekdays");
    if (days.length === 2 && days.includes(5) && days.includes(6))
      return this._t("weekend");

    return days
      .sort()
      .map((d) => {
        const dayName = this.DAYS[d];
        return dayName.substring(0, 2);
      })
      .join(", ");
  }

  private _getRoomNames(roomIds: number[]): string[] {
    return roomIds
      .map((id) => this._rooms.find((r) => r.id === id)?.name || `${this._t("roomPrefix")} ${id}`)
      .filter(Boolean);
  }

  private async _toggleSchedule(schedule: Schedule): Promise<void> {
    schedule.enabled = !schedule.enabled;
    await this._saveSchedules();
    
    // Enable/disable related automations
    for (const day of schedule.dayOfWeek) {
      const automationId = `automation.vacuum_schedule_${schedule.id}_day_${day}`;
      try {
        if (schedule.enabled) {
          await this.hass.callService("automation", "turn_on", {
            entity_id: automationId,
          });
        } else {
          await this.hass.callService("automation", "turn_off", {
            entity_id: automationId,
          });
        }
      } catch (e) {
        console.log(`Could not toggle automation ${automationId}`);
      }
    }
  }

  private async _deleteSchedule(schedule: Schedule): Promise<void> {
    if (!confirm(this._t("deleteConfirm"))) return;

    this._schedules = this._schedules.filter((s) => s.id !== schedule.id);
    await this._saveSchedules();

    // Delete related automations
    for (const day of schedule.dayOfWeek) {
      const automationId = `automation.vacuum_schedule_${schedule.id}_day_${day}`;
      try {
        await this.hass.callService("automation", "turn_off", {
          entity_id: automationId,
        });
      } catch (e) {
        console.log(`Could not delete automation ${automationId}`);
      }
    }
  }

  private _editSchedule(schedule: Schedule): void {
    this._editingSchedule = { ...schedule };
    this._newSchedule = { ...schedule };
    this._showAddDialog = true;
  }

  protected render(): TemplateResult {
    return html`
      <ha-card>
        <div class="card-header">
          <div class="card-title">${this._t("cardTitle")}</div>
          <button class="add-button" @click=${this._openAddDialog}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
              />
            </svg>
            ${this._t("add")}
          </button>
        </div>

        <div class="schedule-list">
          ${this._schedules.length === 0
            ? html`<div class="empty-state">
                <div class="empty-state-icon">📅</div>
                <div>${this._t("noSchedules")}</div>
              </div>`
            : this._schedules.map(
                (schedule) => html`
                  <div
                    class="schedule-item ${schedule.enabled ? "" : "disabled"}"
                    @click=${() => this._editSchedule(schedule)}
                    style="cursor: pointer;"
                  >
                    <div class="schedule-header">
                      <div class="schedule-info">
                        <div class="schedule-time">${schedule.time}</div>
                        <div class="schedule-days">
                          ${schedule.dayOfWeek.map(
                            (day) => html`
                              <span class="day-badge">${this.DAYS[day]}</span>
                            `
                          )}
                        </div>
                        <div class="schedule-rooms">
                          ${this._getRoomNames(schedule.rooms).map(
                            (name) => html`
                              <span class="room-badge">${name}</span>
                            `
                          )}
                        </div>
                      </div>
                      <div class="schedule-actions" @click=${(e: MouseEvent) => e.stopPropagation()}>
                        <label class="toggle-switch">
                          <input
                            type="checkbox"
                            .checked=${schedule.enabled}
                            @change=${() => this._toggleSchedule(schedule)}
                          />
                          <span class="slider"></span>
                        </label>
                        <button
                          class="delete-button"
                          @click=${() => this._deleteSchedule(schedule)}
                          title=${this._t("delete")}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                `
              )}
        </div>

        ${this._showAddDialog
          ? html`
              <div class="dialog-overlay" @click=${this._closeDialog}>
                <div class="dialog" @click=${(e: MouseEvent) => e.stopPropagation()}>
                  <div class="dialog-header">
                    ${this._editingSchedule
                      ? this._t("editSchedule")
                      : this._t("newSchedule")}
                  </div>

                  <div class="form-group">
                    <label class="form-label">${this._t("dayOfWeek")}</label>
                    <div class="day-checkboxes">
                      ${this.DAYS.map(
                        (day, index) => html`
                          <label class="day-checkbox">
                            <input
                              type="checkbox"
                              .checked=${(
                                this._editingSchedule || this._newSchedule
                              )?.dayOfWeek?.includes(index)}
                              @change=${() => this._toggleDay(index)}
                            />
                            <span>${day}</span>
                          </label>
                        `
                      )}
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">${this._t("time")}</label>
                    <input
                      type="time"
                      class="time-input"
                      .value=${(this._editingSchedule || this._newSchedule)
                        ?.time || "09:00"}
                      @input=${(e: Event) => {
                        const target = e.target as HTMLInputElement;
                        if (this._editingSchedule) {
                          this._editingSchedule.time = target.value;
                        } else if (this._newSchedule) {
                          this._newSchedule.time = target.value;
                        }
                      }}
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">${this._t("rooms")}</label>
                    <div class="room-checkboxes">
                      ${this._rooms.map(
                        (room) => html`
                          <label class="room-checkbox">
                            <input
                              type="checkbox"
                              .checked=${(
                                this._editingSchedule || this._newSchedule
                              )?.rooms?.includes(room.id)}
                              @change=${() => this._toggleRoom(room.id)}
                            />
                            <span>${room.name}</span>
                          </label>
                        `
                      )}
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      <input
                        type="checkbox"
                        .checked=${(this._editingSchedule || this._newSchedule)
                          ?.enabled !== false}
                        @change=${(e: Event) => {
                          const target = e.target as HTMLInputElement;
                          if (this._editingSchedule) {
                            this._editingSchedule.enabled = target.checked;
                          } else if (this._newSchedule) {
                            this._newSchedule.enabled = target.checked;
                          }
                        }}
                      />
                      ${this._t("enabled")}
                    </label>
                  </div>

                  <div class="dialog-actions">
                    <button
                      class="button button-secondary"
                      @click=${this._closeDialog}
                    >
                      ${this._t("cancel")}
                    </button>
                    <button
                      class="button button-primary"
                      @click=${this._saveSchedule}
                    >
                      ${this._t("save")}
                    </button>
                  </div>
                </div>
              </div>
            `
          : ""}
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "vacuum-schedule-card": VacuumScheduleCard;
  }
}

// Register the custom element immediately when module loads
// This executes synchronously when the module is imported
if (typeof customElements !== "undefined") {
  customElements.define("vacuum-schedule-card", VacuumScheduleCard);
}

// Export for compatibility
export { VacuumScheduleCard };

