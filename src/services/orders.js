export const createOrder = async (orderData) => {
  const API_BASE =
    import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "") ||
    "https://maquicerros-backend.onrender.com";

  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  return await res.json();
};

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
