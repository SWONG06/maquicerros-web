import { createContext, useContext, useEffect, useReducer } from "react";

// Estado inicial
const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

// Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case "LOAD_CART":
      return { cart: action.payload };

    case "ADD_TO_CART": {
      const exists = state.cart.find((i) => i.id === action.payload.id);

      let updatedCart;

      if (exists) {
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
      const updatedCart = state.cart.filter((i) => i.id !== action.payload);
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

  // Cargar carrito guardado al inicio
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch({ type: "LOAD_CART", payload: saved });
  }, []);

  // ACCIONES
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // CALCULOS — soporta tanto "precio" como "price"
  const total = state.cart.reduce(
    (acc, item) =>
      acc + (item.precio || item.price || 0) * item.quantity,
    0
  );

  const getItemCount = () =>
    state.cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
