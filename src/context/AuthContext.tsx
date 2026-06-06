import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { LoginForm, RegisterForm, User } from "../services/models"
import { authService, userService } from "../services/API"


interface AuthContextType {
    user: User | null
    token: string | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (data: LoginForm) => Promise<User>
    register: (data: RegisterForm) => Promise<void>
    refreshUser: () => Promise<User | null>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadUser = async () => {
            if (!token) {
                setUser(null);
                setIsLoading(false);
                return;
            }

            try {
                const currentUser = await userService.getProfile();
                localStorage.setItem('user', JSON.stringify(currentUser));
                setUser(currentUser);
            } catch {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    try {
                        setUser(JSON.parse(storedUser));
                    } catch {
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, [token]);

    const refreshUser = async () => {
        const updatedUser = await userService.getProfile()
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        return updatedUser
    }

    const login = async (data: LoginForm) => {
        const res = await authService.login(data)
        localStorage.setItem('token', res.token)
        setToken(res.token)

        const user = await userService.getProfile()
        localStorage.setItem('user', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }))
        setUser(user)
        setIsLoading(false)
        return user
    }

    const register = async (data: RegisterForm) => {
        await authService.register(data)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
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
            refreshUser,
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