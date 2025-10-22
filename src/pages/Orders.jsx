import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto bg-white dark:bg-secondary p-8 rounded-lg shadow-lg">
        {location.state?.orderSuccess && (
          <div className="bg-green-100 text-green-700 p-4 rounded-md mb-6">
            ✅ Pedido realizado con éxito
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          🧾 Mis pedidos
        </h1>
        {orders.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            No tienes pedidos aún.
          </p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Pedido #{order.id}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {order.date}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Total:{" "}
                  <span className="font-semibold text-primary">
                    S/ {order.total.toFixed(2)}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Método de pago: {order.paymentMethod}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Dirección: {order.address}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8">
          <Link
            to="/productos"
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orders;
