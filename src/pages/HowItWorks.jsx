import { Link } from 'react-router-dom';
import './HowItWorks.css';

const steps = [
  {
    n: '01',
    title: 'Tell us what you need',
    desc: "Choose a treatment — Swedish, Deep Tissue, Aromatherapy, and more — and your preferred setting: home, hotel, or office.",
  },
  {
    n: '02',
    title: 'See who\'s available now',
    desc: 'Browse verified therapists near you on the live map, filtered by specialty, rating, and distance.',
  },
  {
    n: '03',
    title: 'Book in a few taps',
    desc: 'Pick a time, confirm the price upfront, and pay securely through your in-app wallet.',
  },
  {
    n: '04',
    title: 'Relax — they come to you',
    desc: 'Track your therapist arriving in real time, then settle in for your session.',
  },
];

export default function HowItWorks() {
  return (
    <>
      <section className="page-hero how-hero">
        <div className="container">
          <span className="eyebrow">How it works</span>
          <h1>From booking to relaxed, in four steps.</h1>
        </div>
      </section>

      <section className="section how-steps">
        <div className="container">
          <div className="how-steps__list">
            {steps.map((s, i) => (
              <div className="how-step" key={s.n}>
                <span className="how-step__num">{s.n}</span>
                <div className="how-step__body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                {i < steps.length - 1 && <span className="how-step__connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section how-cta">
        <div className="container how-cta__inner">
          <h2>Ready for your first session?</h2>
          <Link to="/services" className="btn btn-primary">
            Browse treatments
          </Link>
        </div>
      </section>
    </>
  );
}
