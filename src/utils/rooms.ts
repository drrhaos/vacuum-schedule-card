import type { HomeAssistant } from "custom-card-helpers";
import type { Room } from "../types";
import { getAllEntitiesFromAPI } from "./api";

/**
 * Загружает комнаты из различных источников
 */
export async function loadRooms(
  hass: HomeAssistant,
  entity: string,
  getTranslation: (key: string) => string
): Promise<Room[]> {
  try {
    // Получаем все сущности через API как дополнительный источник
    const apiEntities = await getAllEntitiesFromAPI(hass);

    // Извлекаем базовое имя entity (например, из vacuum.xiaomi_m30s получаем xiaomi_m30s)
    const entityName = entity.replace("vacuum.", "");

    // Ищем select-сущности для комнат (например, select.pylesos_room_1_name)
    // Паттерн: select.{entity_prefix}_room_{id}_name
    const roomEntities: Room[] = [];

    // Пробуем разные префиксы
    const possiblePrefixes = [
      entityName,
      entityName.replace(/_/g, ""),
      "pylesos", // как в примере
      "vacuum",
    ];

    // Функция для получения состояния сущности (из hass.states или из API)
    const getEntityState = (entityId: string) => {
      return hass.states[entityId] || apiEntities?.[entityId] || null;
    };

    for (const prefix of possiblePrefixes) {
      // Ищем сущности вида select.{prefix}_room_{id}_name
      for (let i = 1; i <= 50; i++) {
        const roomNameEntity = `select.${prefix}_room_${i}_name`;
        const roomIdEntity = `select.${prefix}_room_${i}_id` || `number.${prefix}_room_${i}_id`;

        const nameState = getEntityState(roomNameEntity);
        const idState = getEntityState(roomIdEntity);

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
      return roomEntities.sort((a, b) => a.id - b.id);
    }

    // Пытаемся получить комнаты из атрибутов пылесоса
    const state = hass.states[entity];
    if (state?.attributes) {
      const segments = state.attributes.segments || state.attributes.room_list || [];

      if (Array.isArray(segments) && segments.length > 0) {
        return segments.map((room: any) => ({
          id: typeof room === "number" ? room : room.id || room.segment_id,
          name:
            typeof room === "object" && room.name
              ? room.name
              : `Комната ${typeof room === "number" ? room : room.id || room.segment_id}`,
        }));
      }
    }

    // Если не нашли, используем стандартные комнаты
    return getDefaultRooms(getTranslation);
  } catch (error) {
    console.error("Ошибка загрузки комнат:", error);
    // Используем стандартные комнаты
    return getDefaultRooms(getTranslation);
  }
}

/**
 * Возвращает стандартные комнаты по умолчанию
 */
function getDefaultRooms(getTranslation: (key: string) => string): Room[] {
  const roomNames = getTranslation("room_names").split(",");
  return [
    { id: 16, name: roomNames[0] || "Living Room" },
    { id: 17, name: roomNames[1] || "Bedroom" },
    { id: 18, name: roomNames[2] || "Kitchen" },
    { id: 19, name: roomNames[3] || "Bathroom" },
  ];
}

