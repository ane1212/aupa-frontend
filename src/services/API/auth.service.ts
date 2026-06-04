import { apiClient } from "../http";
import type { LoginForm, RegisterForm, User } from "../models";


export const authService = {
    register: (data: RegisterForm) =>
        apiClient.post<{ token: string; user: User }>('/auth/register', data),

    login: (data: LoginForm) =>
        apiClient.post<{ token: string; user: User }>('/auth/login', data),
}
