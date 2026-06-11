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
    'Ocio': 'walking_tours',
    'Ocio general': 'walking_tours',
    'Recursos deportivos': 'walking_tours',
    'Turismo activo (kayak, surf, escalada...)': 'family_friendly',
    'Alquiler deportivo': 'walking_tours',
    'Golf': 'family_friendly',
    'Puertos deportivos / Náutica': 'family_friendly',
    'Palacios de hielo': 'family_friendly',
    'Parques de atracciones': 'family_friendly',
    'Aquariums': 'family_friendly',
    'Casinos': 'local_favorites',
    'Turismo de salud / Spas / Balnearios': 'local_favorites',
    
    // COMPRAS -> shopping
    'Compras': 'shopping',
    'Zonas de compras (comercio local)': 'shopping',
    
    // COMPRAS -> festivals_events
    'Recintos feriales': 'culture',

    'Alojamiento': 'local_favorites',
    'Hoteles': 'local_favorites',
    'Alojamientos rurales': 'nature',
    'Albergues': 'local_favorites',
    'Campings': 'nature',
    
    // SERVICIOS -> local_favorites
    'Servicios': 'local_favorites',
    'Oficinas de turismo': 'local_favorites',
    
    // SERVICIOS -> festivals_events
    'Destinos turísticos (POIs generales)': 'local_favorites',
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
        category: mapFastAPICategory(rec.sub_category), // o otro valor según tu lógica
        appCategory: getAppCategoryFromSubcategory(rec.sub_category),
    }))
}


export const getMappedCategories = (): string[] => {
    return [
        'food', 'culture', 'nature', 'bars', 'local_favorites',
        'shopping', 'walking_tours', 'family_friendly',
         'history', 'beaches',
    ];
};