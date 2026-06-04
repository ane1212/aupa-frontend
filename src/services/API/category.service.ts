import { apiClient } from "../http";
import type { Category, CreateCategoryForm, UpdateCategoryForm } from "../models";

export const categoryService = {
    getAll: () =>
        apiClient.get<Category[]>('/category'),

    getById: (id: string) =>
        apiClient.get<Category>(`/category/${id}`),

    // Admin
    create: (data: CreateCategoryForm) =>
        apiClient.post<Category>('/category', data),

    update: (id: string, data: UpdateCategoryForm) =>
        apiClient.put<Category>(`/category/${id}`, data),

    delete: (id: string) =>
        apiClient.delete<void>(`/category/${id}`),
}
