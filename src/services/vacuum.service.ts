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

  getAdditionalState(): string | undefined {
    // Извлекаем имя сущности из entity (убираем префикс "vacuum.")
    const entityName = this.entity.replace(/^vacuum\./, "");
    const sensorEntityId = `sensor.${entityName}_state`;
    
    // Проверяем отдельную сущность sensor.{entity_name}_state
    const sensorState = this.hass.states[sensorEntityId];
    if (sensorState && sensorState.state) {
      const stateValue = String(sensorState.state).trim();
      const normalized = stateValue.toLowerCase().replace(/\s+/g, "");
      // Не показываем пустые значения или сообщения об отсутствии ошибок
      const nonErrorValues = ["noerror", "нетешибок", "none", "нет", "null", "undefined", "unknown", "неизвестно", ""];
      if (stateValue && !nonErrorValues.includes(normalized)) {
        return stateValue;
      }
    }
    
    // Если не нашли в отдельной сущности, проверяем атрибуты пылесоса
    const state = this.hass.states[this.entity];
    if (!state || !state.attributes) {
      return undefined;
    }
    const attrs = state.attributes;
    
    // Проверяем различные возможные варианты названия атрибута
    const additionalState = attrs[`${entityName}_state`];
    
    if (typeof additionalState === "string" && additionalState.trim()) {
      const normalized = additionalState.trim().toLowerCase().replace(/\s+/g, "");
      // Не показываем пустые значения или сообщения об отсутствии ошибок
      const nonErrorValues = ["noerror", "нетешибок", "none", "нет", "null", "undefined", "unknown", "неизвестно", ""];
      if (!nonErrorValues.includes(normalized)) {
        return additionalState.trim();
      }
    }
    return undefined;
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
   * Получает сообщение об ошибке из атрибутов пылесоса
   * Возвращает undefined, если ошибки нет или нет конкретного сообщения об ошибке
   */
  getError(): string | undefined {
    const state = this.hass.states[this.entity];
    if (!state || !state.attributes) {
      return undefined;
    }

    const attrs = state.attributes;

    // Список значений, которые не являются реальными ошибками
    const nonErrorValues = [
      "error", "ошибка", 
      "no error", "нет ошибок", "noerror", "нетешибок",
      "none", "нет", "null", "undefined", ""
    ];

    // Проверяем различные возможные атрибуты ошибки
    // Только если есть конкретное сообщение об ошибке
    if (attrs.error) {
      const errorMsg = typeof attrs.error === "string" ? attrs.error : String(attrs.error);
      const normalizedMsg = errorMsg.trim().toLowerCase().replace(/\s+/g, "");
      if (errorMsg && errorMsg.trim() && !nonErrorValues.includes(normalizedMsg)) {
        return errorMsg.trim();
      }
    }

    if (attrs.error_message) {
      const errorMsg = typeof attrs.error_message === "string" ? attrs.error_message : String(attrs.error_message);
      const normalizedMsg = errorMsg.trim().toLowerCase().replace(/\s+/g, "");
      if (errorMsg && errorMsg.trim() && !nonErrorValues.includes(normalizedMsg)) {
        return errorMsg.trim();
      }
    }

    if (attrs.status === "error" && attrs.message) {
      const errorMsg = typeof attrs.message === "string" ? attrs.message : String(attrs.message);
      const normalizedMsg = errorMsg.trim().toLowerCase().replace(/\s+/g, "");
      if (errorMsg && errorMsg.trim() && !nonErrorValues.includes(normalizedMsg)) {
        return errorMsg.trim();
      }
    }
    
    // Проверяем также другие возможные атрибуты
    const otherErrorAttrs = ["error_code", "error_code_str", "last_error"];
    for (const attrName of otherErrorAttrs) {
      if (attrs[attrName]) {
        const errorMsg = typeof attrs[attrName] === "string" ? attrs[attrName] : String(attrs[attrName]);
        const normalizedMsg = errorMsg.trim().toLowerCase().replace(/\s+/g, "");
        if (errorMsg && errorMsg.trim() && !nonErrorValues.includes(normalizedMsg)) {
          return errorMsg.trim();
        }
      }
    }

    // Не показываем общее сообщение "Ошибка" без конкретной информации
    return undefined;
  }

  /**
   * Получает статус задачи из сущности sensor.{entity_name}_task_status
   * Например, для vacuum.pylesos ищет sensor.pylesos_task_status
   */
  getTaskStatus(): string | undefined {
    // Извлекаем имя сущности из entity (убираем префикс "vacuum.")
    const entityName = this.entity.replace(/^vacuum\./, "");
    const sensorEntityId = `sensor.${entityName}_task_status`;
    
    // Проверяем отдельную сущность sensor.{entity_name}_task_status
    const sensorState = this.hass.states[sensorEntityId];
    if (sensorState && sensorState.state) {
      const stateValue = String(sensorState.state).trim();
      if (stateValue && stateValue.toLowerCase() !== "unknown" && stateValue.toLowerCase() !== "none") {
        return stateValue;
      }
    }
    
    return undefined;
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

