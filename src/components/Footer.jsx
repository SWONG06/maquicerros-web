const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 border-t border-white/10 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Marca */}
          <p className="text-sm text-center md:text-left text-gray-400">
            © {new Date().getFullYear()} <span className="text-orange-500 font-semibold">Maquicerros</span>. 
            Todos los derechos reservados.
          </p>

          {/* Enlaces */}
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm hover:text-orange-400 transition-colors duration-200"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="text-sm hover:text-orange-400 transition-colors duration-200"
            >
              Términos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
