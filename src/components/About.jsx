import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import girl from '../images/girl.jpg';
import tissue from '../images/Tissue.png';


const POINTS = [
  'Verified, background-checked therapists',
  'Available 24 hours, 7 days a week',
  'Choose your treatment, pressure & duration',
  'Live tracking from booking to arrival',
];

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="about-split">
          <Reveal className="about-photos" style={{ position: 'relative' }}>
            <div className="about-photo-main">
              <img src={tissue} alt="Massage therapy in progress" />
            </div>
            <div className="about-photo-small">
              <img src={girl} alt="Spa essentials" />
            </div>
            <div className="about-badge">
              <b>6+</b>
              <span>Years Serving Lagos</span>
            </div>
          </Reveal>

          <Reveal className="about-copy">
            <span className="eyebrow-script">About Us</span>
            <h2 className="section-title">Wellness that fits<br />into your day.</h2>
            <p className="lead">MassageNowNow was built for people who take their recovery as seriously as their calendar. We match you with vetted, experienced therapists who bring the spa experience directly to your space — no commute, no waiting room.</p>
            <ul className="about-list">
              {POINTS.map((p) => (
                <li key={p}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12l5 5 9-10"/></svg>
                  {p}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/signup" className="btn btn-outline-dark">Book Your Session</Link>
              <Link to="/about" className="btn btn-red" style={{ background: 'transparent', color: 'var(--red)', padding: '16px 8px' }}>Learn More →</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
