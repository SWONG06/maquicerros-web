import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import {
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getItemCount } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Inicio" },
    { to: "/productos", label: "Productos" },
    { to: "/carrito", label: "Carrito" },
  ];

  return (
    <nav className="backdrop-blur-md bg-white/80 dark:bg-black/40 shadow-md border-b border-white/20 dark:border-gray-700 sticky top-0 z-50">

      {/* NAV: móvil h-12 / desktop h-20 */}
      <div className="max-w-7xl mx-auto px-3 h-12 md:h-20 flex items-center justify-between transition-all duration-300">

        {/* LOGO más grande en desktop */}
        <Link
          to="/"
          className="flex items-center gap-1 text-orange-600 font-extrabold text-lg md:text-2xl"
        >
          <span className="text-xl md:text-3xl">🧰</span>
          Maquicerros
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-base md:text-lg font-semibold transition ${
                isActive(link.to)
                  ? "text-orange-600"
                  : "text-gray-700 dark:text-gray-300 hover:text-orange-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 md:gap-6">

          {/* CARRITO */}
          <Link
            to="/carrito"
            className="relative p-1.5 md:p-2.5 rounded-md hover:bg-gray-200/60 dark:hover:bg-gray-700 transition"
          >
            <ShoppingCartIcon className="w-5 h-5 md:w-7 md:h-7 text-gray-600 dark:text-gray-300" />
            {getItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] md:text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                {getItemCount()}
              </span>
            )}
          </Link>

          {/* LOGIN / SALIR */}
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="px-2 py-1 md:px-4 md:py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs md:text-sm font-medium rounded-md shadow-sm transition"
            >
              Iniciar
            </Link>
          ) : (
            <button
              onClick={logout}
              className="text-xs md:text-sm text-gray-700 dark:text-gray-300 hover:text-orange-500"
            >
              Salir
            </button>
          )}

          {/* MENU HAMBURGUESA */}
          <button
            className="md:hidden p-1.5 rounded-md hover:bg-gray-200/60 dark:hover:bg-gray-700 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-black/70 backdrop-blur border-t dark:border-gray-700 p-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-md text-sm font-medium ${
                isActive(link.to)
                  ? "text-orange-600 bg-orange-600/10"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
