import Reveal from './Reveal';

export default function ReferralBanner() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="referral-banner">
          <div className="referral-copy">
            <span className="referral-tag">Give ₦10,000, Get ₦10,000</span>
            <h3>Invite a friend to their first session.</h3>
            <p>You'll both get ₦10,000 off your next booking the moment their first session is complete.</p>
          </div>
          <a href="#" className="btn-gold-pill" style={{ width: 'auto', flexShrink: 0 }}>Invite Now</a>
          <svg className="referral-gift" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="8" width="18" height="13" rx="1" />
            <path d="M3 12h18M12 8v13" />
            <path d="M12 8c-1.5 0-3-1-3-2.5S10.5 3 12 4s0 4 0 4zM12 8c1.5 0 3-1 3-2.5S13.5 3 12 4s0 4 0 4z" />
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
