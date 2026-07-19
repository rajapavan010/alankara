function InventoryCard({ product, updateField }) {
  return (
    <div className="admin-card admin-card-full">
      <h3>📦 Inventory & Occasion</h3>

      <div className="inventory-grid">

        {/* Stock */}

        <div className="form-group">
          <label>Stock Quantity *</label>

          <input
            type="number"
            min="0"
            placeholder="10"
            value={product.stock}
            onChange={(e) =>
              updateField("stock", e.target.value)
            }
          />
        </div>

        {/* Occasion */}

        {product.is_occasion_hamper && (
          <div className="form-group">
            <label>Occasion</label>

            <select
              value={product.occasion}
              onChange={(e) => {
                updateField(
                  "occasion",
                  e.target.value
                );

                updateField(
                  "occasion_label",
                  e.target.options[
                    e.target.selectedIndex
                  ].text
                );
              }}
            >
              <option value="">
                Select Occasion
              </option>

              <option value="birthday">
                Birthday
              </option>

              <option value="anniversary">
                Anniversary
              </option>

              <option value="wedding">
                Wedding
              </option>

              <option value="rakhi">
                Raksha Bandhan
              </option>

              <option value="valentine">
                Valentine's Day
              </option>

              <option value="mothers-day">
                Mother's Day
              </option>

              <option value="fathers-day">
                Father's Day
              </option>

              <option value="diwali">
                Diwali
              </option>

              <option value="christmas">
                Christmas
              </option>

              <option value="new-year">
                New Year
              </option>
            </select>
          </div>
        )}

      </div>

      {product.is_occasion_hamper && (
        <div className="form-group">
          <label>Occasion Label</label>

          <input
            type="text"
            placeholder="Birthday Collection"
            value={product.occasion_label}
            onChange={(e) =>
              updateField(
                "occasion_label",
                e.target.value
              )
            }
          />
        </div>
      )}
    </div>
  );
}

export default InventoryCard;