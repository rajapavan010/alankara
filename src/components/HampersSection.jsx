import { useState } from "react";
import { Link } from "react-router-dom";

import { useProducts } from "../context/useProducts";
import { STORE_CONFIG } from "../config/store";

const occasionOptions = [
  "Birthday",
  "Anniversary",
  "Rakhi",
  "Wedding",
  "Bridesmaid Gift",
  "Just Because",
  "Other",
];

const budgetOptions = [
  "Below ₹1,000",
  "₹1,000 - ₹1,500",
  "₹1,500 - ₹2,500",
  "₹2,500 - ₹5,000",
  "Above ₹5,000",
];

const jewelleryOptions = [
  "Necklaces",
  "Earrings",
  "Bracelets",
  "Rings",
  "Mixed Jewellery",
  "Surprise Me",
];

function HamperDropdown({
  id,
  label,
  name,
  value,
  placeholder,
  options,
  isOpen,
  onToggle,
  onSelect,
}) {
  return (
    <div className="custom-hamper-field custom-hamper-dropdown-field">
      <label id={`${id}-label`}>{label}</label>

      <div
        className={`custom-hamper-dropdown ${
          isOpen ? "custom-hamper-dropdown-open" : ""
        }`}
      >
        <button
          id={id}
          type="button"
          className="custom-hamper-dropdown-trigger"
          onClick={onToggle}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${id}-label ${id}`}
        >
          <span
            className={
              value
                ? "custom-hamper-dropdown-value"
                : "custom-hamper-dropdown-placeholder"
            }
          >
            {value || placeholder}
          </span>

          <span
            className="custom-hamper-dropdown-chevron"
            aria-hidden="true"
          >
            ⌄
          </span>
        </button>

        {isOpen && (
          <div
            className="custom-hamper-dropdown-menu"
            role="listbox"
            aria-labelledby={`${id}-label`}
          >
            {options.map((option) => (
              <button
                type="button"
                role="option"
                aria-selected={value === option}
                className={`custom-hamper-dropdown-option ${
                  value === option
                    ? "custom-hamper-dropdown-option-selected"
                    : ""
                }`}
                key={option}
                onClick={() => onSelect(name, option)}
              >
                <span>{option}</span>

                {value === option && (
                  <span
                    className="custom-hamper-dropdown-check"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function HampersSection() {
  const {
    activeOccasionHamperProducts,
    productsLoading,
    productsError,
    refreshProducts,
  } = useProducts();

  const occasionHamper =
    activeOccasionHamperProducts[0] || null;

  const [hamperDetails, setHamperDetails] = useState({
    occasion: "",
    budget: "",
    jewelleryPreference: "",
    giftFor: "",
    personalNote: "",
  });

  const [openDropdown, setOpenDropdown] =
    useState(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((currentDropdown) =>
      currentDropdown === dropdownName
        ? null
        : dropdownName
    );
  };

  const handleDropdownSelect = (name, value) => {
    setHamperDetails((currentDetails) => ({
      ...currentDetails,
      [name]: value,
    }));

    setOpenDropdown(null);
  };

  const handleHamperChange = (event) => {
    const { name, value } = event.target;

    setHamperDetails((currentDetails) => ({
      ...currentDetails,
      [name]: value,
    }));
  };

  const handleCustomHamper = (event) => {
    event.preventDefault();

    const {
      occasion,
      budget,
      jewelleryPreference,
      giftFor,
      personalNote,
    } = hamperDetails;

    if (
      !occasion ||
      !budget ||
      !jewelleryPreference ||
      !giftFor
    ) {
      return;
    }

    const message = `Hi Alankara ✨

I would love to build my own hamper 🎁

OCCASION
${occasion}

MY BUDGET
${budget}

JEWELLERY PREFERENCE
${jewelleryPreference}

GIFT FOR
${giftFor}

PERSONALISED NOTE
${personalNote || "No personalised note"}

I would love your help creating a personalised Alankara hamper 💝`;

    const whatsappUrl =
      `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      className="hampers-section"
      id="hampers"
    >
      <div className="hampers-heading">
        <p className="hampers-eyebrow">
          ✦ A LITTLE LOVE, BEAUTIFULLY WRAPPED ✦
        </p>

        <h2>Gift a Little Sparkle</h2>

        <div className="hampers-divider">
          <span></span>

          <span>♡</span>

          <span></span>
        </div>

        <p className="hampers-description">
          Choose a thoughtfully curated occasion hamper
          or create something personal, made especially
          for someone you love.
        </p>
      </div>

      {productsLoading && (
        <div className="hampers-status">
          <span>◇</span>

          <p>
            Preparing something beautiful...
          </p>
        </div>
      )}

      {!productsLoading && productsError && (
        <div className="hampers-status">
          <span>♡</span>

          <h3>Our hampers could not be loaded</h3>

          <p>{productsError}</p>

          <button
            type="button"
            onClick={refreshProducts}
          >
            TRY AGAIN
          </button>
        </div>
      )}

      {!productsLoading && !productsError && (
        <div className="hampers-experience">
          <div className="special-hamper-area">
            {occasionHamper ? (
              <>
                <Link
                  to={`/product/${occasionHamper.slug}`}
                  className="special-hamper-visual"
                  aria-label={`Explore ${occasionHamper.name}`}
                >
                  {occasionHamper.image ? (
                    <img
                      src={occasionHamper.image}
                      alt={occasionHamper.name}
                    />
                  ) : (
                    <div className="special-hamper-placeholder">
                      <span className="special-hamper-heart">
                        ♡
                      </span>

                      <h3>ALANKARA</h3>

                      <p>
                        OCCASION HAMPER
                        <br />
                        IMAGE COMING SOON
                      </p>
                    </div>
                  )}

                  {occasionHamper.isLimitedEdition && (
                    <span className="special-hamper-limited">
                      LIMITED EDITION
                    </span>
                  )}

                  <div className="special-hamper-seal">
                    <span>✦</span>

                    <p>
                      WRAPPED
                      <br />
                      WITH LOVE
                    </p>
                  </div>
                </Link>

                <div className="special-hamper-information">
                  <p className="special-hamper-label">
                    {occasionHamper.occasionLabel ||
                      "SPECIAL OCCASION"}
                  </p>

                  <h3>{occasionHamper.name}</h3>

                  <p className="special-hamper-description">
                    {occasionHamper.description}
                  </p>

                  <div className="special-hamper-price">
                    <span>
                      ₹{occasionHamper.price}
                    </span>

                    {occasionHamper.originalPrice && (
                      <del>
                        ₹{occasionHamper.originalPrice}
                      </del>
                    )}
                  </div>

                  <Link
                    to={`/product/${occasionHamper.slug}`}
                    className="special-hamper-button"
                  >
                    EXPLORE HAMPER

                    <span>→</span>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="special-hamper-visual">
                  <div className="special-hamper-placeholder">
                    <span className="special-hamper-heart">
                      ♡
                    </span>

                    <h3>ALANKARA</h3>

                    <p>
                      SPECIAL HAMPER
                      <br />
                      COMING SOON
                    </p>
                  </div>
                </div>

                <div className="special-hamper-information">
                  <p className="special-hamper-label">
                    OCCASION HAMPERS
                  </p>

                  <h3>
                    Something Special is Coming
                  </h3>

                  <p className="special-hamper-description">
                    Limited Alankara hampers created for
                    festivals, celebrations and beautiful
                    little moments.
                  </p>

                  <Link
                    to="/shop?category=hampers"
                    className="special-hamper-button"
                  >
                    VIEW HAMPERS

                    <span>→</span>
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="custom-hamper-area">
            <div className="custom-hamper-heading">
              <p>✦ MAKE IT PERSONAL ✦</p>

              <h3>Build Your Own Hamper</h3>

              <span>
                Tell us a little about your gift and
                we'll help you create something special.
              </span>
            </div>

            <form
              className="custom-hamper-form"
              onSubmit={handleCustomHamper}
            >
              <div className="custom-hamper-form-grid">
                <HamperDropdown
                  id="hamper-occasion"
                  label="OCCASION"
                  name="occasion"
                  value={hamperDetails.occasion}
                  placeholder="Select occasion"
                  options={occasionOptions}
                  isOpen={openDropdown === "occasion"}
                  onToggle={() =>
                    toggleDropdown("occasion")
                  }
                  onSelect={handleDropdownSelect}
                />

                <HamperDropdown
                  id="hamper-budget"
                  label="MY BUDGET"
                  name="budget"
                  value={hamperDetails.budget}
                  placeholder="Select budget"
                  options={budgetOptions}
                  isOpen={openDropdown === "budget"}
                  onToggle={() =>
                    toggleDropdown("budget")
                  }
                  onSelect={handleDropdownSelect}
                />

                <HamperDropdown
                  id="hamper-preference"
                  label="JEWELLERY PREFERENCE"
                  name="jewelleryPreference"
                  value={
                    hamperDetails.jewelleryPreference
                  }
                  placeholder="Select preference"
                  options={jewelleryOptions}
                  isOpen={
                    openDropdown ===
                    "jewelleryPreference"
                  }
                  onToggle={() =>
                    toggleDropdown(
                      "jewelleryPreference"
                    )
                  }
                  onSelect={handleDropdownSelect}
                />

                <div className="custom-hamper-field">
                  <label htmlFor="hamper-gift-for">
                    GIFT FOR
                  </label>

                  <input
                    id="hamper-gift-for"
                    type="text"
                    name="giftFor"
                    value={hamperDetails.giftFor}
                    onChange={handleHamperChange}
                    placeholder="Sister, friend, partner..."
                    required
                  />
                </div>
              </div>

              <div className="custom-hamper-field custom-hamper-note-field">
                <label htmlFor="hamper-note">
                  PERSONALISED NOTE
                  <span> OPTIONAL</span>
                </label>

                <textarea
                  id="hamper-note"
                  name="personalNote"
                  value={hamperDetails.personalNote}
                  onChange={handleHamperChange}
                  placeholder="Tell us anything that would help make this gift more personal..."
                  rows="3"
                ></textarea>
              </div>

              <button
                type="submit"
                className="custom-hamper-submit"
              >
                CONTINUE ON WHATSAPP

                <span>→</span>
              </button>

              <p className="custom-hamper-form-note">
                We'll personally help you finalise the
                pieces and wrapping on WhatsApp.
              </p>
            </form>
          </div>
        </div>
      )}

      <div className="hampers-view-all">
        <Link
          to="/shop?category=hampers"
          className="hampers-view-all-button"
        >
          VIEW ALL HAMPERS
        </Link>
      </div>
    </section>
  );
}

export default HampersSection;