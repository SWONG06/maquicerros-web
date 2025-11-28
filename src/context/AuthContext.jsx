import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Leer usuario guardado
  useEffect(() => {
    const savedUser = localStorage.getItem("maquicerros_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Registrar usuario simulado
  const register = ({ name, email, password }) => {
    const newUser = { name, email, password };
    localStorage.setItem("maquicerros_user", JSON.stringify(newUser));
    setUser(newUser);
  };

  // Login simulado
  const login = ({ email, password }) => {
    const saved = localStorage.getItem("maquicerros_user");
    if (!saved) return { ok: false, message: "No existe un usuario registrado." };

    const userObj = JSON.parse(saved);

    if (userObj.email !== email || userObj.password !== password) {
      return { ok: false, message: "Credenciales incorrectas." };
    }

    setUser(userObj);
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
