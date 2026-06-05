import { apiClient } from "../http";
import type { CreatePreferenceForm, Preference, PaginatedResponse, PaginationQuery } from "../models";

export const preferenceService = {
    create: (data: CreatePreferenceForm) =>
        apiClient.post<Preference>('/preference', data),

    getByUser: (userId: string, params?: PaginationQuery) =>
        apiClient.get<PaginatedResponse<Preference>>(`/preference/user/${userId}`, params),

    getById: (id: string) =>
        apiClient.get<Preference>(`/preference/${id}`),

    delete: (id: string) =>
        apiClient.delete<void>(`/preference/${id}`),

    getRecommendations: (lat: number, len: number) =>
        apiClient.get<unknown>(`/preference/recommendations?lat=${lat}&len=${len}`),
}
