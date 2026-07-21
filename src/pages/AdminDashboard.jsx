import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoMark from '../images/logo-mark.png';
import chidi from '../images/Chidi.jpeg';
import ada from '../images/Ada.jpg';
import ugo from '../images/ugo.jpg';
import amaka from '../images/Amaka.jpg';
import './AdminDashboard.css';

const NAV = [
  { key: 'overview',    label: 'Overview',            icon: 'M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z' },
  { key: 'bookings',    label: 'Bookings & scheduling', icon: 'M4 6h16v14H4zM4 10h16M9 3v4M15 3v4' },
  { key: 'support',     label: 'Support inbox',        icon: 'M4 5h16v11H8l-4 4z' },
  { key: 'reviews',     label: 'Reviews & disputes',   icon: 'M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5z' },
  { key: 'promotions',  label: 'Promotions',           icon: 'M20 13 13 20a1.5 1.5 0 0 1-2 0L4 13V4h9zM8 8h.01' },
  { key: 'reports',     label: 'Reports & analytics',  icon: 'M4 20V10M10 20V4M16 20v-7M4 20h16' },
];

const AREAS = [
  { name: 'Ikeja', available: 3, busy: 0 },
  { name: 'Yaba', available: 1, busy: 0 },
  { name: 'Ikoyi', available: 0, busy: 2 },
  { name: 'Lekki Phase 1', available: 4, busy: 1 },
  { name: 'Victoria Island', available: 0, busy: 3 },
  { name: 'Surulere', available: 1, busy: 0 },
];

const ALL_THERAPISTS = ['Diana', 'Chidi', 'Ada', 'Grace', 'Blessing', 'Tolu', 'Femi', 'Maria'];

const INITIAL_ADMIN_BOOKINGS = [
  { id: 1, reference: 'MNN-BK-7719264', customer: 'Amanda O.', therapist: 'Diana', service: 'Deep Tissue Massage', date: 'Wed, 22 Jul', time: '4:00 PM – 5:30 PM', area: 'Lekki Phase 1', total: '₦24,000', status: 'upcoming' },
  { id: 2, reference: 'MNN-BK-7719302', customer: 'Kunle T.', therapist: 'Grace', service: 'Aromatherapy', date: 'Wed, 22 Jul', time: '2:00 PM – 3:00 PM', area: 'Victoria Island', total: '₦26,000', status: 'ongoing' },
  { id: 3, reference: 'MNN-BK-7710188', customer: 'Ify N.', therapist: 'Chidi', service: 'Sports Massage', date: 'Mon, 20 Jul', time: '10:00 AM – 11:00 AM', area: 'Ikoyi', total: '₦25,000', status: 'completed' },
  { id: 4, reference: 'MNN-BK-7708821', customer: 'Peter A.', therapist: 'Blessing', service: 'Swedish Massage', date: 'Sun, 19 Jul', time: '1:00 PM – 2:00 PM', area: 'Surulere', total: '₦22,000', status: 'cancelled' },
  { id: 5, reference: 'MNN-BK-7708650', customer: 'Sarah K.', therapist: 'Ada', service: 'Hot Stone', date: 'Sat, 18 Jul', time: '11:00 AM – 12:00 PM', area: 'Yaba', total: '₦27,000', status: 'completed' },
];

const INITIAL_PROMO_CODES = [
  { code: 'FIRSTRUB15', description: 'First booking discount', discount: '15% off', used: 342, limit: 1000, expires: '31 Aug 2026', active: true },
  { code: 'WELCOME2K', description: 'New customer welcome offer', discount: '₦2,000 off', used: 890, limit: 1000, expires: '15 Aug 2026', active: true },
  { code: 'REFER10', description: 'Referral reward', discount: '10% off', used: 156, limit: 500, expires: '01 Dec 2026', active: true },
  { code: 'JUNEBLAST', description: 'June seasonal promo', discount: '20% off', used: 500, limit: 500, expires: '30 Jun 2026', active: false },
];

const REVIEWS = [
  { customer: 'Amanda O.', therapist: 'Diana', rating: 5.0, comment: 'Excellent deep tissue session, very professional.', date: '2 days ago', flagged: false },
  { customer: 'Kunle T.', therapist: 'Grace', rating: 2.0, comment: 'Therapist arrived 40 minutes late with no notice.', date: '3 days ago', flagged: true },
  { customer: 'Ify N.', therapist: 'Chidi', rating: 4.5, comment: 'Great sports massage, would book again.', date: '5 days ago', flagged: false },
];

const INITIAL_DISPUTES = [
  { reference: 'MNN-BK-7708821', customer: 'Peter A.', therapist: 'Blessing', reason: 'Therapist cancelled last minute', amount: '₦22,000', status: 'open' },
  { reference: 'MNN-BK-7719302', customer: 'Kunle T.', therapist: 'Grace', reason: 'Late arrival, requesting partial refund', amount: '₦10,000', status: 'investigating' },
  { reference: 'MNN-BK-7705310', customer: 'Ngozi E.', therapist: 'Tolu', reason: 'Duplicate charge on card', amount: '₦25,000', status: 'resolved' },
];

const TICKETS = [
  { id: 1, customer: 'Peter A.', subject: 'Refund not received', message: 'It has been 5 days since the cancellation, I still have not received my refund.', time: '10 mins ago', status: 'open' },
  { id: 2, customer: 'Ngozi E.', subject: 'App charged me twice', message: 'Can you confirm the second charge was reversed? My bank shows it as pending.', time: '1 hour ago', status: 'pending' },
  { id: 3, customer: 'Sarah K.', subject: 'Therapist details question', message: 'Thanks for clarifying, all good now!', time: 'Yesterday', status: 'resolved' },
  { id: 4, customer: 'Kunle T.', subject: 'Late arrival complaint', message: 'I would like a partial refund for the delay yesterday.', time: '2 days ago', status: 'open' },
];

const WEEKLY_BOOKINGS = [
  { label: 'Mon', value: 32 }, { label: 'Tue', value: 41 }, { label: 'Wed', value: 47 },
  { label: 'Thu', value: 38 }, { label: 'Fri', value: 52 }, { label: 'Sat', value: 60 }, { label: 'Sun', value: 45 },
];
const WEEKLY_REVENUE = [
  { label: 'Mon', value: 820 }, { label: 'Tue', value: 990 }, { label: 'Wed', value: 1180 },
  { label: 'Thu', value: 940 }, { label: 'Fri', value: 1320 }, { label: 'Sat', value: 1560 }, { label: 'Sun', value: 1100 },
];
const TOP_AREAS = [
  { label: 'Lekki Phase 1', value: 128 }, { label: 'Victoria Island', value: 104 },
  { label: 'Ikoyi', value: 86 }, { label: 'Ikeja', value: 74 }, { label: 'Yaba', value: 52 },
];
const TOP_THERAPISTS = [
  { label: 'Diana', value: 62 }, { label: 'Grace', value: 54 }, { label: 'Chidi', value: 49 }, { label: 'Ada', value: 41 },
];

const AVATAR_BY_NAME = { Chidi: chidi, Ada: ada, Ugo: ugo, Amaka: amaka };

function Icon({ path, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

function StatusPill({ status }) {
  const labels = {
    upcoming: 'Upcoming', ongoing: 'Ongoing', completed: 'Completed', cancelled: 'Cancelled',
    available: 'Available', busy: 'On a booking', open: 'Open', investigating: 'Investigating',
    resolved: 'Resolved', pending: 'Pending', flagged: 'Flagged',
  };
  return <span className={`adm-status-pill ${status}`}>{labels[status] || status}</span>;
}

function BookingDetailModal({ booking, onClose, onReassign, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <p style={{ fontSize: 11.5, color: 'var(--text-mute)', marginBottom: 4 }}>{booking.reference}</p>
        <h3>{booking.service} for {booking.customer}</h3>
        <p>{booking.date} · {booking.time} · {booking.area}</p>
        <div className="modal-field" style={{ marginTop: 20 }}>
          <label>Reassign therapist</label>
          <div className="adm-chip-row">
            {ALL_THERAPISTS.map((name) => (
              <button
                key={name}
                type="button"
                className={`adm-chip ${name === booking.therapist ? 'selected' : ''}`}
                onClick={() => onReassign(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <div className="adm-modal-actions">
          <button
            type="button"
            className="btn btn-outline-red"
            disabled={booking.status === 'cancelled'}
            onClick={onCancel}
          >
            Cancel &amp; refund
          </button>
          <button type="button" className="btn btn-red" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}

function CreatePromoModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ code: '', description: '', discount: '', limit: '500' });
  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.code.trim()) return;
    onCreate({
      code: form.code.trim().toUpperCase(),
      description: form.description.trim() || 'Custom promotion',
      discount: form.discount.trim() || '10% off',
      used: 0,
      limit: parseInt(form.limit, 10) || 500,
      expires: 'No expiry set',
      active: true,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <h3>New discount code</h3>
        <p>Create a promo code customers can apply at checkout.</p>
        <form onSubmit={submit}>
          <div className="modal-field">
            <label>Code</label>
            <input type="text" placeholder="e.g. SUMMER20" required value={form.code} onChange={update('code')} />
          </div>
          <div className="modal-field">
            <label>Description</label>
            <input type="text" placeholder="What this promo is for" value={form.description} onChange={update('description')} />
          </div>
          <div className="modal-row">
            <div className="modal-field">
              <label>Discount</label>
              <input type="text" placeholder="e.g. 20% off" value={form.discount} onChange={update('discount')} />
            </div>
            <div className="modal-field">
              <label>Usage limit</label>
              <input type="number" placeholder="500" value={form.limit} onChange={update('limit')} />
            </div>
          </div>
          <button type="submit" className="btn btn-red btn-block" style={{ marginTop: 6 }}>Create code</button>
        </form>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  // Bookings & scheduling
  const [bookings, setBookings] = useState(INITIAL_ADMIN_BOOKINGS);
  const [bookingFilter, setBookingFilter] = useState('all');
  const [bookingQuery, setBookingQuery] = useState('');
  const [activeBooking, setActiveBooking] = useState(null);

  // Promotions
  const [promoCodes, setPromoCodes] = useState(INITIAL_PROMO_CODES);
  const [showPromoModal, setShowPromoModal] = useState(false);

  // Reviews & disputes
  const [disputes, setDisputes] = useState(INITIAL_DISPUTES);
  const [reviewTab, setReviewTab] = useState('reviews');

  // Support inbox
  const [activeTicket, setActiveTicket] = useState(null);
  const [replies, setReplies] = useState({});
  const [replyDraft, setReplyDraft] = useState('');

  const filteredBookings = bookings.filter((b) => {
    const statusMatch = bookingFilter === 'all' || b.status === bookingFilter;
    const q = bookingQuery.trim().toLowerCase();
    const queryMatch = !q || b.customer.toLowerCase().includes(q) || b.therapist.toLowerCase().includes(q) || b.reference.toLowerCase().includes(q);
    return statusMatch && queryMatch;
  });

  const reassignBooking = (id, therapist) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, therapist } : b)));
    setActiveBooking((cur) => (cur ? { ...cur, therapist } : cur));
  };

  const cancelBooking = (id) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)));
    setActiveBooking(null);
  };

  const togglePromo = (code) => {
    setPromoCodes(promoCodes.map((p) => (p.code === code ? { ...p, active: !p.active } : p)));
  };

  const resolveDispute = (reference) => {
    setDisputes(disputes.map((d) => (d.reference === reference ? { ...d, status: 'resolved' } : d)));
  };

  const sendReply = () => {
    if (!replyDraft.trim() || !activeTicket) return;
    setReplies({ ...replies, [activeTicket.id]: [...(replies[activeTicket.id] || []), replyDraft.trim()] });
    setReplyDraft('');
  };

  const STATS = [
    { label: 'Bookings today', value: '47', trend: '+12%', icon: 'M4 6h16v14H4zM4 10h16M9 3v4M15 3v4' },
    { label: 'Revenue today', value: '₦1.28m', trend: '+8%', icon: 'M4 7h16v12H4zM4 7V5h13M16 13h3' },
    { label: 'Therapists on duty', value: '18', trend: '18 of 24', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0' },
    { label: 'Payouts to review', value: '₦340k', trend: '6 pending', icon: 'M5 12l5 5 9-10' },
  ];

  return (
    <div className="dash-shell adm-shell">
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
            <a key={n.key} href="#" className={tab === n.key ? 'active' : ''} onClick={(e) => { e.preventDefault(); setTab(n.key); setActiveTicket(null); setSidebarOpen(false); }}>
              <span className="dash-nav-icon"><Icon path={n.icon} /></span>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="dash-sidebar-foot">
          <div className="dash-user" style={{ cursor: 'default' }}>
            <div className="dash-user-avatar"><img src={ada} alt="Funke A." /></div>
            <div>
              <h5>Funke A.</h5>
              <span>funke@massagenownow.com</span>
              <span className="adm-badge-role">Operations admin</span>
            </div>
          </div>
          <Link to="/" style={{ display: 'block', marginTop: 16, fontSize: 12.5, color: 'rgba(255,255,255,.45)', fontWeight: 600 }}>
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
                {tab === 'overview' && 'Lagos operations, live.'}
                {tab === 'bookings' && 'Every booking across the fleet.'}
                {tab === 'support' && 'Customer questions and complaints.'}
                {tab === 'reviews' && 'Keep an eye on quality and resolve complaints.'}
                {tab === 'promotions' && 'Discount codes across the app.'}
                {tab === 'reports' && 'How the business is trending this week.'}
              </p>
            </div>
          </div>
          <div className="dash-topbar-right">
            {tab === 'bookings' && (
              <div className="adm-search">
                <Icon path="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3" size={16} />
                <input placeholder="Search customer, therapist, ref..." value={bookingQuery} onChange={(e) => setBookingQuery(e.target.value)} />
              </div>
            )}
            <div className="notif-wrap">
              <button className="notif-bell" aria-label="Notifications" onClick={() => setShowNotifications(!showNotifications)}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" /></svg>
                <span className="notif-dot" />
              </button>
              {showNotifications && (
                <>
                  <div className="notif-backdrop" onClick={() => setShowNotifications(false)} />
                  <div className="notif-dropdown">
                    <div className="notif-dropdown-head">Pending approvals</div>
                    <div className="notif-item"><div className="notif-item-dot" /><div><h5>Maria — new therapist</h5><p>Submitted ID &amp; certification</p><span>10 mins ago</span></div></div>
                    <div className="notif-item"><div className="notif-item-dot" /><div><h5>Withdrawal — Chidi</h5><p>₦45,000 to bank</p><span>1 hour ago</span></div></div>
                    <div className="notif-item"><div className="notif-item-dot" /><div><h5>Refund request</h5><p>Booking MNN-BK-7710188</p><span>3 hours ago</span></div></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {tab === 'overview' && (
          <>
            <div className="dash-stats">
              {STATS.map((s) => (
                <div className="dash-stat-card" key={s.label}>
                  <div className="adm-stat-top">
                    <div className="ds-icon"><Icon path={s.icon} /></div>
                    <span className={`adm-stat-badge ${s.trend.startsWith('+') ? 'up' : 'flat'}`}>{s.trend}</span>
                  </div>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="adm-coverage">
              <div className="adm-coverage-head">
                <h3>Live coverage — Lagos</h3>
                <span>Therapist availability by area, updated in real time</span>
              </div>
              <div className="adm-coverage-grid">
                {AREAS.map((a) => (
                  <div className="adm-area-chip" key={a.name}>
                    <div className="adm-area-chip-top">
                      <span className={`adm-area-dot ${a.available >= a.busy ? 'available' : 'busy'}`} />
                      <b>{a.name}</b>
                    </div>
                    <span>{a.busy === 0 ? `${a.available} available` : `${a.busy} busy · ${a.available} free`}</span>
                  </div>
                ))}
              </div>
              <div className="adm-coverage-legend">
                <span><span className="adm-area-dot available" /> Available now</span>
                <span><span className="adm-area-dot busy" /> On a booking</span>
              </div>
            </div>

            <div className="dash-panel">
              <div className="dash-panel-head">
                <h3>Recent bookings</h3>
                <a href="#" onClick={(e) => { e.preventDefault(); setTab('bookings'); }}>View all</a>
              </div>
              {bookings.slice(0, 4).map((b) => (
                <div className="booking-list-item" key={b.id}>
                  <div className="bli-avatar"><img src={AVATAR_BY_NAME[b.therapist] || ada} alt={b.therapist} /></div>
                  <div className="bli-body">
                    <h5>{b.customer} · {b.service}</h5>
                    <span>with {b.therapist} · {b.date} · {b.area}</span>
                  </div>
                  <StatusPill status={b.status} />
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'bookings' && (
          <>
            <div className="dash-tabs">
              {['all', 'upcoming', 'ongoing', 'completed', 'cancelled'].map((s) => (
                <button key={s} className={`dash-tab-pill ${bookingFilter === s ? 'active' : ''}`} onClick={() => setBookingFilter(s)}>
                  {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>

            <div className="dash-panel">
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr><th>Customer</th><th>Therapist</th><th>Date &amp; time</th><th>Area</th><th>Total</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((b) => (
                      <tr key={b.id} onClick={() => setActiveBooking(b)}>
                        <td className="adm-cell-person"><b>{b.customer}</b><span>{b.reference}</span></td>
                        <td>{b.therapist}</td>
                        <td>{b.date} · {b.time}</td>
                        <td>{b.area}</td>
                        <td>{b.total}</td>
                        <td><StatusPill status={b.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="adm-card-list">
                {filteredBookings.map((b) => (
                  <div className="adm-row-card" key={b.id} onClick={() => setActiveBooking(b)}>
                    <div className="adm-row-card-top">
                      <b>{b.customer}</b>
                      <StatusPill status={b.status} />
                    </div>
                    <p>{b.service} · with {b.therapist}</p>
                    <p>{b.date} · {b.time} · {b.area}</p>
                    <div className="adm-row-card-foot">
                      <span style={{ fontSize: 11, color: 'var(--text-mute)' }}>{b.reference}</span>
                      <b>{b.total}</b>
                    </div>
                  </div>
                ))}
              </div>
              {filteredBookings.length === 0 && <p style={{ padding: 20, color: 'var(--text-mute)', fontSize: 13 }}>No bookings match this filter.</p>}
            </div>
          </>
        )}

        {tab === 'support' && !activeTicket && (
          <div className="dash-panel">
            {TICKETS.map((t) => (
              <div className="adm-ticket-item" key={t.id} onClick={() => setActiveTicket(t)}>
                <div className="adm-ticket-avatar">{t.customer.charAt(0)}</div>
                <div className="adm-ticket-body">
                  <div className="adm-ticket-top"><b>{t.subject}</b><span>{t.time}</span></div>
                  <p>{t.message}</p>
                  <div className="adm-ticket-foot">
                    <span>{t.customer}</span>
                    <StatusPill status={t.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'support' && activeTicket && (
          <div className="dash-panel">
            <div className="dash-panel-head">
              <h3>{activeTicket.subject}</h3>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTicket(null); }}>← Back to inbox</a>
            </div>
            <div className="adm-thread">
              <div className="adm-bubble customer">{activeTicket.message}</div>
              {(replies[activeTicket.id] || []).map((r, i) => (
                <div className="adm-bubble admin" key={i}>{r}</div>
              ))}
            </div>
            <div className="adm-reply-row">
              <input placeholder="Type a reply..." value={replyDraft} onChange={(e) => setReplyDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendReply()} />
              <button className="adm-reply-send" onClick={sendReply} aria-label="Send reply">
                <Icon path="M4 12l16-8-6 8 6 8z" size={16} />
              </button>
            </div>
          </div>
        )}

        {tab === 'reviews' && (
          <>
            <div className="dash-tabs">
              <button className={`dash-tab-pill ${reviewTab === 'reviews' ? 'active' : ''}`} onClick={() => setReviewTab('reviews')}>Reviews</button>
              <button className={`dash-tab-pill ${reviewTab === 'disputes' ? 'active' : ''}`} onClick={() => setReviewTab('disputes')}>Disputes</button>
            </div>
            {reviewTab === 'reviews' && REVIEWS.map((r, i) => (
              <div className={`adm-review-card ${r.flagged ? 'flagged' : ''}`} key={i}>
                <div className="adm-review-top">
                  <b>{r.customer} → {r.therapist}</b>
                  <span className="adm-review-rating"><Icon path="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5z" size={14} />{r.rating}</span>
                </div>
                <p>{r.comment}</p>
                <div className="adm-review-foot">
                  <span>{r.date}</span>
                  {r.flagged && <StatusPill status="flagged" />}
                </div>
              </div>
            ))}
            {reviewTab === 'disputes' && disputes.map((d) => (
              <div className="adm-dispute-card" key={d.reference}>
                <div className="adm-review-top">
                  <b>{d.customer} · {d.therapist}</b>
                  <StatusPill status={d.status} />
                </div>
                <p>{d.reason}</p>
                <div className="adm-dispute-foot">
                  <span>{d.reference} · {d.amount}</span>
                  {d.status !== 'resolved' && <button className="adm-resolve-link" onClick={() => resolveDispute(d.reference)}>Mark resolved</button>}
                </div>
              </div>
            ))}
          </>
        )}

        {tab === 'promotions' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
              <button className="btn btn-red" style={{ width: 'auto' }} onClick={() => setShowPromoModal(true)}>+ New code</button>
            </div>
            <div className="adm-promo-grid">
              {promoCodes.map((p) => (
                <div className="adm-promo-card" key={p.code}>
                  <div className="adm-promo-top">
                    <span className="adm-promo-code">{p.code}</span>
                    <span>{p.discount}</span>
                    <label className="adm-switch">
                      <input type="checkbox" checked={p.active} onChange={() => togglePromo(p.code)} />
                      <span className="adm-switch-track" />
                    </label>
                  </div>
                  <p className="adm-promo-desc">{p.description}</p>
                  <div className="adm-progress"><span style={{ width: `${Math.min(100, (p.used / p.limit) * 100)}%` }} /></div>
                  <div className="adm-promo-foot">
                    <span>{p.used} of {p.limit} used</span>
                    <span>Expires {p.expires}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'reports' && (
          <div className="adm-report-grid">
            <div className="dash-panel">
              <div className="dash-panel-head"><h3>Bookings this week</h3></div>
              <div className="adm-bar-chart">
                {WEEKLY_BOOKINGS.map((p) => {
                  const max = Math.max(...WEEKLY_BOOKINGS.map((x) => x.value));
                  return (
                    <div className="adm-bar-col" key={p.label}>
                      <span className="adm-bar-val">{p.value}</span>
                      <div className="adm-bar" style={{ height: `${(p.value / max) * 100}%` }} />
                      <span className="adm-bar-label">{p.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="dash-panel">
              <div className="dash-panel-head"><h3>Revenue this week (₦'000)</h3></div>
              <div className="adm-bar-chart">
                {WEEKLY_REVENUE.map((p) => {
                  const max = Math.max(...WEEKLY_REVENUE.map((x) => x.value));
                  return (
                    <div className="adm-bar-col" key={p.label}>
                      <span className="adm-bar-val">{p.value}</span>
                      <div className="adm-bar" style={{ height: `${(p.value / max) * 100}%`, background: 'var(--gold)' }} />
                      <span className="adm-bar-label">{p.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="dash-panel">
              <div className="dash-panel-head"><h3>Top areas</h3></div>
              {TOP_AREAS.map((p) => {
                const max = Math.max(...TOP_AREAS.map((x) => x.value));
                return (
                  <div className="adm-hbar-row" key={p.label}>
                    <div className="adm-hbar-top"><span>{p.label}</span><b>{p.value}</b></div>
                    <div className="adm-hbar-track"><span className="adm-hbar-fill" style={{ width: `${(p.value / max) * 100}%` }} /></div>
                  </div>
                );
              })}
            </div>
            <div className="dash-panel">
              <div className="dash-panel-head"><h3>Top therapists</h3></div>
              {TOP_THERAPISTS.map((p) => {
                const max = Math.max(...TOP_THERAPISTS.map((x) => x.value));
                return (
                  <div className="adm-hbar-row" key={p.label}>
                    <div className="adm-hbar-top"><span>{p.label}</span><b>{p.value}</b></div>
                    <div className="adm-hbar-track"><span className="adm-hbar-fill" style={{ width: `${(p.value / max) * 100}%`, background: 'var(--app-green)' }} /></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {activeBooking && (
        <BookingDetailModal
          booking={activeBooking}
          onClose={() => setActiveBooking(null)}
          onReassign={(name) => reassignBooking(activeBooking.id, name)}
          onCancel={() => cancelBooking(activeBooking.id)}
        />
      )}
      {showPromoModal && (
        <CreatePromoModal
          onClose={() => setShowPromoModal(false)}
          onCreate={(promo) => { setPromoCodes([promo, ...promoCodes]); setShowPromoModal(false); }}
        />
      )}
    </div>
  );
}
