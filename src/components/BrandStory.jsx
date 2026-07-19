import { Link } from "react-router-dom";
import aboutStoryImage from "../assets/image/about/about-story.png"; // Change extension if needed

function BrandStory() {
  return (
    <section
      className="brand-story-section"
      id="about"
    >
      <div className="brand-story-container">

        {/* LEFT IMAGE */}

        <div className="brand-story-visual">
          <div className="brand-story-image-wrapper">
            <img
              src={aboutStoryImage}
              alt="Alankara jewellery collection"
              className="brand-story-image"
            />
          </div>

          <div className="brand-story-accent">
            <span>♡</span>
          </div>
        </div>

        {/* RIGHT CONTENT */}

        <div className="brand-story-content">
          <p className="brand-story-eyebrow">
            ✦ OUR STORY ✦
          </p>

          <h2>
            Made for Your
            <br />
            Everyday Sparkle
          </h2>

          <div className="brand-story-divider">
            <span></span>
            <span>♡</span>
            <span></span>
          </div>

          <p className="brand-story-description">
            At Alankara, we believe jewellery should feel
            effortless, personal, and made to be worn every day.
          </p>

          <p className="brand-story-description">
            Our pieces are thoughtfully chosen to bring a little
            elegance to your everyday moments — from quiet mornings
            to unforgettable celebrations.
          </p>

          <div className="brand-story-values">
            <div className="brand-story-value">
              <span>✦</span>

              <div>
                <h4>Thoughtfully Chosen</h4>

                <p>
                  Pieces selected with elegance and everyday wear
                  in mind.
                </p>
              </div>
            </div>

            <div className="brand-story-value">
              <span>♡</span>

              <div>
                <h4>Made to Feel Special</h4>

                <p>
                  Little details designed to add sparkle to every
                  moment.
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/about"
            className="brand-story-link"
          >
            DISCOVER OUR STORY
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

export default BrandStory;