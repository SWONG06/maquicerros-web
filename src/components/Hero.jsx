const Hero = () => {
  return (
    <section className="relative w-full h-80 sm:h-[420px] md:h-[500px] overflow-hidden">

      {/* Imagen de fondo */}
      <img
        src="/hero.png"
        alt="Maquicerros Hero"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 
                   transition-transform duration-700"
      />

      {/* Overlay mejorado */}
      <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/40 to-black/55
                      dark:from-black/70 dark:via-black/60 dark:to-black/70"></div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center 
                      h-full px-4">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold 
                       text-white leading-tight drop-shadow-lg tracking-tight">
          Herramientas y <br className="sm:hidden" /> Maquinaria Profesional
        </h1>

        <p className="mt-3 text-sm sm:text-base md:text-lg text-white/90 max-w-lg 
                      font-medium drop-shadow">
          Encuentra las mejores herramientas para construcción, industria y hogar.
        </p>

        <a
          href="/productos"
          className="mt-5 px-6 py-2.5 sm:px-8 sm:py-3 bg-orange-600 hover:bg-orange-500 
                     text-white rounded-lg font-semibold shadow-lg text-sm sm:text-base
                     transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          Ver Catálogo
        </a>
      </div>
    </section>
  );
};

export default Hero;
