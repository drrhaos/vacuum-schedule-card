import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { Schedule, Room } from "../types";
import { formatDays, formatRooms } from "../utils/formatters";
import { translate, getDayNames } from "../utils/i18n";

@customElement("vacuum-schedule-list")
export class ScheduleList extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public schedules: Schedule[] = [];
  @property({ attribute: false }) public rooms: Room[] = [];

  private _t(key: string): string {
    return translate(key, this.hass);
  }

  private _formatDays(days: number[]): string {
    const dayNames = getDayNames(this.hass);
    return formatDays(days, dayNames, {
      noDays: this._t("no_days"),
      everyDay: this._t("every_day"),
    });
  }

  private _formatRooms(roomIds: number[]): string {
    return formatRooms(roomIds, this.rooms, this._t("all_rooms"));
  }

  private _getCleaningTypeLabel(cleaningType: string): string {
    switch (cleaningType) {
      case "mop":
        return this._t("cleaning_type_mop") || "Влажная уборка";
      case "vacuum_and_mop":
        return this._t("cleaning_type_vacuum_and_mop") || "Сухая и влажная уборка";
      case "vacuum":
      default:
        return this._t("cleaning_type_vacuum") || "Сухая уборка";
    }
  }

  private _handleEdit(schedule: Schedule): void {
    this.dispatchEvent(new CustomEvent("schedule-edit", { detail: { schedule } }));
  }

  private _handleDelete(schedule: Schedule): void {
    this.dispatchEvent(new CustomEvent("schedule-delete", { detail: { schedule } }));
  }

  private async _handleToggle(schedule: Schedule, enabled: boolean): Promise<void> {
    this.dispatchEvent(new CustomEvent("schedule-toggle", { detail: { schedule, enabled } }));
  }

  render() {
    if (this.schedules.length === 0) {
      return html`<div class="content">${this._t("no_schedules")}</div>`;
    }

    return html`
      <div class="schedules-list">
        ${this.schedules.map(
          (schedule) => html`
            <div class="schedule-item" @click=${() => this._handleEdit(schedule)}>
              <div class="schedule-info">
                <div class="schedule-time">
                  ${schedule.enabled ? "✅" : "⏸️"} ${schedule.time}
                </div>
                <div class="schedule-days">
                  ${this._formatDays(schedule.days)}
                  ${schedule.rooms.length > 0
                    ? ` • ${this._formatRooms(schedule.rooms)}`
                    : ` • ${this._t("all_rooms")}`}
                  ${schedule.cleaning_type && schedule.cleaning_type !== "vacuum"
                    ? ` • ${this._getCleaningTypeLabel(schedule.cleaning_type)}`
                    : ""}
                </div>
              </div>
              <div class="schedule-actions" @click=${(e: MouseEvent) => e.stopPropagation()}>
                <ha-switch
                  class="toggle-switch"
                  .checked=${schedule.enabled}
                  @change=${(e: Event) => this._handleToggle(schedule, (e.target as HTMLInputElement).checked)}
                ></ha-switch>
                <button
                  class="action-button"
                  @click=${() => this._handleDelete(schedule)}
                  title="Удалить"
                >
                  🗑️
                </button>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }

  static get styles() {
    return css`
      .schedules-list {
        margin-top: 16px;
      }
      .schedule-item {
        padding: 16px;
        margin-bottom: 8px;
        min-height: 64px;
        background: var(--card-background-color, var(--ha-card-background));
        border: 1px solid var(--divider-color, var(--ha-card-border-color));
        border-radius: var(--ha-card-border-radius, 4px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.2s ease;
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      @media (hover: hover) and (pointer: fine) {
        .schedule-item:hover {
          background: var(--divider-color, var(--ha-card-border-color));
          opacity: 0.8;
        }
      }
      .schedule-item:active {
        background: var(--divider-color, var(--ha-card-border-color));
        opacity: 0.6;
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
        padding: 12px;
        min-width: 44px;
        min-height: 44px;
        color: var(--secondary-text-color);
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      @media (hover: hover) and (pointer: fine) {
        .action-button:hover {
          color: var(--primary-color);
        }
      }
      .action-button:active {
        color: var(--primary-color);
        opacity: 0.7;
      }
      .toggle-switch {
        margin-right: 12px;
        min-width: 48px;
        min-height: 24px;
      }
      .schedule-info {
        flex: 1;
      }
      .schedule-time {
        font-weight: 500;
        font-size: 16px;
        line-height: 1.5;
        color: var(--primary-text-color);
      }
      .schedule-days {
        font-size: 13px;
        color: var(--secondary-text-color);
        margin-top: 4px;
        line-height: 1.4;
      }
      .content {
        color: var(--primary-text-color);
        font-size: 14px;
        line-height: 1.5;
      }
    `;
  }
}

