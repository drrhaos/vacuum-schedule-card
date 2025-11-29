import type { HomeAssistant } from "custom-card-helpers";
import type { Room } from "../types";
import { getAllEntitiesFromAPI } from "./api";

/**
 * Получает иконку из entity Home Assistant
 */
async function getEntityIcon(hass: HomeAssistant, entityId: string): Promise<string | undefined> {
  try {
    // Сначала проверяем в hass.states
    const state = hass.states[entityId];
    if (state?.attributes?.icon) {
      return state.attributes.icon;
    }

    // Пытаемся получить из entity registry
    try {
      const entityRegistry = await hass.callWS<{ icon?: string }>({
        type: "config/entity_registry/get",
        entity_id: entityId,
      });
      if (entityRegistry?.icon) {
        return entityRegistry.icon;
      }
    } catch (e) {
      // Игнорируем ошибки получения из registry
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
}

/**
 * Загружает комнаты из различных источников
 */
export async function loadRooms(
  hass: HomeAssistant,
  entity: string,
  getTranslation: (key: string) => string,
  roomIcons?: Record<number, string | { entity_id: string }>
): Promise<Room[]> {
  try {
    // Получаем все сущности через API как дополнительный источник
    const apiEntities = await getAllEntitiesFromAPI(hass);

    // Извлекаем базовое имя entity (например, из vacuum.xiaomi_m30s получаем xiaomi_m30s)
    const entityName = entity.replace("vacuum.", "");

    // Ищем select-сущности для комнат (например, select.{entity_name}_room_1_name)
    // Паттерн: select.{entity_prefix}_room_{id}_name
    const roomEntities: Room[] = [];

    // Пробуем разные префиксы
    const possiblePrefixes = [
      entityName,
      entityName.replace(/_/g, ""),
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
            const room: Room = {
              id: roomId,
              name: nameState.state,
            };

            // Сначала пытаемся получить иконку из самой select-сущности (select.pylesos_room_1_name)
            const iconFromSelectEntity = await getEntityIcon(hass, roomNameEntity);
            if (iconFromSelectEntity) {
              room.icon = iconFromSelectEntity;
              room.entity_id = roomNameEntity;
            }

            // Проверяем, есть ли переопределение иконки в конфигурации (имеет приоритет)
            if (roomIcons && roomIcons[roomId]) {
              const iconConfig = roomIcons[roomId];
              if (typeof iconConfig === "string") {
                // Прямая иконка (emoji или mdi:icon) - переопределяет иконку из entity
                room.icon = iconConfig;
              } else if (iconConfig.entity_id) {
                // Иконка из указанного entity - переопределяет иконку из select-сущности
                room.entity_id = iconConfig.entity_id;
                const icon = await getEntityIcon(hass, iconConfig.entity_id);
                if (icon) {
                  room.icon = icon;
                }
              }
            } else if (!room.icon) {
              // Если иконка не найдена в select-сущности и нет переопределения,
              // пытаемся найти entity для комнаты по имени
              const roomNameLower = nameState.state.toLowerCase().replace(/\s+/g, "_");
              const possibleEntities = [
                `zone.${roomNameLower}`,
                `sensor.${roomNameLower}`,
                `input_select.${roomNameLower}`,
                `input_text.${roomNameLower}`,
              ];

              for (const possibleEntity of possibleEntities) {
                const icon = await getEntityIcon(hass, possibleEntity);
                if (icon) {
                  room.icon = icon;
                  room.entity_id = possibleEntity;
                  break;
                }
              }
            }

            roomEntities.push(room);
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
        const rooms: Room[] = [];
        for (const room of segments) {
          const roomId = typeof room === "number" ? room : room.id || room.segment_id;
          const roomName =
            typeof room === "object" && room.name
              ? room.name
              : `Комната ${roomId}`;

          const roomData: Room = {
            id: roomId,
            name: roomName,
          };

          // Проверяем, есть ли переопределение иконки в конфигурации
          if (roomIcons && roomIcons[roomId]) {
            const iconConfig = roomIcons[roomId];
            if (typeof iconConfig === "string") {
              roomData.icon = iconConfig;
            } else if (iconConfig.entity_id) {
              roomData.entity_id = iconConfig.entity_id;
              const icon = await getEntityIcon(hass, iconConfig.entity_id);
              if (icon) {
                roomData.icon = icon;
              }
            }
          }

          rooms.push(roomData);
        }
        return rooms;
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

