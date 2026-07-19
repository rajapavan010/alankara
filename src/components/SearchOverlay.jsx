import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { useProducts } from "../context/useProducts";

function SearchOverlay({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] =
    useState("");

  const searchInputRef = useRef(null);

  const {
    products,
    productsLoading,
    productsError,
    refreshProducts,
  } = useProducts();

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");

      return;
    }

    const focusTimer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.clearTimeout(focusTimer);

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const normalizedSearchTerm = searchTerm
      .trim()
      .toLowerCase();

    if (!normalizedSearchTerm) {
      return [];
    }

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        product.categoryLabel,
        product.description,
        product.badge,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(
        normalizedSearchTerm
      );
    });
  }, [products, searchTerm]);

  if (!isOpen) {
    return null;
  }

  const hasSearchTerm =
    searchTerm.trim().length > 0;

  return (
    <div
      className="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search Alankara products"
    >
      <div className="search-overlay-top">
        <p>✦ FIND YOUR SPARKLE ✦</p>

        <button
          type="button"
          className="search-close-button"
          onClick={onClose}
          aria-label="Close search"
        >
          ×
        </button>
      </div>

      <div className="search-overlay-content">
        <div className="search-heading">
          <h2>What are you looking for?</h2>

          <p>
            Search necklaces, earrings, bracelets,
            rings and hampers.
          </p>
        </div>

        <div className="search-input-wrapper">
          <span className="search-input-icon">
            ⌕
          </span>

          <input
            ref={searchInputRef}
            type="search"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search Alankara..."
            aria-label="Search products"
          />

          {searchTerm && (
            <button
              type="button"
              className="search-clear-button"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {productsLoading && (
          <div className="search-loading-state">
            <span>◇</span>

            <p>
              Gathering the Alankara collection...
            </p>
          </div>
        )}

        {!productsLoading && productsError && (
          <div className="search-error-state">
            <span>◇</span>

            <h3>Search needs a moment</h3>

            <p>
              The jewellery collection could not be
              loaded right now.
            </p>

            <button
              type="button"
              onClick={refreshProducts}
            >
              TRY AGAIN
            </button>
          </div>
        )}

        {!productsLoading &&
          !productsError &&
          !hasSearchTerm && (
            <div className="search-empty-state">
              <span>◇</span>

              <p>
                Try searching for "heart", "necklace"
                or "earrings".
              </p>
            </div>
          )}

        {!productsLoading &&
          !productsError &&
          hasSearchTerm &&
          searchResults.length === 0 && (
            <div className="search-no-results">
              <span>♡</span>

              <h3>No sparkle found</h3>

              <p>
                We couldn't find anything matching "
                {searchTerm}".
              </p>

              <Link
                to="/shop"
                onClick={onClose}
                className="search-shop-link"
              >
                EXPLORE ALL COLLECTIONS →
              </Link>
            </div>
          )}

        {!productsLoading &&
          !productsError &&
          searchResults.length > 0 && (
            <div className="search-results">
              <div className="search-results-heading">
                <p>
                  {searchResults.length}{" "}
                  {searchResults.length === 1
                    ? "PIECE"
                    : "PIECES"}{" "}
                  FOUND
                </p>
              </div>

              <div className="search-results-grid">
                {searchResults.map((product) => (
                  <Link
                    to={`/product/${product.slug}`}
                    className="search-result-card"
                    key={product.id}
                    onClick={onClose}
                  >
                    <div className="search-result-image">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                        />
                      ) : (
                        <div className="search-result-placeholder">
                          <span>◇</span>

                          <p>ALANKARA</p>
                        </div>
                      )}
                    </div>

                    <div className="search-result-information">
                      <p>
                        {product.categoryLabel.toUpperCase()}
                      </p>

                      <h3>{product.name}</h3>

                      <div className="search-result-price">
                        <span>
                          ₹{product.price}
                        </span>

                        {product.originalPrice && (
                          <del>
                            ₹
                            {product.originalPrice}
                          </del>
                        )}
                      </div>
                    </div>

                    <span className="search-result-arrow">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default SearchOverlay;