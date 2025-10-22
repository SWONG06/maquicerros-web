// 🔗 Archivo de conexión API real para Maquicerros
const API_BASE_URL = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '') || "http://localhost:5000";

// =======================
// 🔐 AUTH ENDPOINTS
// =======================
export const authAPI = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  register: async (name, email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return res.json();
  },

  logout: async (token) => {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
};

// =======================
// 🛍️ PRODUCTS ENDPOINTS
// =======================
export const productsAPI = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/products`);
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    return res.json();
  },
};

// =======================
// 🧺 CART ENDPOINTS
// =======================
export const cartAPI = {
  getCart: async (userId) => {
    const res = await fetch(`${API_BASE_URL}/cart/${userId}`);
    return res.json();
  },

  addToCart: async (productId, quantity) => {
    const res = await fetch(`${API_BASE_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    return res.json();
  },

  updateCartItem: async (itemId, quantity) => {
    const res = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    return res.json();
  },

  removeFromCart: async (itemId) => {
    const res = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: "DELETE",
    });
    return res.json();
  },
};

// =======================
// 📦 ORDERS ENDPOINTS
// =======================
export const ordersAPI = {
  getOrders: async () => {
    const res = await fetch(`${API_BASE_URL}/orders`);
    return res.json();
  },

  createOrder: async (orderData) => {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return res.json();
  },
};

// =======================
// 💳 PAYMENTS ENDPOINTS
// =======================
export const paymentsAPI = {
  createStripeIntent: async (amount) => {
    const res = await fetch(`${API_BASE_URL}/payments/stripe-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    return res.json();
  },

  uploadVoucher: async (orderId, file) => {
    const formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("voucher", file);

    const res = await fetch(`${API_BASE_URL}/payments/upload-voucher`, {
      method: "POST",
      body: formData,
    });
    return res.json();
  },
};
