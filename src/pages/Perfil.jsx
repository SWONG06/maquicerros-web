import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10">

        {/* Encabezado */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-28 h-28 rounded-full bg-orange-600 text-white flex items-center justify-center text-4xl font-bold shadow-md">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
            Mi Perfil
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Información de tu cuenta
          </p>
        </div>

        {/* Información */}
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-xl shadow-sm">
            <p className="text-gray-500 dark:text-gray-300 text-sm">Nombre completo</p>
            <p className="text-gray-900 dark:text-white text-lg font-semibold">{user.name}</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-xl shadow-sm">
            <p className="text-gray-500 dark:text-gray-300 text-sm">Correo electrónico</p>
            <p className="text-gray-900 dark:text-white text-lg font-semibold">{user.email}</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-xl shadow-sm">
            <p className="text-gray-500 dark:text-gray-300 text-sm">Rol</p>
            <p className="text-gray-900 dark:text-white text-lg font-semibold capitalize">
              {user.role || "Usuario"}
            </p>
          </div>
        </div>

        {/* Botón de cerrar sesión */}
        <div className="mt-10">
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold text-lg shadow-md transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
