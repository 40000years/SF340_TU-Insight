import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const api = axios.create({
  baseURL: `${API_URL}/api`,
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  register: (email, password, name) =>
    api.post('/auth/register', { email, password, name }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
}

export const trendAPI = {
  analyze: (category, period, budget, targetGroup) =>
    api.post('/trends/analyze', { category, period, budget, target_group: targetGroup }),
  getHistory: () => api.get('/trends/history'),
  getTrend: (id) => api.get(`/trends/${id}`),
}

export const dashboardAPI = {
  getMetrics: () => api.get('/dashboard/metrics'),
  saveWidget: (title, type, data) =>
    api.post('/dashboard/widgets', { title, type, data }),
  getWidgets: () => api.get('/dashboard/widgets'),
}

export default api
