import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoMark from '../images/logo-mark.png';
import chidi from '../images/Chidi.jpeg';
import ada from '../images/Ada.jpg';
import ugo from '../images/ugo.jpg';
import amaka from '../images/Amaka.jpg';
import { clearSession, getCurrentUser, updateMyUser, getAdminSummary, getAdminBookings, getAdminTherapists, setTherapistApprovalAdmin, getAdminUsers, setUserStatusAdmin, register } from '../lib/api';
import './AdminDashboard.css';

const NAV = [
  { key: 'overview',    label: 'Overview',            icon: 'M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z' },
  { key: 'bookings',    label: 'Bookings & scheduling', icon: 'M4 6h16v14H4zM4 10h16M9 3v4M15 3v4' },
  { key: 'therapists',  label: 'Masseuses',            icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0' },
  { key: 'users',       label: 'Users',                icon: 'M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 20a7 7 0 0 1 14 0M17 8a3 3 0 1 1 0 6M22 20a6 6 0 0 0-4.5-5.8' },
  { key: 'support',     label: 'Support inbox',        icon: 'M4 5h16v11H8l-4 4z' },
  { key: 'reviews',     label: 'Reviews & disputes',   icon: 'M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5z' },
  { key: 'promotions',  label: 'Promotions',           icon: 'M20 13 13 20a1.5 1.5 0 0 1-2 0L4 13V4h9zM8 8h.01' },
  // { key: 'reports',     label: 'Reports & analytics',  icon: 'M4 20V10M10 20V4M16 20v-7M4 20h16' },
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

const LAGOS_AREAS = ['Ikeja', 'Yaba', 'Ikoyi', 'Lekki Phase 1', 'Victoria Island', 'Surulere'];

const INITIAL_THERAPIST_ROSTER = [
  { id: 1, name: 'Diana', email: 'diana@massagenownow.com', phone: '+234 801 111 2222', area: 'Ikeja', specialties: 'Swedish · Deep Tissue · Aromatherapy', rating: 4.9, reviews: 128, available: true },
  { id: 2, name: 'Chidi', email: 'chidi@massagenownow.com', phone: '+234 801 234 5678', area: 'Lekki Phase 1', specialties: 'Sports · Hot Stone', rating: 4.8, reviews: 96, available: false },
  { id: 3, name: 'Ada', email: 'ada@massagenownow.com', phone: '+234 802 222 3333', area: 'Yaba', specialties: 'Aromatherapy · Prenatal', rating: 5.0, reviews: 140, available: true },
  { id: 4, name: 'Tolu', email: 'tolu@massagenownow.com', phone: '+234 803 333 4444', area: 'Ikoyi', specialties: 'Deep Tissue', rating: 4.6, reviews: 51, available: false },
  { id: 5, name: 'Femi', email: 'femi@massagenownow.com', phone: '+234 804 444 5555', area: 'Ikoyi', specialties: 'Deep Tissue · Sports', rating: 4.5, reviews: 39, available: false },
];

const INITIAL_USERS = [
  { id: 1, name: 'Amanda O.', email: 'amanda.o@gmail.com', phone: '+234 805 555 1111', joined: '12 Jun 2026', bookings: 6, status: 'active' },
  { id: 2, name: 'Kunle T.', email: 'kunle.t@gmail.com', phone: '+234 806 555 2222', joined: '3 May 2026', bookings: 3, status: 'active' },
  { id: 3, name: 'Ify N.', email: 'ify.n@gmail.com', phone: '+234 807 555 3333', joined: '20 Apr 2026', bookings: 9, status: 'active' },
  { id: 4, name: 'Peter A.', email: 'peter.a@gmail.com', phone: '+234 808 555 4444', joined: '2 Jul 2026', bookings: 1, status: 'suspended' },
];

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
  { customer: 'Kunle T.', therapist: 'Grace', rating: 2.0, comment: 'Masseuse arrived 40 minutes late with no notice.', date: '3 days ago', flagged: true },
  { customer: 'Ify N.', therapist: 'Chidi', rating: 4.5, comment: 'Great sports massage, would book again.', date: '5 days ago', flagged: false },
];

const INITIAL_DISPUTES = [
  { reference: 'MNN-BK-7708821', customer: 'Peter A.', therapist: 'Blessing', reason: 'Masseuse cancelled last minute', amount: '₦22,000', status: 'open' },
  { reference: 'MNN-BK-7719302', customer: 'Kunle T.', therapist: 'Grace', reason: 'Late arrival, requesting partial refund', amount: '₦10,000', status: 'investigating' },
  { reference: 'MNN-BK-7705310', customer: 'Ngozi E.', therapist: 'Tolu', reason: 'Duplicate charge on card', amount: '₦25,000', status: 'resolved' },
];

const TICKETS = [
  { id: 1, customer: 'Peter A.', subject: 'Refund not received', message: 'It has been 5 days since the cancellation, I still have not received my refund.', time: '10 mins ago', status: 'open' },
  { id: 2, customer: 'Ngozi E.', subject: 'App charged me twice', message: 'Can you confirm the second charge was reversed? My bank shows it as pending.', time: '1 hour ago', status: 'pending' },
  { id: 3, customer: 'Sarah K.', subject: 'Masseuse details question', message: 'Thanks for clarifying, all good now!', time: 'Yesterday', status: 'resolved' },
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
          <label>Reassign masseuse</label>
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

function CreateTherapistModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', area: LAGOS_AREAS[0], specialties: '', password: '' });
  const [error, setError] = useState('');
  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || form.password.trim().length < 8) {
      setError('Name, email, and an 8+ character password are required.');
      return;
    }
    onCreate(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <h3>Add a masseuse</h3>
        <p>Creates a new masseuse account. They'll be able to sign in with the email and temporary password below.</p>
        <form onSubmit={submit}>
          <div className="modal-field">
            <label>Full name</label>
            <input type="text" placeholder="e.g. Grace Adeyemi" required value={form.name} onChange={update('name')} />
          </div>
          <div className="modal-row">
            <div className="modal-field">
              <label>Email</label>
              <input type="email" placeholder="name@massagenownow.com" required value={form.email} onChange={update('email')} />
            </div>
            <div className="modal-field">
              <label>Phone</label>
              <input type="tel" placeholder="+234..." value={form.phone} onChange={update('phone')} />
            </div>
          </div>
          <div className="modal-row">
            <div className="modal-field">
              <label>Base area</label>
              <select value={form.area} onChange={update('area')}>
                {LAGOS_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label>Specialties</label>
              <input type="text" placeholder="e.g. Swedish · Hot Stone" value={form.specialties} onChange={update('specialties')} />
            </div>
          </div>
          <div className="modal-field">
            <label>Temporary password</label>
            <input type="text" placeholder="Set a temporary password" value={form.password} onChange={update('password')} />
          </div>
          {error && <p style={{ color: 'var(--red)', fontSize: 12.5, marginBottom: 10 }}>{error}</p>}
          <button type="submit" className="btn btn-red btn-block" style={{ marginTop: 6 }}>Create masseuse account</button>
        </form>
      </div>
    </div>
  );
}

function CreateUserModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || form.password.trim().length < 8) {
      setError('Name, email, and an 8+ character password are required.');
      return;
    }
    onCreate(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <h3>Add a user</h3>
        <p>Creates a new customer account manually — useful for phone or in-person bookings.</p>
        <form onSubmit={submit}>
          <div className="modal-field">
            <label>Full name</label>
            <input type="text" placeholder="e.g. Amanda Okoro" required value={form.name} onChange={update('name')} />
          </div>
          <div className="modal-row">
            <div className="modal-field">
              <label>Email</label>
              <input type="email" placeholder="name@example.com" required value={form.email} onChange={update('email')} />
            </div>
            <div className="modal-field">
              <label>Phone</label>
              <input type="tel" placeholder="+234..." value={form.phone} onChange={update('phone')} />
            </div>
          </div>
          <div className="modal-field">
            <label>Temporary password</label>
            <input type="text" placeholder="Set a temporary password" value={form.password} onChange={update('password')} />
          </div>
          {error && <p style={{ color: 'var(--red)', fontSize: 12.5, marginBottom: 10 }}>{error}</p>}
          <button type="submit" className="btn btn-red btn-block" style={{ marginTop: 6 }}>Create user account</button>
        </form>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
   const navigate = useNavigate();
   const [adminUser, setAdminUser] = useState(getCurrentUser());

   const handleAdminPhotoChange = (e) => {
     const file = e.target.files && e.target.files[0];
     if (!file) return;
     const reader = new FileReader();
     reader.onload = () => {
       updateMyUser({ avatarUrl: reader.result })
         .then((updated) => {
           localStorage.setItem('mnn_user', JSON.stringify(updated));
           setAdminUser(updated);
         })
         .catch((err) => alert(err.message));
     };
     reader.readAsDataURL(file);
   };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  // Bookings & scheduling
  const [bookings, setBookings] = useState([]);
  const [bookingFilter, setBookingFilter] = useState('all');
  const [bookingQuery, setBookingQuery] = useState('');
  const [activeBooking, setActiveBooking] = useState(null);

  // Therapists
  const [therapists, setTherapists] = useState([]);
  const [showAddTherapist, setShowAddTherapist] = useState(false);

  // Users
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);

  // Live summary numbers
  const [summary, setSummary] = useState(null);

  const BOOKING_STATUS_MAP = {
    PENDING_MATCH: 'upcoming', REQUESTED: 'upcoming', ACCEPTED: 'upcoming',
    EN_ROUTE: 'ongoing', IN_PROGRESS: 'ongoing',
    COMPLETED: 'completed',
    CANCELLED_BY_CLIENT: 'cancelled', CANCELLED_BY_THERAPIST: 'cancelled', DECLINED: 'cancelled', EXPIRED: 'cancelled',
  };

  const refreshAdminBookings = () => {
    getAdminBookings().then((items) => {
      setBookings(items.map((b) => ({
        id: b.id,
        reference: b.bookingRef,
        customer: b.client ? `${b.client.firstName} ${b.client.lastName}` : 'Client',
        therapist: b.therapist ? `${b.therapist.firstName} ${b.therapist.lastName}` : 'Unassigned',
        service: b.service?.name || 'Massage',
        date: new Date(b.scheduledStart).toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'short' }),
        time: `${new Date(b.scheduledStart).toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit' })} – ${new Date(b.scheduledEnd).toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit' })}`,
        area: b.locationAddress || '',
        total: `₦${Number(b.total).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`,
        status: BOOKING_STATUS_MAP[b.status] || 'upcoming',
      })));
    }).catch(() => {});
  };

  const refreshAdminTherapists = () => {
    getAdminTherapists().then((items) => {
      setTherapists(items.map((t) => ({
        id: t.id,
        name: t.user ? `${t.user.firstName} ${t.user.lastName}` : 'Masseuse',
        email: t.user?.email || '',
        phone: t.user?.phone || '',
        specialties: Array.isArray(t.specialties) && t.specialties.length ? t.specialties.join(' · ') : 'Not set yet',
        rating: t.ratingAverage,
        reviews: t.ratingCount,
        available: t.isAvailable,
        approvalStatus: t.approvalStatus,
      })));
    }).catch(() => {});
  };

  const refreshAdminUsers = () => {
    getAdminUsers().then((items) => {
      setUsers(items.map((u) => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        phone: u.phone || 'Not provided',
        joined: new Date(u.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: u.status === 'SUSPENDED' ? 'suspended' : 'active',
      })));
    }).catch(() => {});
  };

  useEffect(() => {
    refreshAdminBookings();
    refreshAdminTherapists();
    refreshAdminUsers();
    getAdminSummary().then(setSummary).catch(() => {});
  }, []);

  const setTherapistApproval = (id, approvalStatus) => {
    setTherapistApprovalAdmin(id, approvalStatus).then(refreshAdminTherapists).catch((err) => alert(err.message));
  };

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

  const addTherapist = (form) => {
    const nameParts = form.name.trim().split(' ');
    const specialties = form.specialties.split(/[·,]/).map((s) => s.trim()).filter(Boolean);
    register({
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(' ') || nameParts[0],
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      password: form.password.trim(),
      role: 'therapist',
      specialties: specialties.length ? specialties : undefined,
    })
      .then(() => {
        refreshAdminTherapists();
        setShowAddTherapist(false);
      })
      .catch((err) => alert(err.message));
  };

  const addUser = (form) => {
    const nameParts = form.name.trim().split(' ');
    register({
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(' ') || nameParts[0],
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      password: form.password.trim(),
      role: 'client',
    })
      .then(() => {
        refreshAdminUsers();
        setShowAddUser(false);
      })
      .catch((err) => alert(err.message));
  };

 const toggleUserStatus = (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    const nextStatus = user.status === 'active' ? 'suspended' : 'active';
    setUserStatusAdmin(id, nextStatus).then(refreshAdminUsers).catch((err) => alert(err.message));
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

  const completedCount = summary?.bookingsByStatus?.find((s) => s.status === 'COMPLETED')?.count || 0;
  const STATS = [
    { label: 'Total bookings', value: summary ? String(summary.bookingsByStatus.reduce((sum, s) => sum + s.count, 0)) : '…', trend: '', icon: 'M4 6h16v14H4zM4 10h16M9 3v4M15 3v4' },
    { label: 'Total revenue', value: summary ? `₦${Number(summary.totalRevenue).toLocaleString('en-NG')}` : '…', trend: '', icon: 'M4 7h16v12H4zM4 7V5h13M16 13h3' },
    { label: 'Total masseuses', value: summary ? String(summary.totalTherapists) : '…', trend: '', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0' },
    { label: 'Completed jobs', value: summary ? String(completedCount) : '…', trend: '', icon: 'M5 12l5 5 9-10' },
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
            <label htmlFor="admin-photo-input" style={{ position: 'relative', cursor: 'pointer' }}>
              <div className="dash-user-avatar"><img src={adminUser?.avatarUrl || ada} alt={adminUser ? `${adminUser.firstName} ${adminUser.lastName}` : 'Admin'} /></div>
            </label>
            <input id="admin-photo-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAdminPhotoChange} />
            <div>
              <h5>{adminUser ? `${adminUser.firstName} ${adminUser.lastName}` : 'Admin'}</h5>
              <span>{adminUser?.email}</span>
              <span className="adm-badge-role">Operations admin</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { clearSession(); navigate('/'); }}
            style={{ display: 'block', marginTop: 16, fontSize: 12.5, color: 'rgba(255,255,255,.45)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
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
                {tab === 'overview' && 'Lagos operations, live.'}
                {tab === 'bookings' && 'Every booking across the fleet.'}
                {tab === 'therapists' && 'Manage the masseuse roster and add new accounts.'}
                {tab === 'users' && 'Manage customer accounts.'}
                {tab === 'support' && 'Customer questions and complaints.'}
                {tab === 'reviews' && 'Keep an eye on quality and resolve complaints.'}
                {tab === 'promotions' && 'Discount codes across the app.'}
                {/* {tab === 'reports' && 'How the business is trending this week.'} */}
              </p>
            </div>
          </div>
          <div className="dash-topbar-right">
            {tab === 'bookings' && (
              <div className="adm-search">
                <Icon path="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3" size={16} />
                <input placeholder="Search customer, masseuse, ref..." value={bookingQuery} onChange={(e) => setBookingQuery(e.target.value)} />
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
                    <div className="notif-item"><div className="notif-item-dot" /><div><h5>Maria — new masseuse</h5><p>Submitted ID &amp; certification</p><span>10 mins ago</span></div></div>
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
                <span>Masseuse availability by area, updated in real time</span>
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
                    <tr><th>Customer</th><th>Masseuse</th><th>Date &amp; time</th><th>Area</th><th>Total</th><th>Status</th></tr>
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

        {tab === 'therapists' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
              <button className="btn btn-red" style={{ width: 'auto' }} onClick={() => setShowAddTherapist(true)}>+ Add masseuse</button>
            </div>
            <div className="adm-promo-grid">
              {therapists.map((t) => (
                <div className="adm-promo-card" key={t.id}>
                  <div className="adm-promo-top">
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{t.name}</span>
                    <StatusPill status={t.available ? 'available' : 'busy'} />
                  </div>
                  <p className="adm-promo-desc">{t.specialties}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-mute)', marginBottom: 4 }}>{t.email}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-mute)', marginBottom: 12 }}>{t.phone}</p>
                  <div className="adm-promo-foot">
                    <span>★ {t.rating || '—'} ({t.reviews})</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: t.approvalStatus === 'APPROVED' ? 'var(--app-green)' : t.approvalStatus === 'REJECTED' ? 'var(--red)' : 'var(--text-mute)' }}>{t.approvalStatus}</span>
                  </div>
                  {t.approvalStatus === 'PENDING' && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                      <button className="btn btn-outline-red" style={{ width: 'auto', padding: '6px 14px' }} onClick={() => setTherapistApproval(t.id, 'rejected')}>Reject</button>
                      <button className="btn btn-red" style={{ width: 'auto', padding: '6px 14px' }} onClick={() => setTherapistApproval(t.id, 'approved')}>Approve</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'users' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
              <button className="btn btn-red" style={{ width: 'auto' }} onClick={() => setShowAddUser(true)}>+ Add user</button>
            </div>
            <div className="dash-panel">
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr><th>Name</th><th>Contact</th><th>Joined</th><th>Status</th><th></th></tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td className="adm-cell-person"><b>{u.name}</b><span>{u.email}</span></td>
                        <td>{u.phone}</td>
                        <td>{u.joined}</td>
                        <td><StatusPill status={u.status} /></td>
                        <td>
                          <button className="adm-resolve-link" onClick={() => toggleUserStatus(u.id)}>
                            {u.status === 'active' ? 'Suspend' : 'Reactivate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="adm-card-list">
                {users.map((u) => (
                  <div className="adm-row-card" key={u.id}>
                    <div className="adm-row-card-top">
                      <b>{u.name}</b>
                      <StatusPill status={u.status} />
                    </div>
                    <p>{u.email}</p>
                    <p>{u.phone} · Joined {u.joined}</p>
                    <div className="adm-row-card-foot">
                      <button className="adm-resolve-link" onClick={() => toggleUserStatus(u.id)}>
                        {u.status === 'active' ? 'Suspend' : 'Reactivate'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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

        {/* {tab === 'reports' && (
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
        )} */}
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
      {showAddTherapist && (
        <CreateTherapistModal
          onClose={() => setShowAddTherapist(false)}
          onCreate={addTherapist}
        />
      )}
      {showAddUser && (
        <CreateUserModal
          onClose={() => setShowAddUser(false)}
          onCreate={addUser}
        />
      )}
    </div>
  );
}
