import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import paret from '../images/paret.jpeg';

const SERVICES = [
  { num: '01', name: 'Swedish Massage', desc: 'Long, flowing strokes that ease tension and improve circulation.', price: 'From ₦18,000', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=800&fit=crop' },
  { num: '02', name: 'Deep Tissue', desc: 'Firm, targeted pressure for chronic tightness in the back and shoulders.', price: 'From ₦22,000', img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&h=800&fit=crop' },
  { num: '03', name: 'Hot Stone Therapy', desc: 'Heated basalt stones melt away deep muscle tension.', price: 'From ₦26,000', img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=800&fit=crop' },
  { num: '04', name: 'Aromatherapy', desc: 'Essential-oil blends paired with gentle strokes to calm the mind.', price: 'From ₦20,000', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=800&fit=crop' },
  { num: '05', name: 'Sports Recovery', desc: 'Pre- or post-training work focused on mobility and injury prevention.', price: 'From ₦24,000', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop' },
  { num: '06', name: 'Prenatal Massage', desc: 'Specially trained therapists using safe positioning for expecting mothers.', price: 'From ₦22,000', img: paret },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <Reveal className="services-head">
          <span className="eyebrow-script">Our Treatments</span>
          <h2 className="section-title">Spa & Body Treatments</h2>
          <p>Every session is tailored on booking — pressure, duration and focus areas, all in your control.</p>
        </Reveal>

        <div className="service-grid">
          {SERVICES.map((s) => (
            <Reveal key={s.num} className="service-tile" style={{ display: 'block' }}>
              <Link to="/signup" style={{ display: 'block', height: '100%' }}>
                <img src={s.img} alt={s.name} />
                <div className="service-tile-content">
                  <div className="service-tile-num">Treatment {s.num}</div>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <span className="price">{s.price}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <Link to="/services" className="btn btn-outline-dark">View Full Menu</Link>
        </div>
      </div>
    </section>
  );
}
