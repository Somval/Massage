import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&h=1200&fit=crop" alt="Massage therapy session" />
      </div>
      <div className="hero-inner">
        <span className="hero-eyebrow">Welcome to</span>
        <h1 className="hero-title">Massage Now Now</h1>
        <p className="hero-sub">Verified massage therapists delivered to your home, hotel or office — anywhere in Lagos, any hour of the day.</p>
        <div className="hero-actions">
          <Link to="/signup" className="btn btn-red">Book Appointment</Link>
          <a href="#services" className="btn btn-outline-light">Explore Services</a>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="line"></div>
      </div>
    </section>
  );
}
