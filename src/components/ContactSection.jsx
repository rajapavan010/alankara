import { useState } from "react";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="25"
      height="25"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="25"
      height="25"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.8-4.6A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8 12h.01" />
      <path d="M12 12h.01" />
      <path d="M16 12h.01" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="25"
      height="25"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function ContactSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (event) => {

  event.preventDefault();


  const cleanEmail =
    email.trim().toLowerCase();



  if (!cleanEmail) {

    toast.error(
      "Please enter your email."
    );

    return;

  }



  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



  if (!emailRegex.test(cleanEmail)) {

    toast.error(
      "Please enter a valid email."
    );

    return;

  }



  try {

    setLoading(true);



    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          email: cleanEmail,
        },
      ]);




    if (error) {


      console.error(
        "Newsletter insert error:",
        error
      );



      if (error.code === "23505") {


        toast(
          "You're already subscribed 💛"
        );


      } else {


        toast.error(
          error.message ||
          "Something went wrong. Please try again."
        );


      }


      return;

    }




    toast.success(
      "✨ Welcome to the Alankara family!"
    );


    setEmail("");



  } catch (error) {


    console.error(
      "Unexpected newsletter error:",
      error
    );


    toast.error(
      "Something went wrong. Please try again."
    );


  } finally {


    setLoading(false);


  }


};
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-heading">
          <p className="contact-eyebrow">
            ✦ LET&apos;S STAY CONNECTED ✦
          </p>

          <h2>
            A Little Sparkle,
            <br />
            Straight to You
          </h2>

          <div className="contact-divider">
            <span></span>
            <span>♡</span>
            <span></span>
          </div>

          <p className="contact-description">
            Follow our journey, discover new pieces, or simply say
            hello. We would love to hear from you.
          </p>
        </div>

        <div className="contact-grid">
          <a
            href="https://www.instagram.com/_alankara.co_?igsh=Y2p3Nm0wd3ZyZWw3"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
            aria-label="Visit Alankara on Instagram"
          >
            <div className="contact-icon">
              <InstagramIcon />
            </div>

            <div className="contact-card-content">
              <span className="contact-card-label">
                FOLLOW OUR SPARKLE
              </span>

              <h3>Instagram</h3>

              <p>
                New arrivals, styling inspiration and a little
                everyday sparkle.
              </p>

              <span className="contact-link">
                FOLLOW US
                <ArrowIcon />
              </span>
            </div>
          </a>

          <a
            href="https://wa.me/918712260777"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-card-featured"
            aria-label="Chat with Alankara on WhatsApp"
          >
            <span className="contact-card-sparkle">✦</span>

            <div className="contact-icon">
              <MessageIcon />
            </div>

            <div className="contact-card-content">
              <span className="contact-card-label">
                WE&apos;RE HERE TO HELP
              </span>

              <h3>WhatsApp</h3>

              <p>
                Need help choosing a piece? Chat with us and we will
                help you find your sparkle.
              </p>

              <span className="contact-link">
                CHAT WITH US
                <ArrowIcon />
              </span>
            </div>
          </a>

          <a
            href="mailto:alankaracoo@gmail.com"
            className="contact-card"
            aria-label="Email Alankara"
          >
            <div className="contact-icon">
              <MailIcon />
            </div>

            <div className="contact-card-content">
              <span className="contact-card-label">
                SAY HELLO
              </span>

              <h3>Email Us</h3>

              <p>
                Questions, collaborations or something special in
                mind? Write to us.
              </p>

              <span className="contact-link">
                SEND AN EMAIL
                <ArrowIcon />
              </span>
            </div>
          </a>
        </div>

        <div className="newsletter-box">
          <div className="newsletter-content">
            <p className="newsletter-eyebrow">
              ✦ A LITTLE NOTE FROM ALANKARA
            </p>

            <h3>Be the First to Know</h3>

            <p>
              New collections, special moments and a little sparkle,
              delivered to your inbox.
            </p>
          </div>

          <form
            className="newsletter-form"
            onSubmit={handleSubscribe}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "JOINING..." : "JOIN US"}
              <ArrowIcon />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;