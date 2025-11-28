import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const isLogged = user && typeof user === "object";

  return (
    <nav className="w-full bg-[#0D0D0D] border-b border-yellow-500/40 shadow-lg shadow-yellow-500/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/">
          <img src="/logo.png" className="w-14" alt="Maquicerros" />
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-10 text-yellow-400 font-semibold">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/carrito">Carrito</Link>
          <Link to="/pedidos">Pedidos</Link>

          {!isLogged ? (
            <Link className="hover:text-white" to="/login">
              Ingresar
            </Link>
          ) : (
            <>
              <Link className="hover:text-white flex items-center gap-2" to="/perfil">
                <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded-full text-sm">
                  {user.name}
                </span>
              </Link>

              <button
                onClick={logout}
                className="hover:text-white transition"
              >
                Salir
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
