import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getOrders } from "../services/orders";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const orderSuccess = location.state?.orderSuccess || false;

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await getOrders();
      if (result.success) {
        setOrders(result.orders || result.data || []);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-start py-16">
      <div className="w-full max-w-4xl bg-white dark:bg-secondary shadow-lg rounded-xl p-8">
        {/* ✅ Mensaje de éxito */}
        {orderSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-6">
            ✅ Pedido realizado con éxito
          </div>
        )}

        <h1 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-2">
          📄 Mis pedidos
        </h1>

        {loading ? (
          <p className="text-gray-500 text-center">Cargando pedidos...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600 text-center">No tienes pedidos aún.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition"
              >
                <div className="flex justify-between flex-wrap">
                  <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                    Pedido #{order.id}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  <strong>Total:</strong> S/ {order.total?.toFixed(2)} <br />
                  <strong>Método:</strong> {order.paymentMethod} <br />
                  <strong>Dirección:</strong> {order.address}
                </p>
                {order.items && (
                  <div className="mt-3">
                    <strong className="text-gray-700 dark:text-gray-300">
                      Productos:
                    </strong>
                    <ul className="list-disc ml-6 text-gray-600 dark:text-gray-300">
                      {Array.isArray(order.items) ? (
                        order.items.map((item, i) => (
                          <li key={i}>
                            {item.name} x{item.quantity} — S/ {item.price}
                          </li>
                        ))
                      ) : (
                        <li>{order.items}</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            to="/productos"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition"
          >
            🛠️ Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orders;
