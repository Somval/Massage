import Reveal from './Reveal';
import trackingImg from '../images/app/discover-2.png';

const POINTS = [
  { title: 'Real-time ETA', desc: 'See exactly when your therapist will arrive, down to the minute.' },
  { title: 'Verified check-in', desc: 'Get notified the moment your therapist checks in at your door.' },
  { title: 'Direct chat & call', desc: 'Message or call your therapist straight from the tracking screen.' },
];

export default function LiveTracking() {
  return (
    <section className="live-tracking">
      <div className="wrap live-tracking-grid">
        <Reveal className="live-tracking-phone">
          <div className="phone-mockup standalone">
            <div className="phone-screen"><img src={trackingImg} alt="MassageNowNow live tracking screen" /></div>
          </div>
        </Reveal>

        <Reveal className="live-tracking-copy">
          <div className="eyebrow">Live Tracking</div>
          <h2>Watch your therapist arrive, <em>in real time.</em></h2>
          <p>No more guessing when they'll show up. From the moment your booking is confirmed, track your therapist's route, ETA, and check-in — right down to your street.</p>
          <div className="live-tracking-points">
            {POINTS.map((p) => (
              <div className="ltp-item" key={p.title}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12l5 5 9-10" /></svg>
                <div>
                  <h5>{p.title}</h5>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
