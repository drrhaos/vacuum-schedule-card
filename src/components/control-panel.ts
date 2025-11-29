import { LitElement, html, css } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { Room } from "../types";
import { VacuumService } from "../services/vacuum.service";
import { translate } from "../utils/i18n";
import { getVacuumRobotSVG } from "../utils/svg-loader";

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

  connectedCallback(): void {
    super.connectedCallback();
    if (this.hass && this.entity) {
      this._vacuumService = new VacuumService(this.hass, this.entity);
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has("hass") || changedProperties.has("entity")) {
      if (this.hass && this.entity) {
        this._vacuumService = new VacuumService(this.hass, this.entity);
      }
    }
  }

  private _t(key: string): string {
    return translate(key, this.hass);
  }

  private _getVacuumState(): string {
    return this._vacuumService?.getState() || "unknown";
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
      await this._vacuumService.start(this.selectedRooms.length > 0 ? this.selectedRooms : undefined);
      this.dispatchEvent(new CustomEvent("vacuum-started"));
    } catch (error) {
      console.error("[Vacuum Schedule Card] Ошибка запуска уборки:", error);
      this.dispatchEvent(new CustomEvent("error", { detail: { message: `${this._t("error_starting") || "Ошибка запуска"}: ${error}` } }));
    }
  }

  private async _handleStop(): Promise<void> {
    if (!this._vacuumService) return;
    try {
      await this._vacuumService.stop();
      this.dispatchEvent(new CustomEvent("vacuum-stopped"));
    } catch (error) {
      console.error("[Vacuum Schedule Card] Ошибка остановки уборки:", error);
      this.dispatchEvent(new CustomEvent("error", { detail: { message: `${this._t("error_stopping") || "Ошибка остановки"}: ${error}` } }));
    }
  }

  private async _handlePause(): Promise<void> {
    if (!this._vacuumService) return;
    try {
      await this._vacuumService.pause();
      this.dispatchEvent(new CustomEvent("vacuum-paused"));
    } catch (error) {
      console.error("[Vacuum Schedule Card] Ошибка паузы уборки:", error);
      this.dispatchEvent(new CustomEvent("error", { detail: { message: `${this._t("error_pausing") || "Ошибка паузы"}: ${error}` } }));
    }
  }

  private async _handleReturnToBase(): Promise<void> {
    if (!this._vacuumService) return;
    try {
      await this._vacuumService.returnToBase();
      this.dispatchEvent(new CustomEvent("vacuum-returned"));
    } catch (error) {
      console.error("[Vacuum Schedule Card] Ошибка возврата на станцию:", error);
      this.dispatchEvent(new CustomEvent("error", { detail: { message: `${this._t("error_returning") || "Ошибка возврата"}: ${error}` } }));
    }
  }

  private _toggleRoom(roomId: number): void {
    const index = this.selectedRooms.indexOf(roomId);
    if (index > -1) {
      this.dispatchEvent(new CustomEvent("room-toggled", { detail: { roomId, selected: false } }));
    } else {
      this.dispatchEvent(new CustomEvent("room-toggled", { detail: { roomId, selected: true } }));
    }
  }

  private _toggleAllRooms(): void {
    this.dispatchEvent(new CustomEvent("all-rooms-toggled"));
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
          <span class="status-icon">${unsafeHTML(getVacuumRobotSVG("default"))}</span>
          <span class="status-text">Статус: <strong>${this._getStateLabel()}</strong></span>
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
            <ha-button 
              class="room-button ${this.selectedRooms.length === 0 ? "pressed" : ""}"
              @click=${this._toggleAllRooms}
              title="${this._t("all_rooms")}"
            >
              <span class="button-content">
                <span class="button-icon">${this._renderRoomIcon({ id: 0, name: this._t("all_rooms") })}</span>
                <span class="button-label">${this._t("all_rooms")}</span>
              </span>
            </ha-button>
            ${visibleRooms.map((room) => html`
              <ha-button 
                class="room-button ${this.selectedRooms.includes(room.id) ? "pressed" : ""}"
                @click=${() => this._toggleRoom(room.id)}
                title="${room.name}${this.showRoomIds ? ` (ID: ${room.id})` : ""}"
              >
                <span class="button-content">
                  <span class="button-icon">${this._renderRoomIcon(room)}</span>
                  <span class="button-label">${room.name}</span>
                  ${this.showRoomIds ? html`<span class="button-id">${room.id}</span>` : ""}
                </span>
              </ha-button>
            `)}
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
        align-items: center;
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
      }
      .status-icon svg {
        width: 100%;
        height: 100%;
      }
      .status-text {
        display: inline-flex;
        align-items: center;
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
        --mdc-theme-primary: var(--primary-color, var(--mdc-theme-primary));
        --mdc-button-container-shape: var(--ha-card-border-radius, 4px);
        --mdc-button-outline-width: 1px;
        --mdc-button-outline-color: var(--divider-color, var(--ha-card-border-color));
        --mdc-ripple-color: transparent;
        --ha-ripple-color: var(--primary-color, var(--mdc-theme-primary));
        --ha-ripple-hover-color: var(--ha-ripple-color);
        --ha-ripple-pressed-color: var(--ha-ripple-color);
        --ha-ripple-hover-opacity: 0.04;
        --ha-ripple-pressed-opacity: 0.12;
        position: relative;
        transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        border: 1px solid var(--divider-color, var(--ha-card-border-color)) !important;
        border-radius: var(--ha-card-border-radius, 4px) !important;
        background: var(--card-background-color, var(--ha-card-background)) !important;
        box-shadow: none !important;
        padding: 16px 12px !important;
        margin: 4px;
        cursor: pointer;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 80px;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        touch-action: manipulation;
      }
      .room-button::part(button),
      .room-button::part(native-button) {
        background: var(--card-background-color, var(--ha-card-background)) !important;
        border: 1px solid var(--divider-color, var(--ha-card-border-color)) !important;
        box-shadow: none !important;
        border-radius: var(--ha-card-border-radius, 4px) !important;
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .room-button .button-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 16px 12px;
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        min-height: 80px;
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
        --mdc-theme-primary: var(--primary-color, var(--mdc-theme-primary));
        --mdc-button-outline-color: var(--primary-color, var(--mdc-theme-primary));
        background: var(--primary-color, var(--mdc-theme-primary)) !important;
        border-color: var(--primary-color, var(--mdc-theme-primary)) !important;
        box-shadow: none !important;
      }
      .room-button.pressed::part(button),
      .room-button.pressed::part(native-button) {
        background: var(--primary-color, var(--mdc-theme-primary)) !important;
        border-color: var(--primary-color, var(--mdc-theme-primary)) !important;
        box-shadow: none !important;
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
        background: var(--primary-color, var(--mdc-theme-primary)) !important;
        border-color: var(--primary-color, var(--mdc-theme-primary)) !important;
        opacity: var(--ha-ripple-pressed-opacity, 0.12);
      }
      .room-button:active:not(.pressed)::part(button),
      .room-button:active:not(.pressed)::part(native-button) {
        transform: scale(0.98);
        background: var(--primary-color, var(--mdc-theme-primary)) !important;
        border-color: var(--primary-color, var(--mdc-theme-primary)) !important;
        opacity: var(--ha-ripple-pressed-opacity, 0.12);
        width: 100% !important;
        height: 100% !important;
      }
      @media (hover: hover) and (pointer: fine) {
        .room-button:hover:not(.pressed) {
          border-color: var(--primary-color, var(--mdc-theme-primary)) !important;
          background: var(--primary-color, var(--mdc-theme-primary)) !important;
          opacity: var(--ha-ripple-hover-opacity, 0.04);
        }
        .room-button:hover:not(.pressed)::part(button),
        .room-button:hover:not(.pressed)::part(native-button) {
          border-color: var(--primary-color, var(--mdc-theme-primary)) !important;
          background: var(--primary-color, var(--mdc-theme-primary)) !important;
          opacity: var(--ha-ripple-hover-opacity, 0.04);
          width: 100% !important;
          height: 100% !important;
        }
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

