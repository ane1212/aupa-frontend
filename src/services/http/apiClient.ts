const BASE_URL = '/api'

const getToken = () => localStorage.getItem('token')

const request = async <T>(
    endpoint: string,
    options: RequestInit & { params?: Record<string, any> } = {}
): Promise<T> => {
    const token = getToken()

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    }

    let url = `${BASE_URL}${endpoint}`
    if (options.params) {
        const searchParams = new URLSearchParams()
        Object.entries(options.params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                searchParams.append(key, String(value))
            }
        })
        const qs = searchParams.toString()
        if (qs) {
            url += `?${qs}`
        }
    }

    const res = await fetch(url, {
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
    get: <T>(endpoint: string, params?: Record<string, any>) =>
        request<T>(endpoint, { params }),

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