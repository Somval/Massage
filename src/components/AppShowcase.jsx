import Reveal from './Reveal';
import discoverImg from '../images/app/discover-home.png';
import walletImg from '../images/app/wallet.png';

const FEATURES = [
  {
    icon: 'M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Book in under a minute',
    desc: 'Pick a treatment, set your location, and get matched with a verified therapist nearby — live tracking included.',
  },
  {
    icon: 'M3 6h18v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6zM16 13h3M3 9h18',
    title: 'One wallet for every session',
    desc: 'Fund your wallet in Naira, pay with Paystack or Flutterwave, and reorder your favourite therapist in a tap.',
  },
  {
    icon: 'M21 11.5a8.4 8.4 0 01-9 8.4A8.9 8.9 0 013 12a8.4 8.4 0 019-8.5 8.6 8.6 0 019 8z',
    title: 'Chat with your therapist',
    desc: 'Share access notes, confirm arrival, and keep every booking\'s conversation in one place.',
  },
];

export default function AppShowcase() {
  return (
    <section className="app-showcase" id="app">
      <div className="wrap app-showcase-grid">
        <Reveal className="app-showcase-copy">
          <div className="eyebrow" style={{ justifyContent: 'flex-start' }}>Now In Your Pocket</div>
          <h2>The full studio, <em>in the app.</em></h2>
          <p>Everything you can do on the website — and more — lives in the MassageNowNow app: live therapist tracking, an in-app wallet, and booking history that syncs the moment you log in.</p>
          <div className="app-feature-list">
            {FEATURES.map((f) => (
              <div className="app-feature" key={f.title}>
                <div className="af-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={f.icon} /></svg>
                </div>
                <div>
                  <h5>{f.title}</h5>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="store-badges">
            <a href="#" className="store-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 12.1c0-2.9 2.4-4.3 2.5-4.4-1.4-2-3.5-2.3-4.2-2.3-1.8-.2-3.5 1-4.4 1-.9 0-2.3-1-3.8-1-2 0-3.8 1.1-4.8 2.9-2 3.5-.5 8.7 1.5 11.6 1 1.4 2.1 3 3.6 2.9 1.5-.1 2-.9 3.8-.9s2.3.9 3.8.9c1.6 0 2.6-1.4 3.6-2.9 1.1-1.6 1.6-3.2 1.6-3.3-.1 0-3.1-1.2-3.2-4.6zM14.9 3.5c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.6.8-3.5 1.8-.7.9-1.4 2.3-1.2 3.6 1.3.1 2.6-.7 3.5-1.6z" /></svg>
              <span>Download on the</span>
              <b>App Store</b>
            </a>
            <a href="#" className="store-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 2.7a1.5 1.5 0 00-.6 1.2v16.2a1.5 1.5 0 00.6 1.2l9.4-9.3-9.4-9.3zM15 12l2.5-2.5-9-5.2a1.4 1.4 0 00-1-.2L15 12zM4.5 21.5c.3.1.7 0 1-.2l9-5.2-2.5-2.5-7.5 7.9zM18.7 8.9L16 10.5l2.7 2.7 3.1-1.8c.8-.5.8-1.7 0-2.2l-3.1-1.8-2.7 2.7z" /></svg>
              <span>Get it on</span>
              <b>Google Play</b>
            </a>
          </div>
        </Reveal>

        <Reveal className="app-showcase-phones">
          <div className="phone-mockup back">
            <div className="phone-screen"><img src={walletImg} alt="MassageNowNow app wallet screen" /></div>
          </div>
          <div className="phone-mockup front">
            <div className="phone-screen"><img src={discoverImg} alt="MassageNowNow app discover screen" /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
