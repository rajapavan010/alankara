import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-decoration footer-decoration-left"></div>
      <div className="footer-decoration footer-decoration-right"></div>

      <div className="footer-container">
        <div className="footer-main">

          {/* BRAND */}

          <div className="footer-brand">
            <p className="footer-eyebrow">
              ✦ A LITTLE SPARKLE, EVERY DAY ✦
            </p>

            <h2>ALANKARA</h2>

            <p className="footer-by">
              By Jahnavi
            </p>

            <p className="footer-description">
              Thoughtfully chosen jewellery and curated
              hampers designed to add elegance, joy and
              sparkle to your everyday moments.
            </p>

            <div className="footer-socials">
              <a
                href="https://www.instagram.com/_alankara.co_?igsh=Y2p3Nm0wd3ZyZWw3"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                ◎
              </a>

              <a
                href="https://wa.me/918712260777"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="WhatsApp"
              >
                ◌
              </a>

              <a
                href="mailto:alankaracoo@gmail.com"
                className="footer-social-link"
                aria-label="Email"
              >
                ✉
              </a>
            </div>
          </div>

          {/* EXPLORE */}

          <div className="footer-column">
            <h3>Explore</h3>

            <nav
              className="footer-links"
              aria-label="Footer explore links"
            >
              <Link to="/">
                Home
              </Link>

              <Link to="/shop">
                Shop
              </Link>

              <a href="/#new-arrivals">
                New Arrivals
              </a>

              <a href="/#hampers">
                Hampers
              </a>

              <Link to="/about">
                About Us
              </Link>

              <a href="/#contact">
                Contact
              </a>
            </nav>
          </div>

          {/* COLLECTIONS */}

          <div className="footer-column">
            <h3>Collections</h3>

            <nav
              className="footer-links"
              aria-label="Footer collection links"
            >
              <a href="/shop?category=necklaces">
                Necklaces
              </a>

              <a href="/shop?category=earrings">
                Earrings
              </a>

              <a href="/shop?category=bracelets">
                Bracelets
              </a>
              <a href="/shop?category=rings">
               Rings
              </a>

              <a href="/shop?category=hampers">
                Hampers
              </a>

              <a href="/#new-arrivals">
                New Arrivals
              </a>
            </nav>
          </div>

          {/* CONTACT */}

          <div className="footer-column footer-contact">
            <h3>Say Hello</h3>

            <p>
              Need help choosing the perfect gift or
              jewellery? We'd love to hear from you.
            </p>

            <a
              href="https://wa.me/918712260777"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-link"
            >
              Chat with us on WhatsApp
              <span>↗</span>
            </a>

            <a
              href="https://www.instagram.com/_alankara.co_?igsh=Y2p3Nm0wd3ZyZWw3"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-link"
            >
              Follow us on Instagram
              <span>↗</span>
            </a>

            <a
              href="mailto:alankaracoo@gmail.com"
              className="footer-contact-link"
            >
              alankaracoo@gmail.com
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* BOTTOM */}

        <div className="footer-bottom">
          <p>
            © {currentYear} Alankara by Jahnavi.
            All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <Link to="/privacy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms & Conditions
            </Link>
          </div>

          <p className="footer-made-with">
            Made with ♡ for everyday sparkle
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;