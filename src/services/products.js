// src/services/products.js
const API_BASE =
  import.meta.env.VITE_API_URL || "https://maquicerros-backend.onrender.com"; // usa tu backend de Render

// 🔹 Obtener todos los productos
export const getProducts = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error("Error al obtener productos");
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("❌ Error al cargar productos:", error);
    return [];
  }
};
