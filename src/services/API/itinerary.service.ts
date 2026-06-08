import { apiClient } from "../http";
import type { PaginatedResponse, PaginationQuery } from "../models";

export interface ItineraryItem {
    id: string;
    userId: string;
    eventId: string;
    itemIndex: number;
    createdAt: string;
    updatedAt: string;
}

export const itineraryService = {
    addEvent: (eventId: string) =>
        apiClient.post<ItineraryItem>('/itinerary/event', { eventId }),

    getMy: (params?: PaginationQuery) =>
        apiClient.get<PaginatedResponse<ItineraryItem>>('/itinerary/mine', params),
}