import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../services/orders";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // 🧭 Cargar todas las órdenes
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

  // 🧩 Actualizar estado de la orden
  const handleStatusChange = async (orderId, newStatus) => {
    const confirmChange = confirm(
      `¿Seguro que deseas cambiar el estado de la orden #${orderId} a "${newStatus}"?`
    );
    if (!confirmChange) return;

    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: newStatus } : o
        )
      );
      setMessage(`✅ Estado del pedido #${orderId} actualizado a "${newStatus}".`);
      setTimeout(() => setMessage(""), 4000);
    } else {
      setMessage("❌ Error al actualizar el pedido.");
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      created: "bg-yellow-100 text-yellow-800 border-yellow-400",
      processing: "bg-blue-100 text-blue-800 border-blue-400",
      completed: "bg-green-100 text-green-800 border-green-400",
      cancelled: "bg-red-100 text-red-800 border-red-400",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium border ${styles[status] || "bg-gray-100 text-gray-600 border-gray-300"}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-secondary shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          🧰 Panel de administración de pedidos
        </h1>

        {message && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {message}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500">Cargando pedidos...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No hay pedidos registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <tr>
                  <th className="p-3 border">ID</th>
                  <th className="p-3 border">Cliente</th>
                  <th className="p-3 border">Total</th>
                  <th className="p-3 border">Estado</th>
                  <th className="p-3 border">Actualizar</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="p-3 border text-center">{order.id}</td>
                    <td className="p-3 border">
                      <p className="font-medium">{order.name}</p>
                      <p className="text-sm text-gray-500">{order.email}</p>
                    </td>
                    <td className="p-3 border text-center">
                      S/ {order.total?.toFixed(2)}
                    </td>
                    <td className="p-3 border text-center">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="p-3 border text-center">
                      <select
                        defaultValue={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="px-3 py-1 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
                      >
                        <option value="created">Pendiente</option>
                        <option value="processing">En proceso</option>
                        <option value="completed">Completado</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
