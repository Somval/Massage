import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import logoMark from '../images/logo-mark.png';
import chidi from '../images/Chidi.jpeg';
import ada from '../images/Ada.jpg';
import ugo from '../images/ugo.jpg';
import amaka from '../images/Amaka.jpg';

const NAV = [
  { key: 'overview',  label: 'Overview',    icon: 'M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z' },
  { key: 'bookings',  label: 'My Bookings', icon: 'M4 6h16v14H4zM4 10h16M9 3v4M15 3v4' },
  { key: 'track',     label: 'Track',       icon: 'M12 21c4-4.5 6-7.6 6-10.5A6 6 0 0 0 6 10.5C6 13.4 8 16.5 12 21zM12 12.5a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z' },
  { key: 'messages',  label: 'Messages',    icon: 'M4 5h16v11H8l-4 4z' },
  { key: 'wallet',    label: 'Wallet',      icon: 'M4 7h16v12H4zM4 7V5h13M16 13h3' },
  { key: 'favorites', label: 'Favorites',   icon: 'M12 20C7.5 17.5 4 14.5 4 10.9A3.9 3.9 0 0 1 12 8.8a3.9 3.9 0 0 1 8 2.1c0 3.6-3.5 6.6-8 9.1z' },
  { key: 'settings',  label: 'Profile',     icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0' },
];

const THERAPISTS = [
  { name: 'Chidi', img: chidi },
  { name: 'Amaka', img: amaka },
  { name: 'Ada', img: ada },
  { name: 'Ugo', img: ugo },
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
  { name: 'Chidi', service: 'Swedish · 7+ yrs', img:chidi },
  { name: 'Ugo', service: 'Deep Tissue · 6+ yrs', img: ugo },
  { name: 'Ada', service: 'Aromatherapy · 5+ yrs', img: ada },
  { name: 'Amaka', service: 'Sports · 8+ yrs', img: amaka },
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
  { label: 'Favorite Masseuses', value: '4', icon: 'M20 12c0 4-3.6 7-8 9-4.4-2-8-5-8-9a4 4 0 018-1.5A4 4 0 0120 12z' },
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
            <label>Masseuse</label>
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

const MASSEUSE_INFO = {
  Diana: { rating: '4.9', reviews: 128, years: '6+ Years Experience' },
  Chidi: { rating: '4.8', reviews: 96, years: '5 Years Experience' },
  Ada: { rating: '5.0', reviews: 140, years: '8 Years Experience' },
  Femi: { rating: '4.9', reviews: 110, years: '7 Years Experience' },
  Maria: { rating: '4.9', reviews: 128, years: '7+ Years Experience' },
};

const TRACK_STEPS = ['Booked', 'Confirmed', 'On the way', 'Arrived', 'Completed'];

const MAP_CATEGORIES = ['All', 'Swedish', 'Deep Tissue', 'Aromatherapy', 'Hot Stone', 'Sports'];

const NEARBY_MASSEUSES = [
  { name: 'Diana', rating: '4.9', reviews: 128, years: '6+ Years Experience', tags: 'Swedish · Deep Tissue · Aromatherapy', price: '₦24,000', away: '5 min away', available: true, img: THERAPISTS[0].img, area: 'Ikeja', lat: 6.6018, lng: 3.3515 },
  { name: 'Chidi', rating: '4.8', reviews: 96, years: '5 Years Experience', tags: 'Sports · Hot Stone', price: '₦24,000', away: '5 min away', available: false, img: THERAPISTS[1].img, area: 'Lekki Phase 1', lat: 6.4392, lng: 3.4675 },
  { name: 'Ada', rating: '5.0', reviews: 140, years: '8 Years Experience', tags: 'Aromatherapy · Prenatal', price: '₦24,000', away: '5 min away', available: false, img: THERAPISTS[2].img, area: 'Yaba', lat: 6.5158, lng: 3.3707 },
  { name: 'Femi', rating: '4.9', reviews: 110, years: '7 Years Experience', tags: 'Deep Tissue · Sports', price: '₦24,000', away: '5 min away', available: true, img: THERAPISTS[3].img, area: 'Surulere', lat: 6.5059, lng: 3.3620 },
  { name: 'Maria', rating: '4.9', reviews: 128, years: '7+ Years Experience', tags: 'Swedish · Deep Tissue', price: '₦24,000', away: '5 min away', available: false, img: FEATURED[2].img, area: 'Ikoyi', lat: 6.4547, lng: 3.4340 },
];

function LagosMap({ masseuses, selected, onSelect }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    let cancelled = false;
    import('leaflet').then((L) => {
      if (cancelled || !mapRef.current || mapInstance.current) return;
      const map = L.map(mapRef.current, { zoomControl: false, attributionControl: true }).setView([6.5, 3.42], 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapInstance.current = map;

      masseuses.forEach((m) => {
        const icon = L.divIcon({
          className: '',
          html: `<div class="leaflet-pin ${m.available ? 'available' : 'busy'}"><div class="leaflet-pin-avatar"><img src="${m.img}" /></div><div class="leaflet-pin-price"><b>${m.price}</b><span>${m.away}</span></div></div>`,
          iconSize: [1, 1],
          iconAnchor: [30, 62],
        });
        const marker = L.marker([m.lat, m.lng], { icon }).addTo(map);
        marker.on('click', () => onSelect(m));
        markersRef.current[m.name] = marker;
      });
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mapInstance.current && selected) {
      mapInstance.current.flyTo([selected.lat, selected.lng], 13, { duration: 0.6 });
    }
  }, [selected]);

  useEffect(() => {
    const visibleNames = new Set(masseuses.map((m) => m.name));
    Object.entries(markersRef.current).forEach(([name, marker]) => {
      const el = marker.getElement();
      if (el) el.style.display = visibleNames.has(name) ? '' : 'none';
    });
  }, [masseuses]);

  return <div className="leaflet-map-el" ref={mapRef} />;
}

function TrackingPanel({ booking }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(NEARBY_MASSEUSES[0]);

  const filtered = NEARBY_MASSEUSES.filter((m) => {
    const matchesCategory = category === 'All' || m.tags.toLowerCase().includes(category.toLowerCase());
    const matchesQuery = query.trim() === '' || m.name.toLowerCase().includes(query.toLowerCase()) || m.tags.toLowerCase().includes(query.toLowerCase()) || m.area.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="track-wrap">
    <div className="dash-panel" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="map-search-bar">
        <div className="map-search-input">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
          <input type="text" placeholder="Search masseuse, specialities, location..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <button className="map-filter-btn" aria-label="Filters">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
        </button>
      </div>

      <div className="map-cat-row">
        {MAP_CATEGORIES.map((c) => (
          <button key={c} className={`map-cat-pill ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      <div className="map-legend">
        <span><i className="dot available" /> Available</span>
        <span><i className="dot busy" /> Busy</span>
      </div>

      <div className="track-map">
        <LagosMap masseuses={filtered} selected={selected} onSelect={setSelected} />
      </div>

      <div className="map-sheet">
        <div className="dash-panel-head" style={{ padding: '18px 20px 8px' }}>
          <h3>Nearby Masseuses</h3>
          <a href="#" onClick={(e) => { e.preventDefault(); }}>View All</a>
        </div>
        <p style={{ padding: '0 20px 10px', margin: 0, fontSize: 12.5, color: 'var(--text-mute)' }}>Available now</p>
        {filtered.map((m) => (
          <div className={`booking-list-item map-list-item ${selected?.name === m.name ? 'selected' : ''}`} key={m.name} onClick={() => setSelected(m)} style={{ cursor: 'pointer' }}>
            <div className="bli-avatar"><img src={m.img} alt={m.name} /></div>
            <div className="bli-body">
              <h5>{m.name} <span className="bli-area">· {m.area}</span></h5>
              <span>★ {m.rating} ({m.reviews}) · {m.years}</span>
              <span style={{ display: 'block', marginTop: 2 }}>{m.tags}</span>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--red)', fontSize: 14 }}>{m.price}</div>
              <span style={{ fontSize: 11, color: 'var(--text-mute)' }}>{m.away}</span>
              <button className="btn btn-red" style={{ padding: '7px 14px', marginTop: 8, fontSize: 11, width: 'auto' }} onClick={(e) => { e.stopPropagation(); }}>View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

const NOTIFICATIONS = [
  { title: 'Booking confirmed', body: 'Diana confirmed your Swedish Massage for Wed, 22 May.', time: '2h ago' },
  { title: 'Masseuse on the way', body: 'Maria is on the way — 8 mins to Ikeja GRA.', time: '5h ago' },
  { title: 'Wallet top up successful', body: '₦50,000 was added to your wallet.', time: '1d ago' },
];


const TOPUP_PRESETS = [5000, 10000, 20000, 50000];
const REWARDS = [
  { title: 'Free 30-min Add-On', cost: '2,000 pts', desc: 'Extend any session by half an hour.', icon: 'M12 7v5l3 2M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z' },
  { title: '₦5,000 Wallet Credit', cost: '4,500 pts', desc: 'Straight into your wallet balance.', icon: 'M4 7h16v12H4zM4 7V5h13M16 13h3' },
  { title: 'Premium Aromatherapy', cost: '6,000 pts', desc: 'Upgrade to our signature oil blend.', icon: 'M12 3c3 4 5 6.4 5 9a5 5 0 0 1-10 0c0-2.6 2-5 5-9z' },
];

function WalletModal({ mode, onClose, amount, setAmount, sendForm, setSendForm, onDone }) {
  if (mode === 'rewards') {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <h3>Rewards</h3>
          <p>You have <b style={{ color: 'var(--red)' }}>3,250 points</b>. Earn 100 points for every ₦1,000 spent.</p>
          <div className="rewards-progress">
            <div className="rewards-progress-bar"><span style={{ width: '72%' }} /></div>
            <small>1,250 points to your next free session</small>
          </div>
          <div className="rewards-list">
            {REWARDS.map((r) => (
              <div className="reward-row" key={r.title}>
                <div className="reward-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={r.icon} /></svg>
                </div>
                <div className="reward-body">
                  <h5>{r.title}</h5>
                  <span>{r.desc}</span>
                </div>
                <div className="reward-cta">
                  <b>{r.cost}</b>
                  <button type="button" onClick={onDone}>Redeem</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'send') {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <h3>Send Money</h3>
          <p>Transfer from your wallet balance of ₦45,600.00.</p>
          <div className="modal-field">
            <label>Send To</label>
            <select value={sendForm.to} onChange={(e) => setSendForm({ ...sendForm, to: e.target.value })}>
              {THERAPISTS.map((t) => <option key={t.name}>{t.name}</option>)}
            </select>
          </div>
          <div className="modal-field">
            <label>Amount</label>
            <div className="amount-input">
              <span>₦</span>
              <input type="number" placeholder="0.00" value={sendForm.amount}
                onChange={(e) => setSendForm({ ...sendForm, amount: e.target.value })} />
            </div>
          </div>
          <div className="modal-field">
            <label>Note (optional)</label>
            <input type="text" placeholder="What's this for?" value={sendForm.note}
              onChange={(e) => setSendForm({ ...sendForm, note: e.target.value })} />
          </div>
          <button className="btn btn-red btn-block" onClick={onDone}>Send ₦{sendForm.amount || '0'}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <h3>Top Up Wallet</h3>
        <p>Add funds instantly. You get a 5% bonus on every top up.</p>
        <div className="modal-field">
          <label>Amount</label>
          <div className="amount-input">
            <span>₦</span>
            <input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
        </div>
        <div className="topup-presets">
          {TOPUP_PRESETS.map((v) => (
            <button type="button" key={v}
              className={String(v) === String(amount) ? 'active' : ''}
              onClick={() => setAmount(String(v))}>
              ₦{v.toLocaleString()}
            </button>
          ))}
        </div>
        <div className="modal-field">
          <label>Pay With</label>
          <select>
            <option>Card — •••• 4821</option>
            <option>Bank Transfer</option>
            <option>USSD</option>
          </select>
        </div>
        {amount > 0 && (
          <div className="topup-summary">
            <div><span>Amount</span><b>₦{Number(amount).toLocaleString()}</b></div>
            <div><span>Bonus (5%)</span><b style={{ color: 'var(--red)' }}>+₦{Math.round(amount * 0.05).toLocaleString()}</b></div>
            <div className="topup-summary-total"><span>New Balance</span><b>₦{(45600 + Number(amount) * 1.05).toLocaleString()}</b></div>
          </div>
        )}
        <button className="btn btn-red btn-block" onClick={onDone}>Top Up ₦{amount || '0'}</button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState('overview');
  const [bookingFilter, setBookingFilter] = useState('upcoming');
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);
  const [walletModal, setWalletModal] = useState(null); // 'topup' | 'send' | 'rewards'
  const [topUpAmount, setTopUpAmount] = useState('');
  const [sendForm, setSendForm] = useState({ to: THERAPISTS[0].name, amount: '', note: '' });
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
            <a key={n.key} href="#" className={tab === n.key ? 'active' : ''} onClick={(e) => { e.preventDefault(); setTab(n.key); setSidebarOpen(false); }}>
              <span className="dash-nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={n.icon} /></svg>
              </span>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="dash-sidebar-foot">
          <button
            type="button"
            className="dash-user"
            onClick={() => { setTab('settings'); setSidebarOpen(false); }}
          >
            <div className="dash-user-avatar"><img src={ada} alt="Amara Okafor" /></div>
            <div>
              <h5>Amara Okafor</h5>
              <span>amara@gmail.com</span>
            </div>
          </button>
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
                {tab === 'track' && "Watch your masseuse's live location and ETA."}
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

            <div className="dash-overview-head">
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
                  <span>Message Masseuse</span>
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
            <div className={bookingFilter === 'favourites' ? 'dash-panel' : 'booking-card-list'}>
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
                    <div className="empty-panel dash-panel">
                      <div className="ep-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 5h18M3 5a2 2 0 002 2h14a2 2 0 002-2M3 5v14a2 2 0 002 2h14a2 2 0 002-2V5" /></svg></div>
                      <h4>No {bookingFilter} bookings yet</h4>
                      <p>When you book a session, it'll show up here so you can track it from request to arrival.</p>
                    </div>
                  )}
                  {bookingsForFilter.map((b) => {
                    const info = MASSEUSE_INFO[b.name] || { rating: '4.9', reviews: 100, years: 'Experienced' };
                    const [datePart, timePart] = b.date.split('·').map((s) => s && s.trim());
                    const [locLabel, locAddress] = b.location.split('·').map((s) => s && s.trim());
                    return (
                      <div className="booking-card" key={b.id}>
                        <div className="booking-card-top">
                          <div className="bc-avatar"><img src={b.img} alt={b.name} /></div>
                          <div className="bc-info">
                            <div className="bc-info-head">
                              <h5>{b.name}</h5>
                              <span className={`bli-status ${b.status}`}>{b.status}</span>
                            </div>
                            <span className="bc-rating">★ {info.rating} ({info.reviews}) · {info.years}</span>
                            <span className="bc-tags">{b.service}</span>
                          </div>
                        </div>
                        <div className="booking-card-row">
                          <div className="bc-meta">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 5h18M3 5a2 2 0 002 2h14a2 2 0 002-2M3 5v14a2 2 0 002 2h14a2 2 0 002-2V5" /></svg>
                            <div><span>Date</span><b>{datePart}</b></div>
                          </div>
                          <div className="bc-meta">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                            <div><span>Time</span><b>{timePart}</b></div>
                          </div>
                        </div>
                        <div className="booking-card-row">
                          <div className="bc-meta">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                            <div><span>{locLabel}</span><b>{locAddress}</b></div>
                          </div>
                          <div className="bc-total">
                            <span>Total</span>
                            <b>{b.total}</b>
                          </div>
                        </div>
                        <div className="booking-card-actions">
                          <button className="btn btn-outline-dark">Message</button>
                          {(b.status === 'confirmed' || b.status === 'ongoing') ? (
                            <button className="btn btn-red" onClick={() => setTab('track')}>Track Live</button>
                          ) : (
                            <button className="btn btn-red">View Details</button>
                          )}
                        </div>
                      </div>
                    );
                  })}
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
                <button type="button" className="wallet-topup-btn" onClick={() => setWalletModal('topup')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                </button>
              </div>
              <div className="wallet-mini-stats">
                <div><span>Total Added</span><b>₦120,000.00</b></div>
                <div><span>Total Spent</span><b>₦74,400.00</b></div>
              </div>
            </div>

            <div className="wallet-actions-grid">
              <button type="button" className="wallet-action-sq" onClick={() => setWalletModal('topup')}>
                <div className="wa-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg></div>
                <span>Top Up</span>
              </button>
              <button type="button" className="wallet-action-sq" onClick={() => setWalletModal('send')}>
                <div className="wa-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8z" /></svg></div>
                <span>Send</span>
              </button>
              <button type="button" className="wallet-action-sq" onClick={() => document.getElementById('txn-panel')?.scrollIntoView({ behavior: 'smooth' })}>
                <div className="wa-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg></div>
                <span>Transactions</span>
              </button>
              <button type="button" className="wallet-action-sq" onClick={() => setWalletModal('rewards')}>
                <div className="wa-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.2l5.9-.9z" /></svg></div>
                <span>Rewards</span>
              </button>
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
            <div className="dash-panel-head"><h3>Your Favorite Masseuses</h3></div>
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
              <img src={ada} alt="Amara Okafor" />
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
      {walletModal && (
        <WalletModal
          mode={walletModal}
          amount={topUpAmount}
          setAmount={setTopUpAmount}
          sendForm={sendForm}
          setSendForm={setSendForm}
          onClose={() => setWalletModal(null)}
          onDone={() => { setWalletModal(null); setToast(true); setTimeout(() => setToast(false), 2600); }}
        />
      )}
      {toast && (
        <div className="booking-toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12l5 5 9-10" /></svg>
          Booking requested — we'll confirm shortly.
        </div>
      )}
    </div>
  );
}
