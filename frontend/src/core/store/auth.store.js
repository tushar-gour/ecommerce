import { create } from "zustand";
import authApiService from "../services/auth.service.js";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,

  setAuth: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token, error: null });
  },

  clearAuth: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, error: null });
  },

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await authApiService.register(data);
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      set({ user, token, loading: false });
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  },

  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await authApiService.login(data);
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      set({ user, token, loading: false });
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  },

  fetchProfile: async () => {
    try {
      const response = await authApiService.getProfile();
      set({ user: response.data });
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, error: null });
  },
}));

export default useAuthStore;
