const KEY = 'aupa_fav_map';
const META_KEY = 'aupa_fav_meta';

export interface FavMeta {
    name: string;
    image: string;
    category?: string;
    score: number;
    distance?: string;
}

const getMap = (): Record<string, string> => {
    try { return JSON.parse(localStorage.getItem(KEY) ?? '{}'); } catch { return {}; }
};

const save = (map: Record<string, string>) => {
    localStorage.setItem(KEY, JSON.stringify(map));
};

const getMeta = (): Record<string, FavMeta> => {
    try { return JSON.parse(localStorage.getItem(META_KEY) ?? '{}'); } catch { return {}; }
};

export const isInFavCache = (eventId: string) => eventId in getMap();
export const getFavItemId = (eventId: string) => getMap()[eventId];
export const getFavMeta = (eventId: string): FavMeta | undefined => getMeta()[eventId];

export const addToFavCache = (eventId: string, favId: string, meta?: FavMeta) => {
    const m = getMap();
    m[eventId] = favId;
    save(m);
    if (meta) {
        const mm = getMeta();
        mm[eventId] = meta;
        localStorage.setItem(META_KEY, JSON.stringify(mm));
    }
};

export const removeFromFavCache = (eventId: string) => {
    const m = getMap();
    delete m[eventId];
    save(m);
    const mm = getMeta();
    delete mm[eventId];
    localStorage.setItem(META_KEY, JSON.stringify(mm));
};
