import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/mock/products.json");
      const data = await res.json();

      setAllProducts(data);

      const p = data.find((x) => x.id === Number(id));
      setProduct(p);

      setMainImage(p?.imageUrl || p?.image);
    };

    load();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-yellow-400 text-xl">
        Cargando producto...
      </div>
    );
  }

  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-[#0B0B0B] min-h-screen text-gray-200 pt-24 pb-32 px-6">

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-10 text-sm text-gray-400">
        <Link to="/" className="hover:text-yellow-400">
          Inicio
        </Link>{" "}
        /{" "}
        <Link to="/productos" className="hover:text-yellow-400">
          Productos
        </Link>{" "}
        /{" "}
        <span className="text-yellow-400 font-semibold">{product.name}</span>
      </div>

      {/* Product Detail */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* IMAGENES */}
        <div>
          {/* Imagen Principal */}
          <div className="w-full h-[420px] bg-[#111] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(246,196,0,0.1)]">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover cursor-zoom-in hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Miniaturas */}
          <div className="flex gap-4 mt-4">
            {[product.imageUrl, product.image2, product.image3]
              .filter(Boolean)
              .map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumb"
                  className={`
                    w-20 h-20 rounded-md object-cover cursor-pointer
                    border ${
                      mainImage === img
                        ? "border-yellow-400"
                        : "border-transparent"
                    }
                    hover:opacity-80 transition
                  `}
                  onClick={() => setMainImage(img)}
                />
              ))}
          </div>
        </div>

        {/* Información */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-yellow-400 drop-shadow-sm">
              {product.name}
            </h1>

            <p className="text-gray-400 mt-4 leading-relaxed">
              {product.description}
            </p>

            <p className="text-4xl font-bold text-yellow-400 drop-shadow-md mt-6">
              S/ {product.price.toFixed(2)}
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => addToCart(product)}
            className="
              mt-10 
              bg-yellow-500 
              hover:bg-yellow-400 
              text-black 
              font-bold 
              py-4 
              rounded-xl 
              text-lg
              transition-all
              shadow-[0_0_15px_rgba(246,196,0,0.3)]
            "
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      {/* Productos relacionados */}
      {related.length > 0 && (
        <div className="max-w-6xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-yellow-400 mb-8">
            También te puede interesar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;