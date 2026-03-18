import { create } from 'zustand'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isLoading: false,

  // Computed: isAuthenticated
  get isAuthenticated() {
    return !!this.token
  },

  // Initialize axios instance
  axiosInstance: axios.create({
    baseURL: API_URL,
  }),

  // Login
  login: async (credentials) => {
    set({ isLoading: true })
    try {
      const { email, password } = credentials
      const response = await axios.post(`${API_URL}/auth/login`, { email, password })
      const { token, user } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      set({ user, token, isLoading: false })
      return { success: true }
    } catch (error) {
      set({ isLoading: false })
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      }
    }
  },

  // Register
  register: async (userData) => {
    set({ isLoading: true })
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData)
      const { token, user } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      set({ user, token, isLoading: false })
      return { success: true }
    } catch (error) {
      set({ isLoading: false })
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      }
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null })
  },

  // Get profile
  getProfile: async () => {
    const { token } = get()
    if (!token) return

    try {
      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const user = response.data.user
      localStorage.setItem('user', JSON.stringify(user))
      set({ user })
    } catch (error) {
      get().logout()
    }
  }
}))

// Add request interceptor for token
useAuthStore.getState().axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Add response interceptor for 401
useAuthStore.getState().axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)
