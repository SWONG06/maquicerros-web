import { Link, useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const orderSuccess = location.state?.orderSuccess || false;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-6">
      {orderSuccess ? (
        <div className="bg-white dark:bg-secondary shadow-xl rounded-2xl p-10 max-w-md w-full">
          <div className="text-green-500 text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ¡Compra realizada con éxito!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Tu pedido ha sido registrado correctamente. Pronto recibirás un correo
            con los detalles del envío.
          </p>

          <Link
            to="/productos"
            className="inline-block bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-semibold transition"
          >
            🛠️ Seguir comprando
          </Link>
        </div>
      ) : (
        <div className="text-center text-gray-600 dark:text-gray-300">
          <p>😅 No se encontró información del pedido.</p>
          <Link
            to="/productos"
            className="mt-4 inline-block bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-semibold transition"
          >
            Volver a productos
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;
