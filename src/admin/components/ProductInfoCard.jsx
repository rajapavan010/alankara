function ProductInfoCard({ product, updateField }) {
  function handleNameChange(e) {
    const name = e.target.value;

    updateField("name", name);

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    updateField("slug", slug);
  }

  return (
    <div className="admin-card">
      <h3>📝 Product Information</h3>

      {/* Product Name */}

      <div className="form-group">
        <label>Product Name *</label>

        <input
          type="text"
          placeholder="Golden Heart Necklace"
          value={product.name}
          onChange={handleNameChange}
        />
      </div>

      {/* Slug */}

      <div className="form-group">
        <label>Slug *</label>

        <input
          type="text"
          value={product.slug}
          onChange={(e) =>
            updateField("slug", e.target.value)
          }
        />
      </div>

      {/* Category */}

      <div className="form-group">
        <label>Category *</label>

        <select
          value={product.category}
          onChange={(e) => {
            updateField(
              "category",
              e.target.value
            );

            updateField(
              "category_label",
              e.target.options[
                e.target.selectedIndex
              ].text
            );
          }}
        >
          <option value="">
            Select Category
          </option>

          <option value="necklaces">
            Necklaces
          </option>

          <option value="earrings">
            Earrings
          </option>

          <option value="bracelets">
            Bracelets
          </option>

          <option value="rings">
            Rings
          </option>

          <option value="hampers">
            Hampers
          </option>
        </select>
      </div>

      {/* Description */}

      <div className="form-group">
        <label>Description</label>

        <textarea
          rows="6"
          placeholder="Write a beautiful description..."
          value={product.description}
          onChange={(e) =>
            updateField(
              "description",
              e.target.value
            )
          }
        />
      </div>
    </div>
  );
}

export default ProductInfoCard;