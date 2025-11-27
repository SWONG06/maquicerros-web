import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-yellow-400 flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-5xl font-extrabold drop-shadow mb-6">
        ¡Pedido realizado con éxito! 🎉
      </h1>

      <p className="text-gray-300 text-lg max-w-xl mb-10">
        Gracias por tu compra. Tu pedido ha sido registrado correctamente.
      </p>

      <Link
        to="/pedidos"
        className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg shadow-xl transition-all"
      >
        Ver mis pedidos
      </Link>

    </div>
  );
};

export default OrderSuccess;
