import Reveal from './Reveal';

const STEPS = [
  { icon: 'M9 11l3 3L22 4M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h11', title: 'Choose A Treatment', desc: 'Pick your massage type, pressure and duration.' },
  { icon: 'M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Pick A Time', desc: 'Book instantly or schedule for later today.' },
  { icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75', title: 'Get Matched', desc: 'A verified therapist near you accepts your booking.' },
  { icon: 'M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z', title: 'Relax & Track', desc: 'Watch their live arrival, then simply unwind.' },
];

export default function HowItWorks() {
  return (
    <section id="how">
      <div className="wrap">
        <Reveal className="services-head">
          <span className="eyebrow-script">The Process</span>
          <h2 className="section-title">How It Works</h2>
        </Reveal>
        <div className="process-grid">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} className="process-step">
              <div className="process-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={s.icon} /></svg>
                <span>{i + 1}</span>
              </div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
