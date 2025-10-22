const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © 2025 Maquicerros. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm hover:text-primary transition-colors duration-200"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="text-sm hover:text-primary transition-colors duration-200"
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
