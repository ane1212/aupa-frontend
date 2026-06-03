import { apiClient } from "../http";
import type { CreatePreferenceForm, Preference } from "../models";

export const preferenceService = {
    create: (data: CreatePreferenceForm) =>
        apiClient.post<Preference>('/preference', data),

    getByUser: (userId: string) =>
        apiClient.get<Preference[]>(`/preference/user/${userId}`),

    getById: (id: string) =>
        apiClient.get<Preference>(`/preference/${id}`),

    delete: (id: string) =>
        apiClient.delete<void>(`/preference/${id}`),

    getRecommendations: (lat: number, len: number) =>
        apiClient.get<unknown>(`/preference/recommendations?lat=${lat}&len=${len}`),
}
