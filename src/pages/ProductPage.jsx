import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/useProducts";
import toast from "react-hot-toast";

function ProductPage() {
  const { slug } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const {
    getProductBySlug,
    productsLoading,
    productsError,
    refreshProducts,
  } = useProducts();

  const [quantity, setQuantity] = useState(1);

  const [selectedImage, setSelectedImage] =
    useState(null);

  const product = getProductBySlug(slug) || null;

console.log("PRODUCT DATA:", product);
console.log("PRODUCT IMAGES:", product?.images);
console.log("SELECTED IMAGE:", selectedImage);

  const productGalleryImages = useMemo(() => {
    if (!product) {
      return [];
    }

    const galleryImages = (product.images || [])
      .filter(
        (galleryImage) => galleryImage.imageUrl
      )
      .map((galleryImage) => ({
        id: `gallery-${galleryImage.id}`,
        imageUrl: galleryImage.imageUrl,
        sortOrder: galleryImage.sortOrder,
      }));

    const allImages = product.image
      ? [
          {
            id: `cover-${product.id}`,
            imageUrl: product.image,
            sortOrder: 0,
          },
          ...galleryImages,
        ]
      : galleryImages;

    return allImages.filter(
      (image, imageIndex, images) =>
        images.findIndex(
          (currentImage) =>
            currentImage.imageUrl === image.imageUrl
        ) === imageIndex
    );
  }, [product]);

useEffect(() => {

  if (!productGalleryImages.length) {
    setSelectedImage(null);
    return;
  }


  setQuantity(1);

  setSelectedImage(
    productGalleryImages[0].imageUrl
  );


}, [product?.id]);

console.log(
  "SELECTED IMAGE:",
  selectedImage
);


  if (productsLoading) {
    return (
      <main className="product-page">
        <div className="product-page-loading">
          <span>◇</span>

          <h1>Finding your sparkle</h1>

          <p>
            We're preparing this piece for you.
          </p>
        </div>
      </main>
    );
  }

  if (productsError) {
    return (
      <main className="product-page">
        <div className="product-page-error">
          <span>◇</span>

          <h1>Our sparkle needs a moment</h1>

          <p>{productsError}</p>

          <button
            type="button"
            onClick={refreshProducts}
          >
            TRY AGAIN
          </button>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-not-found">
        <span className="product-not-found-icon">
          ◇
        </span>

        <h1>Piece Not Found</h1>

        <p>
          The jewellery piece you're looking for could
          not be found.
        </p>

        <Link
          to="/shop"
          className="product-back-shop-button"
        >
          BACK TO SHOP
        </Link>
      </main>
    );
  }

  const productIsInWishlist = isInWishlist(
    product.id
  );

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) /
          product.originalPrice) *
          100
      )
    : 0;

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(
        (currentQuantity) => currentQuantity + 1
      );
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(
        (currentQuantity) => currentQuantity - 1
      );
    }
  };

  const handleAddToBag = () => {

  if (product.stock === 0) {

    toast.error(
      "This product is out of stock"
    );

    return;

  }


  addToCart(
    product,
    quantity
  );


  toast.success(
    "✨ Added to your bag"
  );

};

const handleBuyNow = () => {

  if(product.stock === 0){

    toast.error(
      "This product is out of stock"
    );

    return;

  }


  addToCart(
    product,
    quantity
  );


  navigate("/checkout");

};
  return (
    <main className="product-page">
      <div className="product-breadcrumb">
        <Link to="/">HOME</Link>

        <span>/</span>

        <Link to="/shop">SHOP</Link>

        <span>/</span>

        <span>
          {product.name.toUpperCase()}
        </span>
      </div>

      <section className="product-detail-section">
        <div className="product-gallery">
          {productGalleryImages.length > 1 && (
            <div className="product-gallery-thumbnails">
              {productGalleryImages.map(
                (galleryImage, imageIndex) => (
                  <button
                    type="button"
                    key={galleryImage.id}
                    className={`product-gallery-thumbnail ${
                      selectedImage ===
                      galleryImage.imageUrl
                        ? "product-gallery-thumbnail-active"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedImage(
                        galleryImage.imageUrl
                      )
                    }
                    aria-label={`View ${
                      product.name
                    } image ${imageIndex + 1}`}
                    aria-pressed={
                      selectedImage ===
                      galleryImage.imageUrl
                    }
                  >
                    <img
                      src={galleryImage.imageUrl}
                      alt={`${product.name} view ${
                        imageIndex + 1
                      }`}
                    />
                  </button>
                )
              )}
            </div>
          )}

          <div className="product-detail-image-area">
            {product.badge && (
              <span
                className={`product-detail-badge ${
                  product.badge === "BESTSELLER"
                    ? "product-detail-bestseller"
                    : ""
                }`}
              >
                {product.badge}
              </span>
            )}

            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.name}
                className="product-detail-image"
              />
            ) : (
              <div className="product-detail-placeholder">
                <span className="product-detail-sparkle">
                  ✦
                </span>

                <div className="product-detail-placeholder-content">
                  <span className="product-detail-jewel">
                    ◇
                  </span>

                  <p>ALANKARA</p>

                  <span>
                    PRODUCT IMAGE COMING SOON
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="product-detail-information">
          <p className="product-detail-category">
            {product.categoryLabel.toUpperCase()}
          </p>

          <h1>{product.name}</h1>

          <div className="product-detail-price">
            <span className="product-detail-current-price">
              ₹{product.price}
            </span>

            {product.originalPrice && (
              <>
                <span className="product-detail-original-price">
                  ₹{product.originalPrice}
                </span>

                <span className="product-detail-discount">
                  {discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          <div className="product-detail-divider"></div>

          <p className="product-detail-description">
            {product.description}
          </p>

          <div className="product-stock-information">
            <span
              className={`product-stock-dot ${
                product.stock === 0
                  ? "product-stock-dot-empty"
                  : ""
              }`}
            ></span>

            <p>
              {product.stock > 0
                ? product.stock <= 5
                  ? `Only ${product.stock} pieces left`
                  : "In stock and ready to sparkle"
                : "Currently out of stock"}
            </p>
          </div>

          <div className="product-quantity-section">
            <p>QUANTITY</p>

            <div className="product-quantity-control">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity === 1}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={
                  product.stock === 0 ||
                  quantity >= product.stock
                }
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="product-detail-actions">
            <button
              type="button"
              className="product-add-bag-button"
              onClick={handleAddToBag}
              disabled={product.stock === 0}
            >
              {product.stock === 0
                ? "OUT OF STOCK"
                : "ADD TO BAG"}
            </button>

            <button
              type="button"
              className={`product-wishlist-button ${
                productIsInWishlist
                  ? "product-wishlist-button-active"
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
              {productIsInWishlist ? "♥" : "♡"}
            </button>
          </div>

          <button
            type="button"
            className="product-buy-now-button"
            onClick={handleBuyNow}
            disabled={product.stock === 0}
          >
            {product.stock === 0
              ? "OUT OF STOCK"
              : "BUY NOW"}
          </button>

          <div className="product-benefits">
            <div className="product-benefit">
              <span>♢</span>

              <div>
                <h3>ANTI-TARNISH</h3>

                <p>
                  Made for everyday sparkle
                </p>
              </div>
            </div>

            <div className="product-benefit">
              <span>♧</span>

              <div>
                <h3>WATER RESISTANT</h3>

                <p>
                  Designed for everyday moments
                </p>
              </div>
            </div>

            <div className="product-benefit">
              <span>♡</span>

              <div>
                <h3>HYPOALLERGENIC</h3>

                <p>
                  Thoughtfully chosen for comfort
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;