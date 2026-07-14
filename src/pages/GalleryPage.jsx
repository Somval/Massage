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
  { src: gallery1, cls: 'tall' },
  { src: gallery6, cls: 'wide' },
  { src: gallery3, cls: '' },
  { src: gallery9, cls: 'tall' },
  { src: gallery12, cls: '' },
  { src: gallery10, cls: 'wide' },
  { src: gallery7, cls: '' },
  { src: gallery4, cls: 'tall' },
  { src: gallery13, cls: '' },
  { src: gallery11, cls: '' },
  { src: gallery5, cls: '' },
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
            {IMAGES.map((img, i) => (
              <Reveal key={i} className={`gallery-item ${img.cls}`} style={{ display: 'block' }}>
                <img src={img.src} alt="MassageNowNow studio" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <HomeCta />
    </>
  );
}
