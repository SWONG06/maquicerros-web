// src/services/orders.js
const API_BASE =
  import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "") ||
  "https://maquicerros-backend.onrender.com";

// 🔹 Crear una orden nueva en el backend
export const createOrder = async (orderData) => {
  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error al crear la orden:", error);
    return { success: false, message: "Error de conexión con el servidor" };
  }
};

// Obtener todas las órdenes desde el backend
export const getOrders = async () => {
  const API_BASE =
    import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "") ||
    "https://maquicerros-backend.onrender.com";

  try {
    const res = await fetch(`${API_BASE}/api/orders`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error al obtener pedidos:", error);
    return { success: false, orders: [] };
  }
};
