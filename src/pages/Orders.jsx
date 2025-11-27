import { useOrders } from "../context/OrdersContext";
import { CubeIcon, TruckIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const Orders = () => {
  const { orders } = useOrders();

  const getStatus = (index) => {
    const states = ["Procesando", "En camino", "Entregado"];
    return states[index % states.length];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Procesando":
        return <CubeIcon className="w-6 h-6 text-yellow-400" />;
      case "En camino":
        return <TruckIcon className="w-6 h-6 text-yellow-400" />;
      case "Entregado":
        return <CheckCircleIcon className="w-6 h-6 text-green-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24 pb-32 px-6 text-gray-100">

      <h1 className="text-4xl font-extrabold text-yellow-400 text-center mb-12 drop-shadow">
        Mis Pedidos
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          Aún no tienes pedidos registrados.
        </p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-8">

          {orders.map((order, i) => {
            const status = getStatus(i);
            return (
              <div
                key={order.id}
                className="
                  bg-[#121212]/80 
                  border border-yellow-500/30 
                  backdrop-blur 
                  rounded-xl 
                  p-8 
                  shadow-[0_0_20px_rgba(246,196,0,0.1)]
                  animate-fadeIn
                "
              >
                {/* HEADER */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
                  <div>
                    <p className="text-yellow-400 font-bold text-xl">
                      Pedido #{order.id}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Fecha: {new Date(order.date).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusIcon(status)}
                    <span className="text-yellow-400 font-semibold">
                      {status}
                    </span>
                  </div>
                </div>

                {/* ITEMS */}
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between border-b border-gray-700 pb-2"
                    >
                      <span className="text-gray-200">{item.name} x{item.quantity}</span>
                      <span className="text-yellow-400 font-semibold">
                        S/ {(item.quantity * item.price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* TOTAL */}
                <div className="mt-6 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-yellow-400">S/ {order.total.toFixed(2)}</span>
                </div>

                {/* ADDRESS */}
                <p className="mt-4 text-sm text-gray-400">
                  Dirección: {order.address}
                </p>
              </div>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default Orders;
