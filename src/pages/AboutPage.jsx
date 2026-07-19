import { Link } from "react-router-dom";

import everydayImage from "../assets/image/about/about-everyday.png";
import luxuryImage from "../assets/image/about/about-luxury.png";

function AboutPage() {
  return (
    <main className="about-page">
      {/* Hero */}

      <section className="about-hero">
        <div className="about-hero-decoration about-hero-decoration-left">
          ✦
        </div>

        <div className="about-hero-content">
          <p className="about-page-eyebrow">
            ✦ THE ALANKARA STORY ✦
          </p>

          <h1>
            A Little Sparkle
            <br />
            for Every Story
          </h1>

          <div className="about-page-divider">
            <span></span>
            <span>♡</span>
            <span></span>
          </div>

          <p>
            Jewellery made to feel personal, effortless,
            and part of your everyday moments.
          </p>
        </div>

        <div className="about-hero-decoration about-hero-decoration-right">
          ♢
        </div>
      </section>

      {/* Story */}

      <section className="about-story-section">
        <div className="about-story-visual">
          <div className="about-story-image">
            <img
              src={everydayImage}
              alt="Alankara Everyday Jewellery"
              className="about-story-img"
            />
          </div>

          <div className="about-story-visual-accent">
            ♡
          </div>
        </div>

        <div className="about-story-content">
          <p className="about-section-eyebrow">
            WHERE IT BEGAN
          </p>

          <h2>
            Made for Your
            <br />
            Everyday Sparkle
          </h2>

          <div className="about-content-line"></div>

          <p>
            At Alankara, we believe jewellery should
            never feel reserved only for special
            occasions.
          </p>

          <p>
            It should be there for the quiet mornings,
            spontaneous plans, celebrations, thoughtful
            gifts, and all the little moments in
            between.
          </p>

          <p>
            That belief is at the heart of Alankara —
            thoughtfully chosen jewellery designed to
            bring effortless elegance and a little
            sparkle into everyday life.
          </p>

          <blockquote>
            "Because every day deserves a little
            sparkle."
          </blockquote>
        </div>
      </section>

      {/* Beliefs */}

      <section className="about-belief-section">
        <div className="about-belief-heading">
          <p className="about-section-eyebrow">
            ✦ WHAT WE BELIEVE ✦
          </p>

          <h2>
            Jewellery Should
            <br />
            Feel Like You
          </h2>

          <p>
            Simple ideas that guide every piece and
            every Alankara moment.
          </p>
        </div>

        <div className="about-belief-grid">
          <article className="about-belief-card">
            <span className="about-belief-number">
              01
            </span>

            <div className="about-belief-icon">
              ✦
            </div>

            <h3>Thoughtfully Chosen</h3>

            <p>
              Pieces selected with elegance, comfort,
              and everyday wear in mind.
            </p>
          </article>

          <article className="about-belief-card">
            <span className="about-belief-number">
              02
            </span>

            <div className="about-belief-icon">
              ♡
            </div>

            <h3>Made to Feel Special</h3>

            <p>
              Small details and beautiful pieces that
              make ordinary moments feel a little more
              memorable.
            </p>
          </article>

          <article className="about-belief-card">
            <span className="about-belief-number">
              03
            </span>

            <div className="about-belief-icon">
              ♢
            </div>

            <h3>Personal to You</h3>

            <p>
              From everyday jewellery to thoughtful
              hampers, gifting should always feel
              personal.
            </p>
          </article>
        </div>
      </section>

      {/* Everyday */}

      <section className="about-everyday-section">
        <div className="about-everyday-content">
          <p className="about-section-eyebrow">
            THE ALANKARA FEELING
          </p>

          <h2>
            From Everyday Moments
            <br />
            to Unforgettable Ones
          </h2>

          <p>
            A necklace you reach for every morning.
            A pair of earrings that completes your
            look. A carefully chosen hamper made for
            someone special.
          </p>

          <p>
            Alankara is about the feeling behind the
            piece — the confidence, the memory, and
            the person who makes it their own.
          </p>

          <Link
            to="/shop"
            className="about-shop-link"
          >
            DISCOVER THE COLLECTION

            <span>→</span>
          </Link>
        </div>

        <div className="about-everyday-visual">
          <img
            src={luxuryImage}
            alt="Luxury Alankara Jewellery"
            className="about-everyday-img"
          />
        </div>
      </section>

      {/* Closing */}

      <section className="about-closing-section">
        <span className="about-closing-sparkle">
          ✦
        </span>

        <p>WITH LOVE, FROM ALANKARA</p>

        <h2>
          Here's to the Moments
          <br />
          That Make You Sparkle
        </h2>

        <div className="about-page-divider">
          <span></span>
          <span>♡</span>
          <span></span>
        </div>

        <Link
          to="/shop"
          className="about-closing-button"
        >
          SHOP ALANKARA
        </Link>
      </section>
    </main>
  );
}

export default AboutPage;