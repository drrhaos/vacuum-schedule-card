/**
 * Форматирует список дней недели в строку
 */
export function formatDays(days: number[], dayNames: string[], translations: {
  noDays: string;
  everyDay: string;
}): string {
  if (days.length === 0) return translations.noDays;
  if (days.length === 7) return translations.everyDay;
  return days.map((d) => dayNames[d]).join(", ");
}

/**
 * Форматирует список комнат в строку
 */
export function formatRooms(
  roomIds: number[],
  rooms: Array<{ id: number; name: string }>,
  allRoomsText: string
): string {
  if (roomIds.length === 0) return allRoomsText;
  const roomNames = roomIds
    .map((id) => {
      const room = rooms.find((r) => r.id === id);
      return room ? room.name : `ID:${id}`;
    })
    .join(", ");
  return roomNames || "Комнаты не выбраны";
}

