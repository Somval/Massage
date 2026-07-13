import { Link } from 'react-router-dom';
import Reveal from './Reveal';

export default function HomeCta() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="book-photo" style={{ borderRadius: 10, overflow: 'hidden', position: 'relative', minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&h=700&fit=crop" alt="Book your session" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(122,27,23,.9), rgba(36,23,18,.85))' }}></div>
          <div style={{ position: 'relative', zIndex: 2, color: '#fff', padding: '40px 24px' }}>
            <span className="eyebrow-script" style={{ color: 'var(--gold)' }}>Ready When You Are</span>
            <h2 className="section-title" style={{ color: '#fff' }}>Create an account and<br/>book your first session.</h2>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
              <Link to="/signup" className="btn btn-red">Create Account</Link>
              <Link to="/login" className="btn btn-outline-light">Log In To Book</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
