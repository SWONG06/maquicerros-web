const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] border-t border-yellow-500/30 py-8">
      <div className="max-w-7xl mx-auto px-6 text-center text-gray-300">
        <p className="text-sm mb-4">
          © 2025 <span className="text-yellow-400 font-semibold">Maquicerros</span>.
          Todos los derechos reservados.
        </p>

        <div className="flex justify-center gap-6">
          <a
            href="#"
            className="text-yellow-400 hover:text-white hover:underline transition-all text-sm"
          >
            Política de Privacidad
          </a>
          <a
            href="#"
            className="text-yellow-400 hover:text-white hover:underline transition-all text-sm"
          >
            Términos de Uso
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
