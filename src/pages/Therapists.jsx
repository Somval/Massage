import './Therapists.css';

const perks = [
  { title: 'Set your own hours', desc: 'Go online when you want to work, offline when you don\'t. No shifts, no schedules imposed on you.' },
  { title: 'Keep more of what you earn', desc: 'Transparent payouts straight to your wallet after every completed session — no hidden cuts.' },
  { title: 'Work where you\'re strongest', desc: 'List the specialties you\'re trained in — Swedish, Deep Tissue, Sports, and more — and get matched accordingly.' },
  { title: 'Safety built in', desc: 'In-app check-ins, client verification, and support on standby for every booking.' },
];

const requirements = [
  'Valid massage therapy certification or equivalent training',
  'Government-issued ID for verification (NIN, Passport, or Licence)',
  'At least 1 year of professional experience',
  'A smartphone and reliable means of transport around Lagos',
];

export default function Therapists() {
  return (
    <>
      <section className="page-hero therapists-hero">
        <div className="container therapists-hero__inner">
          <span className="eyebrow">For therapists</span>
          <h1>Bring your skill. We'll bring the clients.</h1>
          <p>
            Join a network of trained, verified massage therapists earning on
            their own schedule across Lagos.
          </p>
          <a href="#apply" className="btn btn-primary">
            Apply to join
          </a>
        </div>
      </section>

      <section className="section perks">
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">Why therapists choose us</span>
            <h2>Built around your time, not ours.</h2>
          </div>
          <div className="perks__grid">
            {perks.map((p) => (
              <div className="perk-card" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section requirements">
        <div className="container requirements__inner">
          <div>
            <span className="eyebrow">Requirements</span>
            <h2>What you'll need to apply.</h2>
            <ul className="requirements__list">
              {requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="requirements__card" id="apply">
            <h3>Ready to start?</h3>
            <p>
              Fill out an application through the app and our team will review
              your credentials within 3–5 business days.
            </p>
            <span className="btn btn-dark">Get the app to apply</span>
          </div>
        </div>
      </section>
    </>
  );
}
