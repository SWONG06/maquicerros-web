import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import Loading from "../components/Loading";
import { formatPrice } from "../utils/currency";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch("/mock/products.json");
        const data = await res.json();

        // Buscar por ID independientemente si es número o string
        const found = data.find(p => String(p.id) === String(id));
        setProduct(found || null);
      } catch (err) {
        console.error("Error al cargar producto:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Loading text="Cargando producto..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-red-500 text-lg mb-4">Producto no encontrado.</p>
        <button
          onClick={() => navigate("/productos")}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Volver a productos
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      error("Producto sin stock disponible");
      return;
    }

    addToCart({
      ...product,
      imageUrl: product.imageUrl || product.image || product.img,
    });

    success(`${product.name} agregado al carrito`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">

        <div className="w-full flex items-center justify-center">
          <img
            src={product.imageUrl || product.image || product.img || "/placeholder-product.jpg"}
            alt={product.name}
            className="rounded-xl shadow-md object-cover w-full max-h-[500px]"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            {product.description}
          </p>

          <p className="text-xl text-gray-700 dark:text-gray-200 mb-4">
            Stock: <span className="font-semibold">{product.stock}</span>
          </p>

          <p className="text-4xl font-extrabold text-orange-600 mb-6">
            {formatPrice(product.price)}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-lg font-semibold shadow-md disabled:bg-gray-400"
          >
            {product.stock <= 0 ? "Sin stock" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
