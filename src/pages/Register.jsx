import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
    navigate("/perfil");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] text-yellow-400 px-6">
      <div className="bg-[#1A1A1A] p-8 rounded-xl w-full max-w-md border border-yellow-500/30">
        <h1 className="text-3xl font-bold mb-6">Crear cuenta</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              className="input w-full"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

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

          <button className="btn-primary w-full mt-2">Registrarse</button>
        </form>

        <p className="mt-4 text-gray-300 text-sm text-center">
          ¿Ya tienes cuenta?{" "}
          <Link className="text-yellow-400 hover:underline" to="/login">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
