import { apiClient } from "../http";
import type { RecommendationsResponse } from "../models";

export const fastapiService = {
    nearest: (lat: number, lng: number, top_n: number = 24) =>
        apiClient.get<RecommendationsResponse>(
            `/v1/recommendations/nearest?latitude=${lat}&longitude=${lng}&top_n=${top_n}`
        ),

    byCategory: (category: string, lat: number, lng: number) =>
        apiClient.get<RecommendationsResponse>(
            `/v1/recommendations/category?category=${category}&latitude=${lat}&longitude=${lng}`
        ),

    multi: (categories: string[], lat: number, lng: number) => {
        const params = categories
            .map(cat => `categories=${cat}`)
            .join('&');
        return apiClient.get<RecommendationsResponse>(
            `/v1/recommendations?${params}&latitude=${lat}&longitude=${lng}`
        );
    },
}