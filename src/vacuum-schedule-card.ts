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

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  ru: {
    "schedule_title": "Расписание уборки",
    "schedules_count": "расписаний",
    "no_schedules": "Нет расписаний. Добавьте первое расписание.",
    "add_schedule": "+ Добавить расписание",
    "edit_schedule": "Редактировать расписание",
    "add_schedule_title": "Добавить расписание",
    "days_label": "Дни недели",
    "time_label": "Время",
    "rooms_label": "Комнаты для уборки",
    "rooms_available": "доступно",
    "select_all": "Выбрать все",
    "enabled": "Включено",
    "cancel": "Отмена",
    "save": "Сохранить",
    "delete_confirm": "Удалить это расписание?",
    "loading": "Загрузка...",
    "error_no_entity": "Ошибка: не указаны hass или entity",
    "error_entity_not_found": "Ошибка: сущность",
    "not_found": "не найдена",
    "error_loading": "Ошибка загрузки расписаний:",
    "error_saving": "Ошибка сохранения:",
    "error_updating": "Ошибка обновления:",
    "error_deleting": "Ошибка удаления:",
    "error_no_days": "Выберите хотя бы один день",
    "error_no_time": "Укажите время",
    "error_no_hass": "Ошибка: hass не доступен",
    "all_rooms": "Все комнаты",
    "no_rooms_selected": "Комнаты не выбраны",
    "rooms_not_found": "Комнаты не найдены. Проверьте подключение пылесоса.",
    "rooms_hint": "💡 Для получения реальных комнат используйте сервис dreame_vacuum.get_room_mapping через Developer Tools",
    "every_day": "Каждый день",
    "no_days": "Нет дней",
    "day_names": "Вс,Пн,Вт,Ср,Чт,Пт,Сб",
    "room_names": "Гостиная,Спальня,Кухня,Ванная",
  },
  en: {
    "schedule_title": "Vacuum Schedule",
    "schedules_count": "schedules",
    "no_schedules": "No schedules. Add your first schedule.",
    "add_schedule": "+ Add Schedule",
    "edit_schedule": "Edit Schedule",
    "add_schedule_title": "Add Schedule",
    "days_label": "Days of week",
    "time_label": "Time",
    "rooms_label": "Rooms to clean",
    "rooms_available": "available",
    "select_all": "Select all",
    "enabled": "Enabled",
    "cancel": "Cancel",
    "save": "Save",
    "delete_confirm": "Delete this schedule?",
    "loading": "Loading...",
    "error_no_entity": "Error: hass or entity not specified",
    "error_entity_not_found": "Error: entity",
    "not_found": "not found",
    "error_loading": "Error loading schedules:",
    "error_saving": "Error saving:",
    "error_updating": "Error updating:",
    "error_deleting": "Error deleting:",
    "error_no_days": "Select at least one day",
    "error_no_time": "Specify time",
    "error_no_hass": "Error: hass not available",
    "all_rooms": "All rooms",
    "no_rooms_selected": "No rooms selected",
    "rooms_not_found": "Rooms not found. Check vacuum connection.",
    "rooms_hint": "💡 To get real rooms use dreame_vacuum.get_room_mapping service via Developer Tools",
    "every_day": "Every day",
    "no_days": "No days",
    "day_names": "Sun,Mon,Tue,Wed,Thu,Fri,Sat",
    "room_names": "Living Room,Bedroom,Kitchen,Bathroom",
  },
};

@customElement("vacuum-schedule-card")
class VacuumScheduleCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property() public entity!: string;
  @state() private _schedules: Schedule[] = [];
  @state() private _loading = false;
  @state() private _error?: string;
  @state() private _showAddDialog = false;
  @state() private _editingSchedule?: Schedule;
  @state() private _rooms: Array<{ id: number; name: string }> = [];
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
    this._loadRooms();
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.hass && this._schedulesEntityId) {
      this._loadSchedules();
      this._loadRooms();
    }
  }

  private async _loadRooms(): Promise<void> {
    if (!this.hass || !this.entity) return;

    try {
      // Извлекаем базовое имя entity (например, из vacuum.xiaomi_m30s получаем xiaomi_m30s)
      const entityName = this.entity.replace("vacuum.", "");
      
      // Ищем select-сущности для комнат (например, select.pylesos_room_1_name)
      // Паттерн: select.{entity_prefix}_room_{id}_name
      const roomEntities: Array<{ id: number; name: string }> = [];
      
      // Пробуем разные префиксы
      const possiblePrefixes = [
        entityName,
        entityName.replace(/_/g, ""),
        "pylesos", // как в примере
        "vacuum",
      ];
      
      for (const prefix of possiblePrefixes) {
        // Ищем сущности вида select.{prefix}_room_{id}_name
        for (let i = 1; i <= 50; i++) {
          const roomNameEntity = `select.${prefix}_room_${i}_name`;
          const roomIdEntity = `select.${prefix}_room_${i}_id` || `number.${prefix}_room_${i}_id`;
          
          const nameState = this.hass.states[roomNameEntity];
          const idState = this.hass.states[roomIdEntity];
          
          if (nameState && nameState.state) {
            // Пытаемся получить ID из отдельной сущности или из имени сущности
            let roomId: number;
            if (idState && idState.state) {
              roomId = parseInt(idState.state, 10);
            } else {
              // Извлекаем ID из имени сущности (room_1 -> 1)
              const match = roomNameEntity.match(/room_(\d+)/);
              roomId = match ? parseInt(match[1], 10) : i;
            }
            
            if (!isNaN(roomId)) {
              roomEntities.push({
                id: roomId,
                name: nameState.state,
              });
            }
          }
        }
        
        // Если нашли комнаты, прекращаем поиск
        if (roomEntities.length > 0) {
          break;
        }
      }
      
      // Если нашли комнаты через select-сущности
      if (roomEntities.length > 0) {
        this._rooms = roomEntities.sort((a, b) => a.id - b.id);
        console.log("Загружено комнат из select-сущностей:", this._rooms.length, this._rooms);
        this.requestUpdate();
        return;
      }
      
      // Пытаемся получить комнаты из атрибутов пылесоса
      const state = this.hass.states[this.entity];
      if (state && state.attributes) {
        // Проверяем различные возможные атрибуты
        const segments = state.attributes.segments || state.attributes.room_list || [];
        
        if (Array.isArray(segments) && segments.length > 0) {
          this._rooms = segments.map((room: any) => ({
            id: typeof room === 'number' ? room : room.id || room.segment_id,
            name: typeof room === 'object' && room.name ? room.name : `Комната ${typeof room === 'number' ? room : room.id || room.segment_id}`,
          }));
          console.log("Загружено комнат из атрибутов:", this._rooms.length, this._rooms);
          this.requestUpdate();
          return;
        }
      }

      // Если не нашли, используем стандартные комнаты
      const roomNames = this._t("room_names").split(",");
      this._rooms = [
        { id: 16, name: roomNames[0] || "Living Room" },
        { id: 17, name: roomNames[1] || "Bedroom" },
        { id: 18, name: roomNames[2] || "Kitchen" },
        { id: 19, name: roomNames[3] || "Bathroom" },
      ];
      console.log("Используются стандартные комнаты:", this._rooms.length, this._rooms);
    } catch (error) {
      console.error("Ошибка загрузки комнат:", error);
      // Используем стандартные комнаты
      const roomNames = this._t("room_names").split(",");
      this._rooms = [
        { id: 16, name: roomNames[0] || "Living Room" },
        { id: 17, name: roomNames[1] || "Bedroom" },
        { id: 18, name: roomNames[2] || "Kitchen" },
        { id: 19, name: roomNames[3] || "Bathroom" },
      ];
    }
    
    this.requestUpdate();
  }

  private async _loadSchedules(): Promise<void> {
    if (!this.hass) return;

    this._loading = true;
    this._error = undefined;

    try {
      // Загружаем расписания на основе автоматизаций
      const token = this.hass.auth?.data?.access_token || this.hass.auth?.accessToken;
      if (!token) {
        console.warn("Токен авторизации не найден для загрузки автоматизаций");
        this._schedules = [];
        return;
      }

      // Получаем все автоматизации из состояния Home Assistant (как в auto-entities)
      const automationsMap = new Map<string, Schedule>();
      
      // Сначала выведем все автоматизации для отладки
      const allAutomations = Object.keys(this.hass.states).filter(
        entityId => entityId.startsWith("automation.")
      );
      console.log("Всего автоматизаций в hass.states:", allAutomations.length);
      console.log("Список всех автоматизаций:", allAutomations);
      
      // Ищем автоматизации по entity_id (формируется из alias)
      // Формат: automation.raspisanie_uborki_10_00_sr_schedule_1764103314127
      // Но лучше получить реальный id из конфигурации автоматизации
      const automationEntities = allAutomations.filter(
        entityId => {
          // Ищем автоматизации, у которых в entity_id есть "raspisanie_uborki" и "schedule_"
          const parts = entityId.split(".");
          return parts.length === 2 && 
                 parts[0] === "automation" &&
                 parts[1]?.includes("raspisanie_uborki") &&
                 parts[1]?.includes("schedule_");
        }
      );

      console.log("Найдено автоматизаций расписаний по entity_id:", automationEntities.length);
      if (automationEntities.length > 0) {
        console.log("Все найденные автоматизации расписаний:", automationEntities);
      } else {
        console.warn("Автоматизации расписаний не найдены!");
      }

      // Получаем список всех автоматизаций через WebSocket API для получения реальных id
      let allAutomationsConfig: any[] = [];
      
      if (this.hass.connection && typeof (this.hass.connection as any).sendMessagePromise === "function") {
        try {
          // Получаем список всех автоматизаций
          const wsListResult: any = await (this.hass.connection as any).sendMessagePromise({
            type: "automation/list",
          });
          
          if (wsListResult && wsListResult.success && Array.isArray(wsListResult.result)) {
            allAutomationsConfig = wsListResult.result;
            console.log("Получено автоматизаций через WebSocket list:", allAutomationsConfig.length);
          }
        } catch (wsListError) {
          console.warn("Не удалось получить список автоматизаций через WebSocket:", wsListError);
        }
      }
      
      // Обрабатываем автоматизации из списка напрямую (не по entity_id)
      // Ищем все автоматизации с id вида vacuum_schedule_*_day_*
      const scheduleAutomations = allAutomationsConfig.filter((a: any) => {
        const id = a.id || "";
        return id.startsWith("vacuum_schedule_") && id.includes("_day_");
      });
      
      console.log("Найдено автоматизаций расписаний в списке:", scheduleAutomations.length);
      console.log("ID автоматизаций расписаний:", scheduleAutomations.map((a: any) => a.id));
      
      // Обрабатываем каждую автоматизацию из списка
      for (const automationConfig of scheduleAutomations) {
        try {
          // Извлекаем scheduleId и day из реального id автоматизации
          // Формат id: vacuum_schedule_schedule_1764103314127_day_3
          const configId = automationConfig.id;
          if (!configId) {
            console.warn(`ID не найден в конфигурации автоматизации`);
            continue;
          }
          
          // Парсим id: vacuum_schedule_{scheduleId}_day_{day}
          const idMatch = configId.match(/^vacuum_schedule_(.+)_day_(\d+)$/);
          if (!idMatch) {
            console.warn(`Не удалось распарсить ID автоматизации: ${configId}`);
            continue;
          }
          
          const scheduleId = idMatch[1];
          const day = parseInt(idMatch[2], 10);
          
          console.log(`Обработка автоматизации: id=${configId}, scheduleId=${scheduleId}, day=${day}`);

          // Находим entity_id для этой автоматизации (может быть разным из-за alias)
          // Пробуем найти по id или по описанию
          let entityId = `automation.${configId}`;
          let automationState = this.hass.states[entityId];
          
          // Если не нашли по id, ищем по описанию в hass.states
          if (!automationState) {
            for (const eId of automationEntities) {
              const state = this.hass.states[eId];
              if (state && state.attributes) {
                const description = state.attributes.description || "";
                if (description.includes(`расписания уборки`) && description.includes(scheduleId)) {
                  entityId = eId;
                  automationState = state;
                  break;
                }
              }
            }
          }
          
          // Извлекаем время из trigger
          const triggers = Array.isArray(automationConfig.trigger) ? automationConfig.trigger : [automationConfig.trigger];
          const timeTrigger = triggers.find((t: any) => t.platform === "time");
          if (!timeTrigger || !timeTrigger.at) {
            console.warn(`Не найден time trigger в автоматизации ${configId}`);
            continue;
          }

          const timeStr = timeTrigger.at; // "HH:MM:SS" или "HH:MM"
          const time = timeStr.length >= 5 ? timeStr.substring(0, 5) : timeStr; // "HH:MM"

          // Извлекаем комнаты из action
          const actions = Array.isArray(automationConfig.action) ? automationConfig.action : [automationConfig.action];
          const action = actions.find((a: any) => a.service === "dreame_vacuum.vacuum_clean_segment" || a.service?.includes("vacuum_clean_segment"));
          const rooms = action?.data?.segments || action?.segments || [];

          // Получаем или создаем расписание
          let schedule = automationsMap.get(scheduleId);
          if (!schedule) {
            schedule = {
              id: scheduleId,
              enabled: automationState?.state === "on",
              days: [],
              time: time,
              rooms: rooms,
            };
            automationsMap.set(scheduleId, schedule);
            console.log(`Создано новое расписание: ${scheduleId}, время: ${time}, комнаты:`, rooms);
          }

          // Добавляем день
          if (!schedule.days.includes(day)) {
            schedule.days.push(day);
            console.log(`Добавлен день ${day} к расписанию ${scheduleId}`);
          }

          // Обновляем комнаты (берем из последней автоматизации)
          if (rooms.length > 0) {
            schedule.rooms = rooms;
          }

          // Обновляем enabled статус (если хотя бы одна автоматизация включена)
          if (automationState?.state === "on") {
            schedule.enabled = true;
          }
        } catch (e) {
          console.warn(`Ошибка обработки автоматизации:`, e);
        }
      }

      // Сортируем дни в каждом расписании
      for (const schedule of automationsMap.values()) {
        schedule.days.sort((a, b) => a - b);
        console.log("Обработанное расписание:", {
          id: schedule.id,
          enabled: schedule.enabled,
          days: schedule.days,
          time: schedule.time,
          rooms: schedule.rooms,
        });
      }

      this._schedules = Array.from(automationsMap.values());
      console.log("Загружено расписаний из автоматизаций:", this._schedules.length);
      console.log("Детали всех расписаний:", JSON.stringify(this._schedules, null, 2));

      // Если расписаний нет, пробуем загрузить из input_text (для обратной совместимости)
      if (this._schedules.length === 0 && this._schedulesEntityId) {
        const state = this.hass.states[this._schedulesEntityId];
        if (state && state.state) {
          try {
            const parsed = JSON.parse(state.state) || [];
            if (parsed.length > 0) {
              this._schedules = parsed;
              console.log("Загружено расписаний из input_text (fallback):", this._schedules.length);
            }
          } catch (e) {
            console.error("Ошибка парсинга расписаний из input_text:", e);
          }
        }
      }
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

  private _getLanguage(): string {
    if (!this.hass) return "en";
    const lang = this.hass.language || this.hass.locale?.language || "en";
    return lang.startsWith("ru") ? "ru" : "en";
  }

  private _t(key: string): string {
    const lang = this._getLanguage();
    return translations[lang]?.[key] || translations.en[key] || key;
  }

  private _getDayNames(): string[] {
    const dayNamesStr = this._t("day_names");
    return dayNamesStr.split(",");
  }

  private _formatDays(days: number[]): string {
    const dayNames = this._getDayNames();
    if (days.length === 0) return this._t("no_days");
    if (days.length === 7) return this._t("every_day");
    return days.map(d => dayNames[d]).join(", ");
  }

  private _formatRooms(roomIds: number[]): string {
    if (roomIds.length === 0) return this._t("all_rooms");
    const roomNames = roomIds
      .map(id => {
        const room = this._rooms.find(r => r.id === id);
        return room ? room.name : `ID:${id}`;
      })
      .join(", ");
    return roomNames || "Комнаты не выбраны";
  }

  render() {
    console.log("render() вызван, количество расписаний:", this._schedules.length, "loading:", this._loading);
    
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
    console.log("_addSchedule called");
    this._newSchedule = {
      enabled: true,
      days: [],
      time: "09:00",
      rooms: [],
    };
    this._editingSchedule = undefined;
    this._error = undefined;
    this._showAddDialog = true;
    console.log("_showAddDialog set to:", this._showAddDialog);
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
    if (!this.hass || !this._schedulesEntityId) return;

    const updatedSchedule = { ...schedule, enabled };
    const schedules = this._schedules.map(s =>
      s.id === schedule.id ? updatedSchedule : s
    );

    try {
      await this.hass.callService("input_text", "set_value", {
        entity_id: this._schedulesEntityId,
        value: JSON.stringify(schedules),
      });
      
      this._schedules = schedules;
      
      // Обновляем автоматизации (создаем или удаляем в зависимости от состояния)
      await this._updateAutomationsForSchedule(updatedSchedule, schedule);
    } catch (error) {
      this._error = `${this._t("error_updating")} ${error}`;
      console.error("Ошибка обновления расписания:", error);
    }
  }

  private async _deleteSchedule(schedule: Schedule): Promise<void> {
    if (!this.hass || !this._schedulesEntityId) return;

    if (!confirm(this._t("delete_confirm"))) {
      return;
    }

    // Удаляем автоматизации для этого расписания
    for (const day of schedule.days) {
      await this._deleteAutomation(schedule.id, day);
    }

    const schedules = this._schedules.filter(s => s.id !== schedule.id);

    try {
      await this.hass.callService("input_text", "set_value", {
        entity_id: this._schedulesEntityId,
        value: JSON.stringify(schedules),
      });
      
      this._schedules = schedules;
    } catch (error) {
      this._error = `${this._t("error_deleting")} ${error}`;
      console.error("Ошибка удаления расписания:", error);
    }
  }

  private _getDayNameForAutomation(day: number): string {
    const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return dayNames[day] || "mon";
  }

  private async _createAutomation(schedule: Schedule, day: number): Promise<void> {
    if (!this.hass) return;

    const automationId = `vacuum_schedule_${schedule.id}_day_${day}`;
    const dayName = this._getDayNameForAutomation(day);
    const [hours, minutes] = schedule.time.split(":").map(Number);
    
    const automation = {
      id: automationId,
      alias: `${this._t("schedule_title")} ${schedule.time} - ${this._getDayNames()[day]} (${schedule.id})`,
      description: `Автоматизация для расписания уборки ${schedule.time} в ${this._getDayNames()[day]}`,
      trigger: [
        {
          platform: "time",
          at: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`,
        },
      ],
      condition: [
        {
          condition: "time",
          weekday: dayName,
        },
      ],
      action: [
        {
          service: "dreame_vacuum.vacuum_clean_segment",
          target: {
            entity_id: this.entity,
          },
          data: {
            segments: schedule.rooms.length > 0 ? schedule.rooms : undefined,
          },
        },
      ],
      mode: "single",
    };

    try {
      const token = this.hass.auth?.data?.access_token || this.hass.auth?.accessToken;
      if (!token) {
        console.warn("Токен авторизации не найден для создания автоматизации");
        return;
      }

      // Создаем автоматизацию через папку (каждая автоматизация в отдельном файле)
      // Сначала проверяем, существует ли автоматизация
      let response = await fetch(`/api/config/automation/config/${automationId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const method = response.ok ? "PUT" : "POST"; // Если существует - обновляем, иначе создаем
      
      response = await fetch(`/api/config/automation/config/${automationId}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(automation),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Не удалось ${method === "POST" ? "создать" : "обновить"} автоматизацию ${automationId}:`, response.status, errorText);
        console.warn("Данные автоматизации:", automation);
      } else {
        console.log(`Автоматизация ${automationId} успешно ${method === "POST" ? "создана" : "обновлена"}`);
      }
    } catch (error) {
      console.warn(`Ошибка создания автоматизации ${automationId}:`, error);
    }
  }

  private async _deleteAutomation(scheduleId: string, day: number): Promise<void> {
    if (!this.hass) return;

    const automationId = `vacuum_schedule_${scheduleId}_day_${day}`;

    try {
      const token = this.hass.auth?.data?.access_token || this.hass.auth?.accessToken;
      if (!token) {
        console.warn("Токен авторизации не найден для удаления автоматизации");
        return;
      }

      // Удаляем автоматизацию из папки
      const response = await fetch(`/api/config/automation/config/${automationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.warn(`Не удалось удалить автоматизацию ${automationId}:`, response.status);
      } else {
        console.log(`Автоматизация ${automationId} успешно удалена`);
      }
    } catch (error) {
      console.warn(`Ошибка удаления автоматизации ${automationId}:`, error);
    }
  }

  private async _updateAutomationsForSchedule(schedule: Schedule, oldSchedule?: Schedule): Promise<void> {
    if (!schedule.enabled) {
      // Если расписание выключено, удаляем все автоматизации
      const daysToDelete = oldSchedule ? oldSchedule.days : schedule.days;
      for (const day of daysToDelete) {
        await this._deleteAutomation(schedule.id, day);
      }
      return;
    }

    // Удаляем старые автоматизации, если расписание редактировалось
    if (oldSchedule) {
      const daysToRemove = oldSchedule.days.filter(d => !schedule.days.includes(d));
      for (const day of daysToRemove) {
        await this._deleteAutomation(schedule.id, day);
      }
    }

    // Создаем/обновляем автоматизации для каждого дня
    for (const day of schedule.days) {
      await this._createAutomation(schedule, day);
    }
  }

  private async _saveSchedule(): Promise<void> {
    if (!this._newSchedule.days || this._newSchedule.days.length === 0) {
      this._error = this._t("error_no_days");
      return;
    }

    if (!this._newSchedule.time) {
      this._error = this._t("error_no_time");
      return;
    }

    if (!this.hass || !this._schedulesEntityId) {
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

    let schedules = [...this._schedules];
    const oldSchedule = this._editingSchedule;
    
    if (this._editingSchedule) {
      const index = schedules.findIndex(s => s.id === this._editingSchedule!.id);
      if (index > -1) {
        schedules[index] = schedule;
      }
    } else {
      schedules.push(schedule);
    }

    try {
      console.log("Сохранение расписаний:", {
        entity_id: this._schedulesEntityId,
        schedules_count: schedules.length,
        schedules: schedules,
      });
      
      // Сохраняем расписания
      await this.hass.callService("input_text", "set_value", {
        entity_id: this._schedulesEntityId,
        value: JSON.stringify(schedules),
      });
      
      // Небольшая задержка для применения изменений
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Обновляем локальное состояние сразу для немедленного отображения
      this._schedules = schedules;
      console.log("Расписания обновлены локально:", this._schedules.length, this._schedules);
      this.requestUpdate();
      
      // Перезагружаем расписания из состояния для синхронизации
      await this._loadSchedules();
      
      // Создаем/обновляем автоматизации
      try {
        await this._updateAutomationsForSchedule(schedule, oldSchedule);
      } catch (autoError) {
        console.warn("Ошибка создания автоматизаций (не критично):", autoError);
        // Не блокируем сохранение расписания из-за ошибки автоматизаций
      }
      
      this._closeDialog();
      this._error = undefined;
      this.requestUpdate();
    } catch (error) {
      this._error = `${this._t("error_saving")} ${error}`;
      console.error("Ошибка сохранения расписания:", error);
      console.error("Детали ошибки:", {
        entity_id: this._schedulesEntityId,
        schedules_count: schedules.length,
        error: error,
      });
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

