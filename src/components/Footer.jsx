import { Link } from 'react-router-dom';
import logoMark from '../images/logo-mark.png';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div>
            <div className="footer-logo"><img src={logoMark} alt="MassageNowNow" /> Massage Now Now</div>
            <p>On-demand massage therapy — vetted therapists, delivered to your home, hotel or office, anywhere in Lagos.</p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg></a>
              <a href="#" aria-label="Facebook"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-9h3l1-4h-4V7c0-1.1.3-2 2-2h2V1.2C16.6 1 15.3 1 14 1c-3 0-5 1.8-5 5.2V9H6v4h3v9h4z"/></svg></a>
              <a href="#" aria-label="TikTok"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2h3.2c.2 1.9 1.4 3.4 3.8 3.6v3.3c-1.4 0-2.7-.4-3.8-1.2v6.6a5.7 5.7 0 11-5.7-5.7c.3 0 .6 0 .9.1v3.3a2.4 2.4 0 102 2.4V2z"/></svg></a>
            </div>
          </div>
          <div className="footer-col">
            <h5>Explore</h5>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><Link to="/signup">Book Now</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul className="footer-contact">
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
                Lekki Phase 1, Lagos, Nigeria
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.4 2.1L8 9.9a16 16 0 006 6l1.4-1.4a2 2 0 012.1-.4c.9.3 1.8.5 2.7.6a2 2 0 011.8 2.2z"/></svg>
                +234 906 000 3722
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                hello@massagenownow.com
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Working Hours</h5>
            <ul>
              <li className="hours-row"><span>Mon – Fri</span><span>9am – 10pm</span></li>
              <li className="hours-row"><span>Saturday</span><span>9am – 11pm</span></li>
              <li className="hours-row"><span>Sunday</span><span>10am – 9pm</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MassageNowNow. All rights reserved.</span>
          <span>Privacy Policy · Terms & Conditions</span>
        </div>
      </div>
    </footer>
  );
}
