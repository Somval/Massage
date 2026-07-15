import PageBanner from '../components/PageBanner';
import Reveal from '../components/Reveal';
import HomeCta from '../components/HomeCta';
import gallery1 from '../images/gallery1.jpg';
import gallery6 from '../images/gallery6.jpg';
import gallery3 from '../images/gallery3.jpg';
import gallery9 from '../images/gallery9.jpg';
import gallery12 from '../images/gallery12.jpg';
import gallery10 from '../images/gallery10.jpg';
import gallery7 from '../images/gallery7.jpg';
import gallery4 from '../images/gallery4.jpg';
import gallery13 from '../images/gallery13.jpg';
import gallery11 from '../images/gallery11.jpg';
import gallery5 from '../images/gallery5.jpg';
import cotact from '../images/cotact.jpg';



const IMAGES = [
  gallery1, gallery6, gallery3, gallery9, gallery12, gallery10,
  gallery7, gallery4, gallery13, gallery11, gallery5,
];

export default function GalleryPage() {
  return (
    <>
      <PageBanner title="Gallery" crumb="Gallery" img={cotact} />
      <section className="gallery" style={{ background: 'var(--ink)' }}>
        <div className="wrap">
          <Reveal className="services-head">
            <span className="eyebrow-script" style={{ color: 'var(--gold)' }}>Inside The Studio</span>
            <h2 className="section-title">A Look Around</h2>
            <p>A glimpse into the calm, considered spaces our therapists bring to you.</p>
          </Reveal>
          <div className="gallery-grid">
            {IMAGES.map((src, i) => (
              <Reveal key={i} className="gallery-item">
                <img src={src} alt="MassageNowNow studio" loading="lazy" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <HomeCta />
    </>
  );
}
