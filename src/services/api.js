const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Credenciales inválidas`);
  }

  return await res.json();
}
