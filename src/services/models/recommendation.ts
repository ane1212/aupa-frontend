export interface Recommendation {
    name: string;
    description: string;
    local_score: number;
    sub_category: string;
    google_rating: number;
    id?: string;
    distance_from_user?: number;
    latitude?: number;
    longitude?: number;
    address?: string;
    image?: string;
    price?: number;
    reviews?: { author?: string; rating?: number; text?: string }[];
}

export interface RecommendationsResponse {
    recommendations: Recommendation[];
}

export interface RecommendationsQuery {
    lat: number;
    lng: number;
    top_n?: number;
    category?: string;
    categories?: string[];
}