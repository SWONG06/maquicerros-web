import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditarPerfil = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    updateUser(form);
    navigate("/perfil");
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex justify-center items-center px-6 py-16">
      <div className="bg-[#1A1A1A] border border-yellow-500/40 rounded-xl p-8 max-w-lg w-full shadow-xl">

        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Editar Perfil
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-200">

          <div>
            <label className="block mb-1 text-yellow-400 font-bold">Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-yellow-400 font-bold">Correo</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 
            text-black font-bold rounded-lg transition-all"
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;
