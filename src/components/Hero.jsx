import heroJewellery from "../assets/image/hero-jewellery.png";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-eyebrow">
          ✨ TIMELESS BEAUTY, MADE FOR YOU ✨
        </p>

        <h1>ALANKARA</h1>

        <div className="hero-subtitle">
          <span></span>

          <h2>By Jahnavi</h2>

          <span></span>
        </div>

        <div className="hero-heart">
          ♡
        </div>

        <p className="hero-description">
          Anti-tarnish jewellery that
          <br />
          adds a little sparkle to your everyday.
        </p>

        <button className="shop-button">
          SHOP COLLECTION
        </button>

        <div className="hero-features">
          <div className="feature">
            <span>♢</span>
            ANTI-TARNISH
          </div>

          <div className="feature">
            <span>♧</span>
            WATER RESISTANT
          </div>

          <div className="feature">
            <span>♢</span>
            HYPOALLERGENIC
          </div>
        </div>
      </div>

      <div className="hero-image">
        <img
          src={heroJewellery}
          alt="Alankara jewellery collection"
        />
      </div>
    </section>
  );
}

export default Hero;