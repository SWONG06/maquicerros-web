import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(form);

    if (!res.ok) {
      setError(res.msg);
      return;
    }

    navigate("/perfil");
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="bg-[#1A1A1A] border border-yellow-500/40 p-10 rounded-xl shadow-lg w-full max-w-md text-white">

        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          Iniciar Sesión
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
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

          <button className="btn-primary w-full">Ingresar</button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-yellow-400 hover:underline">
            Regístrate aquí
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
