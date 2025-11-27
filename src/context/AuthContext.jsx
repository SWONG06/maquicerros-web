import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cargar usuario guardado al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("maqui_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // Registrar usuario
  const register = ({ name, email, password }) => {
    const newUser = {
      name,
      email,
      password,
      createdAt: new Date().toLocaleDateString(),
    };

    localStorage.setItem("maqui_user", JSON.stringify(newUser));
    setUser(newUser);
  };

  // Login
  const login = ({ email, password }) => {
    const saved = localStorage.getItem("maqui_user");

    if (!saved) return { ok: false, msg: "No existe ninguna cuenta." };

    const data = JSON.parse(saved);

    if (data.email === email && data.password === password) {
      setUser(data);
      return { ok: true };
    }

    return { ok: false, msg: "Credenciales incorrectas." };
  };

  // Logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
