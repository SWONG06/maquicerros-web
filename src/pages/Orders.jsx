import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`);
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("❌ Error al cargar órdenes:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Mis Pedidos
      </h1>
      {orders.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          Aún no tienes pedidos realizados 🛒
        </p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="bg-white dark:bg-secondary rounded-lg p-4 shadow"
            >
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Orden #{order.id}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Estado: <strong>{order.status}</strong> | Pago:{" "}
                <strong>{order.paymentStatus}</strong>
              </p>
              <p className="text-primary font-semibold mt-2">
                Total: S/ {order.total.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
