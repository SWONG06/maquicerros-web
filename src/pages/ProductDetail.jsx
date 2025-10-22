import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "") ||
    "https://maquicerros-backend.onrender.com";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/${id}`);
        const data = await res.json();
        setProduct(data.data || data);
      } catch (error) {
        console.error("❌ Error al cargar el producto:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, API_URL]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 dark:text-gray-400">
        Cargando producto...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
        Producto no encontrado.
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} fue agregado al carrito 🛒`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={product.imageUrl || product.image || "/placeholder-product.jpg"}
          alt={product.name}
          className="w-full h-auto rounded-lg shadow-lg object-cover"
        />

        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {product.name}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
            {product.description || "Sin descripción disponible."}
          </p>
          <span className="block text-3xl font-semibold text-primary mb-8">
            S/ {parseFloat(product.price || 0).toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200"
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
