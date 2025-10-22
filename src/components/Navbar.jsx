import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  SunIcon,
  MoonIcon,
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const { getItemCount } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Inicio" },
    { to: "/productos", label: "Productos" },
    { to: "/carrito", label: "Carrito" },
    { to: "/pedidos", label: "Pedidos" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-secondary shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-primary font-bold text-xl"
          >
            <span className="text-2xl">🧰</span>
            <span>Maquicerros</span>
          </Link>

          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(link.to)
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ACCIONES DERECHA */}
          <div className="flex items-center space-x-4">
            {/* MODO OSCURO */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              title="Cambiar tema"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {/* CARRITO */}
            <Link
              to="/carrito"
              className="relative p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* USUARIO */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/perfil"
                  className="flex items-center space-x-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <UserIcon className="h-5 w-5" />
                  <span className="hidden sm:block">{user?.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/10 transition"
              >
                Iniciar Sesión
              </Link>
            )}

            {/* BOTÓN MENÚ MÓVIL */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
            >
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-secondary border-t border-gray-200 dark:border-gray-700 py-3">
          <div className="flex flex-col space-y-2 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(link.to)
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
