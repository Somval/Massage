import Reveal from './Reveal';

export default function Manifesto() {
  return (
    <section className="manifesto">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Our Philosophy</div>
          <h2 className="section-title">Rest is not a reward. <em>It's maintenance.</em></h2>
          <p className="lead">We built MassageNowNow because good therapy shouldn't require a week's notice or a trip across town. Every therapist on our platform is trained, background-checked, and rated by real clients — so relief is always one tap away.</p>
          <div className="stat-row">
            <div className="stat"><b>500+</b><span>Verified Therapists</span></div>
            <div className="stat"><b>40k+</b><span>Sessions Booked</span></div>
            <div className="stat"><b>4.9★</b><span>Average Rating</span></div>
            <div className="stat"><b>18 min</b><span>Average Arrival</span></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
