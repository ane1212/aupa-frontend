import { apiClient } from "../http";
import type { CreateCommentForm, UpdateCommentForm } from "../models";


export const commentService = {
    create: (data: CreateCommentForm) =>
        apiClient.post<Comment>('/comment', data),

    getByEvent: (eventId: string) =>
        apiClient.get<Comment[]>(`/comment/event/${eventId}`),

    getByUser: (userId: string) =>
        apiClient.get<Comment[]>(`/comment/user/${userId}`),

    getById: (id: string) =>
        apiClient.get<Comment>(`/comment/${id}`),

    update: (id: string, data: UpdateCommentForm) =>
        apiClient.patch<Comment>(`/comment/${id}`, data),

    delete: (id: string) =>
        apiClient.delete<void>(`/comment/${id}`),
}
