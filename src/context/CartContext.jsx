import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("alankara-cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "alankara-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    if (!product || product.stock === 0) {
      return;
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) => {
          if (item.id !== product.id) {
            return item;
          }

          const updatedQuantity = Math.min(
            item.quantity + quantity,
            product.stock
          );

          return {
            ...item,
            quantity: updatedQuantity,
          };
        });
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: Math.min(quantity, product.stock),
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  const updateCartQuantity = (productId, quantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        const safeQuantity = Math.max(
          1,
          Math.min(quantity, item.stock)
        );

        return {
          ...item,
          quantity: safeQuantity,
        };
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const cartValue = {
    cartItems,
    cartCount,
    cartSubtotal,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartValue}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}

export {
  CartProvider,
  useCart,
};