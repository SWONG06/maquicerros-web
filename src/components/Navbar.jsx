import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-[#0D0D0D] border-b border-yellow-500/40 shadow-lg shadow-yellow-500/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link to="/">
          <img src="/logo.png" className="w-14" />
        </Link>

        <div className="hidden md:flex items-center gap-10 text-yellow-400 font-semibold">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/carrito">Carrito</Link>
          <Link to="/pedidos">Pedidos</Link>

          {!user ? (
            <Link className="hover:text-white" to="/login">Ingresar</Link>
          ) : (
            <>
              <Link className="hover:text-white" to="/perfil">{user.name}</Link>
              <button onClick={logout} className="hover:text-white">Salir</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
