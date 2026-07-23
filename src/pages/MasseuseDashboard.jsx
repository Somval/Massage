import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoMark from '../images/logo-mark.png';
import chidi from '../images/Chidi.jpeg';
import './MasseuseDashboard.css';

const NAV = [
  { key: 'schedule', label: 'My schedule',   icon: 'M4 6h16v14H4zM4 10h16M9 3v4M15 3v4' },
  { key: 'requests', label: 'Job requests',  icon: 'M4 4h16v9l-3 7H7l-3-7z M4 13h5l1 2h4l1-2h5' },
  { key: 'earnings', label: 'Earnings',      icon: 'M4 7h16v12H4zM4 7V5h13M16 13h3' },
  { key: 'messages', label: 'Messages',      icon: 'M4 5h16v11H8l-4 4z' },
  { key: 'profile',  label: 'Profile & settings', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0' },
];

const SCHEDULE = [
  { customer: 'Amanda O.', service: 'Deep Tissue Massage', when: 'Today · 4:00 PM – 5:30 PM', area: 'Lekki Phase 1', earnings: '₦19,200', status: 'upcoming' },
  { customer: 'Kunle T.', service: 'Aromatherapy', when: 'Today · 2:00 PM – 3:00 PM', area: 'Victoria Island', earnings: '₦20,800', status: 'ongoing' },
  { customer: 'Ify N.', service: 'Sports Massage', when: 'Yesterday · 10:00 AM – 11:00 AM', area: 'Ikoyi', earnings: '₦20,000', status: 'completed' },
  { customer: 'Sarah K.', service: 'Hot Stone', when: 'Sat, 18 Jul · 11:00 AM – 12:00 PM', area: 'Yaba', earnings: '₦21,600', status: 'completed' },
];

const INITIAL_REQUESTS = [
  { customer: 'Peter A.', service: 'Swedish Massage', when: 'Wed, 23 Jul · 5:00 PM – 6:00 PM', area: 'Ikeja GRA', distance: '3.2 km away', price: '₦19,200' },
  { customer: 'Ngozi E.', service: 'Prenatal Massage', when: 'Thu, 24 Jul · 11:00 AM – 12:00 PM', area: 'Surulere', distance: '5.8 km away', price: '₦17,600' },
];

const EARNINGS_HISTORY = [
  { title: 'Deep Tissue — Ify N.', subtitle: 'Yesterday · 10:00 AM', amount: '₦20,000', credit: true },
  { title: 'Payout to bank', subtitle: 'Wed, 16 Jul · GTBank ****4471', amount: '₦85,000', credit: false },
  { title: 'Hot Stone — Sarah K.', subtitle: 'Sat, 18 Jul · 11:00 AM', amount: '₦21,600', credit: true },
  { title: 'Sports Massage — Chidi B.', subtitle: 'Thu, 16 Jul · 3:00 PM', amount: '₦20,000', credit: true },
];

const THREADS = [
  { id: 1, client: 'Amanda O.', message: 'Great, see you at 4pm!', time: '10 mins ago', unread: 1 },
  { id: 2, client: 'Kunle T.', message: 'Is the therapist on the way?', time: '35 mins ago', unread: 2 },
  { id: 3, client: 'Sarah K.', message: 'Thank you, that was wonderful.', time: 'Yesterday', unread: 0 },
];

function Icon({ path, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

export default function MasseuseDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState('schedule');
  const [online, setOnline] = useState(true);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [activeThread, setActiveThread] = useState(null);
  const [replies, setReplies] = useState({});
  const [replyDraft, setReplyDraft] = useState('');
  const [profileName, setProfileName] = useState('Chidi B.');
  const [profileBio, setProfileBio] = useState('Sports & deep tissue specialist · 7+ years experience');
  const [profilePhone, setProfilePhone] = useState('+234 801 234 5678');
  const [profilePhoto, setProfilePhoto] = useState(chidi);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [expandedSection, setExpandedSection] = useState('personal');

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setProfilePhoto(URL.createObjectURL(file));
  };

  const saveProfile = (e) => {
    e.preventDefault();
    setPasswordError('');
    if (newPassword || confirmPassword || currentPassword) {
      if (!currentPassword) return setPasswordError('Enter your current password to set a new one.');
      if (newPassword.length < 8) return setPasswordError('New password must be at least 8 characters.');
      if (newPassword !== confirmPassword) return setPasswordError('New password and confirmation do not match.');
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const respond = (customer) => setRequests(requests.filter((r) => r.customer !== customer));

  const sendReply = () => {
    if (!replyDraft.trim() || !activeThread) return;
    setReplies({ ...replies, [activeThread.id]: [...(replies[activeThread.id] || []), replyDraft.trim()] });
    setReplyDraft('');
  };

  return (
    <div className="dash-shell mss-shell">
      {sidebarOpen && <div className="dash-backdrop" onClick={() => setSidebarOpen(false)} />}
      <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="dash-sidebar-top">
          <Link to="/" className="logo" onClick={() => setSidebarOpen(false)}>
            <img src={logoMark} className="logo-mark" alt="MassageNowNow" />
            <span className="logo-word">Massage<small>Now Now</small></span>
          </Link>
          <button className="dash-sidebar-close" aria-label="Close menu" onClick={() => setSidebarOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <nav className="dash-nav">
          {NAV.map((n) => (
            <a key={n.key} href="#" className={tab === n.key ? 'active' : ''} onClick={(e) => { e.preventDefault(); setTab(n.key); setActiveThread(null); setSidebarOpen(false); }}>
              <span className="dash-nav-icon"><Icon path={n.icon} size={18} /></span>
              {n.label}
              {n.key === 'requests' && requests.length > 0 && (
                <span style={{ marginLeft: 'auto', background: 'var(--red)', color: '#fff', fontSize: 10.5, fontWeight: 700, borderRadius: 100, padding: '2px 7px' }}>{requests.length}</span>
              )}
            </a>
          ))}
        </nav>
        <div className="dash-sidebar-foot">
          <div className="dash-user" style={{ cursor: 'pointer' }} onClick={() => { setTab('profile'); setSidebarOpen(false); }}>
            <div className="dash-user-avatar"><img src={profilePhoto} alt={profileName} /></div>
            <div>
              <h5>{profileName}</h5>
              <span>chidi@massagenownow.com</span>
            </div>
          </div>
          <Link to="/" style={{ display: 'block', marginTop: 16, fontSize: 12.5, color: 'var(--text-mute)', fontWeight: 600 }}>
            ← Sign out to site
          </Link>
        </div>
      </aside>

      <main className="dash-main">
        <div className="dash-topbar">
          <div className="dash-topbar-left">
            <button className="dash-menu-toggle" aria-label="Open menu" onClick={() => setSidebarOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
            <div>
              <h1>{NAV.find((n) => n.key === tab)?.label}</h1>
              <p>
                {tab === 'schedule' && 'Your bookings and availability.'}
                {tab === 'requests' && `${requests.length} waiting for your response.`}
                {tab === 'earnings' && 'Your balance, payouts and job history.'}
                {tab === 'messages' && 'Stay in touch with your clients.'}
                {tab === 'profile' && 'Update your photo, details and password.'}
              </p>
            </div>
          </div>
        </div>

        {tab === 'schedule' && (
          <>
            <div className={`mss-availability ${online ? 'online' : 'offline'}`}>
              <div className="mss-availability-icon">
                <Icon path={online ? 'M2 8.5s4.5-4 10-4 10 4 10 4M5.5 12s3-2.5 6.5-2.5 6.5 2.5 6.5 2.5M9 15.5s1.5-1 3-1 3 1 3 1' : 'M3 3l18 18M2 8.5s4.5-4 10-4c1.8 0 3.4.4 4.8 1M21.9 8.6c-.3-.3-.6-.6-.9-.9'} size={20} />
              </div>
              <div className="mss-availability-body">
                <h4>{online ? "You're online" : "You're offline"}</h4>
                <p>{online ? 'Visible to nearby customers now' : 'Turn on to start receiving requests'}</p>
              </div>
              <label className="mss-switch">
                <input type="checkbox" checked={online} onChange={() => setOnline(!online)} />
                <span className="mss-switch-track" />
              </label>
            </div>

            <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 10 }}>Today</h3>
            {SCHEDULE.filter((s) => s.when.startsWith('Today')).map((s, i) => (
              <div className="mss-schedule-card" key={i}>
                <div className="mss-schedule-top">
                  <b>{s.customer}</b>
                  <span className={`adm-status-pill ${s.status}`}>{s.status.charAt(0).toUpperCase() + s.status.slice(1)}</span>
                </div>
                <p>{s.service}</p>
                <p>{s.when} · {s.area}</p>
                <div className="mss-schedule-foot"><span /><b>{s.earnings}</b></div>
              </div>
            ))}

            <h3 style={{ fontSize: 15, fontWeight: 800, margin: '18px 0 10px' }}>Earlier</h3>
            {SCHEDULE.filter((s) => !s.when.startsWith('Today')).map((s, i) => (
              <div className="mss-schedule-card" key={i}>
                <div className="mss-schedule-top">
                  <b>{s.customer}</b>
                  <span className={`adm-status-pill ${s.status}`}>{s.status.charAt(0).toUpperCase() + s.status.slice(1)}</span>
                </div>
                <p>{s.service}</p>
                <p>{s.when} · {s.area}</p>
                <div className="mss-schedule-foot"><span /><b>{s.earnings}</b></div>
              </div>
            ))}
          </>
        )}

        {tab === 'requests' && (
          requests.length === 0
            ? <p style={{ color: 'var(--text-mute)', fontSize: 13.5 }}>No new requests right now.</p>
            : requests.map((r) => (
              <div className="mss-request-card" key={r.customer}>
                <div className="mss-request-top">
                  <div className="mss-request-avatar">{r.customer.charAt(0)}</div>
                  <div className="mss-request-top-body">
                    <h5>{r.customer}</h5>
                    <span>{r.service}</span>
                  </div>
                  <div className="mss-request-price">{r.price}</div>
                </div>
                <div className="mss-request-meta"><Icon path="M4 6h16v14H4zM4 10h16M9 3v4M15 3v4" /> {r.when}</div>
                <div className="mss-request-meta"><Icon path="M12 21c4-4.5 6-7.6 6-10.5A6 6 0 0 0 6 10.5C6 13.4 8 16.5 12 21zM12 12.5a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z" /> {r.area} · {r.distance}</div>
                <div className="mss-request-actions">
                  <button className="btn btn-outline-red" onClick={() => respond(r.customer)}>Decline</button>
                  <button className="btn btn-red" onClick={() => respond(r.customer)}>Accept</button>
                </div>
              </div>
            ))
        )}

        {tab === 'earnings' && (
          <>
            <div className="mss-balance-card">
              <span>Available balance</span>
              <b>₦85,000</b>
              <button className="btn" style={{ background: '#fff', color: 'var(--red-deep)', width: 'auto', padding: '13px 26px' }}>Request payout</button>
            </div>
            <div className="mss-stat-row">
              <div className="dash-stat-card"><b>₦142,400</b><span>This week</span></div>
              <div className="dash-stat-card"><b>9</b><span>Completed jobs</span></div>
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 10 }}>History</h3>
            {EARNINGS_HISTORY.map((t, i) => (
              <div className="mss-earn-row" key={i}>
                <div className={`mss-earn-icon ${t.credit ? 'credit' : 'debit'}`}>
                  <Icon path={t.credit ? 'M12 19V5M5 12l7 7 7-7' : 'M12 5v14M5 12l7-7 7 7'} size={15} />
                </div>
                <div className="mss-earn-body"><b>{t.title}</b><span>{t.subtitle}</span></div>
                <div className={`mss-earn-amount ${t.credit ? 'credit' : 'debit'}`}>{t.credit ? '+' : '-'}{t.amount}</div>
              </div>
            ))}
          </>
        )}

        {tab === 'messages' && !activeThread && (
          <div className="dash-panel">
            {THREADS.map((t) => (
              <div className="mss-thread-item" key={t.id} onClick={() => setActiveThread(t)}>
                <div className="mss-thread-avatar">{t.client.charAt(0)}</div>
                <div className="mss-thread-body">
                  <div className="mss-thread-top"><b>{t.client}</b><span>{t.time}</span></div>
                  <p style={{ color: t.unread > 0 ? 'var(--ink)' : 'var(--text-mute)', fontWeight: t.unread > 0 ? 600 : 400 }}>{t.message}</p>
                </div>
                {t.unread > 0 && <div className="mss-unread-dot">{t.unread}</div>}
              </div>
            ))}
          </div>
        )}

        {tab === 'messages' && activeThread && (
          <div className="dash-panel">
            <div className="dash-panel-head">
              <h3>{activeThread.client}</h3>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveThread(null); }}>← Back to messages</a>
            </div>
            <div className="mss-thread">
              <div className="mss-bubble client">{activeThread.message}</div>
              {(replies[activeThread.id] || []).map((r, i) => (
                <div className="mss-bubble mine" key={i}>{r}</div>
              ))}
            </div>
            <div className="mss-reply-row">
              <input placeholder="Message your client..." value={replyDraft} onChange={(e) => setReplyDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendReply()} />
              <button className="mss-reply-send" onClick={sendReply} aria-label="Send reply">
                <Icon path="M4 12l16-8-6 8 6 8z" size={16} />
              </button>
            </div>
          </div>
        )}
        {tab === 'profile' && (
          <div className="mss-profile-wrap">
            <div className="dash-panel">
              <div className="profile-card">
                <div className="mss-profile-photo">
                  <img src={profilePhoto} alt={profileName} />
                  <label className="mss-photo-edit" htmlFor="mss-photo-input">
                    <Icon path="M4 7h3l2-3h6l2 3h3v13H4z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" size={13} />
                  </label>
                  <input id="mss-photo-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
                </div>
                <div className="profile-card-body">
                  <h4>{profileName}</h4>
                  <p>{profilePhone}</p>
                  <p>{profileBio}</p>
                </div>
              </div>

              <div className="menu-section-title">Account</div>
              <div className="menu-list-item" style={{ cursor: 'pointer' }} onClick={() => setExpandedSection(expandedSection === 'personal' ? null : 'personal')}>
                <div className="ml-icon"><Icon path="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0" size={17} /></div>
                <div className="menu-list-item-body"><h5>Personal details</h5><span>Name, bio and phone number.</span></div>
                <svg className="chevron" style={{ transform: expandedSection === 'personal' ? 'rotate(90deg)' : 'none', transition: 'transform .2s ease' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
              </div>
              {expandedSection === 'personal' && (
                <form onSubmit={saveProfile} className="mss-inline-form">
                  <div className="modal-field">
                    <label>Full name</label>
                    <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                  </div>
                  <div className="modal-field">
                    <label>Bio / specialties</label>
                    <input type="text" value={profileBio} onChange={(e) => setProfileBio(e.target.value)} />
                  </div>
                  <div className="modal-field">
                    <label>Phone number</label>
                    <input type="tel" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} />
                  </div>
                  {profileSaved && <p style={{ color: 'var(--app-green)', fontSize: 12.5, marginBottom: 10 }}>Profile updated.</p>}
                  <button type="submit" className="btn btn-red btn-block">Save changes</button>
                </form>
              )}

              <div className="menu-section-title">Security</div>
              <div className="menu-list-item" style={{ cursor: 'pointer' }} onClick={() => setExpandedSection(expandedSection === 'password' ? null : 'password')}>
                <div className="ml-icon"><Icon path="M6 10V7a6 6 0 0 1 12 0v3M5 10h14v10H5z" size={17} /></div>
                <div className="menu-list-item-body"><h5>Change password</h5><span>Leave blank to keep your current password.</span></div>
                <svg className="chevron" style={{ transform: expandedSection === 'password' ? 'rotate(90deg)' : 'none', transition: 'transform .2s ease' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
              </div>
              {expandedSection === 'password' && (
                <form onSubmit={saveProfile} className="mss-inline-form">
                  <div className="modal-field">
                    <label>Current password</label>
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                  </div>
                  <div className="modal-row">
                    <div className="modal-field">
                      <label>New password</label>
                      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="modal-field">
                      <label>Confirm new password</label>
                      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                  </div>
                  {passwordError && <p style={{ color: 'var(--red)', fontSize: 12.5, marginBottom: 10 }}>{passwordError}</p>}
                  {profileSaved && <p style={{ color: 'var(--app-green)', fontSize: 12.5, marginBottom: 10 }}>Profile updated.</p>}
                  <button type="submit" className="btn btn-red btn-block">Save changes</button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
