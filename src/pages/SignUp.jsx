import { Link, useNavigate } from 'react-router-dom';
import logoMark from '../images/logo-mark.png';
import Signup from '../images/sigup.png';

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img className="auth-photo" src={Signup} alt="" />
        <div className="auth-visual-content">
          <Link to="/" className="logo">
            <img src={logoMark} className="logo-mark" alt="MassageNowNow" />
            <span className="logo-word">Massage<small>Now Now</small></span>
          </Link>
          <h2>Your first session is <em>waiting.</em></h2>
          <p>Create an account to book instantly, track your therapist live, and save your favourite treatments — on the web or in the app.</p>
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-inner">
          <Link to="/" className="back-home">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M15 6l-6 6 6 6"/></svg>
            Back to site
          </Link>
          <h2>Create Account</h2>
          <p>Join thousands enjoying on-demand wellness across Lagos.</p>
          <form onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            <div className="auth-field">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" required />
            </div>
            <div className="auth-field">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email address" required />
            </div>
            <div className="auth-field">
              <label>Phone Number</label>
              <input type="tel" placeholder="Enter your phone number" required />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input type="password" placeholder="Create a secure password" required />
            </div>
            <button type="submit" className="btn btn-red btn-block" style={{ marginTop: 6 }}>Create Account</button>
          </form>
          <div className="auth-divider">Or continue with</div>
          <div className="auth-oauth">
            <button type="button">
              <svg width="15" height="15" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.2s2.7-6.2 6-6.2c1.9 0 3.1.8 3.9 1.5l2.6-2.5C16.9 3.2 14.7 2.2 12 2.2 6.9 2.2 2.7 6.4 2.7 11.9S6.9 21.6 12 21.6c6.9 0 9.3-4.9 9.3-7.4 0-.5 0-.9-.1-1.3H12z"/></svg>
              Google
            </button>
            <button type="button">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 1.6c0 1-.4 2-1.1 2.7-.7.8-1.9 1.4-2.9 1.3-.1-1 .4-2.1 1.1-2.8.7-.8 2-1.4 2.9-1.2zM19.9 17c-.5 1.2-.8 1.7-1.5 2.7-1 1.4-2.3 3.2-4 3.2-1.5 0-1.9-1-3.9-1-2 0-2.5 1-3.9 1-1.7 0-3-1.6-4-3-2.6-3.9-2.9-8.5-1.3-11 1.2-1.8 3-2.8 4.8-2.8 1.8 0 2.9 1 4.4 1 1.4 0 2.3-1 4.4-1 1.6 0 3.3.9 4.5 2.4-3.9 2.2-3.3 7.8.5 9.5z"/></svg>
              Apple
            </button>
          </div>
          <p className="auth-bottom-note">Already have an account? <Link to="/login">Log In</Link></p>
        </div>
      </div>
    </div>
  );
}
