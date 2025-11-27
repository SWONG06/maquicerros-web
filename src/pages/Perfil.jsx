import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

const Perfil = () => {
  const { user, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDelete = () => {
    if (confirm("¿Seguro que deseas eliminar tu cuenta? Esta acción es irreversible.")) {
      deleteAccount();
      navigate("/registro");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24 pb-32 flex justify-center px-6">
      
      <div className="
        w-full max-w-xl 
        bg-[#111]/70 
        backdrop-blur-md 
        border border-yellow-500/30 
        shadow-[0_0_25px_rgba(246,196,0,0.15)]
        rounded-2xl 
        p-10 
        flex flex-col items-center
        animate-fadeIn
      ">
        
        {/* Avatar */}
        <div className="
          w-28 h-28 
          rounded-full 
          bg-yellow-500 
          flex items-center justify-center
          shadow-[0_0_20px_rgba(246,196,0,0.4)]
          mb-6
        ">
          <UserIcon className="w-16 h-16 text-black" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-6 tracking-wide drop-shadow-lg">
          Mi Perfil
        </h1>

        {/* INFO BOX */}
        <div className="w-full space-y-4 text-gray-200 text-lg">

          <p>
            <span className="font-bold text-yellow-400">Nombre: </span>
            {user.name}
          </p>

          <p>
            <span className="font-bold text-yellow-400">Correo: </span>
            {user.email}
          </p>

          <p className="flex items-center gap-2">
            <CalendarDaysIcon className="w-6 h-6 text-yellow-400" />
            <span className="font-bold text-yellow-400">Registrado:</span>
            <span>{user.createdAt || "Hoy"}</span>
          </p>

        </div>

        {/* Buttons */}
        <div className="w-full mt-10 space-y-4">
          <button
            onClick={handleLogout}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg transition-all hover:scale-[1.02]"
          >
            Cerrar sesión
          </button>

          <button
            onClick={handleDelete}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg transition-all hover:scale-[1.02]"
          >
            Eliminar cuenta
          </button>
        </div>

      </div>
    </div>
  );
};

export default Perfil;
