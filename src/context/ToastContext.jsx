import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: "",
    visible: false,
  });

  const showToast = (message) => {
    setToast({ message, visible: true });

    // Ocultar automáticamente en 2.5s
    setTimeout(() => {
      setToast({ message: "", visible: false });
    }, 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* 🍞 TOAST VISUAL */}
      {toast.visible && (
        <div
          className="
            fixed bottom-6 left-1/2 -translate-x-1/2
            bg-yellow-500 text-black font-bold
            px-6 py-3 rounded-xl shadow-xl
            border border-black/30 
            animate-fadeInUp
            z-50
          "
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

// ✅ ESTE ES EL HOOK QUE FALTABA
export const useToast = () => useContext(ToastContext);
