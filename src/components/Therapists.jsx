import Reveal from './Reveal';
import chidi from '../images/Chidi.jpeg';
import ada from '../images/Ada.jpg';
import chi from '../images/Chi.jpeg';
import amaka from '../images/Amaka.jpg';


const THERAPISTS = [
  { name: 'Chidi', tags: 'Swedish · Deep Tissue · 6+ yrs', rating: '4.9', img: chidi },
  { name: 'Ada', tags: 'Sports · Hot Stone · 5 yrs', rating: '4.8', img: ada },
  { name: 'Chi', tags: 'Aromatherapy · Prenatal · 8 yrs', rating: '5.0', img: chi },
  { name: 'Amaka', tags: 'Deep Tissue · Sports · 7 yrs', rating: '4.9', img: amaka },
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
