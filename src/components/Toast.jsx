const Toast = ({ message, visible }) => {
  return (
    <div
      className={`
        fixed bottom-6 left-1/2 transform -translate-x-1/2 
        px-5 py-3 rounded-lg text-black font-semibold
        bg-yellow-500 shadow-[0_0_15px_rgba(246,196,0,0.7)]
        transition-all duration-500 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        z-9999
      `}
    >
      {message}
    </div>
  );
};

export default Toast;
