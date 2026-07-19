import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Outlet } from "react-router-dom";

import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";
import WishlistDrawer from "../components/WishlistDrawer";
import SearchOverlay from "../components/SearchOverlay";
import Footer from "../components/Footer";

function StoreLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isWishlistOpen, setIsWishlistOpen] =
    useState(false);

  const [isSearchOpen, setIsSearchOpen] =
    useState(false);

  const openCart = useCallback(() => {
    setIsSearchOpen(false);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const openWishlist = useCallback(() => {
    setIsSearchOpen(false);
    setIsCartOpen(false);
    setIsWishlistOpen(true);
  }, []);

  const closeWishlist = useCallback(() => {
    setIsWishlistOpen(false);
  }, []);

  const openSearch = useCallback(() => {
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  useEffect(() => {
    if (
      isCartOpen ||
      isWishlistOpen ||
      isSearchOpen
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [
    isCartOpen,
    isWishlistOpen,
    isSearchOpen,
  ]);

  return (
    <>
      <AnnouncementBar />

      <Navbar
        onCartOpen={openCart}
        onWishlistOpen={openWishlist}
        onSearchOpen={openSearch}
      />

      <Outlet />

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={closeWishlist}
        onCartOpen={openCart}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={closeSearch}
      />
    </>
  );
}

export default StoreLayout;