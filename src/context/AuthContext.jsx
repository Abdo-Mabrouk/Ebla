import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("auth-user");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

const ensureToken = (user) => {
  if (!user) return null;
  if (user.token) return user;
  const token = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return { ...user, token };
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser()); // null = not logged in

  const login = (userData) => {
    const userWithToken = ensureToken(userData);
    setUser(userWithToken);
    try {
      window.localStorage.setItem("auth-user", JSON.stringify(userWithToken));
    } catch (e) {
      // ignore
    }
  };

  const logout = () => {
    setUser(null);
    try {
      window.localStorage.removeItem("auth-user");
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    // If the app needs additional side-effects when user changes,
    // handle them here. We intentionally do NOT redirect to login
    // here — other components can read `user` and decide navigation.
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
