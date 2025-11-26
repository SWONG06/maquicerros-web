import { Link, useSearchParams } from "react-router-dom";

const CheckoutSuccess = () => {
  const [params] = useSearchParams();
  const orderId = params.get("id");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        ¡Pedido realizado con éxito! 🎉
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Número de pedido: <strong>#{orderId}</strong>
      </p>

      <Link
        to="/pedidos"
        className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold"
      >
        Ver mis pedidos
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
