import {
  createContext,
  useState,
} from "react";

export const CartContext =
  createContext(null);

export default function CartProvider({
  children,
}) {
  const [cart, setCart] = useState({ items: [] });

  const [loading, setLoading] =
    useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const items = prevCart?.items ?? [];
      const productId = product._id || product.id;
      const existingItem = items.find(
        (item) =>
          item.productId === productId
      );

      if (existingItem) {
        return {
          ...prevCart,
          items: items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...prevCart,
        items: [
          ...items,
          {
            ...product,
            productId,
            quantity: 1,
          },
        ],
      };
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loading,
        setLoading,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
