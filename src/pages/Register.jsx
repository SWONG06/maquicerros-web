import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return setError("Ingrese un nombre válido.");

    register(form);
    navigate("/perfil");
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="bg-[#1A1A1A] border border-yellow-500/40 p-10 rounded-xl shadow-lg w-full max-w-md text-white">

        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          Crear Cuenta
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label>Correo</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <button className="btn-primary w-full">Registrarme</button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Inicia sesión
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
