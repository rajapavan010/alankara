import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WishlistContext = createContext(null);

function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem(
        "alankara-wishlist"
      );

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "alankara-wishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    if (!product) {
      return;
    }

    setWishlistItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return currentItems;
      }

      return [...currentItems, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  const toggleWishlist = (product) => {
    if (!product) {
      return;
    }

    setWishlistItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return currentItems.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentItems, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(
      (item) => item.id === productId
    );
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = useMemo(() => {
    return wishlistItems.length;
  }, [wishlistItems]);

  const wishlistValue = {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={wishlistValue}>
      {children}
    </WishlistContext.Provider>
  );
}

function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}

export {
  WishlistProvider,
  useWishlist,
};