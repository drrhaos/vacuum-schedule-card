import { LitElement, html, css } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { Room, CleaningType } from "../types";
import { VacuumService } from "../services/vacuum.service";
import { translate } from "../utils/i18n";
import { getVacuumRobotSVG } from "../utils/svg-loader";
import { subscribeToStateChanges } from "../utils/event-subscription";
import { ACTIVE_BUTTON_TASK_STATUSES } from "../constants";

@customElement("vacuum-control-panel")
export class ControlPanel extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property() public entity!: string;
  @property({ attribute: false }) public rooms: Room[] = [];
  @property({ attribute: false }) public selectedRooms: number[] = [];
  @property({ attribute: false }) public hiddenRooms: number[] = [];
  @property() public showRoomIds = false;
  @property({ attribute: false }) public roomIcons: Record<number, string | { entity_id: string }> = {};

  @state() private _vacuumService?: VacuumService;
  @state() private _currentCleaningRooms: number[] = [];
  @state() private _selectedCleaningType: CleaningType = "vacuum_and_mop";

  connectedCallback(): void {
    super.connectedCallback();
    if (this.hass && this.entity) {
      this._vacuumService = new VacuumService(this.hass, this.entity);
      this._updateCleaningRooms();
      this._subscribeToStateChanges();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubscribeFromStateChanges();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has("hass") || changedProperties.has("entity")) {
      if (this.hass && this.entity) {
        this._vacuumService = new VacuumService(this.hass, this.entity);
        this._updateCleaningRooms();
        this._subscribeToStateChanges();
      }
    }
  }

  private _updateCleaningRooms(): void {
    if (this._vacuumService) {
      const newCleaningRooms = this._vacuumService.getCurrentCleaningRooms();
      const wasCleaning = this._isCleaning();
      
      this._currentCleaningRooms = newCleaningRooms;
      
      // Если уборка активна, автоматически выбираем текущие убираемые комнаты
      // Если уборка не активна, не меняем выбранные комнаты (управляются пользователем)
      if (this._isCleaning()) {
        // Синхронизируем selectedRooms с текущими убираемыми комнатами
        if (JSON.stringify(this.selectedRooms.sort()) !== JSON.stringify(newCleaningRooms.sort())) {
          this.selectedRooms = [...newCleaningRooms];
          // Синхронизация selectedRooms с текущими убираемыми комнатами
        }
      } else if (wasCleaning) {
        // Уборка только что завершилась - очищаем выбор, если он был синхронизирован с уборкой
        // Но только если selectedRooms совпадали с предыдущими убираемыми комнатами
        if (this.selectedRooms.length > 0 && 
            JSON.stringify(this.selectedRooms.sort()) === JSON.stringify(this._currentCleaningRooms.sort())) {
          this.selectedRooms = [];
        }
      }
      
      this.requestUpdate();
    }
  }

  private _unsubscribeStateChanges?: () => void;

  private _subscribeToStateChanges(): void {
    this._unsubscribeFromStateChanges();

    // Подписываемся на изменения основного entity пылесоса
    const subscription = subscribeToStateChanges(
      this.hass,
      this.entity,
      () => {
        this._updateCleaningRooms();
        this.requestUpdate();
      }
    );

    if (subscription) {
      this._unsubscribeStateChanges = subscription.unsubscribe;
    }

    // Также подписываемся на изменения sensor.{entity_name}_task_status
    const entityName = this.entity.replace(/^vacuum\./, "");
    const taskStatusEntityId = `sensor.${entityName}_task_status`;
    const taskStatusSubscription = subscribeToStateChanges(
      this.hass,
      taskStatusEntityId,
      () => {
        this.requestUpdate();
      }
    );

    // Сохраняем обе подписки
    if (taskStatusSubscription) {
      const originalUnsubscribe = this._unsubscribeStateChanges;
      this._unsubscribeStateChanges = () => {
        if (originalUnsubscribe) originalUnsubscribe();
        taskStatusSubscription.unsubscribe();
      };
    }
  }

  private _unsubscribeFromStateChanges(): void {
    if (this._unsubscribeStateChanges) {
      this._unsubscribeStateChanges();
      this._unsubscribeStateChanges = undefined;
    }
  }

  private _t(key: string): string {
    return translate(key, this.hass);
  }

  private _getVacuumState(): string {
    return this._vacuumService?.getState() || "unknown";
  }

  private _isCleaning(): boolean {
    if (!this._vacuumService) return false;
    
    // Проверяем статус задачи из sensor.{entity_name}_task_status
    // Блокируем кнопки выбора комнат, если идет активная задача
    const taskStatus = this._vacuumService.getTaskStatus();
    
    // Если task_status существует (даже если это пустая строка или "unknown")
    if (taskStatus !== undefined) {
      const taskStatusLower = taskStatus.toLowerCase().trim();
      
      // Список статусов, при которых кнопки активны (можно выбирать комнаты)
      // Основано на переводах из dreame-vacuum интеграции
      // https://github.com/Tasshack/dreame-vacuum/blob/master/custom_components/dreame_vacuum/translations/
      const activeButtonStatuses: string[] = [...ACTIVE_BUTTON_TASK_STATUSES];
      
      // Если статус НЕ в списке активных, значит идет активная задача - блокируем
      // Активные задачи (блокируем кнопки): cleaning, zone_cleaning, room_cleaning, spot_cleaning,
      // fast_mapping, cleaning_paused, room_cleaning_paused, zone_cleaning_paused,
      // spot_cleaning_paused, map_cleaning_paused, docking_paused, mopping_paused,
      // zone_mopping_paused, room_mopping_paused, zone_docking_paused, room_docking_paused,
      // cruising_path, cruising_path_paused, cruising_point, cruising_point_paused,
      // summon_clean_paused, returning_to_install_mop, returning_to_remove_mop и т.д.
      if (!activeButtonStatuses.includes(taskStatusLower)) {
        return true;
      } else {
        // Если статус в списке активных (unknown, completed), кнопки активны - не блокируем
        return false;
      }
    }
    
    // Fallback: если task_status не определен, проверяем основной статус пылесоса и список убираемых комнат
    const state = this._getVacuumState();
    return state === "cleaning" || this._currentCleaningRooms.length > 0;
  }

  private _isButtonDisabled(buttonType: "start" | "stop" | "pause" | "return"): boolean {
    if (!this._vacuumService) return true;
    const state = this._getVacuumState();
    return this._vacuumService.isButtonDisabled(buttonType, state);
  }

  private _getStateLabel(): string {
    if (!this._vacuumService) return "Неизвестно";
    const state = this._getVacuumState();
    return this._vacuumService.getStateLabel(state);
  }

  private _getAdditionalState(): string | undefined {
    if (!this._vacuumService) return undefined;
    return this._vacuumService.getAdditionalState();
  }

  private _getAdditionalStateLabel(): string {
    const additionalState = this._getAdditionalState();
    if (!additionalState) return "";
    
    // Маппинг статусов (как английских, так и переведенных Home Assistant) на ключи переводов
    // Основано на переводах из dreame-vacuum интеграции
    const statusMap: Record<string, string> = {
      // Английские оригинальные статусы (из dreame-vacuum)
      "idle": "idle",
      "cleaning": "cleaning",
      "paused": "paused",
      "returning": "returning",
      "returning to dock": "returning",
      "returning to base": "returning",
      "charging": "charging",
      "docked": "docked",
      "error": "error",
      "standby": "standby",
      "spot cleaning": "spot_cleaning",
      "zone cleaning": "zone_cleaning",
      "manual control": "manual_control",
      "going home": "going_home",
      "completing": "completing",
      "drying": "drying",
      "rinsing mop": "rinsing_mop",
      "auto cleaning": "auto_cleaning",
      "dry and wet cleaning": "dry_and_wet_cleaning",
      "cleaning and adding water": "cleaning_and_adding_water",
      "charging completed": "charging_completed",
      "returning for mop rinsing": "returning_for_mop_rinsing",
      "washing paused": "washing_paused",
      // Русские статусы (переведенные Home Assistant из dreame-vacuum)
      "ожидание": "idle",
      "уборка": "cleaning",
      "пауза": "paused",
      "возврат": "returning",
      "возвращение на базу": "returning",
      "зарядка": "charging",
      "на базе": "docked",
      "ошибка": "error",
      "точечная уборка": "spot_cleaning",
      "уборка зоны": "zone_cleaning",
      "ручное управление": "manual_control",
      "завершение": "completing",
      "сушка": "drying",
      "полоскание швабры": "rinsing_mop",
      "автоочистка": "auto_cleaning",
      "сухая и влажная уборка": "dry_and_wet_cleaning",
      "очистка и добавление воды": "cleaning_and_adding_water",
      "зарядка завершена": "charging_completed",
      "возвращение для полоскания швабры": "returning_for_mop_rinsing",
      "стирка приостановлена": "washing_paused",
    };
    
    const stateLower = additionalState.toLowerCase().trim();
    let translationKey: string;
    
    // Проверяем маппинг для известных статусов
    if (statusMap[stateLower]) {
      translationKey = `state_${statusMap[stateLower]}`;
    } else {
      // Для неизвестных статусов нормализуем ключ (убираем пробелы, спецсимволы)
      translationKey = `state_${stateLower.replace(/\s+/g, "_").replace(/[^a-zа-я0-9_]/g, "").replace(/[а-я]/g, (char) => {
        // Простая транслитерация для кириллицы
        const translit: Record<string, string> = {
          "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "yo",
          "ж": "zh", "з": "z", "и": "i", "й": "y", "к": "k", "л": "l", "м": "m",
          "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
          "ф": "f", "х": "h", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sch",
          "ъ": "", "ы": "y", "ь": "", "э": "e", "ю": "yu", "я": "ya"
        };
        return translit[char] || "";
      })}`;
    }
    
    const translated = this._t(translationKey);
    // Если перевод найден и он отличается от ключа, возвращаем перевод
    // Иначе возвращаем оригинальное значение
    return translated && translated !== translationKey ? translated : additionalState;
  }

  private _getError(): string | undefined {
    if (!this._vacuumService) return undefined;
    return this._vacuumService.getError();
  }

  private _renderRoomIcon(room: Room) {
    if (room.id === 0) {
      // Для кнопки "Все комнаты" используем mdi:home
      return html`<ha-icon .icon=${"mdi:home"}></ha-icon>`;
    }

    // 1. Проверяем переопределение в конфигурации
    const configIcon = this.roomIcons[room.id];
    let iconToUse: string | undefined;
    
    if (configIcon) {
      if (typeof configIcon === "string") {
        iconToUse = configIcon;
      }
      // Если это объект с entity_id, иконка уже должна быть загружена в room.icon
    }

    // 2. Используем иконку из комнаты (загруженную из entity)
    if (!iconToUse && room.icon) {
      iconToUse = room.icon;
    }

    // 3. Дефолтная иконка
    if (!iconToUse) {
      return html`🏠`;
    }

    // Если иконка начинается с "mdi:" или "hass:", используем ha-icon
    if (iconToUse.startsWith("mdi:") || iconToUse.startsWith("hass:") || iconToUse.includes(":")) {
      return html`<ha-icon .icon=${iconToUse}></ha-icon>`;
    }

    // Иначе используем как есть (emoji или текст)
    return html`${iconToUse}`;
  }

  private async _handleStart(): Promise<void> {
    if (!this._vacuumService) return;
    try {
      await this._vacuumService.start(
        this.selectedRooms.length > 0 ? this.selectedRooms : undefined,
        this._selectedCleaningType
      );
      this.dispatchEvent(new CustomEvent("vacuum-started"));
    } catch (error) {
      console.error("[Vacuum Schedule Card] Ошибка запуска уборки:", error);
      this.dispatchEvent(new CustomEvent("error", { detail: { message: `${this._t("error_starting") || "Ошибка запуска"}: ${error}` } }));
    }
  }

  private _handleCleaningTypeChange(e: Event): void {
    this._selectedCleaningType = (e.target as HTMLSelectElement).value as CleaningType;
    this.requestUpdate();
  }

  private async _handleStop(): Promise<void> {
    if (!this._vacuumService) return;
    try {
      await this._vacuumService.stop();
    } catch (error) {
      console.error("[Vacuum Schedule Card] Ошибка остановки уборки:", error);
      this.dispatchEvent(new CustomEvent("error", { detail: { message: `${this._t("error_stopping") || "Ошибка остановки"}: ${error}` } }));
    }
  }

  private async _handlePause(): Promise<void> {
    if (!this._vacuumService) return;
    try {
      await this._vacuumService.pause();
    } catch (error) {
      console.error("[Vacuum Schedule Card] Ошибка паузы уборки:", error);
      this.dispatchEvent(new CustomEvent("error", { detail: { message: `${this._t("error_pausing") || "Ошибка паузы"}: ${error}` } }));
    }
  }

  private async _handleReturnToBase(): Promise<void> {
    if (!this._vacuumService) return;
    try {
      await this._vacuumService.returnToBase();
    } catch (error) {
      console.error("[Vacuum Schedule Card] Ошибка возврата на станцию:", error);
      this.dispatchEvent(new CustomEvent("error", { detail: { message: `${this._t("error_returning") || "Ошибка возврата"}: ${error}` } }));
    }
  }

  private _toggleRoom(roomId: number): void {
    // Не позволяем изменять состояние во время уборки
    if (this._isCleaning()) {
      return;
    }

    const index = this.selectedRooms.indexOf(roomId);
    if (index > -1) {
      this.selectedRooms.splice(index, 1);
      this.dispatchEvent(new CustomEvent("room-toggled", { detail: { roomId, selected: false } }));
    } else {
      this.selectedRooms.push(roomId);
      this.dispatchEvent(new CustomEvent("room-toggled", { detail: { roomId, selected: true } }));
    }
    this.requestUpdate();
  }

  private _toggleAllRooms(): void {
    // Не позволяем изменять состояние во время уборки
    if (this._isCleaning()) {
      return;
    }

    const visibleRooms = this.rooms.filter(room => !this.hiddenRooms.includes(room.id));
    if (this.selectedRooms.length === 0) {
      this.selectedRooms = visibleRooms.map(r => r.id);
    } else {
      this.selectedRooms = [];
    }
    this.dispatchEvent(new CustomEvent("all-rooms-toggled"));
    this.requestUpdate();
  }

  render() {
    const vacuumState = this._getVacuumState();
    const isStartDisabled = this._isButtonDisabled("start");
    const isStopDisabled = this._isButtonDisabled("stop");
    const isPauseDisabled = this._isButtonDisabled("pause");
    const isReturnDisabled = this._isButtonDisabled("return");

    // Фильтруем комнаты, скрывая те, что в hiddenRooms
    const visibleRooms = this.rooms.filter(room => !this.hiddenRooms.includes(room.id));

    return html`
      <div class="control-panel">
        <div class="control-panel-status">
          <span class="status-icon ${vacuumState === "cleaning" ? "cleaning" : ""}">${unsafeHTML(getVacuumRobotSVG("default"))}</span>
          <div class="status-info">
            <span class="status-text"><strong>${this._getStateLabel()}${this._getAdditionalState() ? `, ${this._getAdditionalStateLabel()}` : ""}</strong></span>
            ${this._getError() ? html`
              <span class="status-error">${this._getError()}</span>
            ` : ""}
          </div>
        </div>
        <div class="control-row cleaning-type-row">
          <label class="cleaning-type-label">${this._t("cleaning_type_label") || "Тип уборки"}:</label>
          <select
            class="cleaning-type-select"
            .value=${this._selectedCleaningType}
            @change=${this._handleCleaningTypeChange}
            ?disabled=${this._isCleaning()}
          >
            <option value="vacuum">${this._t("cleaning_type_vacuum") || "Сухая уборка"}</option>
            <option value="mop">${this._t("cleaning_type_mop") || "Влажная уборка"}</option>
            <option value="vacuum_and_mop">${this._t("cleaning_type_vacuum_and_mop") || "Сухая и влажная уборка"}</option>
          </select>
        </div>
        <div class="control-row">
          ${!isStartDisabled ? html`
            <ha-button 
              class="control-button"
              @click=${this._handleStart}
              title="${this._t("start") || "Запуск"}"
            >
              ▶️ ${this._t("start") || "Запуск"}
            </ha-button>
          ` : ""}
          ${!isStopDisabled ? html`
            <ha-button 
              class="control-button"
              @click=${this._handleStop}
              title="${this._t("stop") || "Остановка"}"
            >
              ⏹️ ${this._t("stop") || "Остановка"}
            </ha-button>
          ` : ""}
          ${!isPauseDisabled ? html`
            <ha-button 
              class="control-button"
              @click=${this._handlePause}
              title="${this._t("pause") || "Пауза"}"
            >
              ⏸️ ${this._t("pause") || "Пауза"}
            </ha-button>
          ` : ""}
          ${!isReturnDisabled ? html`
            <ha-button 
              class="control-button"
              @click=${this._handleReturnToBase}
              title="${this._t("return_to_base") || "На станцию"}"
            >
              🏠 ${this._t("return_to_base") || "На станцию"}
            </ha-button>
          ` : ""}
        </div>
        <div class="control-row rooms-row">
          ${visibleRooms.length > 0 ? html`
            ${(() => {
              const isCleaning = this._isCleaning();
              const isDisabled = isCleaning;
              // Если уборка активна, кнопка "Все комнаты" не нажата (так как выбраны конкретные комнаты)
              // Если уборка не активна, кнопка нажата когда selectedRooms пуст
              const isPressed = !isCleaning && this.selectedRooms.length === 0;
              
              return html`
                <ha-card 
                  class="room-button ${isPressed ? "pressed" : ""} ${isDisabled ? "disabled" : ""}"
                  @click=${isDisabled ? undefined : this._toggleAllRooms}
                  title="${this._t("all_rooms")}${isDisabled ? " (идет уборка)" : ""}"
                >
                  <div class="button-content">
                    <div class="button-icon">${this._renderRoomIcon({ id: 0, name: this._t("all_rooms") })}</div>
                    <div class="button-label">${this._t("all_rooms")}</div>
                  </div>
                  <ha-ripple></ha-ripple>
                </ha-card>
              `;
            })()}
            ${visibleRooms.map((room) => {
              const isCleaning = this._isCleaning();
              const isSelected = this.selectedRooms.includes(room.id);
              // Если уборка активна, показываем выбранными только текущие убираемые комнаты
              // Если уборка не активна, показываем выбранными комнаты, выбранные пользователем
              const isPressed = isCleaning 
                ? this._currentCleaningRooms.includes(room.id)
                : isSelected;
              const isDisabled = isCleaning;
              
              return html`
                <ha-card 
                  class="room-button ${isPressed ? "pressed" : ""} ${isDisabled ? "disabled" : ""}"
                  @click=${isDisabled ? undefined : () => this._toggleRoom(room.id)}
                  title="${room.name}${this.showRoomIds ? ` (ID: ${room.id})` : ""}${isCleaning && this._currentCleaningRooms.includes(room.id) ? " (убирается)" : ""}"
                >
                  <div class="button-content">
                    <div class="button-icon">${this._renderRoomIcon(room)}</div>
                    <div class="button-label">${room.name}</div>
                    ${this.showRoomIds ? html`<div class="button-id">ID: ${room.id}</div>` : ""}
                  </div>
                  <ha-ripple></ha-ripple>
                </ha-card>
              `;
            })}
          ` : html`<div class="content" style="width: 100%; text-align: center; padding: 8px;">${this._t("rooms_not_found")}</div>`}
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .control-panel {
        margin-bottom: 16px;
        padding: 0;
      }
      .control-panel-status {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 12px;
        line-height: 1.4;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 8px;
      }
      .status-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 128px;
        height: 128px;
        flex-shrink: 0;
        transition: transform 0.3s ease;
      }
      .status-icon svg {
        width: 100%;
        height: 100%;
      }
      .status-icon.cleaning {
        animation: vacuum-cleaning 2s ease-in-out infinite;
      }
      @keyframes vacuum-cleaning {
        0%, 100% {
          transform: translateX(0) rotate(0deg);
        }
        25% {
          transform: translateX(4px) rotate(-2deg);
        }
        50% {
          transform: translateX(0) rotate(0deg);
        }
        75% {
          transform: translateX(-4px) rotate(2deg);
        }
      }
      .status-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
      }
      .status-text {
        display: inline-flex;
        align-items: center;
      }
      .status-error {
        display: inline-flex;
        align-items: center;
        color: var(--error-color, var(--state-error-color));
        font-size: 11px;
        font-weight: 500;
        padding: 4px 8px;
        background: var(--error-background-color, rgba(var(--rgb-error-color), 0.1));
        border-radius: var(--ha-card-border-radius, 4px);
        margin-top: 4px;
        word-break: break-word;
      }
      .control-row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }
      .control-row:last-child {
        margin-bottom: 0;
      }
      .cleaning-type-row {
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
      }
      .cleaning-type-label {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
        white-space: nowrap;
      }
      .cleaning-type-select {
        flex: 1;
        padding: 8px 12px;
        border: 2px solid var(--divider-color, var(--ha-card-border-color));
        border-radius: var(--ha-card-border-radius, 4px);
        background: var(--card-background-color, var(--ha-card-background));
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
        cursor: pointer;
        box-sizing: border-box;
      }
      .cleaning-type-select:focus {
        outline: none;
        border-color: var(--primary-color);
      }
      .cleaning-type-select:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .control-button {
        flex: 1;
        min-width: 120px;
        min-height: 56px;
        font-size: 16px;
        padding: 12px 16px;
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      .rooms-row {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid var(--divider-color, var(--ha-card-border-color));
      }
      .room-button {
        flex: 1;
        min-width: 100px;
        max-width: 100%;
        --ha-ripple-color: var(--primary-color, var(--mdc-theme-primary));
        --ha-ripple-hover-color: var(--ha-ripple-color);
        --ha-ripple-pressed-color: var(--ha-ripple-color);
        --ha-ripple-hover-opacity: 0.04;
        --ha-ripple-pressed-opacity: 0.12;
        position: relative;
        cursor: pointer;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: normal;
        min-height: 80px;
        padding: 16px 12px;
        margin: 4px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        touch-action: manipulation;
      }
      .room-button .button-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      }
      .room-button .button-icon {
        font-size: 32px;
        line-height: 1;
        transition: none;
        max-width: 100%;
        max-height: 36px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-text-color);
      }
      .room-button .button-label {
        font-size: 14px;
        font-weight: 500;
        line-height: 1.3;
        text-align: center;
        color: var(--primary-text-color);
        transition: color 0.2s ease;
        width: 100%;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 6px;
        box-sizing: border-box;
      }
      .room-button .button-id {
        font-size: 11px;
        opacity: 0.7;
        line-height: 1;
        font-family: monospace;
        color: var(--secondary-text-color);
        transition: opacity 0.2s ease, color 0.2s ease;
        width: 100%;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 6px;
        box-sizing: border-box;
      }
      .room-button.pressed {
        background: var(--primary-color, var(--mdc-theme-primary)) !important;
      }
      .room-button.disabled {
        pointer-events: none;
        cursor: default;
        opacity: 0.8;
      }
      .room-button.disabled.pressed {
        opacity: 1;
      }
      .room-button.pressed .button-icon {
        color: var(--text-primary-color, var(--mdc-theme-on-primary));
      }
      .room-button.pressed .button-label {
        color: var(--text-primary-color, var(--mdc-theme-on-primary));
        font-weight: 500;
      }
      .room-button.pressed .button-id {
        opacity: 0.9;
        color: var(--text-primary-color, var(--mdc-theme-on-primary));
      }
      .room-button:active:not(.pressed) {
        transform: scale(0.98);
      }
      @media (hover: hover) and (pointer: fine) {
        .room-button:hover:not(.pressed) {
          background: var(--primary-color, var(--mdc-theme-primary));
          opacity: var(--ha-ripple-hover-opacity, 0.04);
        }
      }
      ha-ripple {
        --md-ripple-color: var(--ha-ripple-color);
        --md-ripple-hover-color: var(--ha-ripple-hover-color);
        --md-ripple-pressed-color: var(--ha-ripple-pressed-color);
        --md-ripple-hover-opacity: var(--ha-ripple-hover-opacity);
        --md-ripple-pressed-opacity: var(--ha-ripple-pressed-opacity);
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

