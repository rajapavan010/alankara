function SettingsCard({ product, updateField }) {
  const settings = [
    {
      label: "Active Product",
      field: "is_active",
    },
    {
      label: "Featured Product",
      field: "is_featured",
    },
    {
      label: "New Arrival",
      field: "is_new_arrival",
    },
    {
      label: "Limited Edition",
      field: "is_limited_edition",
    },
    {
      label: "Occasion Hamper",
      field: "is_occasion_hamper",
    },
  ];

  return (
    <div className="admin-card">
      <h3>⚙ Product Settings</h3>

      <div className="toggle-group">
        {settings.map((setting) => (
          <div
            key={setting.field}
            className="toggle-item"
          >
            <span>{setting.label}</span>

            <label className="switch">
              <input
                type="checkbox"
                checked={product[setting.field]}
                onChange={(e) =>
                  updateField(
                    setting.field,
                    e.target.checked
                  )
                }
              />

              <span className="slider"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SettingsCard;