import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-[#0D0D0D] border-b border-yellow-500/40 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link className="flex items-center gap-3" to="/">
          <img
            src="/logo.png"
            className="w-14"
            alt="Maquicerros"
          />
          <span className="text-yellow-400 font-extrabold text-xl">
            MAQUICERROS
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-yellow-400 hover:text-white">Inicio</Link>
          <Link to="/productos" className="text-yellow-400 hover:text-white">Productos</Link>
          <Link to="/carrito" className="text-yellow-400 hover:text-white">Carrito</Link>
          <Link to="/pedidos" className="text-yellow-400 hover:text-white">Pedidos</Link>

          {/* Si está logueado */}
          {user ? (
            <>
              <Link to="/perfil" className="text-yellow-400 hover:text-white">
                {user.name}
              </Link>
              <button
                onClick={logout}
                className="text-red-400 hover:text-red-300"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-yellow-400 hover:text-white">Login</Link>
              <Link to="/registro" className="text-yellow-400 hover:text-white">Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
