/**
 * Mapea categorías de FastAPI a categorías del frontend
 * Actualizado con las nuevas categorías (June 2026)
 * Mapea las descripciones humanas manteniendo case y símbolos originales
 */

const CATEGORY_MAP: Record<string, string> = {
    // CULINARIO -> food
    'Culinario': 'food',
    'Restaurantes / Asadores / Sidrerías': 'food',
    'Pastelerías y confiterías': 'food',
    'Gastronomía general': 'food',
    'Platos típicos': 'food',
    'Queserías / Conserveras / Productores': 'food',
    
    // CULINARIO -> bars
    'Bares de pintxos': 'bars',
    
    // CULINARIO -> local_favorites
    'Productos de la tierra': 'local_favorites',
    
    // CULTURAL -> culture
    'Cultural': 'culture',
    'Museos y centros de interpretación': 'culture',
    'Edificios religiosos / Castillos': 'culture',
    'Recursos culturales generales': 'culture',
    'Auditorios': 'culture',
    'Palacios de congresos': 'culture',
    
    // CULTURAL -> history
    'Cuevas y restos arqueológicos': 'history',
    
    // CULTURAL -> family_friendly
    'Hipódromos y estadios': 'family_friendly',
    
    // NATURALEZA -> nature
    'Naturaleza': 'nature',
    'Espacios naturales': 'nature',
    'Parques naturales': 'nature',
    'Rutas y paseos': 'nature',
    'Centros BTT': 'nature',
    'Puertos pesqueros': 'nature',
    
    // NATURALEZA -> beaches
    'Playas': 'beaches',
    
    // OCIO -> nightlife
    'Ocio': 'nightlife',
    'Ocio general': 'nightlife',
    'Recursos deportivos': 'nightlife',
    'Turismo activo (kayak, surf, escalada...)': 'family_friendly',
    'Alquiler deportivo': 'nightlife',
    'Golf': 'nightlife',
    'Puertos deportivos / Náutica': 'nightlife',
    'Palacios de hielo': 'nightlife',
    'Parques de atracciones': 'family_friendly',
    'Aquariums': 'family_friendly',
    'Casinos': 'nightlife',
    'Turismo de salud / Spas / Balnearios': 'nightlife',
    
    // COMPRAS -> shopping
    'Compras': 'shopping',
    'Zonas de compras (comercio local)': 'shopping',
    
    // COMPRAS -> festivals_events
    'Recintos feriales': 'festivals_events',
    
    // ALOJAMIENTO -> budget_friendly
    'Alojamiento': 'budget_friendly',
    'Hoteles': 'budget_friendly',
    'Alojamientos rurales': 'budget_friendly',
    'Albergues': 'budget_friendly',
    'Campings': 'budget_friendly',
    
    // SERVICIOS -> local_favorites
    'Servicios': 'local_favorites',
    'Oficinas de turismo': 'local_favorites',
    
    // SERVICIOS -> festivals_events
    'Destinos turísticos (POIs generales)': 'festivals_events',
};


export const mapFastAPICategory = (fastapiCategory: string): string => {
    if (!fastapiCategory) return 'local_favorites';
    
    const trimmed = fastapiCategory.trim();
    const mapped = CATEGORY_MAP[trimmed];
    
    return mapped || 'local_favorites';
};


export const getAppCategoryFromSubcategory = (subcategory: string): string => {
    return mapFastAPICategory(subcategory);
};


export const mapRecommendationsCategories = (
    recommendations: Array<{ sub_category: string }>
): Array<{ category: string; appCategory: string }> => {
    return recommendations.map(rec => ({
        ...rec,
        appCategory: getAppCategoryFromSubcategory(rec.sub_category),
    }));
};


export const getMappedCategories = (): string[] => {
    return [
        'food', 'culture', 'nature', 'bars', 'local_favorites',
        'shopping', 'coffee_shops', 'walking_tours', 'family_friendly',
        'vegetarian_vegan', 'history', 'festivals_events', 'beaches',
        'nightlife', 'budget_friendly',
    ];
};