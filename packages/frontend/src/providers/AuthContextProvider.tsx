import toast from "react-hot-toast";
import type { User } from "@/types";
import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "@/contexts";
import { apiClient } from "@/services";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data } = await apiClient.get("/auth/me");
      setUser(data.user);
    } catch (error) {
      console.error("Error - checkAuth() ", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const { data } = await apiClient.post("/auth/login", { email, password });
    setUser(data.user);
    toast.success("Logged in successfully!");
  };

  const register = async (email: string, password: string, name: string) => {
    const { data } = await apiClient.post("/auth/register", {
      email,
      password,
      name,
    });
    setUser(data.user);
    toast.success("Account created successfully!");
  };

  const logout = async () => {
    await apiClient.post("/auth/logout");
    setUser(null);
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
