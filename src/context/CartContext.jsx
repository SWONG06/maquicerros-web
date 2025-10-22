import { createContext, useContext, useEffect, useReducer } from "react";

// Estado inicial
const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

// Reducer para manejar acciones del carrito
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      let updatedCart;
      if (existing) {
        updatedCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }

    case "REMOVE_FROM_CART": {
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }

    case "UPDATE_QUANTITY": {
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }

    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return { cart: [] };

    default:
      return state;
  }
}

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Sincroniza con localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // 🔹 Acciones
  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });

  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  // 🔹 Calcular total general
  const total = state.cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 🔹 Contar cantidad total de productos
  const getItemCount = () =>
    state.cart.reduce((acc, item) => acc + item.quantity, 0);

  // 🔹 Exportar contexto
  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        getItemCount, // ✅ agregado aquí
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
