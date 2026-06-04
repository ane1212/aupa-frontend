import { apiClient } from "../http";
import type { CreateFavoriteForm, Favorite } from "../models";

export const favoriteService = {
    create: (data: CreateFavoriteForm) =>
        apiClient.post<Favorite>('/favorites', data),

    getByUser: (userId: string) =>
        apiClient.get<Favorite[]>(`/favorites/user/${userId}`),

    getById: (id: string) =>
        apiClient.get<Favorite>(`/favorites/${id}`),

    delete: (id: string) =>
        apiClient.delete<void>(`/favorites/${id}`),
}
