const WhatsappButton = () => {
  const phone = "51984371681"; // <-- Cambiar al número de la empresa
  const message =
    "Hola, vengo desde la página web de Maquicerros y deseo más información.";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-400 p-4 rounded-full shadow-[0_0_25px_rgba(255,215,0,0.5)] transition-all duration-300 hover:scale-110 z-50"
    >
      <img src="/whatsapp.svg" alt="WhatsApp" className="w-8 h-8" />
    </a>
  );
};

export default WhatsappButton;

