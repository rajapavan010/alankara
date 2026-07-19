import { Link } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function WishlistDrawer({
  isOpen,
  onClose,
  onCartOpen,
}) {
  const {
    wishlistItems,
    wishlistCount,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const {
    cartItems,
    cartCount,
    addToCart,
  } = useCart();

  const isInCart = (productId) => {
    return cartItems.some(
      (item) => item.id === productId
    );
  };

  const handleAddToBag = (product) => {
    if (product.stock === 0) {
      return;
    }

    addToCart(product);
  };

  const handleViewBag = () => {
    onClose();

    if (onCartOpen) {
      onCartOpen();
    }
  };

  return (
    <>
      <div
        className={`wishlist-backdrop ${
          isOpen ? "wishlist-backdrop-open" : ""
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`wishlist-drawer ${
          isOpen ? "wishlist-drawer-open" : ""
        }`}
        aria-hidden={!isOpen}
        aria-label="Your wishlist"
      >
        <div className="wishlist-drawer-header">
          <div>
            <p>✦ SAVED SPARKLE ✦</p>

            <h2>Your Wishlist</h2>
          </div>

          <button
            type="button"
            className="wishlist-drawer-close"
            onClick={onClose}
            aria-label="Close wishlist"
          >
            ×
          </button>
        </div>

        {wishlistCount === 0 ? (
          <div className="wishlist-empty">
            <span>♡</span>

            <h3>No saved sparkle yet</h3>

            <p>
              Save the pieces you love and come back to
              them whenever you're ready.
            </p>

            <Link
              to="/shop"
              onClick={onClose}
              className="wishlist-shop-button"
            >
              EXPLORE COLLECTIONS
            </Link>
          </div>
        ) : (
          <>
            <div className="wishlist-items">
              {wishlistItems.map((product) => {
                const productIsInCart = isInCart(
                  product.id
                );

                return (
                  <article
                    className="wishlist-item"
                    key={product.id}
                  >
                    <Link
                      to={`/product/${product.slug}`}
                      className="wishlist-item-image"
                      onClick={onClose}
                      aria-label={`View ${product.name}`}
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                        />
                      ) : (
                        <div className="wishlist-item-placeholder">
                          <span>◇</span>

                          <p>ALANKARA</p>
                        </div>
                      )}
                    </Link>

                    <div className="wishlist-item-information">
                      <p className="wishlist-item-category">
                        {product.categoryLabel.toUpperCase()}
                      </p>

                      <Link
                        to={`/product/${product.slug}`}
                        onClick={onClose}
                        className="wishlist-item-name"
                      >
                        {product.name}
                      </Link>

                      <div className="wishlist-item-price">
                        <span>
                          ₹{product.price}
                        </span>

                        {product.originalPrice && (
                          <del>
                            ₹{product.originalPrice}
                          </del>
                        )}
                      </div>

                      <div className="wishlist-item-actions">
                        <button
                          type="button"
                          className={
                            productIsInCart
                              ? "wishlist-added-button"
                              : ""
                          }
                          onClick={() =>
                            handleAddToBag(product)
                          }
                          disabled={
                            product.stock === 0 ||
                            productIsInCart
                          }
                        >
                          {product.stock === 0
                            ? "OUT OF STOCK"
                            : productIsInCart
                              ? "✓ ADDED TO BAG"
                              : "ADD TO BAG"}
                        </button>

                        <button
                          type="button"
                          className="wishlist-remove-button"
                          onClick={() =>
                            removeFromWishlist(
                              product.id
                            )
                          }
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="wishlist-drawer-footer">
              <button
                type="button"
                onClick={clearWishlist}
                className="wishlist-clear-button"
              >
                CLEAR WISHLIST
              </button>

              {cartCount > 0 ? (
                <button
                  type="button"
                  onClick={handleViewBag}
                  className="wishlist-view-bag-button"
                >
                  VIEW BAG ({cartCount})
                </button>
              ) : (
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="wishlist-continue-button"
                >
                  CONTINUE SHOPPING
                </Link>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default WishlistDrawer;