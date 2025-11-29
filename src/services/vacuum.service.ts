import type { HomeAssistant } from "custom-card-helpers";

export interface VacuumControl {
  start(rooms?: number[]): Promise<void>;
  stop(): Promise<void>;
  pause(): Promise<void>;
  returnToBase(): Promise<void>;
}

export class VacuumService implements VacuumControl {
  constructor(
    private hass: HomeAssistant,
    private entity: string
  ) {}

  async start(rooms?: number[]): Promise<void> {
    if (rooms && rooms.length > 0) {
      await this.hass.callService("dreame_vacuum", "vacuum_clean_segment", {
        entity_id: this.entity,
        segments: rooms,
      });
    } else {
      await this.hass.callService("vacuum", "start", {
        entity_id: this.entity,
      });
    }
  }

  async stop(): Promise<void> {
    await this.hass.callService("vacuum", "stop", {
      entity_id: this.entity,
    });
  }

  async pause(): Promise<void> {
    await this.hass.callService("vacuum", "pause", {
      entity_id: this.entity,
    });
  }

  async returnToBase(): Promise<void> {
    await this.hass.callService("vacuum", "return_to_base", {
      entity_id: this.entity,
    });
  }

  getState(): string {
    const state = this.hass.states[this.entity];
    return state?.state || "unknown";
  }

  isButtonDisabled(buttonType: "start" | "stop" | "pause" | "return", vacuumState: string): boolean {
    switch (buttonType) {
      case "start":
        return vacuumState === "cleaning" || vacuumState === "returning";
      case "stop":
        return vacuumState === "idle" || vacuumState === "docked" || 
               vacuumState === "returning" || vacuumState === "unknown";
      case "pause":
        return vacuumState !== "cleaning";
      case "return":
        return vacuumState === "docked" || vacuumState === "returning";
      default:
        return false;
    }
  }

  getStateLabel(state: string): string {
    const labels: Record<string, string> = {
      "cleaning": "Уборка",
      "docked": "На базе",
      "idle": "Ожидание",
      "paused": "На паузе",
      "returning": "Возврат на базу",
      "error": "Ошибка",
      "unknown": "Неизвестно"
    };
    return labels[state] || state;
  }

  /**
   * Получает список ID комнат, которые сейчас убираются
   * Проверяет различные возможные атрибуты пылесоса
   */
  getCurrentCleaningRooms(): number[] {
    const state = this.hass.states[this.entity];
    if (!state || !state.attributes) {
      return [];
    }

    const attrs = state.attributes;

    // Проверяем различные возможные атрибуты
    // 1. current_segments (массив ID сегментов)
    if (Array.isArray(attrs.current_segments)) {
      return attrs.current_segments.filter((id: any) => typeof id === "number");
    }

    // 2. current_segment (одиночный ID)
    if (typeof attrs.current_segment === "number") {
      return [attrs.current_segment];
    }

    // 3. cleaning_segments
    if (Array.isArray(attrs.cleaning_segments)) {
      return attrs.cleaning_segments.filter((id: any) => typeof id === "number");
    }

    // 4. active_segments
    if (Array.isArray(attrs.active_segments)) {
      return attrs.active_segments.filter((id: any) => typeof id === "number");
    }

    // 5. segment (старое название)
    if (typeof attrs.segment === "number") {
      return [attrs.segment];
    }

    // 6. segments (массив)
    if (Array.isArray(attrs.segments)) {
      return attrs.segments.filter((id: any) => typeof id === "number");
    }

    return [];
  }
}

