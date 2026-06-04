import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { LoginForm, RegisterForm, User } from "../services/models"
import { authService, userService } from "../services/API"


interface AuthContextType {
    user: User | null
    token: string | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (data: LoginForm) => Promise<void>
    register: (data: RegisterForm) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (token) {
            fetchProfile()
        } else {
            setIsLoading(false)
        }
    }, [token])

    const fetchProfile = async () => {
        try {
            const user = await userService.getProfile()
            setUser(user)
        } catch {
            setIsLoading(false)
        }
    }

    const login = async (data: LoginForm) => {
        const res = await authService.login(data)
        localStorage.setItem('token', res.token)
        setToken(res.token)
    }

    const register = async (data: RegisterForm) => {
        await authService.register(data)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isLoading,
            isAuthenticated: !!user,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
    return context
}