import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/useProducts";

const categories = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "necklaces",
    label: "Necklaces",
  },
  {
    value: "earrings",
    label: "Earrings",
  },
  {
    value: "bracelets",
    label: "Bracelets",
  },
  {
    value: "rings",
    label: "Rings",
  },
  {
    value: "hampers",
    label: "Hampers",
  },
];

function ShopPage() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const {
    products,
    productsLoading,
    productsError,
    refreshProducts,
  } = useProducts();

  const [sortOption, setSortOption] =
    useState("featured");

  const categoryFromUrl =
    searchParams.get("category") || "all";

  const collectionFromUrl =
    searchParams.get("collection");

  const selectedCategory = categories.some(
    (category) =>
      category.value === categoryFromUrl
  )
    ? categoryFromUrl
    : "all";

  const visibleProducts = useMemo(() => {
    let filteredProducts = [...products];

    if (
      collectionFromUrl === "new-arrivals"
    ) {
      filteredProducts =
        filteredProducts.filter(
          (product) => product.isNewArrival
        );
    }

    if (selectedCategory !== "all") {
      filteredProducts =
        filteredProducts.filter(
          (product) =>
            product.category ===
            selectedCategory
        );
    }

    switch (sortOption) {
      case "price-low":
        filteredProducts.sort(
          (a, b) => a.price - b.price
        );

        break;

      case "price-high":
        filteredProducts.sort(
          (a, b) => b.price - a.price
        );

        break;

      case "newest":
        filteredProducts.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );
        });

        break;

      case "featured":
      default:
        filteredProducts.sort(
          (a, b) =>
            Number(b.isFeatured) -
            Number(a.isFeatured)
        );

        break;
    }

    return filteredProducts;
  }, [
    products,
    selectedCategory,
    collectionFromUrl,
    sortOption,
  ]);

  const handleCategoryChange = (
    categoryValue
  ) => {
    const nextSearchParams =
      new URLSearchParams(searchParams);

    if (categoryValue === "all") {
      nextSearchParams.delete("category");
    } else {
      nextSearchParams.set(
        "category",
        categoryValue
      );
    }

    setSearchParams(nextSearchParams);
  };

  const handleViewAllProducts = () => {
    setSearchParams({});
  };

  if (productsLoading) {
    return (
      <main className="shop-page">
        <section className="shop-hero">
          <p className="shop-hero-eyebrow">
            ✦ FIND YOUR EVERYDAY SPARKLE ✦
          </p>

          <h1>Shop Alankara</h1>

          <div className="shop-hero-divider">
            <span></span>

            <span>♡</span>

            <span></span>
          </div>

          <p className="shop-hero-description">
            Explore thoughtfully chosen jewellery
            made to add a little elegance and sparkle
            to your everyday moments.
          </p>
        </section>

        <section className="shop-products-section">
          <div className="shop-loading-state">
            <span>◇</span>

            <h2>Gathering your sparkle</h2>

            <p>
              Our jewellery collection is loading.
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (productsError) {
    return (
      <main className="shop-page">
        <section className="shop-hero">
          <p className="shop-hero-eyebrow">
            ✦ FIND YOUR EVERYDAY SPARKLE ✦
          </p>

          <h1>Shop Alankara</h1>

          <div className="shop-hero-divider">
            <span></span>

            <span>♡</span>

            <span></span>
          </div>

          <p className="shop-hero-description">
            Explore thoughtfully chosen jewellery
            made to add a little elegance and sparkle
            to your everyday moments.
          </p>
        </section>

        <section className="shop-products-section">
          <div className="shop-error-state">
            <span>◇</span>

            <h2>Our sparkle needs a moment</h2>

            <p>{productsError}</p>

            <button
              type="button"
              onClick={refreshProducts}
            >
              TRY AGAIN
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="shop-page">
      <section className="shop-hero">
        <p className="shop-hero-eyebrow">
          ✦ FIND YOUR EVERYDAY SPARKLE ✦
        </p>

        <h1>Shop Alankara</h1>

        <div className="shop-hero-divider">
          <span></span>

          <span>♡</span>

          <span></span>
        </div>

        <p className="shop-hero-description">
          Explore thoughtfully chosen jewellery made
          to add a little elegance and sparkle to your
          everyday moments.
        </p>
      </section>

      <section className="shop-products-section">
        {collectionFromUrl ===
          "new-arrivals" && (
          <div className="shop-collection-heading">
            <p>✦ FRESHLY ADDED ✦</p>

            <h2>New Arrivals</h2>

            <button
              type="button"
              onClick={handleViewAllProducts}
            >
              VIEW ALL PIECES
            </button>
          </div>
        )}

        <div className="shop-toolbar">
          <div className="shop-categories">
            {categories.map((category) => (
              <button
                type="button"
                key={category.value}
                className={`shop-category-button ${
                  selectedCategory ===
                  category.value
                    ? "shop-category-button-active"
                    : ""
                }`}
                onClick={() =>
                  handleCategoryChange(
                    category.value
                  )
                }
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="shop-sort">
            <label htmlFor="shop-sort-select">
              SORT BY
            </label>

            <select
              id="shop-sort-select"
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value)
              }
            >
              <option value="featured">
                Featured
              </option>

              <option value="newest">
                New Arrivals
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>
            </select>
          </div>
        </div>

        <div className="shop-results-information">
          <p>
            Showing {visibleProducts.length}{" "}
            {visibleProducts.length === 1
              ? "piece"
              : "pieces"}
          </p>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="shop-products-grid">
            {visibleProducts.map((product) => {
              const productIsInWishlist =
                isInWishlist(product.id);

              return (
                <article
                  className="shop-product-card"
                  key={product.id}
                >
                  <div className="shop-product-image-wrapper">
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
                      className="shop-product-link"
                      aria-label={`View ${product.name}`}
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="shop-product-image"
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

                    <button
  type="button"
  className="quick-add-button"
  onClick={() => {

    addToCart(product);

    toast.success(
      "✨ Added to your bag"
    );

  }}
  disabled={product.stock === 0}
>
  {product.stock === 0
    ? "OUT OF STOCK"
    : "ADD TO BAG"}
</button>
                  </div>

                  <div className="product-information">
                    <p className="product-category">
                      {product.categoryLabel.toUpperCase()}
                    </p>

                    <Link
                      to={`/product/${product.slug}`}
                      className="product-name-link"
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
        ) : (
  <div className="shop-empty-state">
    <div className="empty-icon">✦</div>

    <h2>This Collection Awaits You</h2>

    <p>
      We are carefully curating this collection with timeless
      handcrafted jewelry. Please visit again soon to discover
      our newest creations.
    </p>

    <button
      type="button"
      onClick={handleViewAllProducts}
      className="empty-products-btn"
    >
      VIEW ALL PIECES
    </button>
  </div>
)}
      </section>
    </main>
  );
}

export default ShopPage;