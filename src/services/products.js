// src/services/products.js

// 🔧 URL base del backend (Render en producción / localhost en desarrollo)
const API_BASE = (import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '')) 
  || "https://maquicerros-backend.onrender.com";

// 🔹 Obtener todos los productos
export const getProducts = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    const data = await res.json();

    console.log("📦 Productos cargados desde backend:", data);
    return data.data || data; // según tu backend, usa `data.data` o `data`
  } catch (error) {
    console.error("❌ Error al cargar productos:", error);
    return [];
  }
};
