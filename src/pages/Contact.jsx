import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="page-hero contact-hero">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>We're here to help.</h1>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container contact-section__grid">
          <div className="contact-info">
            <div className="contact-info__item">
              <h3>Email</h3>
              <a href="mailto:hello@massagenownow.com">hello@massagenownow.com</a>
            </div>
            <div className="contact-info__item">
              <h3>Phone</h3>
              <a href="tel:+2348012345678">+234 801 234 5678</a>
            </div>
            <div className="contact-info__item">
              <h3>Address</h3>
              <span>Lekki Phase 1, Lagos, Nigeria</span>
            </div>
            <div className="contact-info__item">
              <h3>Support hours</h3>
              <span>Every day, 7:00 AM – 11:00 PM</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="contact-form__success">
                <h3>Message sent.</h3>
                <p>Our support team will get back to you within one business day.</p>
              </div>
            ) : (
              <>
                <label>
                  Full name
                  <input type="text" required placeholder="Enter your full name" />
                </label>
                <label>
                  Email address
                  <input type="email" required placeholder="Enter your email address" />
                </label>
                <label>
                  Message
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we help?"
                  />
                </label>
                <button type="submit" className="btn btn-primary">
                  Send message
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
