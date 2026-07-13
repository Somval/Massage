import { Link } from 'react-router-dom';

export default function PageBanner({ title, crumb, img }) {
  return (
    <section className="page-banner">
      <div className="hero-bg">
        <img src={img} alt={title} />
      </div>
      <div className="page-banner-inner">
        <span className="eyebrow-script" style={{ color: 'var(--gold)' }}>MassageNowNow</span>
        <h1>{title}</h1>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>{crumb}</span>
        </div>
      </div>
    </section>
  );
}
