// localStorage cache: { [eventId]: itineraryItemId }
const KEY = 'aupa_trip_map';

const getMap = (): Record<string, string> => {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
    catch { return {}; }
};

export const isInTripCache = (eventId: string) => eventId in getMap();

export const getTripItemId = (eventId: string) => getMap()[eventId];

export const addToTripCache = (eventId: string, itemId: string) => {
    try { const m = getMap(); m[eventId] = itemId; localStorage.setItem(KEY, JSON.stringify(m)); } catch {}
};

export const removeFromTripCache = (eventId: string) => {
    try { const m = getMap(); delete m[eventId]; localStorage.setItem(KEY, JSON.stringify(m)); } catch {}
};
