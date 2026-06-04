import { apiClient } from "../http";
import type { Comment, CreateCommentForm, UpdateCommentForm, PaginatedResponse, PaginationQuery } from "../models";


export const commentService = {
    create: (data: CreateCommentForm) =>
        apiClient.post<Comment>('/comment', data),

    getByEvent: (eventId: string, params?: PaginationQuery) =>
        apiClient.get<PaginatedResponse<Comment>>(`/comment/event/${eventId}`, params),

    getByUser: (userId: string, params?: PaginationQuery) =>
        apiClient.get<PaginatedResponse<Comment>>(`/comment/user/${userId}`, params),

    getById: (id: string) =>
        apiClient.get<Comment>(`/comment/${id}`),

    update: (id: string, data: UpdateCommentForm) =>
        apiClient.patch<Comment>(`/comment/${id}`, data),

    delete: (id: string) =>
        apiClient.delete<void>(`/comment/${id}`),
}
