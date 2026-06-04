import { apiClient } from "../http";
import type { CreateLocalForm, Local, UpdateLocalForm } from "../models";

export const localService = {
    create: (data: CreateLocalForm) =>
        apiClient.post<Local>('/local', data),

    getMine: () =>
        apiClient.get<Local>('/local/mine'),

    update: (data: UpdateLocalForm) =>
        apiClient.put<Local>('/local', data),

    getById: (id: string) =>
        apiClient.get<Local>(`/local/${id}`),

    // Admin
    getAll: () =>
        apiClient.get<Local[]>('/local'),

    verify: (id: string, status: string, reason?: string) =>
        apiClient.patch<Local>(`/local/${id}/verify`, { status, reason }),

    delete: (id: string) =>
        apiClient.delete<void>(`/local/${id}`),
}
