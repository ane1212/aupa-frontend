import { apiClient } from "../http";
import type { PaginatedResponse, PaginationQuery } from "../models";
import type { Event } from "../models";

export interface ItineraryItem {
    id: string;
    userId: string;
    eventId: string;
    itemIndex: number;
    createdAt: string;
    updatedAt: string;
}

export interface ItineraryItemWithEvent extends ItineraryItem {
    event?: Event;
}

export interface ReorderItineraryItemDto {
    id: string;
    itemIndex: number;
}

export const itineraryService = {
    addEvent: (eventId: string) =>
        apiClient.post<ItineraryItem>('/itinerary', { eventId }),

    getMy: (params?: PaginationQuery) =>
        apiClient.get<PaginatedResponse<ItineraryItem>>('/itinerary/mine', params),

    reorder: (items: ReorderItineraryItemDto[]) =>
        apiClient.patch<ItineraryItem[]>('/itinerary/reorder', { items }),

    updateIndex: (id: string, itemIndex: number) =>
        apiClient.patch<ItineraryItem>(`/itinerary/${id}/index`, { itemIndex }),

    remove: (id: string) =>
        apiClient.delete<{ code: string }>(`/itinerary/${id}`),
}
