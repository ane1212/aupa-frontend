import { apiClient } from "../http";
import type { CreateFavoriteForm, Favorite, PaginatedResponse, PaginationQuery } from "../models";

export const favoriteService = {
    create: (data: CreateFavoriteForm) =>
        apiClient.post<Favorite>('/favorites', data),

    getByUser: (userId: string, params?: PaginationQuery) =>
        apiClient.get<PaginatedResponse<Favorite>>(`/favorites/user/${userId}`, params),

    getById: (id: string) =>
        apiClient.get<Favorite>(`/favorites/${id}`),

    delete: (id: string) =>
        apiClient.delete<void>(`/favorites/${id}`),
}
