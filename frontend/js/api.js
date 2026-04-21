const API_URL = 'http://localhost:5000/api';

const api = {
    request: async (endpoint, options = {}) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        const config = { ...options, headers };
        try {
            const response = await fetch(`${API_URL}${endpoint}`, config);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || data.error || 'API Error');
            return data;
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    },

    auth: {
        login: (credentials) => api.request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
        signup: (user) => api.request('/auth/signup', { method: 'POST', body: JSON.stringify(user) }),
        getMe: () => api.request('/auth/me')
    },

    products: {
        getAll: (query = '') => api.request(`/products${query}`),
        getById: (id) => api.request(`/products/${id}`)
    },

    cart: {
        get: () => api.request('/cart'),
        add: (productId, quantity = 1) => api.request('/cart', { method: 'POST', body: JSON.stringify({ productId, quantity }) }),
        update: (productId, quantity) => api.request(`/cart/${productId}`, { method: 'PUT', body: JSON.stringify({ quantity }) }),
        remove: (productId) => api.request(`/cart/${productId}`, { method: 'DELETE' })
    },

    orders: {
        place: () => api.request('/orders', { method: 'POST' }),
        getAll: () => api.request('/orders'),
        cancel: (id) => api.request(`/orders/${id}/cancel`, { method: 'PUT' })
    }
};

window.api = api;
