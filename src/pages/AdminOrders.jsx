import { useOrders } from "../context/OrdersContext";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const AdminOrders = () => {
  const { orders } = useOrders();

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-16 px-6">
      
      {/* TÍTULO */}
      <div className="max-w-6xl mx-auto mb-10 flex items-center gap-3">
        <ClipboardDocumentListIcon className="w-10 h-10 text-yellow-400 drop-shadow" />
        <h1 className="text-4xl font-extrabold text-yellow-400 drop-shadow">
          Administración de Pedidos
        </h1>
      </div>

      {/* SIN PEDIDOS */}
      {orders.length === 0 ? (
        <p className="text-center text-gray-400 text-lg mt-20">
          No hay pedidos registrados aún.
        </p>
      ) : (
        <div className="max-w-6xl mx-auto overflow-x-auto rounded-xl border border-yellow-500/30 shadow-lg shadow-black/40">
          
          {/* TABLA */}
          <table className="w-full bg-[#1A1A1A] text-gray-300">
            <thead className="bg-[#111] border-b border-yellow-500/40">
              <tr>
                <th className="py-4 px-4 text-left text-yellow-400">ID</th>
                <th className="py-4 px-4 text-left text-yellow-400">Cliente</th>
                <th className="py-4 px-4 text-left text-yellow-400">Total</th>
                <th className="py-4 px-4 text-left text-yellow-400">Método Pago</th>
                <th className="py-4 px-4 text-left text-yellow-400">Fecha</th>
                <th className="py-4 px-4 text-left text-yellow-400">Ver</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-700 hover:bg-[#2A2A2A] transition"
                >
                  <td className="py-4 px-4 font-semibold text-yellow-400">
                    #{order.id}
                  </td>

                  <td className="py-4 px-4">
                    {order.customer?.name}<br />
                    <span className="text-gray-400 text-sm">{order.customer?.email}</span>
                  </td>

                  <td className="py-4 px-4 font-bold text-yellow-400">
                    S/ {order.total.toFixed(2)}
                  </td>

                  <td className="py-4 px-4 capitalize">
                    {order.paymentMethod}
                  </td>

                  <td className="py-4 px-4 text-sm">
                    {new Date(order.date).toLocaleString()}
                  </td>

                  <td className="py-4 px-4">
                    <button
                      className="
                        bg-yellow-500 
                        hover:bg-yellow-400 
                        text-black 
                        font-semibold 
                        px-4 py-2 
                        rounded-lg 
                        transition
                      "
                      onClick={() => alert(JSON.stringify(order, null, 2))}
                    >
                      Ver más
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
