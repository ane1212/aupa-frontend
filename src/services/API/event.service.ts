import { apiClient } from "../http";
import type { Event, CreateEventForm, UpdateEventForm, PaginatedResponse, PaginationQuery } from "../models";


export const eventService = {
    getAll: (params?: PaginationQuery) =>
        apiClient.get<PaginatedResponse<Event>>('/event', params),

    getById: (id: string) =>
        apiClient.get<Event>(`/event/${id}`),

    create: (data: CreateEventForm) =>
        apiClient.post<Event>('/event', data),

    update: (id: string, data: UpdateEventForm) =>
        apiClient.put<Event>(`/event/${id}`, data),

    toggleActive: (id: string) =>
        apiClient.patch<Event>(`/event/${id}/active`),

    delete: (id: string) =>
        apiClient.delete<void>(`/event/${id}`),
}
