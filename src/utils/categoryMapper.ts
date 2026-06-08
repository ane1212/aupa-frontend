/**
 * Mapea categorías de FastAPI a categorías del frontend
 */

const CATEGORY_MAP: Record<string, string> = {
    // FOOD
    'restaurantes_asadores_sidrerias_bodegas_y_bares_de_pintxos': 'food',
    'Gastronomía general': 'food',
    'pastelerias_y_confiterias': 'food',
    'queserias_conserveras_y_productores': 'food',
    'tiendas_gourmet_y_enotecas': 'food',
    
    // BARS
    'bares_de_pintxos': 'bars',
    
    // CULTURE
    'museos_y_centros_de_interpretacion': 'culture',
    'Auditorios': 'culture',
    'Aquariums': 'culture',
    'patrimonio_cultural_cuevas_y_restos_arqueologicos': 'culture',
    'patrimonio_cultural_edificios_religiosos_castillos_y_estructuras_de_interes': 'culture',
    'patrimonio_y_recursos_culturales': 'culture',
    
    // NATURE
    'espacios_naturales_y_playas': 'nature',
    'Parques naturales': 'nature',
    
    // BEACHES
    'espacios_naturales_y_playas': 'beaches',
    
    // SHOPPING
    'zonas_de_compras': 'shopping',
    'Recintos feriales': 'shopping',
    
    // NIGHTLIFE
    'Casinos': 'nightlife',
    'palacios_de_hielo': 'nightlife',
    
    // FESTIVALS_EVENTS
    'Recintos feriales': 'festivals_events',
    'destinos_turisticos': 'festivals_events',
    
    // HISTORY
    'patrimonio_cultural_edificios_religiosos_castillos_y_estructuras_de_interes': 'history',
    'patrimonio_cultural_cuevas_y_restos_arqueologicos': 'history',
    
    // FAMILY_FRIENDLY
    'parques_de_atracciones_y_tematicos': 'family_friendly',
    'Aquariums': 'family_friendly',
    'hipodromo_y_estadios_de_futbol': 'family_friendly',
    
    // WALKING_TOURS
    'resursos_de_ocio_en_euskadi': 'walking_tours',
    'patrimonio_y_recursos_culturales': 'walking_tours',
    
    // COFFEE_SHOPS
    'pastelerias_y_confiterias': 'coffee_shops',
    
    // LOCAL_FAVORITES
    'productos_de_la_tierra': 'local_favorites',
    'queserias_conserveras_y_productores': 'local_favorites',
    
    // BUDGET_FRIENDLY
    'albergues_turisticos': 'budget_friendly',
    'Campings': 'budget_friendly',
};


export const mapFastAPICategory = (fastapiCategory: string): string => {
    if (!fastapiCategory) return 'local_favorites';
    
    const normalized = fastapiCategory.toLowerCase().trim();
    const mapped = CATEGORY_MAP[normalized];
    
    return mapped || 'local_favorites';
};


export const getAppCategoryFromSubcategory = (subcategory: string): string => {
    return mapFastAPICategory(subcategory);
};

export const mapRecommendationsCategories = (
    recommendations: Array<{ category: string }>
): Array<{ category: string; appCategory: string }> => {
    return recommendations.map(rec => ({
        ...rec,
        appCategory: getAppCategoryFromSubcategory(rec.category),
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