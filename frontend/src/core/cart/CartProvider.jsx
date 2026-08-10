import { createContext, useEffect, useReducer } from "react";
import cartReducer from "./cartReducer";
import * as cartService from "./cart.service";

export const CartContext = createContext(null);

const initialState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  deliveryCharge: 0,
  discount: 0,
  total: 0,
  loading: false,
  error: null,
};

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    const token =
      localStorage.getItem("mahii_token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token") ||
      localStorage.getItem("authToken");

    if (!token) {
      dispatch({
        type: "SET_CART",
        payload: { items: [], totalItems: 0, subtotal: 0, total: 0 },
      });
      return;
    }

    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    try {
      const cart = await cartService.getCart();

      dispatch({
        type: "SET_CART",
        payload: cart,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });
    }
  }

  async function addToCart(product, quantity = 1) {
    const token =
      localStorage.getItem("mahii_token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token") ||
      localStorage.getItem("authToken");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    try {
      const cart = await cartService.addItem(
        product._id || product.id,
        quantity
      );

      dispatch({
        type: "SET_CART",
        payload: cart,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });
    }
  }

  async function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }

    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    try {
      const cart = await cartService.updateQuantity(
        productId,
        quantity
      );

      dispatch({
        type: "SET_CART",
        payload: cart,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });
    }
  }

  async function removeFromCart(productId) {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    try {
      const cart = await cartService.removeItem(
        productId
      );

      dispatch({
        type: "SET_CART",
        payload: cart,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });
    }
  }

  async function clearCart() {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    try {
      await cartService.clearCart();

      dispatch({
        type: "CLEAR_CART",
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });
    }
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
