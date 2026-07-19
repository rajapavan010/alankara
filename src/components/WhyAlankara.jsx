function WhyAlankara() {
  const benefits = [
    {
      id: 1,
      icon: "♢",
      title: "Anti-Tarnish",
      description: "Made to keep its shine through everyday moments.",
    },
    {
      id: 2,
      icon: "♧",
      title: "Water Resistant",
      description: "Jewellery designed to fit effortlessly into your routine.",
    },
    {
      id: 3,
      icon: "♡",
      title: "Hypoallergenic",
      description: "Thoughtfully selected with comfort and everyday wear in mind.",
    },
    {
      id: 4,
      icon: "✦",
      title: "Made to Sparkle",
      description: "Elegant little details that make every moment feel special.",
    },
  ];

  return (
    <section className="why-alankara-section">
      <div className="why-alankara-heading">
        <p>✦ WHY ALANKARA ✦</p>

        <h2>Jewellery Made for Everyday</h2>
      </div>

      <div className="why-alankara-grid">
        {benefits.map((benefit) => (
          <div className="benefit-card" key={benefit.id}>
            <div className="benefit-icon">
              {benefit.icon}
            </div>

            <h3>{benefit.title}</h3>

            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyAlankara;