import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";

import App from "./App.jsx";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ProductProvider } from "./context/ProductContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductProvider>
      <CartProvider>
        <WishlistProvider>
          <App />

          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 3500,
              style: {
                background: "#6b4637",
                color: "#fff",
                borderRadius: "14px",
                padding: "16px 20px",
                fontSize: "15px",
                fontWeight: "500",
                boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
              },

              success: {
                iconTheme: {
                  primary: "#f5c16c",
                  secondary: "#6b4637",
                },
              },

              error: {
                iconTheme: {
                  primary: "#ff6b6b",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </WishlistProvider>
      </CartProvider>
    </ProductProvider>
  </StrictMode>
);