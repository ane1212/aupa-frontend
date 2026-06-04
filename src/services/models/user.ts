export const UserRole = {
    SUPER_ADMIN: 'superAdmin',
    USER: 'usuario',
    LOCAL: 'local'
} as const

export type UserRole = typeof UserRole[keyof typeof UserRole]

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
    avatar?: string
    active: boolean
    createdAt?: string
    updatedAt?: string
}

export interface RegisterForm {
    name: string
    email: string
    password: string
    passwordRepeat: string
}

export interface LoginForm {
    email: string
    password: string
}

export interface UpdateUserForm {
    name?: string
    avatar?: string
}