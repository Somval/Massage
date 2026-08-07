import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoMark from '../images/logo-mark.png';
import chidi from '../images/Chidi.jpeg';
import {
  clearSession, getCurrentUser, getBookings, respondToBooking, updateBookingStatus,
  setTherapistAvailability, getMyTherapistProfile, updateMyTherapistProfile, updateMyUser,
  getWalletBalance, getWalletTransactions, withdrawWallet,
  getConversations, startConversation, getMessages, sendMessage, updateMyLocation,
} from '../lib/api';
import './MasseuseDashboard.css';

const NAV = [
  { key: 'schedule', label: 'My schedule',   icon: 'M4 6h16v14H4zM4 10h16M9 3v4M15 3v4' },
  { key: 'requests', label: 'Job requests',  icon: 'M4 4h16v9l-3 7H7l-3-7z M4 13h5l1 2h4l1-2h5' },
  { key: 'earnings', label: 'Earnings',      icon: 'M4 7h16v12H4zM4 7V5h13M16 13h3' },
  { key: 'messages', label: 'Messages',      icon: 'M4 5h16v11H8l-4 4z' },
  { key: 'profile',  label: 'Profile & settings', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0' },
];

const STATUS_DISPLAY = {
  ACCEPTED: 'upcoming',
  EN_ROUTE: 'ongoing',
  IN_PROGRESS: 'ongoing',
  COMPLETED: 'completed',
};

const NEXT_STATUS = {
  ACCEPTED: ['en_route', 'Mark en route'],
  EN_ROUTE: ['in_progress', 'Start session'],
  IN_PROGRESS: ['completed', 'Complete session'],
};

function Icon({ path, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

export default function MasseuseDashboard() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState('schedule');
  const [online, setOnline] = useState(false);
  const [requests, setRequests] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  const [walletBalance, setWalletBalance] = useState(null);
  const [earningsHistory, setEarningsHistory] = useState([]);

  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replyDraft, setReplyDraft] = useState('');

  const [profileName, setProfileName] = useState(currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '');
  const [profileBio, setProfileBio] = useState('');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');
  const [profilePhoto, setProfilePhoto] = useState(currentUser?.avatarUrl || chidi);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [expandedSection, setExpandedSection] = useState('personal');
  const [updatingLocation, setUpdatingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');

  const handleUpdateLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Your browser doesn't support location.");
      return;
    }
    setUpdatingLocation(true);
    setLocationStatus('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateMyLocation(position.coords.latitude, position.coords.longitude)
          .then(() => setLocationStatus('Location updated.'))
          .catch((err) => setLocationStatus(err.message))
          .finally(() => setUpdatingLocation(false));
      },
      () => {
        setLocationStatus('Location permission denied.');
        setUpdatingLocation(false);
      }
    );
  };

  const refreshBookings = () => {
    setLoadingBookings(true);
    getBookings()
      .then((items) => {
        setRequests(items.filter((b) => b.status === 'REQUESTED'));
        setSchedule(
          items
            .filter((b) => STATUS_DISPLAY[b.status])
            .map((b) => ({
              id: b.id,
              customer: b.client ? `${b.client.firstName} ${b.client.lastName}` : 'Client',
              service: b.service?.name || 'Massage',
              when: new Date(b.scheduledStart).toLocaleString('en-NG', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }),
              area: b.locationAddress || '',
              earnings: `₦${Number(b.therapistPayout).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`,
              status: STATUS_DISPLAY[b.status],
              rawStatus: b.status,
            }))
        );
      })
      .catch(() => {})
      .finally(() => setLoadingBookings(false));
  };

  const refreshWallet = () => {
    getWalletBalance().then((data) => setWalletBalance(data.walletBalance)).catch(() => {});
    getWalletTransactions().then((items) => {
      setEarningsHistory(items.map((t) => ({
        title: t.title,
        subtitle: new Date(t.createdAt).toLocaleString('en-NG', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
        amount: `₦${Number(t.amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`,
        credit: t.isCredit,
      })));
    }).catch(() => {});
  };

  const refreshConversations = () => {
    getConversations().then(setConversations).catch(() => {});
  };

  useEffect(() => {
    refreshBookings();
    refreshWallet();
    refreshConversations();
    getMyTherapistProfile()
      .then((profile) => {
        setOnline(profile.isAvailable);
        setProfileBio(profile.bio || '');
      })
      .catch(() => {});
  }, []);

  const toggleOnline = () => {
    const next = !online;
    setOnline(next);
    setTherapistAvailability(next).catch(() => setOnline(!next));
  };

  const respond = (id, accept) => {
    respondToBooking(id, accept)
      .then(refreshBookings)
      .catch((err) => alert(err.message));
  };

  const advanceStatus = (id, nextStatus) => {
    updateBookingStatus(id, nextStatus)
      .then(() => {
        refreshBookings();
        refreshWallet();
      })
      .catch((err) => alert(err.message));
  };

  const requestPayout = () => {
    if (!walletBalance || Number(walletBalance) <= 0) {
      alert('No balance available to pay out.');
      return;
    }
    withdrawWallet(Number(walletBalance))
      .then(refreshWallet)
      .catch((err) => alert(err.message));
  };

  const otherParticipant = (conversation) => {
    const me = currentUser?.id;
    const participants = conversation.participants || [];
    const other = participants.find((p) => p.userId !== me) || participants[0];
    return other?.user;
  };

  const openConversation = (conversation) => {
    setActiveConversation(conversation);
    getMessages(conversation.id).then(setMessages).catch(() => {});
  };

  const sendReply = () => {
    if (!replyDraft.trim() || !activeConversation) return;
    sendMessage(activeConversation.id, replyDraft.trim())
      .then((msg) => {
        setMessages((prev) => [...prev, msg]);
        setReplyDraft('');
      })
      .catch((err) => alert(err.message));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setProfilePhoto(dataUrl);
      updateMyUser({ avatarUrl: dataUrl })
        .then((updated) => localStorage.setItem('mnn_user', JSON.stringify(updated)))
        .catch((err) => alert(err.message));
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = (e) => {
    e.preventDefault();
    setPasswordError('');

    if (expandedSection === 'password') {
      if (currentPassword || newPassword || confirmPassword) {
        setPasswordError("Password changes aren't available yet.");
      }
      return;
    }

    const nameParts = profileName.trim().split(' ');
    updateMyUser({
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(' ') || nameParts[0],
      phone: profilePhone.trim() || undefined,
    })
      .then(() => updateMyTherapistProfile({ bio: profileBio.trim() }))
      .then(() => {
        setProfileSaved(true);
        setTimeout(() => setProfileSaved(false), 3000);
      })
      .catch((err) => alert(err.message));
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
            <a key={n.key} href="#" className={tab === n.key ? 'active' : ''} onClick={(e) => { e.preventDefault(); setTab(n.key); setActiveConversation(null); setSidebarOpen(false); }}>
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
              <h5>{profileName || 'Masseuse'}</h5>
              <span>{currentUser?.email}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { clearSession(); navigate('/'); }}
            style={{ display: 'block', marginTop: 16, fontSize: 12.5, color: 'var(--text-mute)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            ← Sign out to site
          </button>
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
                <input type="checkbox" checked={online} onChange={toggleOnline} />
                <span className="mss-switch-track" />
              </label>
            </div>

            <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 10 }}>My Schedule</h3>
            {loadingBookings && <p style={{ color: 'var(--text-mute)', fontSize: 13.5 }}>Loading…</p>}
            {!loadingBookings && schedule.length === 0 && (
              <p style={{ color: 'var(--text-mute)', fontSize: 13.5 }}>Nothing on your schedule yet.</p>
            )}
            {schedule.map((s) => {
              const next = NEXT_STATUS[s.rawStatus];
              return (
                <div className="mss-schedule-card" key={s.id}>
                  <div className="mss-schedule-top">
                    <b>{s.customer}</b>
                    <span className={`adm-status-pill ${s.status}`}>{s.status.charAt(0).toUpperCase() + s.status.slice(1)}</span>
                  </div>
                  <p>{s.service}</p>
                  <p>{s.when} · {s.area}</p>
                  <div className="mss-schedule-foot">
                    {next && (
                      <button className="btn btn-red" style={{ width: 'auto', padding: '6px 14px' }} onClick={() => advanceStatus(s.id, next[0])}>
                        {next[1]}
                      </button>
                    )}
                    <b>{s.earnings}</b>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {tab === 'requests' && (
          requests.length === 0
            ? <p style={{ color: 'var(--text-mute)', fontSize: 13.5 }}>No new requests right now.</p>
            : requests.map((r) => {
              const client = r.client;
              const name = client ? `${client.firstName} ${client.lastName}` : 'Client';
              return (
                <div className="mss-request-card" key={r.id}>
                  <div className="mss-request-top">
                    <div className="mss-request-avatar">{name.charAt(0)}</div>
                    <div className="mss-request-top-body">
                      <h5>{name}</h5>
                      <span>{r.service?.name || 'Massage'}</span>
                    </div>
                    <div className="mss-request-price">₦{Number(r.therapistPayout).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</div>
                  </div>
                  <div className="mss-request-meta"><Icon path="M4 6h16v14H4zM4 10h16M9 3v4M15 3v4" /> {new Date(r.scheduledStart).toLocaleString('en-NG', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })}</div>
                  <div className="mss-request-meta"><Icon path="M12 21c4-4.5 6-7.6 6-10.5A6 6 0 0 0 6 10.5C6 13.4 8 16.5 12 21zM12 12.5a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z" /> {r.locationAddress}</div>
                  <div className="mss-request-actions">
                    <button className="btn btn-outline-red" onClick={() => respond(r.id, false)}>Decline</button>
                    <button className="btn btn-red" onClick={() => respond(r.id, true)}>Accept</button>
                  </div>
                </div>
              );
            })
        )}

        {tab === 'earnings' && (
          <>
            <div className="mss-balance-card">
              <span>Available balance</span>
              <b>{walletBalance == null ? '…' : `₦${Number(walletBalance).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`}</b>
              <button className="btn" style={{ background: '#fff', color: 'var(--red-deep)', width: 'auto', padding: '13px 26px' }} onClick={requestPayout}>Request payout</button>
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 10, marginTop: 20 }}>History</h3>
            {earningsHistory.length === 0 && <p style={{ color: 'var(--text-mute)', fontSize: 13.5 }}>No transactions yet.</p>}
            {earningsHistory.map((t, i) => (
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

        {tab === 'messages' && !activeConversation && (
          <div className="dash-panel">
            {conversations.length === 0 ? (
              <p style={{ padding: 20, color: 'var(--text-mute)', fontSize: 13.5 }}>No conversations yet.</p>
            ) : (
              conversations.map((c) => {
                const other = otherParticipant(c);
                const name = other ? `${other.firstName} ${other.lastName}` : 'Client';
                return (
                  <div className="mss-thread-item" key={c.id} onClick={() => openConversation(c)}>
                    <div className="mss-thread-avatar">{name.charAt(0)}</div>
                    <div className="mss-thread-body">
                      <div className="mss-thread-top"><b>{name}</b></div>
                      <p style={{ color: 'var(--text-mute)' }}>{c.lastMessagePreview || 'Say hello 👋'}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {tab === 'messages' && activeConversation && (
          <div className="dash-panel">
            <div className="dash-panel-head">
              <h3>{(() => {
                const other = otherParticipant(activeConversation);
                return other ? `${other.firstName} ${other.lastName}` : 'Client';
              })()}</h3>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveConversation(null); }}>← Back to messages</a>
            </div>
            <div className="mss-thread">
              {messages.length === 0 && <p style={{ color: 'var(--text-mute)', fontSize: 13 }}>No messages yet.</p>}
              {messages.map((m) => (
                <div className={`mss-bubble ${m.senderId === currentUser?.id ? 'mine' : 'client'}`} key={m.id}>{m.body}</div>
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

              <div className="menu-section-title">Location</div>
              <div style={{ padding: '0 20px 20px' }}>
                <button type="button" className="btn btn-outline-red" onClick={handleUpdateLocation} disabled={updatingLocation}>
                  {updatingLocation ? 'Updating…' : '📍 Update My Location'}
                </button>
                {locationStatus && <p style={{ fontSize: 12.5, color: 'var(--text-mute)', marginTop: 8 }}>{locationStatus}</p>}
              </div>

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