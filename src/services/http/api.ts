const API_BASE = '/api';

// Helper auth
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');

    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ code: 'UNKNOWN_ERROR' }));
        throw new Error(error.code || `HTTP ${response.status}`);
    }

    return response.json();
}

// ==================== AUTH ====================
export const authAPI = {
    register: (data: { name: string; email: string; password: string; passwordRepeat: string }) =>
        fetchWithAuth('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

    login: (data: { email: string; password: string }) =>
        fetchWithAuth('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
};

// ==================== USER ====================
export const userAPI = {
    getProfile: () => fetchWithAuth('/user/profile'),

    updateProfile: (data: { name?: string; avatar?: string }) =>
        fetchWithAuth('/user/profile', { method: 'PUT', body: JSON.stringify(data) }),

    deleteProfile: () => fetchWithAuth('/user/profile', { method: 'DELETE' }),

    updateAvatar: (avatar: string) =>
        fetchWithAuth('/user/profile/avatar', { method: 'PATCH', body: JSON.stringify({ avatar }) }),

    getAllUsers: () => fetchWithAuth('/user'),

    getUserById: (id: string) => fetchWithAuth(`/user/${id}`),

    toggleUserActive: (id: string) =>
        fetchWithAuth(`/user/${id}/active`, { method: 'PATCH' }),

    updateUserRole: (id: string, role: string) =>
        fetchWithAuth(`/user/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role }) }),
};

// ==================== CATEGORY ====================
export const categoryAPI = {
    getAllCategories: () => fetchWithAuth('/category'),

    getCategoryById: (id: string) => fetchWithAuth(`/category/${id}`),

    createCategory: (data: { name: string; description?: string; icon?: string }) =>
        fetchWithAuth('/category', { method: 'POST', body: JSON.stringify(data) }),

    updateCategory: (id: string, data: { name?: string; description?: string; icon?: string }) =>
        fetchWithAuth(`/category/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

    deleteCategory: (id: string) => fetchWithAuth(`/category/${id}`, { method: 'DELETE' }),
};

// ==================== EVENT ====================
type CreateEventData = {
    title: string;
    description?: string;
    date: string;
    startTime: string;
    endTime?: string;
    image?: string;
    price?: number;
    capacity?: number;
    address?: string;
    latitude?: number;
    longitude?: number;
    localId: string;
    categoryId?: string;
};

export const eventAPI = {
    getAllEvents: (onlyActive?: boolean) =>
        fetchWithAuth(`/event${onlyActive ? '?active=true' : ''}`),

    getEventById: (id: string) => fetchWithAuth(`/event/${id}`),

    createEvent: (data: CreateEventData) =>
        fetchWithAuth('/event', { method: 'POST', body: JSON.stringify(data) }),

    updateEvent: (id: string, data: Partial<CreateEventData>) =>
        fetchWithAuth(`/event/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

    toggleEventActive: (id: string) =>
        fetchWithAuth(`/event/${id}/active`, { method: 'PATCH' }),

    deleteEvent: (id: string) => fetchWithAuth(`/event/${id}`, { method: 'DELETE' }),
};

// ==================== FAVORITES ====================
export const favoriteAPI = {
    createFavorite: (eventId: string) =>
        fetchWithAuth('/favorites', { method: 'POST', body: JSON.stringify({ eventId }) }),

    getFavoritesByUser: (userId: string) => fetchWithAuth(`/favorites/user/${userId}`),

    getFavoriteById: (id: string) => fetchWithAuth(`/favorites/${id}`),

    deleteFavorite: (id: string) => fetchWithAuth(`/favorites/${id}`, { method: 'DELETE' }),
};

// ==================== LOCAL ====================
export const localAPI = {
    createLocal: (data: {
        name: string;
        address: string;
        description?: string;
        phone?: string;
        image?: string;
    }) => fetchWithAuth('/local', { method: 'POST', body: JSON.stringify(data) }),

    getMyLocal: () => fetchWithAuth('/local/mine'),

    updateLocal: (data: {
        name?: string;
        address?: string;
        description?: string;
        phone?: string;
        image?: string;
    }) => fetchWithAuth('/local', { method: 'PUT', body: JSON.stringify(data) }),

    getAllLocals: () => fetchWithAuth('/local'),

    getLocalById: (id: string) => fetchWithAuth(`/local/${id}`),

    verifyLocal: (id: string, data: { status: 'aprobado' | 'rechazado'; reason?: string }) =>
        fetchWithAuth(`/local/${id}/verify`, { method: 'PATCH', body: JSON.stringify(data) }),

    deleteLocal: (id: string) => fetchWithAuth(`/local/${id}`, { method: 'DELETE' }),
};

// ==================== COMMENT ====================
export const commentAPI = {
    createComment: (data: {
        eventId: string;
        content: string;
        rating: number;
    }) => fetchWithAuth('/comment', { method: 'POST', body: JSON.stringify(data) }),

    getCommentsByEvent: (eventId: string) => fetchWithAuth(`/comment/event/${eventId}`),

    getCommentsByUser: (userId: string) => fetchWithAuth(`/comment/user/${userId}`),

    getCommentById: (id: string) => fetchWithAuth(`/comment/${id}`),

    updateComment: (id: string, data: { content?: string; rating?: number }) =>
        fetchWithAuth(`/comment/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

    deleteComment: (id: string) => fetchWithAuth(`/comment/${id}`, { method: 'DELETE' }),
};

// ==================== PREFERENCE ====================
export const preferenceAPI = {
    createPreference: (categoryId: string) =>
        fetchWithAuth('/preference', { method: 'POST', body: JSON.stringify({ categoryId }) }),

    getPreferencesByUser: (userId: string) => fetchWithAuth(`/preference/user/${userId}`),

    getPreferenceById: (id: string) => fetchWithAuth(`/preference/${id}`),

    deletePreference: (id: string) => fetchWithAuth(`/preference/${id}`, { method: 'DELETE' }),
};

// ==================== NOTIFICATION ====================
export const notificationAPI = {
    getMyNotifications: () => fetchWithAuth('/notification'),

    createNotification: (data: {
        userId: string;
        title: string;
        message: string;
        type?: 'info' | 'alerta' | 'sistema';
    }) => fetchWithAuth('/notification', { method: 'POST', body: JSON.stringify(data) }),

    markAsRead: (id: string) =>
        fetchWithAuth(`/notification/${id}/read`, { method: 'PATCH' }),

    markAllAsRead: () => fetchWithAuth('/notification/read-all', { method: 'PATCH' }),

    deleteNotification: (id: string) =>
        fetchWithAuth(`/notification/${id}`, { method: 'DELETE' }),
};