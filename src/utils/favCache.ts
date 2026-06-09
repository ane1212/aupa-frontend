const KEY = 'aupa_fav_map';

const getMap = (): Record<string, string> => {
    try { return JSON.parse(localStorage.getItem(KEY) ?? '{}'); } catch { return {}; }
};

const save = (map: Record<string, string>) => {
    localStorage.setItem(KEY, JSON.stringify(map));
};

export const isInFavCache = (eventId: string) => eventId in getMap();
export const getFavItemId = (eventId: string) => getMap()[eventId];

export const addToFavCache = (eventId: string, favId: string) => {
    const m = getMap();
    m[eventId] = favId;
    save(m);
};

export const removeFromFavCache = (eventId: string) => {
    const m = getMap();
    delete m[eventId];
    save(m);
};
