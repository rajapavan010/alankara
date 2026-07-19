import { useEffect, useState } from "react";

import {
  Link,
  Navigate,
} from "react-router-dom";

import { STORE_CONFIG } from "../config/store";
import { useCart } from "../context/CartContext";
import supabase from "../lib/supabase";

const initialFormData = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  pinCode: "",
};

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];

const CHECKOUT_TOKEN_KEY =
  "alankara_checkout_token";

function createCheckoutToken() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `checkout-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function getCheckoutToken() {
  const existingToken = sessionStorage.getItem(
    CHECKOUT_TOKEN_KEY
  );

  if (existingToken) {
    return existingToken;
  }

  const newToken = createCheckoutToken();

  sessionStorage.setItem(
    CHECKOUT_TOKEN_KEY,
    newToken
  );

  return newToken;
}

function finishCheckoutAttempt(checkoutToken) {
  const storedToken = sessionStorage.getItem(
    CHECKOUT_TOKEN_KEY
  );

  if (storedToken === checkoutToken) {
    sessionStorage.removeItem(
      CHECKOUT_TOKEN_KEY
    );
  }
}

function CheckoutPage() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState(
    initialFormData
  );

  const [errors, setErrors] = useState({});

  const [isRedirecting, setIsRedirecting] =
    useState(false);

  useEffect(() => {
    const resetRedirectingState = () => {
      setIsRedirecting(false);
    };

    window.addEventListener(
      "pageshow",
      resetRedirectingState
    );

    return () => {
      window.removeEventListener(
        "pageshow",
        resetRedirectingState
      );
    };
  }, []);

  if (cartItems.length === 0) {
    return <Navigate to="/shop" replace />;
  }


const orderTotal = cartSubtotal;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    let updatedValue = value;

    if (name === "phone") {
      updatedValue = value
        .replace(/\D/g, "")
        .slice(0, 10);
    }

    if (name === "pinCode") {
      updatedValue = value
        .replace(/\D/g, "")
        .slice(0, 6);
    }

    setFormData((currentData) => ({
      ...currentData,
      [name]: updatedValue,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
      checkout: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName =
        "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName =
        "Last name is required.";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Address is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city =
        "City is required.";
    }

    if (!formData.state) {
      newErrors.state =
        "Select your state.";
    }

    if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode =
        "Enter a valid 6-digit PIN code.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const createWhatsAppMessage = (
    savedOrder
  ) => {
    const customerName =
      `${formData.firstName} ${formData.lastName}`.trim();

    const orderItems = cartItems
      .map((item, index) => {
        const itemTotal =
          item.price * item.quantity;

        return `${index + 1}. ${item.name}
Category: ${item.categoryLabel}
Quantity: ${item.quantity}
Price: ₹${item.price}
Item Total: ₹${itemTotal}`;
      })
      .join("\n\n");

    const apartmentLine =
      formData.apartment.trim()
        ? `${formData.apartment}\n`
        : "";

    return `Hi Alankara ✨

I would like to place an order.

🧾 ORDER NUMBER

${savedOrder.order_number}

────────────────────

🛍️ ORDER DETAILS

${orderItems}

────────────────────

Subtotal: ₹${savedOrder.subtotal}
Shipping: To be discussed on WhatsApp
Order Total: ₹${savedOrder.total}

────────────────────

👤 CUSTOMER DETAILS

Name: ${customerName}
Phone: +91 ${formData.phone}
Email: ${formData.email}

────────────────────

📍 SHIPPING ADDRESS

${formData.address}
${apartmentLine}${formData.city}
${formData.state} - ${formData.pinCode}

────────────────────

Please confirm product availability and payment details.

Order Number: ${savedOrder.order_number}

Thank you ✨`;
  };

  const handleCheckoutSubmit = async (event) => {
    event.preventDefault();

    if (isRedirecting) {
      return;
    }

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const whatsappNumber = String(
      STORE_CONFIG.whatsappNumber || ""
    ).replace(/\D/g, "");

    if (!whatsappNumber) {
      console.error(
        "Alankara WhatsApp number is missing."
      );

      setErrors((currentErrors) => ({
        ...currentErrors,
        checkout:
          "WhatsApp ordering is temporarily unavailable.",
      }));

      return;
    }

    try {
      setIsRedirecting(true);

      setErrors((currentErrors) => ({
        ...currentErrors,
        checkout: "",
      }));

      const orderItems = cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      const checkoutToken = getCheckoutToken();

      console.log(
        "Creating Alankara order:",
        {
          checkoutToken,
          orderItems,
        }
      );

      const { data, error } = await supabase.rpc(
        "create_alankara_order",
        {
          p_checkout_token: checkoutToken,

          p_customer_email:
            formData.email.trim(),

          p_customer_first_name:
            formData.firstName.trim(),

          p_customer_last_name:
            formData.lastName.trim(),

          p_customer_phone:
            formData.phone,

          p_address:
            formData.address.trim(),

          p_apartment:
            formData.apartment.trim(),

          p_city:
            formData.city.trim(),

          p_state:
            formData.state,

          p_pin_code:
            formData.pinCode,

          p_items:
            orderItems,
        }
      );

      if (error) {
        throw error;
      }

      if (
        !data ||
        !data.order_number
      ) {
        throw new Error(
          "The order was created without an order number."
        );
      }

      if (data.existing_order) {
        console.log(
          "Existing order reused:",
          data
        );
      } else {
        console.log(
          "New order created:",
          data
        );
      }

 finishCheckoutAttempt(checkoutToken);


// Clear cart after successful order creation

clearCart();


const message =
  createWhatsAppMessage(data);


const whatsappUrl =
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;


setIsRedirecting(false);


window.location.assign(whatsappUrl);
    } catch (error) {
      console.error(
        "Failed to create order:",
        error
      );

      setErrors((currentErrors) => ({
        ...currentErrors,
        checkout:
          error?.message ||
          "We could not create your order. Please try again.",
      }));

      setIsRedirecting(false);
    }
  };

  return (
    <main className="checkout-page">
      <section className="checkout-heading">
        <p className="checkout-eyebrow">
          ✦ ALMOST YOURS ✦
        </p>

        <h1>Checkout</h1>

        <p>
          Complete your details and send your order
          directly to Alankara on WhatsApp.
        </p>
      </section>

      <section className="checkout-content">
        <form
          className="checkout-form"
          onSubmit={handleCheckoutSubmit}
          noValidate
        >
          <div className="checkout-form-section">
            <div className="checkout-section-heading">
              <span>01</span>

              <div>
                <p>YOUR DETAILS</p>

                <h2>Contact Information</h2>
              </div>
            </div>

            <div className="checkout-fields">
              <div className="checkout-field checkout-field-full">
                <label htmlFor="checkout-email">
                  EMAIL ADDRESS
                </label>

                <input
                  id="checkout-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                />

                {errors.email && (
                  <span className="checkout-error">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-first-name">
                  FIRST NAME
                </label>

                <input
                  id="checkout-first-name"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  autoComplete="given-name"
                />

                {errors.firstName && (
                  <span className="checkout-error">
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-last-name">
                  LAST NAME
                </label>

                <input
                  id="checkout-last-name"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  autoComplete="family-name"
                />

                {errors.lastName && (
                  <span className="checkout-error">
                    {errors.lastName}
                  </span>
                )}
              </div>

              <div className="checkout-field checkout-field-full">
                <label htmlFor="checkout-phone">
                  PHONE NUMBER
                </label>

                <div className="checkout-phone-input">
                  <span>+91</span>

                  <input
                    id="checkout-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    autoComplete="tel"
                    inputMode="numeric"
                  />
                </div>

                {errors.phone && (
                  <span className="checkout-error">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="checkout-form-section">
            <div className="checkout-section-heading">
              <span>02</span>

              <div>
                <p>WHERE TO?</p>

                <h2>Shipping Address</h2>
              </div>
            </div>

            <div className="checkout-fields">
              <div className="checkout-field checkout-field-full">
                <label htmlFor="checkout-address">
                  ADDRESS
                </label>

                <input
                  id="checkout-address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House number and street name"
                  autoComplete="address-line1"
                />

                {errors.address && (
                  <span className="checkout-error">
                    {errors.address}
                  </span>
                )}
              </div>

              <div className="checkout-field checkout-field-full">
                <label htmlFor="checkout-apartment">
                  APARTMENT, SUITE, ETC.{" "}
                  <span>(OPTIONAL)</span>
                </label>

                <input
                  id="checkout-apartment"
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  placeholder="Apartment, floor, landmark"
                  autoComplete="address-line2"
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-city">
                  CITY
                </label>

                <input
                  id="checkout-city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  autoComplete="address-level2"
                />

                {errors.city && (
                  <span className="checkout-error">
                    {errors.city}
                  </span>
                )}
              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-state">
                  STATE
                </label>

                <select
                  id="checkout-state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  autoComplete="address-level1"
                >
                  <option value="">
                    Select state
                  </option>

                  {indianStates.map((state) => (
                    <option
                      value={state}
                      key={state}
                    >
                      {state}
                    </option>
                  ))}
                </select>

                {errors.state && (
                  <span className="checkout-error">
                    {errors.state}
                  </span>
                )}
              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-pin-code">
                  PIN CODE
                </label>

                <input
                  id="checkout-pin-code"
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  placeholder="522001"
                  autoComplete="postal-code"
                  inputMode="numeric"
                />

                {errors.pinCode && (
                  <span className="checkout-error">
                    {errors.pinCode}
                  </span>
                )}
              </div>
            </div>
          </div>

          {errors.checkout && (
            <p className="checkout-error">
              {errors.checkout}
            </p>
          )}

          <button
            type="submit"
            className="checkout-payment-button"
            disabled={isRedirecting}
          >
            {isRedirecting
              ? "CREATING YOUR ORDER..."
              : "ORDER ON WHATSAPP"}

            <span>→</span>
          </button>

          <p className="checkout-whatsapp-note">
            Your order will be saved before you're
            redirected to WhatsApp.
          </p>

          <Link
            to="/shop"
            className="checkout-return-link"
          >
            ← CONTINUE SHOPPING
          </Link>
        </form>

        <aside className="checkout-order-summary">
          <div className="checkout-summary-heading">
            <p>YOUR ORDER</p>

            <h2>Order Summary</h2>

            <span>
              {cartCount}{" "}
              {cartCount === 1 ? "ITEM" : "ITEMS"}
            </span>
          </div>

          <div className="checkout-summary-items">
            {cartItems.map((item) => (
              <article
                className="checkout-summary-item"
                key={item.id}
              >
                <div className="checkout-summary-image-wrapper">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  ) : (
                    <div className="checkout-summary-placeholder">
                      <span>◇</span>

                      <p>ALANKARA</p>
                    </div>
                  )}

                  <span className="checkout-summary-quantity">
                    {item.quantity}
                  </span>
                </div>

                <div className="checkout-summary-product-info">
                  <p>
                    {item.categoryLabel.toUpperCase()}
                  </p>

                  <h3>{item.name}</h3>

                  <span>
                    Qty: {item.quantity}
                  </span>
                </div>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>
              </article>
            ))}
          </div>

          <div className="checkout-summary-totals">
            <div>
              <span>SUBTOTAL</span>

              <span>₹{cartSubtotal}</span>
            </div>

            <div>
  <span>SHIPPING</span>

  <span>
    Discussed on WhatsApp
  </span>
</div>

            <div className="checkout-summary-total">
              <span>TOTAL</span>

              <strong>₹{orderTotal}</strong>
            </div>
          </div>

          <p className="checkout-free-shipping-message">
  ✦ Shipping charges will be confirmed personally through WhatsApp.
</p>

          <div className="checkout-trust-message">
            <span>♡</span>

            <p>
              Your order will be confirmed personally
              through WhatsApp.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default CheckoutPage;