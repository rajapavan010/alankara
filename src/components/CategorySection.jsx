import { Link } from "react-router-dom";
import necklacesImage from "../assets/image/categories/necklaces.png";
import earringsImage from "../assets/image/categories/earrings.png";
import braceletsImage from "../assets/image/categories/bracelets.png";
import ringsImage from "../assets/image/categories/rings.png";
import hampersImage from "../assets/image/categories/hampers.png";
const categories = [
   {
    id: 1,
    name: "Necklaces",
    image: necklacesImage,
    link: "/shop?category=necklaces",
  },
  {
    id: 2,
    name: "Earrings",
    image: earringsImage,
    link: "/shop?category=earrings",
  },
  {
    id: 3,
    name: "Bracelets",
    image: braceletsImage,
    link: "/shop?category=bracelets",
  },
  {
    id: 4,
    name: "Rings",
    image: ringsImage,
    link: "/shop?category=rings",
  },
  {
    id: 5,
    name: "Hampers",
    image: hampersImage,
    link: "/shop?category=hampers",
  },
];

function CategorySection() {
  return (
    <section className="category-section" id="shop">
      <div className="category-heading">
        <p className="category-eyebrow">
          ✦ DISCOVER YOUR SPARKLE ✦
        </p>

        <h2>Shop by Category</h2>

        <p className="category-description">
          Explore our jewellery collections, made to add a little
          elegance to every day.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            to={category.link}
            className="category-card"
            key={category.id}
            aria-label={`Shop ${category.name}`}
          >
            <div className="category-image-wrapper">
              {category.image ? (
                <>
                  <img
                    src={category.image}
                    alt={`${category.name} jewellery collection`}
                    className="category-image"
                  />

                  <div className="category-overlay">
                    <span>EXPLORE</span>
                  </div>
                </>
              ) : (
                <div className="category-placeholder">
                  <span className="category-placeholder-sparkle">
                    ✦
                  </span>

                  <div className="category-placeholder-circle">
                    <span>
                      {category.name.toUpperCase()}
                    </span>

                    <p>IMAGE COMING SOON</p>
                  </div>
                </div>
              )}
            </div>

            <div className="category-card-content">
              <h3>{category.name}</h3>

              <span className="category-arrow">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="category-view-all">
        <Link
          to="/shop"
          className="view-all-button"
        >
          VIEW ALL COLLECTIONS
        </Link>
      </div>
    </section>
  );
}

export default CategorySection;