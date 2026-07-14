import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import Reveal from '../components/Reveal';
import HomeCta from '../components/HomeCta';
import gallery14 from '../images/gallery14.png';

const CATEGORIES = [
  {
    name: 'Massage Therapy',
    items: [
      { name: 'Swedish Massage', desc: '60 min · Full body relaxation', price: '₦50,000' },
      { name: 'Deep Tissue', desc: '60 min · Targeted muscle relief', price: '₦55,000' },
      { name: 'Hot Stone Therapy', desc: '75 min · Heated stone treatment', price: '₦58,000' },
      { name: 'Aromatherapy', desc: '60 min · Essential oil blend', price: '₦60,000' },
      { name: 'Sports Recovery', desc: '45 min · Pre/post training', price: '₦65,000' },
      { name: 'Prenatal Massage', desc: '60 min · Safe for expecting mothers', price: '₦62,000' },
    ],
  },
  {
    name: 'Add-Ons',
    items: [
      { name: 'Extended Session', desc: '+30 minutes to any treatment', price: '₦8,000' },
      { name: 'CBD Oil Upgrade', desc: 'Premium relief-focused oil blend', price: '₦5,000' },
      { name: 'Foot Reflexology', desc: '20 min · Add to any session', price: '₦6,000' },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageBanner title="Our Services" crumb="Services" img={gallery14} />

      <section>
        <div className="wrap">
          <Reveal className="services-head">
            <span className="eyebrow-script">Full Treatment Menu</span>
            <h2 className="section-title">Services & Pricing</h2>
            <p>Every price includes therapist travel within central Lagos. Custom locations may incur a small logistics fee.</p>
          </Reveal>

          {CATEGORIES.map((cat) => (
            <div key={cat.name} style={{ marginTop: 50 }}>
              <Reveal>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, marginBottom: 18 }}>{cat.name}</h3>
                <div className="pricing-table">
                  {cat.items.map((it) => (
                    <div className="pricing-row" key={it.name}>
                      <div>
                        <h5>{it.name}</h5>
                        <p>{it.desc}</p>
                      </div>
                      <div className="amt">{it.price}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: 50 }}>
            <Link to="/signup" className="btn btn-red">Book A Treatment</Link>
          </div>
        </div>
      </section>

      <HomeCta />
    </>
  );
}
