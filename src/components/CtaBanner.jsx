import Reveal from './Reveal';

export default function CtaBanner() {
  return (
    <section id="book">
      <div className="wrap">
        <Reveal className="cta-banner">
          <h2>Your next hour of quiet is a few taps away.</h2>
          <p>Download the app or book straight from your browser — first session comes with 15% off.</p>
          <div className="cta-actions">
            <a href="#" className="btn btn-solid" style={{ background: '#fff', color: 'var(--red)' }}>Book Now</a>
            <a href="#" className="btn btn-ghost-light">Download The App</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
