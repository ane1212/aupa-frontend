import { apiClient } from "../http";
import type { UpdateUserForm, User, PaginatedResponse, PaginationQuery } from "../models";


export const userService = {
    getProfile: () =>
        apiClient.get<User>('/user/profile'),

    updateProfile: (data: UpdateUserForm) =>
        apiClient.put<User>('/user/profile', data),

    updateAvatar: (avatar: string) =>
        apiClient.patch<User>('/user/profile/avatar', { avatar }),

    deleteProfile: () =>
        apiClient.delete<void>('/user/profile'),

    create: (data: Record<string, string>) =>
        apiClient.post<User>('/auth/register', data),

    getAllUsers: (params?: PaginationQuery) =>
        apiClient.get<PaginatedResponse<User>>('/user', params),

    getUserById: (id: string) =>
        apiClient.get<User>(`/user/${id}`),

    toggleActive: (id: string) =>
        apiClient.patch<User>(`/user/${id}/active`),

    updateRole: (id: string, role: string) =>
        apiClient.patch<User>(`/user/${id}/role`, { role }),
}