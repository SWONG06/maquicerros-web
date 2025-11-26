const API_BASE =
  import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "") ||
  "http://localhost:3000/api";

const handleResponse = async (res) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Error en el servidor" }));
    throw new Error(error.message || `Error ${res.status}`);
  }
  return res.json();
};

// Normalización (ajusta si tus nombres son diferentes)
const normalizeProduct = (p) => ({
  id: p.id,
  name: p.nombre || "Sin nombre",
  price: p.precio || 0,
  imageUrl: p.imgUrl || "/placeholder-product.jpg",
  description: p.descripcion || "Producto sin descripción.",
  category: p.categoria || "general",
  stock: p.stock || 0,
});

// 👉 GET /api/products
export const getProducts = async () => {
  try {
    const res = await fetch(`${API_BASE}/products`);
    const data = await handleResponse(res);

    // tu backend devuelve: { success, productos, total }
    return data.productos?.map(normalizeProduct) || [];
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return [];
  }
};

// 👉 GET /api/products/:id
export const getProductById = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    const data = await handleResponse(res);
    return normalizeProduct(data);
  } catch (error) {
    console.error("Error obteniendo producto:", error);
    return null;
  }
};

// 👉 POST /api/products
export const createProduct = async (formData) => {
  try {
    const res = await fetch(`${API_BASE}/products`, {
      method: "POST",
      body: formData,
    });
    return handleResponse(res);
  } catch (error) {
    console.error("Error creando producto:", error);
    return { error: error.message };
  }
};

// 👉 PUT /api/products/:id
export const updateProduct = async (id, formData) => {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: "PUT",
      body: formData,
    });
    return handleResponse(res);
  } catch (error) {
    console.error("Error actualizando producto:", error);
    return { error: error.message };
  }
};

// 👉 DELETE /api/products/:id
export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
    });
    return handleResponse(res);
  } catch (error) {
    console.error("Error eliminando producto:", error);
    return { error: error.message };
  }
};
