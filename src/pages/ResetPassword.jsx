import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoMark from '../images/logo-mark.png';
import LoginImg from '../images/Logi.png';
import { resetPasswordWithToken } from '../lib/api';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const hashQuery = window.location.hash.split('?')[1] || '';
  const token = new URLSearchParams(hashQuery).get('token');

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('This reset link is missing its token. Please request a new one.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await resetPasswordWithToken(token, password);
      setDone(true);
      setTimeout(() => navigate('/login'), 2500);
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
          <h2>Almost there — <em>set your new password.</em></h2>
          <p>Choose something secure, then head back in and pick up where you left off.</p>
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-inner">
          {done ? (
            <>
              <h2>Password updated</h2>
              <p>You can now log in with your new password. Redirecting you to login…</p>
            </>
          ) : (
            <>
              <h2>Set a New Password</h2>
              <p>Choose a new password for your account.</p>
              {error && (
                <div style={{ background: '#fdecea', color: '#b3261e', padding: '10px 14px', borderRadius: 8, marginBottom: 14, fontSize: 14 }}>
                  {error}
                </div>
              )}
              <form onSubmit={submit}>
                <div className="auth-field">
                  <label>New Password</label>
                  <input type="password" placeholder="At least 8 characters" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="auth-field">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Re-enter your new password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-red btn-block" disabled={loading}>
                  {loading ? 'Updating…' : 'Update Password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}