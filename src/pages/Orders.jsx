import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/currency";
import {
  ClockIcon,
  CheckCircleIcon,
  CreditCardIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // 🔥 Obtener pedidos simulados desde LocalStorage
    const savedOrders = JSON.parse(localStorage.getItem("orders_sim")) || [];
    const userOrders = savedOrders.filter((o) => o.userId === user.id);

    // Ordenar por fecha (recientes primero)
    userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

    setOrders(userOrders);
  }, [user, navigate]);

  // 🎨 Badges de Estado PRO
  const statusBadge = (status) => {
    switch (status) {
      case "created":
        return (
          <span className="flex items-center gap-1 px-4 py-1 rounded-full bg-yellow-500/20 text-yellow-700 font-semibold text-sm">
            <ClockIcon className="w-4 h-4" />
            Pendiente
          </span>
        );
      case "completed":
        return (
          <span className="flex items-center gap-1 px-4 py-1 rounded-full bg-green-500/20 text-green-700 font-semibold text-sm">
            <CheckCircleIcon className="w-4 h-4" />
            Completado
          </span>
        );
      default:
        return (
          <span className="px-4 py-1 rounded-full bg-gray-500/20 text-gray-700 font-semibold text-sm">
            Desconocido
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          📦 Mis Pedidos
        </h1>

        {/* 🟠 Si NO hay pedidos */}
        {orders.length === 0 ? (
          <div className="text-center bg-white dark:bg-gray-800 p-12 rounded-2xl shadow-xl">
            <CubeIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Aún no has realizado ningún pedido.
            </p>
            <button
              onClick={() => navigate("/productos")}
              className="mt-6 px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold shadow-md"
            >
              Ver productos
            </button>
          </div>
        ) : (
          // 🟢 Lista de pedidos
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* ▶ Encabezado del pedido */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Pedido #{order.id}
                  </h2>

                  {statusBadge(order.status)}
                </div>

                {/* ▶ Fecha */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {new Date(order.date).toLocaleString()}
                </p>

                {/* ▶ Productos dentro del pedido */}
                <div className="space-y-4 mb-6">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between items-center text-gray-700 dark:text-gray-300"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ▶ Total */}
                <div className="flex justify-between text-lg font-bold border-t pt-4">
                  <span>Total:</span>
                  <span className="text-orange-600">
                    {formatPrice(order.total)}
                  </span>
                </div>

                {/* ▶ Método de pago */}
                <div className="mt-4 flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                  <CreditCardIcon className="w-5 h-5" />
                  <span>
                    Método de pago:{" "}
                    <span className="font-semibold capitalize">
                      {order.paymentMethod}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Orders;
