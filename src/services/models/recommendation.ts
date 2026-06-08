export interface Recommendation {
    name: string;
    description: string;
    local_score: number;
    category: string;
    google_rating: number;
    id?: string;
    distance?: number;
    latitude?: number;
    longitude?: number;
    address?: string;
    image?: string;
    price?: number;
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