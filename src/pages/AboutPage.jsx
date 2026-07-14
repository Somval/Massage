import PageBanner from '../components/PageBanner';
import AboutBlock from '../components/About';
import Reveal from '../components/Reveal';
import HomeCta from '../components/HomeCta';
import chidi from '../images/Chidi.jpeg';
import ada from '../images/Ada.jpg';
import chi from '../images/Chi.jpeg';
import amaka from '../images/Amaka.jpg';
import Logi from '../images/Logi.png';

const VALUES = [
  { icon: 'M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Verified & Vetted', desc: 'Every therapist passes a background check, certification review and in-person skills test.' },
  { icon: 'M20 12c0 4-3.6 7-8 9-4.4-2-8-5-8-9a4 4 0 018-1.5A4 4 0 0120 12z', title: 'Client-First Care', desc: 'Your comfort and privacy guide every part of how we design each session.' },
  { icon: 'M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Always On Time', desc: 'Real-time matching means your therapist is never more than a short ride away.' },
];

const TEAM = [
  { name: 'Diana', role: 'Lead Therapist · Swedish', img: chidi },
  { name: 'Chidi', role: 'Sports & Hot Stone', img: ada },
  { name: 'Ada', role: 'Aromatherapy & Prenatal', img: chi },
  { name: 'Femi', role: 'Deep Tissue Specialist', img: amaka },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" crumb="About" img={Logi} />
      <AboutBlock />

      <section style={{ paddingTop: 0, background: 'var(--cream-deep)' }}>
        <div className="wrap">
          <Reveal className="services-head">
            <span className="eyebrow-script">Our Values</span>
            <h2 className="section-title">What Guides Us</h2>
          </Reveal>
          <div className="value-grid">
            {VALUES.map((v) => (
              <Reveal key={v.title} className="value-card">
                <div className="vc-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={v.icon} /></svg>
                </div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="services-head">
            <span className="eyebrow-script">Meet The Team</span>
            <h2 className="section-title">Hands You Can Trust</h2>
          </Reveal>
          <div className="team-grid">
            {TEAM.map((t) => (
              <Reveal key={t.name} className="team-card">
                <div className="team-photo"><img src={t.img} alt={t.name} /></div>
                <h4>{t.name}</h4>
                <span>{t.role}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HomeCta />
    </>
  );
}
