import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import Reveal from '../components/Reveal';

export default function ContactPage() {
  return (
    <>
      <PageBanner title="Contact & Booking" crumb="Contact" img="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&h=700&fit=crop" />

      <section>
        <div className="wrap">
          <div className="contact-grid">
            <Reveal className="contact-info-card">
              <h3>Get In Touch</h3>
              <div className="ci-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
                <div>
                  <h5>Our Location</h5>
                  <p>The Bickley Park, Admiralty Way, Lekki Phase 1, Lagos</p>
                </div>
              </div>
              <div className="ci-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.4 2.1L8 9.9a16 16 0 006 6l1.4-1.4a2 2 0 012.1-.4c.9.3 1.8.5 2.7.6a2 2 0 011.8 2.2z"/></svg>
                <div>
                  <h5>Phone</h5>
                  <p>+234 906 000 3722<br/>+234 808 332 4586</p>
                </div>
              </div>
              <div className="ci-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                <div>
                  <h5>Email</h5>
                  <p>hello@massagenownow.com</p>
                </div>
              </div>
              <div className="ci-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                <div>
                  <h5>Working Hours</h5>
                  <p>Mon–Fri: 9am–10pm · Sat: 9am–11pm · Sun: 10am–9pm</p>
                </div>
              </div>
              <div className="map-placeholder">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=300&fit=crop" alt="Map location" />
              </div>
            </Reveal>

            <Reveal>
              <span className="eyebrow-script">Get In Touch</span>
              <h2 className="section-title" style={{ marginBottom: 16 }}>Send Us A Message</h2>
              <div style={{ background: 'var(--cream-deep)', border: '1px solid var(--line)', borderRadius: 10, padding: '18px 22px', marginBottom: 26, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.8" style={{ flexShrink: 0 }}><path d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p style={{ fontSize: 13.5, color: 'var(--text-soft)', flex: 1, minWidth: 220 }}>
                  Looking to book a session? Bookings are made from your MassageNowNow dashboard so you can track your therapist live.
                </p>
                <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                  <Link to="/login" className="btn btn-outline-dark" style={{ padding: '10px 18px' }}>Log In</Link>
                  <Link to="/signup" className="btn btn-red" style={{ padding: '10px 18px' }}>Sign Up</Link>
                </div>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-field">
                    <label>Full Name</label>
                    <input type="text" placeholder="Your name" required />
                  </div>
                  <div className="form-field">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="080..." required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field full">
                    <label>Email Address</label>
                    <input type="email" placeholder="you@email.com" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field full">
                    <label>Message</label>
                    <input type="text" placeholder="How can we help?" required />
                  </div>
                </div>
                <button type="submit" className="btn btn-red">Send Message</button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
