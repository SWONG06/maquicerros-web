import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(form);

    if (!res.ok) {
      setError(res.message);
      return;
    }

    navigate("/perfil");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] text-yellow-400 px-6">
      <div className="bg-[#1A1A1A] p-8 rounded-xl w-full max-w-md border border-yellow-500/30">
        <h1 className="text-3xl font-bold mb-6">Iniciar sesión</h1>

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="input w-full"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              className="input w-full"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn-primary w-full mt-2">Ingresar</button>
        </form>

        <p className="mt-4 text-gray-300 text-sm text-center">
          ¿No tienes cuenta?{" "}
          <Link className="text-yellow-400 hover:underline" to="/registro">
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
