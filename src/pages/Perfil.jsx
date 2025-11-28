import { useAuth } from "../context/AuthContext";

const Perfil = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] text-yellow-400 px-6">
      <div className="bg-[#1A1A1A] p-10 rounded-xl border border-yellow-500/30 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Mi Perfil</h1>

        <p className="text-2xl font-semibold">{user.name}</p>
        <p className="text-lg text-gray-300 mt-2">{user.email}</p>

        <button
          onClick={logout}
          className="btn-secondary w-full mt-10"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Perfil;
