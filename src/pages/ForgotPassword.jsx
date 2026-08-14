import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoMark from '../images/logo-mark.png';
import LoginImg from '../images/Logi.png';
import { requestPasswordReset } from '../lib/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await requestPasswordReset(email.trim());
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img className="auth-photo" src={LoginImg} alt="" />
        <div className="auth-visual-content">
          <Link to="/" className="logo">
            <img src={logoMark} className="logo-mark" alt="MassageNowNow" />
            <span className="logo-word">Massage<small>Now Now</small></span>
          </Link>
          <h2>Forgotten your password? <em>Let's get you back in.</em></h2>
          <p>We'll email you a secure link to set a new password — it only takes a minute.</p>
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-inner">
          <Link to="/login" className="back-home">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M15 6l-6 6 6 6"/></svg>
            Back to login
          </Link>

          {sent ? (
            <>
              <h2>Check your email</h2>
              <p>If an account exists for <b>{email}</b>, we've sent a link to reset your password. It expires in 1 hour.</p>
            </>
          ) : (
            <>
              <h2>Forgot Password</h2>
              <p>Enter your email and we'll send you a link to reset your password.</p>
              {error && (
                <div style={{ background: '#fdecea', color: '#b3261e', padding: '10px 14px', borderRadius: 8, marginBottom: 14, fontSize: 14 }}>
                  {error}
                </div>
              )}
              <form onSubmit={submit}>
                <div className="auth-field">
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter your email address" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-red btn-block" disabled={loading}>
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}