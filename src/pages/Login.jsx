import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = login(form.email, form.password);

    if (!res.success) {
      setError(res.message);
      return;
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Iniciar Sesión
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Correo"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg"
          >
            Entrar
          </button>

        </form>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-orange-500 font-semibold">
            Crear cuenta
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
