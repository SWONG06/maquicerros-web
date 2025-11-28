import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Leer usuario guardado
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("maquicerros_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && typeof parsed === "object") {
          setUser(parsed);
        }
      }
    } catch (err) {
      console.error("Error leyendo usuario:", err);
    }
  }, []);

  // Registrar usuario simulado
  const register = ({ name, email, password }) => {
    if (!name || !email || !password) {
      return { ok: false, message: "Completa todos los campos." };
    }

    const newUser = { name, email, password };

    localStorage.setItem("maquicerros_user", JSON.stringify(newUser));
    setUser(newUser);

    return { ok: true };
  };

  // Login simulado
  const login = ({ email, password }) => {
    try {
      const saved = localStorage.getItem("maquicerros_user");

      if (!saved) {
        return { ok: false, message: "No existe un usuario registrado." };
      }

      const userObj = JSON.parse(saved);

      if (!userObj || typeof userObj !== "object") {
        return { ok: false, message: "Usuario corrupto o inválido." };
      }

      if (userObj.email !== email || userObj.password !== password) {
        return { ok: false, message: "Credenciales incorrectas." };
      }

      setUser(userObj);
      return { ok: true };
    } catch (err) {
      console.error("Error en login:", err);
      return { ok: false, message: "Error inesperado en login." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("maquicerros_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
