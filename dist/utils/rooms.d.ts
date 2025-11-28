import type { HomeAssistant } from "custom-card-helpers";
import type { Room } from "../types";
/**
 * Загружает комнаты из различных источников
 */
export declare function loadRooms(hass: HomeAssistant, entity: string, getTranslation: (key: string) => string): Promise<Room[]>;
