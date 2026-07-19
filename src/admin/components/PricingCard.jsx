function PricingCard({ product, updateField }) {
  return (
    <div className="admin-card">
      <h3>💰 Pricing</h3>

      {/* Selling Price */}

      <div className="form-group">
        <label>Price (₹) *</label>

        <input
          type="number"
          placeholder="799"
          value={product.price}
          onChange={(e) =>
            updateField("price", e.target.value)
          }
        />
      </div>

      {/* Original Price */}

      <div className="form-group">
        <label>Original Price (₹)</label>

        <input
          type="number"
          placeholder="999"
          value={product.original_price}
          onChange={(e) =>
            updateField(
              "original_price",
              e.target.value
            )
          }
        />
      </div>

      {/* Badge */}

      <div className="form-group">
  <label>Product Badge</label>

  <div className="badge-selector">

    {[
      "NEW",
      "BEST SELLER",
      "LIMITED",
      "SALE",
      "TRENDING",
    ].map((badge) => (
      <button
        key={badge}
        type="button"
        className={
          product.badge === badge
            ? "badge-chip active"
            : "badge-chip"
        }
        onClick={() =>
          updateField("badge", badge)
        }
      >
        {badge}
      </button>
    ))}

    <button
      type="button"
      className={
        product.badge === ""
          ? "badge-chip active"
          : "badge-chip"
      }
      onClick={() =>
        updateField("badge", "")
      }
    >
      None
    </button>

  </div>
</div>
    </div>
  );
}

export default PricingCard;