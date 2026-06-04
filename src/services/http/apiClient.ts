const BASE_URL = import.meta.env.VITE_API_URL

const getToken = () => localStorage.getItem('token')

const request = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    const token = getToken()

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    })

    if (res.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
        throw new Error('UNAUTHORIZED')
    }

    if (!res.ok) {
        const error = await res.json()
        throw error
    }

    return res.json()
}

export const apiClient = {
    get: <T>(endpoint: string) =>
        request<T>(endpoint),

    post: <T>(endpoint: string, body: unknown) =>
        request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        }),

    put: <T>(endpoint: string, body: unknown) =>
        request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        }),

    patch: <T>(endpoint: string, body?: unknown) =>
        request<T>(endpoint, {
            method: 'PATCH',
            body: body ? JSON.stringify(body) : undefined,
        }),

    delete: <T>(endpoint: string) =>
        request<T>(endpoint, { method: 'DELETE' }),
}