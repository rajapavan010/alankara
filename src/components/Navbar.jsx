import { useEffect, useState } from "react";

import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import logo from "../assets/image/alankara-logo.png";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar({
  onCartOpen,
  onWishlistOpen,
  onSearchOpen,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const closeMobileMenu = () => {
  setIsMobileMenuOpen(false);
};

  const handleSectionNavigation = (
    event,
    sectionId
  ) => {
    event.preventDefault();

    closeMobileMenu();

    if (location.pathname === "/") {
      const section = document.getElementById(
        sectionId
      );

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    navigate(`/#${sectionId}`);
  };

  const handleHomeClick = () => {
    closeMobileMenu();

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleSearchOpen = () => {
    closeMobileMenu();

    onSearchOpen();
  };

  const handleWishlistOpen = () => {
    closeMobileMenu();

    onWishlistOpen();
  };

  const handleCartOpen = () => {
    closeMobileMenu();

    onCartOpen();
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="navbar">
        <Link
          to="/"
          className="brand"
          aria-label="Alankara home"
          onClick={handleHomeClick}
        >
          <img
            src={logo}
            alt="Alankara by Jahnavi"
            className="brand-logo-image"
          />
        </Link>

        <nav
          className="nav-links"
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
            onClick={handleHomeClick}
          >
            HOME
          </NavLink>

          <a
            href="/#shop"
            onClick={(event) =>
              handleSectionNavigation(
                event,
                "shop"
              )
            }
          >
            SHOP
          </a>

          <a
            href="/#new-arrivals"
            onClick={(event) =>
              handleSectionNavigation(
                event,
                "new-arrivals"
              )
            }
          >
            NEW ARRIVALS
          </a>

          <a
            href="/#hampers"
            onClick={(event) =>
              handleSectionNavigation(
                event,
                "hampers"
              )
            }
          >
            HAMPERS
          </a>

          <a
            href="/#about"
            onClick={(event) =>
              handleSectionNavigation(
                event,
                "about"
              )
            }
          >
            ABOUT US
          </a>

          <a
            href="/#contact"
            onClick={(event) =>
              handleSectionNavigation(
                event,
                "contact"
              )
            }
          >
            CONTACT
          </a>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            onClick={handleSearchOpen}
            aria-label="Search"
          >
            ⌕
          </button>

          <button
            type="button"
            className="wishlist-nav-button"
            onClick={handleWishlistOpen}
            aria-label={`Wishlist with ${wishlistCount} saved items`}
          >
            ♡

            {wishlistCount > 0 && (
              <span className="wishlist-nav-count">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className="bag-button"
            onClick={handleCartOpen}
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            ♧

            <span className="bag-count">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() =>
              setIsMobileMenuOpen(true)
            }
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu-backdrop ${
          isMobileMenuOpen
            ? "mobile-menu-backdrop-open"
            : ""
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation"
        className={`mobile-menu ${
          isMobileMenuOpen
            ? "mobile-menu-open"
            : ""
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-menu-header">
          <Link
            to="/"
            className="mobile-menu-brand"
            onClick={handleHomeClick}
            aria-label="Alankara home"
          >
            <img
              src={logo}
              alt="Alankara by Jahnavi"
            />
          </Link>

          <button
            type="button"
            className="mobile-menu-close"
            onClick={closeMobileMenu}
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>

        <nav
          className="mobile-menu-links"
          aria-label="Mobile navigation"
        >
          <NavLink
            to="/"
            end
            onClick={handleHomeClick}
          >
            <span>01</span>

            <strong>HOME</strong>
          </NavLink>

          <a
            href="/#shop"
            onClick={(event) =>
              handleSectionNavigation(
                event,
                "shop"
              )
            }
          >
            <span>02</span>

            <strong>SHOP</strong>
          </a>

          <a
            href="/#new-arrivals"
            onClick={(event) =>
              handleSectionNavigation(
                event,
                "new-arrivals"
              )
            }
          >
            <span>03</span>

            <strong>NEW ARRIVALS</strong>
          </a>

          <a
            href="/#hampers"
            onClick={(event) =>
              handleSectionNavigation(
                event,
                "hampers"
              )
            }
          >
            <span>04</span>

            <strong>HAMPERS</strong>
          </a>

          <a
            href="/#about"
            onClick={(event) =>
              handleSectionNavigation(
                event,
                "about"
              )
            }
          >
            <span>05</span>

            <strong>ABOUT US</strong>
          </a>

          <a
            href="/#contact"
            onClick={(event) =>
              handleSectionNavigation(
                event,
                "contact"
              )
            }
          >
            <span>06</span>

            <strong>CONTACT</strong>
          </a>
        </nav>

        <div className="mobile-menu-secondary">
          <button
            type="button"
            onClick={handleWishlistOpen}
          >
            <span>♡</span>

            <p>SAVED PIECES</p>

            {wishlistCount > 0 && (
              <strong>{wishlistCount}</strong>
            )}
          </button>

          <button
            type="button"
            onClick={handleCartOpen}
          >
            <span>♧</span>

            <p>YOUR BAG</p>

            <strong>{cartCount}</strong>
          </button>
        </div>

        <div className="mobile-menu-footer">
          <p>
            ✦ A LITTLE SPARKLE FOR EVERY DAY ✦
          </p>

          <span>ALANKARA BY JAHNAVI</span>
        </div>
      </aside>
    </>
  );
}

export default Navbar;