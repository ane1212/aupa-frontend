const KEY = 'aupa_trip_map';
const META_KEY = 'aupa_trip_meta';

export interface TripMeta {
    name: string;
    image: string;
    category?: string;
    score: number;
    distance?: string;
}

const getMap = (): Record<string, string> => {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
    catch { return {}; }
};

const getMeta = (): Record<string, TripMeta> => {
    try { return JSON.parse(localStorage.getItem(META_KEY) ?? '{}'); } catch { return {}; }
};

export const isInTripCache = (eventId: string) => eventId in getMap();
export const getTripItemId = (eventId: string) => getMap()[eventId];
export const getTripMeta = (eventId: string): TripMeta | undefined => getMeta()[eventId];

export const addToTripCache = (eventId: string, itemId: string, meta?: TripMeta) => {
    try {
        const m = getMap(); m[eventId] = itemId; localStorage.setItem(KEY, JSON.stringify(m));
        if (meta) { const mm = getMeta(); mm[eventId] = meta; localStorage.setItem(META_KEY, JSON.stringify(mm)); }
    } catch {}
};

export const removeFromTripCache = (eventId: string) => {
    try {
        const m = getMap(); delete m[eventId]; localStorage.setItem(KEY, JSON.stringify(m));
        const mm = getMeta(); delete mm[eventId]; localStorage.setItem(META_KEY, JSON.stringify(mm));
    } catch {}
};
