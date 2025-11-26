import { useEffect, useState } from "react";
import { formatPrice } from "../utils/currency";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders_sim")) || [];
    setOrders(saved);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-10">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">
        Panel de Pedidos (Admin)
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No hay pedidos registrados.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl text-gray-900 dark:text-white">
                  Pedido #{order.id}
                </h2>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    order.status === "created"
                      ? "bg-yellow-500/20 text-yellow-600"
                      : "bg-green-500/20 text-green-700"
                  }`}
                >
                  {order.status === "created" ? "Pendiente" : "Completado"}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {new Date(order.date).toLocaleString()}
              </p>

              {/* Items */}
              <div className="mt-4 space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between text-gray-900 dark:text-gray-200"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mt-4 flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span className="text-orange-600">
                  {formatPrice(order.total)}
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Método de pago:{" "}
                <span className="font-semibold capitalize">
                  {order.paymentMethod}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
