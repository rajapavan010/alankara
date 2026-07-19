import { Link } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/useProducts";

function NewArrivals() {
  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const {
    newArrivalProducts,
    productsLoading,
    productsError,
  } = useProducts();

  const displayedNewArrivals =
    newArrivalProducts.slice(0, 4);

  return (
    <section
      className="new-arrivals-section"
      id="new-arrivals"
    >
      <div className="new-arrivals-heading">
        <p className="new-arrivals-eyebrow">
          ✦ FRESHLY ADDED ✦
        </p>

        <h2>New Arrivals</h2>

        <p className="new-arrivals-description">
          Meet the newest additions to Alankara,
          thoughtfully chosen to add a little sparkle to
          your everyday.
        </p>
      </div>

      {productsLoading ? (
        <div className="new-arrivals-loading">
          <span>◇</span>

          <p>Gathering our newest sparkle...</p>
        </div>
      ) : productsError ? (
        <div className="new-arrivals-error">
          <span>◇</span>

          <p>
            Our newest pieces could not be loaded right
            now.
          </p>
        </div>
      ) : displayedNewArrivals.length === 0 ? (
        <div className="new-arrivals-empty">
          <span>✦</span>

          <h3>Something beautiful is coming</h3>

          <p>
            New pieces are being thoughtfully prepared.
          </p>
        </div>
      ) : (
        <div className="products-grid">
          {displayedNewArrivals.map((product) => {
            const productIsInWishlist =
              isInWishlist(product.id);

            return (
              <article
                className="product-card"
                key={product.id}
              >
                <div className="product-image-wrapper">
                  {product.badge && (
                    <span
                      className={`product-badge ${
                        product.badge ===
                        "BESTSELLER"
                          ? "bestseller-badge"
                          : ""
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  <button
                    type="button"
                    className={`wishlist-button ${
                      productIsInWishlist
                        ? "wishlist-button-active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleWishlist(product)
                    }
                    aria-label={
                      productIsInWishlist
                        ? `Remove ${product.name} from wishlist`
                        : `Add ${product.name} to wishlist`
                    }
                    aria-pressed={
                      productIsInWishlist
                    }
                  >
                    {productIsInWishlist
                      ? "♥"
                      : "♡"}
                  </button>

                  <Link
                    to={`/product/${product.slug}`}
                    className="new-arrival-product-link"
                    aria-label={`View ${product.name}`}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="new-arrival-product-image"
                      />
                    ) : (
                      <div className="product-placeholder">
                        <span className="product-placeholder-sparkle">
                          ✦
                        </span>

                        <div className="product-placeholder-content">
                          <span className="placeholder-jewel">
                            ◇
                          </span>

                          <p className="placeholder-brand">
                            ALANKARA
                          </p>

                          <span className="placeholder-message">
                            PRODUCT IMAGE COMING SOON
                          </span>
                        </div>
                      </div>
                    )}
                  </Link>

                  <Link
                    to={`/product/${product.slug}`}
                    className="quick-add-button"
                  >
                    VIEW PIECE
                  </Link>
                </div>

                <div className="product-information">
                  <p className="product-category">
                    {product.categoryLabel.toUpperCase()}
                  </p>

                  <Link
                    to={`/product/${product.slug}`}
                    className="new-arrival-title-link"
                  >
                    <h3>{product.name}</h3>
                  </Link>

                  <div className="product-price">
                    <span className="current-price">
                      ₹{product.price}
                    </span>

                    {product.originalPrice && (
                      <span className="original-price">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {!productsLoading &&
        !productsError &&
        displayedNewArrivals.length > 0 && (
          <div className="new-arrivals-view-all">
            <Link
              to="/shop?collection=new-arrivals"
              className="new-arrivals-button"
            >
              SHOP ALL NEW ARRIVALS
            </Link>
          </div>
        )}
    </section>
  );
}

export default NewArrivals;