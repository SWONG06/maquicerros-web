import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Perfil = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex justify-center items-center px-6 py-16">
      <div className="bg-[#1A1A1A] border border-yellow-500/40 rounded-xl p-8 max-w-lg w-full shadow-xl">

        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Mi Perfil
        </h1>

        {/* Datos */}
        <div className="space-y-4 text-gray-300">
          <p>
            <span className="font-bold text-yellow-400">Nombre:</span>{" "}
            {user?.name}
          </p>

          <p>
            <span className="font-bold text-yellow-400">Correo:</span>{" "}
            {user?.email}
          </p>

          <p>
            <span className="font-bold text-yellow-400">Fecha de registro:</span>{" "}
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
          </p>
        </div>

        {/* Botones */}
        <div className="mt-8 flex flex-col gap-4">
          <Link
            to="/perfil/editar"
            className="px-4 py-3 bg-yellow-500 hover:bg-yellow-400 
            text-black font-bold rounded-lg text-center transition-all"
          >
            Editar perfil
          </Link>

          <button
            onClick={logout}
            className="px-4 py-3 bg-red-600 hover:bg-red-500 
            text-white font-bold rounded-lg transition-all"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
