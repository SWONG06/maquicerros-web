import { createContext, useContext, useState, useEffect } from "react";

// KEY para LocalStorage
const AUTH_KEY = "maquicerros_users";
const SESSION_KEY = "maquicerros_session";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cargar sesión guardada
  useEffect(() => {
    const savedSession = localStorage.getItem(SESSION_KEY);
    if (savedSession) {
      setUser(JSON.parse(savedSession));
    }
  }, []);

  // 🔐 Registrar usuario
  const register = (name, email, password) => {
    let users = JSON.parse(localStorage.getItem(AUTH_KEY)) || [];

    // Verificar si existe
    if (users.some((u) => u.email === email)) {
      return { success: false, message: "El correo ya está registrado" };
    }

    // Crear usuario
    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // Simple por simulación
    };

    users.push(newUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(users));

    return { success: true };
  };

  // 🔐 Login
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem(AUTH_KEY)) || [];

    const exists = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!exists) {
      return { success: false, message: "Credenciales incorrectas" };
    }

    setUser(exists);
    localStorage.setItem(SESSION_KEY, JSON.stringify(exists));
    return { success: true };
  };

  // 🔐 Logout
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
