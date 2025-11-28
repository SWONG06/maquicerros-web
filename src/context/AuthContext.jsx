import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Guardar en localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Login falso
  const login = (email, password) => {
    const fakeUser = {
      id: Date.now(),
      name: "Usuario",
      email,
      createdAt: new Date(),
    };
    setUser(fakeUser);
  };

  // Registro falso
  const register = (name, email, password) => {
    const newUser = {
      id: Date.now(),
      name,
      email,
      createdAt: new Date(),
    };
    setUser(newUser);
  };

  // Editar usuario
  const updateUser = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  // Logout
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
