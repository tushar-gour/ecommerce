import { useEffect } from "react";
import useAuthStore from "../store/auth.store.js";

export default function useAuth() {
  const { user, token, loading, error, login, register, logout, fetchProfile } =
    useAuthStore();

  useEffect(() => {
    if (token && !user) {
      fetchProfile();
    }
  }, [token, user, fetchProfile]);

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  };
}
