import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoMark from '../images/logo-mark.png';

const NAV = [
  { key: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { key: 'bookings', label: 'My Bookings', icon: 'M3 5h18M3 5a2 2 0 002 2h14a2 2 0 002-2M3 5v14a2 2 0 002 2h14a2 2 0 002-2V5M8 3v4M16 3v4' },
  { key: 'track', label: 'Track', icon: 'M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z M12 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' },
  { key: 'messages', label: 'Messages', icon: 'M21 11.5a8.4 8.4 0 01-9 8.4A8.9 8.9 0 013 12a8.4 8.4 0 019-8.5 8.6 8.6 0 019 8z' },
  { key: 'wallet', label: 'Wallet', icon: 'M3 6h18v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6zM16 13h3M3 9h18' },
  { key: 'favorites', label: 'Favorites', icon: 'M20 12c0 4-3.6 7-8 9-4.4-2-8-5-8-9a4 4 0 018-1.5A4 4 0 0120 12z' },
  { key: 'settings', label: 'Profile', icon: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.9 2.9l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.6V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.9-2.9l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.6-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.9-2.9l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.6V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.6 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.9 2.9l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.6 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.6 1z' },
];

const THERAPISTS = [
  { name: 'Diana', img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop' },
  { name: 'Chidi', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=100&h=100&fit=crop' },
  { name: 'Ada', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop' },
  { name: 'Femi', img: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=100&h=100&fit=crop' },
];

const TREATMENTS = ['Swedish Massage', 'Deep Tissue', 'Hot Stone Therapy', 'Aromatherapy', 'Sports Recovery', 'Prenatal Massage'];

const CATEGORIES = [
  { name: 'Swedish', icon: 'M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z' },
  { name: 'Deep Tissue', icon: 'M6 12h12M6 12a6 6 0 1112 0 6 6 0 01-12 0z' },
  { name: 'Hot Stone', icon: 'M12 2v4M4.9 4.9l2.8 2.8M2 12h4M4.9 19.1l2.8-2.8M12 18v4M16.3 16.3l2.8 2.8M18 12h4M16.3 7.7l2.8-2.8' },
  { name: 'Sports', icon: 'M13 2L4 14h6l-1 8 9-12h-6l1-8z' },
  { name: 'Prenatal', icon: 'M20 12c0 4-3.6 7-8 9-4.4-2-8-5-8-9a4 4 0 018-1.5A4 4 0 0120 12z' },
  { name: 'Reflexology', icon: 'M9 11l3 3L22 4M2 12l3 3 6-6' },
];

const FEATURED = [
  { name: 'Maria', service: 'Swedish · 7+ yrs', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=340&fit=crop' },
  { name: 'Diana', service: 'Deep Tissue · 6+ yrs', img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=300&h=340&fit=crop' },
  { name: 'Ada', service: 'Aromatherapy · 5+ yrs', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=340&fit=crop' },
  { name: 'Femi', service: 'Sports · 8+ yrs', img: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=300&h=340&fit=crop' },
];

const INITIAL_BOOKINGS = [
  { id: 1, name: 'Diana', service: 'Swedish Massage', date: 'Wed, 22 May · 4:00 PM', location: 'Home · Lekki Phase 1, Lagos', total: '₦24,000', status: 'confirmed', img: THERAPISTS[0].img },
  { id: 2, name: 'Maria', service: 'Hot Stone Therapy', date: 'Today · 5:15 PM', location: 'Home · Ikeja GRA, Lagos', total: '₦26,000', status: 'ongoing', img: FEATURED[0].img },
  { id: 3, name: 'Chidi', service: 'Sports Recovery', date: 'Fri, 24 May · 6:30 PM', location: 'Office · Victoria Island, Lagos', total: '₦26,500', status: 'pending', img: THERAPISTS[1].img },
  { id: 4, name: 'Ada', service: 'Aromatherapy', date: 'Mon, 12 May · 2:00 PM', location: 'Home · Ikoyi, Lagos', total: '₦22,000', status: 'completed', img: THERAPISTS[2].img },
  { id: 5, name: 'Femi', service: 'Deep Tissue', date: 'Wed, 7 May · 5:00 PM', location: 'Hotel · Ikeja GRA, Lagos', total: '₦25,000', status: 'completed', img: THERAPISTS[3].img },
];

const TRANSACTIONS = [
  { label: 'Wallet Top Up', date: 'May 12, 2026 · 10:24 AM', amount: '+₦50,000.00', type: 'in' },
  { label: 'Payment to Diana', date: 'May 11, 2026 · Massage', amount: '-₦28,000.00', type: 'out' },
  { label: 'Payment to Ada', date: 'May 9, 2026 · Massage', amount: '-₦22,000.00', type: 'out' },
  { label: 'Wallet Top Up', date: 'Apr 30, 2026 · 9:02 AM', amount: '+₦50,000.00', type: 'in' },
];

const STATS = [
  { label: 'Upcoming Sessions', key: 'upcoming', icon: 'M3 5h18M3 5a2 2 0 002 2h14a2 2 0 002-2M3 5v14a2 2 0 002 2h14a2 2 0 002-2V5' },
  { label: 'Completed Sessions', key: 'completed', icon: 'M5 12l5 5 9-10' },
  { label: 'Reward Points', value: '2,350', icon: 'M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5z' },
  { label: 'Favorite Therapists', value: '4', icon: 'M20 12c0 4-3.6 7-8 9-4.4-2-8-5-8-9a4 4 0 018-1.5A4 4 0 0120 12z' },
];

function BookingModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ therapist: THERAPISTS[0].name, service: TREATMENTS[0], date: '', time: '', location: '' });

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onCreate(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <h3>Book A Session</h3>
        <p>Choose your therapist, treatment and time — we'll confirm within minutes.</p>
        <form onSubmit={submit}>
          <div className="modal-field">
            <label>Therapist</label>
            <select value={form.therapist} onChange={update('therapist')}>
              {THERAPISTS.map((t) => <option key={t.name}>{t.name}</option>)}
            </select>
          </div>
          <div className="modal-field">
            <label>Treatment</label>
            <select value={form.service} onChange={update('service')}>
              {TREATMENTS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="modal-row">
            <div className="modal-field">
              <label>Date</label>
              <input type="date" required value={form.date} onChange={update('date')} />
            </div>
            <div className="modal-field">
              <label>Time</label>
              <input type="time" required value={form.time} onChange={update('time')} />
            </div>
          </div>
          <div className="modal-field">
            <label>Location</label>
            <input type="text" placeholder="Home, hotel or office address" required value={form.location} onChange={update('location')} />
          </div>
          <button type="submit" className="btn btn-red btn-block" style={{ marginTop: 6 }}>Confirm Booking</button>
        </form>
      </div>
    </div>
  );
}

const TRACK_STEPS = ['Booked', 'Confirmed', 'On the way', 'Arrived', 'Completed'];

function TrackingPanel({ booking }) {
  if (!booking) {
    return (
      <div className="dash-panel">
        <div className="no-active-track">
          <div className="ep-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg></div>
          <h4>Nothing to track right now</h4>
          <p>Once a therapist confirms an upcoming booking, you'll be able to watch them arrive here in real time.</p>
        </div>
      </div>
    );
  }

  const activeIndex = 2; // "On the way"

  return (
    <div className="dash-panel">
      <div className="track-map">
        <div className="track-badge"><span className="dot" /> {booking.name} is on the way</div>
        <svg className="route" viewBox="0 0 400 320">
          <path className="route-line" d="M70 250 C 140 210, 150 140, 230 110 S 330 60, 340 40" />
        </svg>
        <div className="track-pin" style={{ left: '17%', top: '78%' }}>
          <div className="pin-pulse" />
          <div className="pin-dot"><img src={booking.img} alt={booking.name} /></div>
        </div>
        <div className="track-pin home" style={{ left: '85%', top: '13%' }}>
          <div className="pin-dot">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l9-8 9 8M5 10v10h14V10" /></svg>
          </div>
        </div>
      </div>

      <div className="track-eta-bar">
        <div>
          <span>Estimated Arrival</span>
          <b className="eta-highlight">8 mins</b>
        </div>
        <div>
          <span>Status</span>
          <b>On the way</b>
        </div>
        <div>
          <span>Booking ID</span>
          <b>#MNW-{String(booking.id).slice(-6)}</b>
        </div>
      </div>

      <div className="track-stepper">
        {TRACK_STEPS.map((s, i) => (
          <div className={`track-step ${i < activeIndex ? 'done' : i === activeIndex ? 'active' : ''}`} key={s}>
            <div className="ts-dot">
              {i < activeIndex ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5 9-10" /></svg>
              ) : i === activeIndex ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg>
              ) : null}
            </div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <div className="track-therapist">
        <img src={booking.img} alt={booking.name} />
        <div className="track-therapist-body">
          <h5>{booking.name}</h5>
          <span>{booking.service} · {booking.location}</span>
        </div>
        <div className="track-therapist-actions">
          <a href="#" aria-label="Message"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.4 8.4 0 01-9 8.4A8.9 8.9 0 013 12a8.4 8.4 0 019-8.5 8.6 8.6 0 019 8z" /></svg></a>
          <a href="#" aria-label="Call"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.4 2.1L8 9.9a16 16 0 006 6l1.4-1.4a2 2 0 012.1-.4c.9.3 1.8.5 2.7.6a2 2 0 011.8 2.2z" /></svg></a>
        </div>
      </div>
    </div>
  );
}

const NOTIFICATIONS = [
  { title: 'Booking confirmed', body: 'Diana confirmed your Swedish Massage for Wed, 22 May.', time: '2h ago' },
  { title: 'Therapist on the way', body: 'Maria is on the way — 8 mins to Ikeja GRA.', time: '5h ago' },
  { title: 'Wallet top up successful', body: '₦50,000 was added to your wallet.', time: '1d ago' },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState('overview');
  const [bookingFilter, setBookingFilter] = useState('upcoming');
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const upcoming = bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending');
  const ongoing = bookings.filter((b) => b.status === 'ongoing');
  const completed = bookings.filter((b) => b.status === 'completed');
  const activeTrack = bookings.find((b) => b.status === 'confirmed') || null;

  const createBooking = (form) => {
    const therapist = THERAPISTS.find((t) => t.name === form.therapist);
    const dateLabel = form.date && form.time
      ? new Date(`${form.date}T${form.time}`).toLocaleString('en-NG', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })
      : `${form.date} · ${form.time}`;
    const newBooking = {
      id: Date.now(),
      name: form.therapist,
      service: form.service,
      date: dateLabel,
      location: form.location,
      total: '₦24,000',
      status: 'pending',
      img: therapist ? therapist.img : THERAPISTS[0].img,
    };
    setBookings([newBooking, ...bookings]);
    setShowModal(false);
    setTab('bookings');
    setBookingFilter('upcoming');
    setToast(true);
    setTimeout(() => setToast(false), 3200);
  };

  const bookingsForFilter = { upcoming, ongoing, completed, favourites: [] }[bookingFilter] || [];

  return (
    <div className="dash-shell">
      {sidebarOpen && <div className="dash-backdrop" onClick={() => setSidebarOpen(false)} />}
      <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="dash-sidebar-top">
          <Link to="/" className="logo">
            <img src={logoMark} className="logo-mark" alt="MassageNowNow" />
            <span className="logo-word">Massage<small>Now Now</small></span>
          </Link>
          <button className="dash-sidebar-close" aria-label="Close menu" onClick={() => setSidebarOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <nav className="dash-nav">
          {NAV.map((n) => (
            <a key={n.key} href="#" className={tab === n.key ? 'active' : ''} onClick={(e) => { e.preventDefault(); setTab(n.key); setSidebarOpen(false); }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={n.icon} /></svg>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="dash-sidebar-foot">
          <div className="dash-user">
            <div className="dash-user-avatar"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Amara Okafor" /></div>
            <div>
              <h5>Amara Okafor</h5>
              <span>amara@gmail.com</span>
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
              <h1>{tab === 'overview' ? 'Good Evening, Amara' : NAV.find((n) => n.key === tab)?.label}</h1>
              <p>
                {tab === 'overview' && 'Lekki Phase 1, Lagos'}
                {tab === 'bookings' && 'View and manage all your massage appointments.'}
                {tab === 'track' && "Watch your therapist's live location and ETA."}
                {tab === 'wallet' && 'Securely top up, pay for bookings, and track every transaction.'}
                {tab === 'messages' && 'Stay connected with your therapists.'}
                {tab === 'favorites' && 'Your saved therapists, ready to rebook.'}
                {tab === 'settings' && 'Manage your account, bookings and preferences.'}
              </p>
            </div>
          </div>
          <div className="dash-topbar-right">
            <div className="notif-wrap">
              <button className="notif-bell" aria-label="Notifications" onClick={() => setShowNotifications(!showNotifications)}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" /></svg>
                <span className="notif-dot" />
              </button>
              {showNotifications && (
                <>
                  <div className="notif-backdrop" onClick={() => setShowNotifications(false)} />
                  <div className="notif-dropdown">
                    <div className="notif-dropdown-head">Notifications</div>
                    {NOTIFICATIONS.map((n, i) => (
                      <div className="notif-item" key={i}>
                        <div className="notif-item-dot" />
                        <div>
                          <h5>{n.title}</h5>
                          <p>{n.body}</p>
                          <span>{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button className="btn btn-red" style={{ width: 'auto' }} onClick={() => setShowModal(true)}>+ Book A Session</button>
          </div>
        </div>

        {tab === 'overview' && (
          <>
            <div className="dash-categories">
              {CATEGORIES.map((c) => (
                <div className="dash-cat-pill" key={c.name} onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>
                  <div className="dc-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={c.icon} /></svg>
                  </div>
                  <span>{c.name}</span>
                </div>
              ))}
            </div>

            <div className="dash-panel-head" style={{ marginBottom: 14 }}>
              <h3>Featured Masseuses</h3>
              <a href="#" onClick={(e) => { e.preventDefault(); setTab('favorites'); }}>See All</a>
            </div>
            <div className="featured-row" style={{ marginBottom: 28 }}>
              {FEATURED.map((f) => (
                <div className="featured-card" key={f.name} onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>
                  <img src={f.img} alt={f.name} />
                  <div className="featured-card-info">
                    <h5>{f.name}</h5>
                    <span>{f.service}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="wallet-card">
              <div className="wallet-card-top">
                <div>
                  <span>Wallet Balance</span>
                  <b>{hideBalance ? '₦••••••' : '₦45,600.00'}</b>
                  <button className="wallet-hide" onClick={() => setHideBalance(!hideBalance)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
                    {hideBalance ? 'Show Balance' : 'Hide Balance'}
                  </button>
                </div>
                <div className="wallet-topup-btn" onClick={() => setTab('wallet')} style={{ cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                </div>
              </div>
              <div className="wallet-mini-stats">
                <div><span>Total Added</span><b>₦120,000.00</b></div>
                <div><span>Total Spent</span><b>₦74,400.00</b></div>
              </div>
              <div className="wallet-card-actions">
                <a href="#" onClick={(e) => { e.preventDefault(); setTab('wallet'); }} className="primary">Top Up</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setTab('wallet'); }} className="ghost">Withdraw</a>
              </div>
            </div>

            <div className="dash-stats">
              {STATS.map((s) => (
                <div className="dash-stat-card" key={s.label}>
                  <div className="ds-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={s.icon} /></svg>
                  </div>
                  <b>{s.key === 'upcoming' ? upcoming.length : s.key === 'completed' ? completed.length : s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="dash-two-col">
              <div className="dash-panel">
                <div className="dash-panel-head">
                  <h3>Recent & Upcoming Bookings</h3>
                  <a href="#" onClick={(e) => { e.preventDefault(); setTab('bookings'); }}>View All</a>
                </div>
                {bookings.slice(0, 4).map((b) => (
                  <div className="booking-list-item" key={b.id}>
                    <div className="bli-avatar"><img src={b.img} alt={b.name} /></div>
                    <div className="bli-body">
                      <h5>{b.service} with {b.name}</h5>
                      <span>{b.date}</span>
                    </div>
                    <span className={`bli-status ${b.status}`}>{b.status}</span>
                  </div>
                ))}
              </div>

              <div className="dash-panel">
                <div className="dash-panel-head">
                  <h3>Quick Actions</h3>
                </div>
                {activeTrack && (
                  <a href="#" className="quick-action" onClick={(e) => { e.preventDefault(); setTab('track'); }}>
                    <div className="qa-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg></div>
                    <span>Track {activeTrack.name} Live</span>
                  </a>
                )}
                <a href="#" className="quick-action" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>
                  <div className="qa-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg></div>
                  <span>Book New Session</span>
                </a>
                <a href="#" className="quick-action" onClick={(e) => { e.preventDefault(); setTab('messages'); }}>
                  <div className="qa-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.4 8.4 0 01-9 8.4A8.9 8.9 0 013 12a8.4 8.4 0 019-8.5 8.6 8.6 0 019 8z" /></svg></div>
                  <span>Message Therapist</span>
                </a>
                <a href="#" className="quick-action" onClick={(e) => { e.preventDefault(); setTab('wallet'); }}>
                  <div className="qa-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" /></svg></div>
                  <span>Top Up Wallet</span>
                </a>
                <a href="#" className="quick-action" onClick={(e) => { e.preventDefault(); setTab('favorites'); }}>
                  <div className="qa-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12c0 4-3.6 7-8 9-4.4-2-8-5-8-9a4 4 0 018-1.5A4 4 0 0120 12z" /></svg></div>
                  <span>Refer A Friend</span>
                </a>
              </div>
            </div>
          </>
        )}

        {tab === 'bookings' && (
          <>
            <div className="dash-tabs">
              <button className={`dash-tab-pill ${bookingFilter === 'upcoming' ? 'active' : ''}`} onClick={() => setBookingFilter('upcoming')}>Upcoming ({upcoming.length})</button>
              <button className={`dash-tab-pill ${bookingFilter === 'ongoing' ? 'active' : ''}`} onClick={() => setBookingFilter('ongoing')}>Ongoing ({ongoing.length})</button>
              <button className={`dash-tab-pill ${bookingFilter === 'completed' ? 'active' : ''}`} onClick={() => setBookingFilter('completed')}>Completed ({completed.length})</button>
              <button className={`dash-tab-pill ${bookingFilter === 'favourites' ? 'active' : ''}`} onClick={() => setBookingFilter('favourites')}>Favourites ({THERAPISTS.length})</button>
            </div>
            <div className="dash-panel">
              {bookingFilter === 'favourites' ? (
                THERAPISTS.map((t) => (
                  <div className="booking-list-item" key={t.name}>
                    <div className="bli-avatar"><img src={t.img} alt={t.name} /></div>
                    <div className="bli-body">
                      <h5>{t.name}</h5>
                      <span>Tap to book your next session</span>
                    </div>
                    <button className="btn btn-outline-dark" style={{ padding: '9px 18px' }} onClick={() => setShowModal(true)}>Book</button>
                  </div>
                ))
              ) : (
                <>
                  {bookingsForFilter.length === 0 && (
                    <div className="empty-panel">
                      <div className="ep-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 5h18M3 5a2 2 0 002 2h14a2 2 0 002-2M3 5v14a2 2 0 002 2h14a2 2 0 002-2V5" /></svg></div>
                      <h4>No {bookingFilter} bookings yet</h4>
                      <p>When you book a session, it'll show up here so you can track it from request to arrival.</p>
                    </div>
                  )}
                  {bookingsForFilter.map((b) => (
                    <div className="booking-list-item" key={b.id} style={{ alignItems: 'flex-start' }}>
                      <div className="bli-avatar" style={{ width: 56, height: 56 }}><img src={b.img} alt={b.name} /></div>
                      <div className="bli-body">
                        <h5>{b.service} with {b.name}</h5>
                        <span>{b.date}</span>
                        <span style={{ display: 'block', marginTop: 2 }}>{b.location}</span>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <span className={`bli-status ${b.status}`}>{b.status}</span>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--red)', marginTop: 8, fontSize: 14 }}>{b.total}</div>
                        {(b.status === 'confirmed' || b.status === 'ongoing') && (
                          <button className="btn btn-outline-dark" style={{ padding: '7px 14px', marginTop: 8, fontSize: 11 }} onClick={() => setTab('track')}>Track Live</button>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </>
        )}

        {tab === 'track' && <TrackingPanel booking={activeTrack || ongoing[0]} />}

        {tab === 'wallet' && (
          <>
            <div className="wallet-card">
              <div className="wallet-card-top">
                <div>
                  <span>Wallet Balance</span>
                  <b>{hideBalance ? '₦••••••' : '₦45,600.00'}</b>
                  <button className="wallet-hide" onClick={() => setHideBalance(!hideBalance)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
                    {hideBalance ? 'Show Balance' : 'Hide Balance'}
                  </button>
                </div>
                <div className="wallet-topup-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                </div>
              </div>
              <div className="wallet-mini-stats">
                <div><span>Total Added</span><b>₦120,000.00</b></div>
                <div><span>Total Spent</span><b>₦74,400.00</b></div>
              </div>
            </div>

            <div className="wallet-actions-grid">
              <div className="wallet-action-sq">
                <div className="wa-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg></div>
                <span>Top Up</span>
              </div>
              <div className="wallet-action-sq">
                <div className="wa-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg></div>
                <span>Send</span>
              </div>
              <div className="wallet-action-sq" onClick={() => document.getElementById('txn-panel')?.scrollIntoView({ behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
                <div className="wa-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg></div>
                <span>Transactions</span>
              </div>
              <div className="wallet-action-sq">
                <div className="wa-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5z" /></svg></div>
                <span>Rewards</span>
              </div>
            </div>

            <div className="benefits-banner">
              <div className="bb-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 7H4a1 1 0 00-1 1v3a1 1 0 001 1 1 1 0 011 1v6a1 1 0 001 1h12a1 1 0 001-1v-6a1 1 0 011-1 1 1 0 001-1V8a1 1 0 00-1-1zM12 7c-1.5 0-3-1-3-2.5S10.5 2 12 3s0 4 0 4zM12 7c1.5 0 3-1 3-2.5S13.5 2 12 3s0 4 0 4z" /></svg></div>
              <div className="benefits-banner-body">
                <h5>Enjoy exclusive benefits</h5>
                <p>Top up your wallet and get 5% bonus on every top up.</p>
              </div>
              <a href="#">Top Up Now</a>
            </div>

            <div className="dash-panel" id="txn-panel">
              <div className="dash-panel-head"><h3>Recent Transactions</h3></div>
              {TRANSACTIONS.map((t, i) => (
                <div className="txn-row" key={i}>
                  <div className={`txn-icon ${t.type}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      {t.type === 'in' ? <path d="M12 5v14M5 12h14" /> : <path d="M6 12h14M13 6l6 6-6 6" />}
                    </svg>
                  </div>
                  <div className="txn-body">
                    <h5>{t.label}</h5>
                    <span>{t.date}</span>
                  </div>
                  <div className={`txn-amt ${t.type}`}>{t.amount}<small>Successful</small></div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'messages' && (
          <div className="dash-panel">
            <div className="empty-panel">
              <div className="ep-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.4 8.4 0 01-9 8.4A8.9 8.9 0 013 12a8.4 8.4 0 019-8.5 8.6 8.6 0 019 8z" /></svg></div>
              <h4>No messages yet</h4>
              <p>Once a therapist accepts your booking, you'll be able to chat with them here to confirm details.</p>
            </div>
          </div>
        )}

        {tab === 'favorites' && (
          <div className="dash-panel">
            <div className="dash-panel-head"><h3>Your Favorite Therapists</h3></div>
            {THERAPISTS.map((t) => (
              <div className="booking-list-item" key={t.name}>
                <div className="bli-avatar"><img src={t.img} alt={t.name} /></div>
                <div className="bli-body">
                  <h5>{t.name}</h5>
                  <span>Tap to book your next session</span>
                </div>
                <button className="btn btn-outline-dark" style={{ padding: '9px 18px' }} onClick={() => setShowModal(true)}>Book</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'settings' && (
          <div className="dash-panel">
            <div className="profile-card">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" alt="Amara Okafor" />
              <div className="profile-card-body">
                <h4>Amara Okafor</h4>
                <p>+234 801 234 5678 · amara.okafor@gmail.com</p>
              </div>
            </div>

            <div className="benefits-banner">
              <div className="bb-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5z" /></svg></div>
              <div className="benefits-banner-body">
                <h5>Wellness Rewards · 2,350 Points</h5>
                <p>Earn points with every completed booking.</p>
              </div>
              <a href="#">View Rewards</a>
            </div>

            <div className="activity-chips">
              <div className="activity-chip upcoming"><b>{upcoming.length}</b><span>Upcoming</span></div>
              <div className="activity-chip completed"><b>{completed.length}</b><span>Completed</span></div>
              <div className="activity-chip favorites"><b>{THERAPISTS.length}</b><span>Favorites</span></div>
            </div>

            <div className="menu-section-title">Account</div>
            <div className="menu-list-item">
              <div className="ml-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" /></svg></div>
              <div className="menu-list-item-body"><h5>Personal Information</h5><span>Manage your personal details and contact info.</span></div>
              <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
            </div>
            <div className="menu-list-item">
              <div className="ml-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg></div>
              <div className="menu-list-item-body"><h5>Saved Addresses</h5><span>Manage your home, office and favorite locations.</span></div>
              <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
            </div>
            <div className="menu-list-item">
              <div className="ml-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="6" width="20" height="14" rx="2.5" /><path d="M2 10h20" /></svg></div>
              <div className="menu-list-item-body"><h5>Payment Methods</h5><span>Cards, wallet and preferred payment options.</span></div>
              <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
            </div>

            <div className="menu-section-title">More</div>
            <div className="menu-list-item">
              <div className="ml-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 12c0 4-3.6 7-8 9-4.4-2-8-5-8-9a4 4 0 018-1.5A4 4 0 0120 12z" /></svg></div>
              <div className="menu-list-item-body"><h5>Refer &amp; Earn</h5><span>Invite friends and earn wallet rewards.</span></div>
              <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
            </div>
            <div className="menu-list-item">
              <div className="ml-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" /></svg></div>
              <div className="menu-list-item-body"><h5>Notifications</h5><span>Control booking alerts, messages and promotions.</span></div>
              <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
            </div>

            <div className="menu-section-title">Support</div>
            <div className="menu-list-item">
              <div className="ml-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2 1.5-2 3.5M12 17h.01" /></svg></div>
              <div className="menu-list-item-body"><h5>Help Center</h5><span>Find answers to common questions.</span></div>
              <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
            </div>
            <div className="menu-list-item">
              <div className="ml-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.4 2.1L8 9.9a16 16 0 006 6l1.4-1.4a2 2 0 012.1-.4c.9.3 1.8.5 2.7.6a2 2 0 011.8 2.2z" /></svg></div>
              <div className="menu-list-item-body"><h5>Contact Support</h5><span>Get help from our support team anytime.</span></div>
              <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
            </div>
          </div>
        )}
      </main>

      {showModal && <BookingModal onClose={() => setShowModal(false)} onCreate={createBooking} />}
      {toast && (
        <div className="booking-toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12l5 5 9-10" /></svg>
          Booking requested — we'll confirm shortly.
        </div>
      )}
    </div>
  );
}
