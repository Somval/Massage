import PageBanner from '../components/PageBanner';
import Reveal from '../components/Reveal';
import HomeCta from '../components/HomeCta';

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&h=650&fit=crop', cls: 'tall' },
  { src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&h=400&fit=crop', cls: 'wide' },
  { src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&h=400&fit=crop', cls: '' },
  { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&h=650&fit=crop', cls: 'tall' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop', cls: '' },
  { src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&h=400&fit=crop', cls: 'wide' },
  { src: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&h=400&fit=crop', cls: '' },
  { src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&h=650&fit=crop', cls: 'tall' },
  { src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=400&fit=crop', cls: '' },
];

export default function GalleryPage() {
  return (
    <>
      <PageBanner title="Gallery" crumb="Gallery" img="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1600&h=700&fit=crop" />
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
