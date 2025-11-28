/**
 * Форматирует список дней недели в строку
 */
export declare function formatDays(days: number[], dayNames: string[], translations: {
    noDays: string;
    everyDay: string;
}): string;
/**
 * Форматирует список комнат в строку
 */
export declare function formatRooms(roomIds: number[], rooms: Array<{
    id: number;
    name: string;
}>, allRoomsText: string): string;
