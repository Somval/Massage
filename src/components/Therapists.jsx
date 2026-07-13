import Reveal from './Reveal';

const THERAPISTS = [
  { name: 'Diana', tags: 'Swedish · Deep Tissue · 6+ yrs', rating: '4.9', img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=520&fit=crop' },
  { name: 'Chidi', tags: 'Sports · Hot Stone · 5 yrs', rating: '4.8', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=520&fit=crop' },
  { name: 'Ada', tags: 'Aromatherapy · Prenatal · 8 yrs', rating: '5.0', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=520&fit=crop' },
  { name: 'Femi', tags: 'Deep Tissue · Sports · 7 yrs', rating: '4.9', img: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=400&h=520&fit=crop' },
];

export default function Therapists() {
  return (
    <section className="therapists" id="therapists">
      <div className="wrap">
        <Reveal className="services-head">
          <div>
            <div className="eyebrow">Meet The Team</div>
            <h2 className="section-title">Hands you can <em>trust.</em></h2>
          </div>
          <p>Every therapist completes background checks, certification review, and an in-person skills assessment.</p>
        </Reveal>
        <div className="therapist-grid">
          {THERAPISTS.map((t) => (
            <Reveal key={t.name} className="therapist-card">
              <div className="therapist-photo">
                <img src={t.img} alt={`${t.name}, massage therapist`} />
                <span className="therapist-badge">★ {t.rating}</span>
              </div>
              <div className="therapist-info">
                <h4>{t.name}</h4>
                <p>{t.tags}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
