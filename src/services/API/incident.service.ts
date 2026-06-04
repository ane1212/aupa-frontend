import { apiClient } from "../http";
import type { Incident, CreateIncidentForm, PaginatedResponse, PaginationQuery } from "../models";

export const incidentService = {
    create: (data: CreateIncidentForm) =>
        apiClient.post<Incident>('/incident', data),

    getByEvent: (eventId: string, params?: PaginationQuery) =>
        apiClient.get<PaginatedResponse<Incident>>(`/incident/event/${eventId}`, params),

    getByUser: (userId: string, params?: PaginationQuery) =>
        apiClient.get<PaginatedResponse<Incident>>(`/incident/user/${userId}`, params),

    getById: (id: string) =>
        apiClient.get<Incident>(`/incident/${id}`),

    updateStatus: (id: string, status: string) =>
        apiClient.patch<Incident>(`/incident/${id}/status`, { status }),

    delete: (id: string) =>
        apiClient.delete<void>(`/incident/${id}`),
}
