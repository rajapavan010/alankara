import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

function CartDrawer({ isOpen, onClose }) {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    removeFromCart,
    updateCartQuantity,
  } = useCart();

  return (
    <>
      <div
        className={`cart-drawer-overlay ${
          isOpen ? "cart-drawer-overlay-open" : ""
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <aside
        className={`cart-drawer ${
          isOpen ? "cart-drawer-open" : ""
        }`}
        aria-hidden={!isOpen}
      >
        <div className="cart-drawer-header">
          <div>
            <p className="cart-drawer-eyebrow">
              YOUR SPARKLE
            </p>

            <h2>Your Bag</h2>
          </div>

          <button
            type="button"
            className="cart-drawer-close"
            onClick={onClose}
            aria-label="Close shopping bag"
          >
            ×
          </button>
        </div>

        <div className="cart-drawer-divider"></div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-jewel">
              ◇
            </span>

            <h3>Your bag is empty</h3>

            <p>
              A little sparkle is waiting for you.
            </p>

            <Link
              to="/shop"
              className="cart-empty-shop-button"
              onClick={onClose}
            >
              DISCOVER THE COLLECTION
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-drawer-items">
              {cartItems.map((item) => (
                <article
                  className="cart-drawer-item"
                  key={item.id}
                >
                  <Link
                    to={`/product/${item.slug}`}
                    className="cart-item-image-wrapper"
                    onClick={onClose}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-image"
                      />
                    ) : (
                      <div className="cart-item-placeholder">
                        <span>◇</span>

                        <p>ALANKARA</p>
                      </div>
                    )}
                  </Link>

                  <div className="cart-item-information">
                    <p className="cart-item-category">
                      {item.categoryLabel.toUpperCase()}
                    </p>

                    <Link
                      to={`/product/${item.slug}`}
                      className="cart-item-name"
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>

                    <p className="cart-item-price">
                      ₹{item.price}
                    </p>

                    <div className="cart-item-bottom">
                      <div className="cart-item-quantity">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          disabled={
                            item.quantity >= item.stock
                          }
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-item-remove"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <div className="cart-drawer-summary">
                <div className="cart-summary-row">
                  <span>
                    ITEMS
                  </span>

                  <span>
                    {cartCount}
                  </span>
                </div>

                <div className="cart-summary-subtotal">
                  <span>
                    SUBTOTAL
                  </span>

                  <span>
                    ₹{cartSubtotal}
                  </span>
                </div>
              </div>

              <p className="cart-shipping-message">
                Shipping and discounts are calculated at checkout.
              </p>

              <Link
                to="/checkout"
                className="cart-checkout-button"
                onClick={onClose}
              >
                PROCEED TO CHECKOUT
              </Link>

              <button
                type="button"
                className="cart-continue-shopping"
                onClick={onClose}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;