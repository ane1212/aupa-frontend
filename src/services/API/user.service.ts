import { apiClient } from "../http";
import type { UpdateUserForm, User } from "../models";


export const userService = {
    getProfile: () =>
        apiClient.get<User>('/user/profile'),

    updateProfile: (data: UpdateUserForm) =>
        apiClient.put<User>('/user/profile', data),

    updateAvatar: (avatar: string) =>
        apiClient.patch<User>('/user/profile/avatar', { avatar }),

    deleteProfile: () =>
        apiClient.delete<void>('/user/profile'),

    getAllUsers: () =>
        apiClient.get<User[]>('/user'),

    getUserById: (id: string) =>
        apiClient.get<User>(`/user/${id}`),

    toggleActive: (id: string) =>
        apiClient.patch<User>(`/user/${id}/active`),

    updateRole: (id: string, role: string) =>
        apiClient.patch<User>(`/user/${id}/role`, { role }),
}
