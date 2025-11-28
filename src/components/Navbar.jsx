import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

import {
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  // Contador total del carrito
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Productos", path: "/productos" },
    { name: "Carrito", path: "/carrito" },
    { name: "Pedidos", path: "/pedidos" },
  ];

  return (
    <nav className="w-full bg-[#0D0D0D] border-b border-yellow-500/40 shadow-[0_3px_10px_rgba(246,196,0,0.15)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Maquicerros"
            className="w-14 h-auto drop-shadow-[0_0_10px_rgba(246,196,0,0.8)]"
          />
          <span className="hidden sm:block text-yellow-400 text-2xl font-extrabold tracking-wide">
            MAQUICERROS
          </span>
        </Link>

        {/* LINKS – VERSIÓN DESKTOP */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-yellow-400 text-lg font-semibold tracking-wide hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] transition-all"
            >
              {link.name}
            </Link>
          ))}

          {/* ICONOS DESKTOP */}
          <div className="flex items-center gap-6">

            {/* Carrito + Badge */}
            <div className="relative">
              <Link to="/carrito">
                <ShoppingCartIcon className="w-7 h-7 text-yellow-400 hover:text-white transition" />
              </Link>

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black w-5 h-5 text-xs flex items-center justify-center font-bold rounded-full shadow-md shadow-black/40 animate-pulse">
                  {totalItems}
                </span>
              )}
            </div>

            {/* Usuario */}
            <Link to="/login">
              <UserIcon className="w-7 h-7 text-yellow-400 hover:text-white transition" />
            </Link>

          </div>
        </div>

        {/* BOTÓN MENÚ MÓVIL */}
        <button
          className="md:hidden text-yellow-400"
          onClick={() => setOpen(!open)}
        >
          {open ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
        </button>
      </div>

      {/* MENU MÓVIL */}
      {open && (
        <div className="md:hidden bg-[#0C0C0C] border-t border-yellow-500/40 px-6 py-4 space-y-4 shadow-lg shadow-black/30">

          {/* Links iguales a desktop */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="block text-yellow-400 text-lg font-semibold tracking-wide hover:text-white transition-all"
            >
              {link.name}
            </Link>
          ))}

          {/* Iconos */}
          <div className="flex items-center gap-8 pt-4 border-t border-gray-600">

            {/* Carrito + Badge */}
            <div className="relative">
              <Link to="/carrito" onClick={() => setOpen(false)}>
                <ShoppingCartIcon className="w-7 h-7 text-yellow-400 hover:text-white transition" />
              </Link>

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black w-5 h-5 text-xs flex items-center justify-center font-bold rounded-full shadow-md shadow-black/50">
                  {totalItems}
                </span>
              )}
            </div>

            {/* Usuario */}
            <Link to="/login" onClick={() => setOpen(false)}>
              <UserIcon className="w-7 h-7 text-yellow-400 hover:text-white transition" />
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
