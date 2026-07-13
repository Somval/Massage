import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoMark from '../images/logo-mark.png';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isDashOrAuth = ['/dashboard', '/login', '/signup'].includes(location.pathname);
  if (isDashOrAuth) return null;

  return (
    <>
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="wrap">
          <nav>
            <Link to="/" className="logo">
              <img src={logoMark} className="logo-mark" alt="MassageNowNow" />
              <span className="logo-word">Massage<small>Now Now</small></span>
            </Link>
            <div className="nav-links">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} style={location.pathname === n.to ? { color: 'var(--gold)' } : undefined}>{n.label}</Link>
              ))}
              <Link to="/login" style={{ fontWeight: 700 }}>Log In</Link>
              <Link to="/signup" className="btn btn-red" style={{ padding: '12px 24px' }}>Book Now</Link>
            </div>
            <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
          </nav>
          {open && (
            <div className="mobile-nav">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>{n.label}</Link>
              ))}
              <Link to="/login" onClick={() => setOpen(false)}>Log In</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="btn btn-red">Sign Up</Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
