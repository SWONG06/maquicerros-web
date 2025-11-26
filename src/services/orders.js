const API_BASE =
  import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "") ||
  "https://maquicerros-backend.onrender.com";

// 🟢 Crear una nueva orden
export const createOrder = async (orderData) => {
  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return await res.json();
  } catch (error) {
    console.error("❌ Error al crear orden:", error);
    return { success: false };
  }
};

// 🔵 Obtener todas las órdenes
export const getOrders = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/orders`);
    return await res.json();
  } catch (error) {
    console.error("❌ Error al obtener órdenes:", error);
    return { success: false };
  }
};

// 🟣 Actualizar estado de una orden
export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const res = await fetch(`${API_BASE}/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    return await res.json();
  } catch (error) {
    console.error("❌ Error al actualizar estado:", error);
    return { success: false };
  }
};
