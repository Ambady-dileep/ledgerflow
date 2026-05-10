// src/context/AuthContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import { api, saveTokens, clearTokens, isLoggedIn } from "../utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  // ── Signup ─────────────────────────────────────────────────────────────────
  const signup = useCallback(async (username, password, email = "") => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.post("/signup/", { username, password, email });
      saveTokens(data.access, data.refresh);
      setUser({ username });
      return { success: true };
    } catch (err) {
      const msg =
        err.data?.username?.[0] ||
        err.data?.password?.[0] ||
        err.data?.detail ||
        "Signup failed.";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.post("/login/", { username, password });
      saveTokens(data.access, data.refresh);
      setUser({ username });
      return { success: true };
    } catch (err) {
      const msg = err.data?.detail || "Invalid username or password.";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, loggedIn: isLoggedIn(), signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);