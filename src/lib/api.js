// Small fetch wrapper for talking to the MNN backend.
// Reads the API base URL from the website's .env (VITE_API_URL).
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const TOKEN_KEY = 'mnn_access_token';
const REFRESH_KEY = 'mnn_refresh_token';
const USER_KEY = 'mnn_user';

export function saveSession({ user, accessToken, refreshToken }) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

// De-dupes concurrent refresh attempts - if five API calls all hit a
// 401 at the same moment, they share one refresh instead of racing.
let refreshPromise = null;

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token available');

  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.success === false) {
    throw new Error(body.message || 'Session expired');
  }
  saveSession(body.data);
  return body.data.accessToken;
}

async function request(path, options = {}, _isRetry = false) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(getAccessToken() ? { Authorization: `Bearer ${getAccessToken()}` } : {}),
      ...options.headers,
    },
  });

  // Access token expired - silently refresh once, then retry the original
  // request with the new token. The refresh call itself is never retried
  // this way, so a genuinely dead refresh token can't loop forever.
  if (res.status === 401 && !_isRetry && path !== '/auth/refresh') {
    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => { refreshPromise = null; });
      }
      await refreshPromise;
      return request(path, options, true);
    } catch {
      clearSession();
      window.location.hash = '#/login';
      throw new Error('Your session expired - please log in again.');
    }
  }

  const body = await res.json().catch(() => ({}));

  if (!res.ok || body.success === false) {
    throw new Error(body.message || 'Something went wrong. Please try again.');
  }

  return body.data;
}

export function login({ email, password }) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export function register({ firstName, lastName, email, phone, password, role = 'client' }) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, phone, password, role }),
  });
}

// Where to send someone right after login/signup, based on their role.
export function routeForRole(role) {
  if (role === 'ADMIN') return '/admin';
  if (role === 'THERAPIST') return '/masseuse';
  return '/dashboard';
}

export function getWalletBalance() {
  return request('/wallet/balance');
}

export function getServices() {
  return request('/services');
}

export function getBookings() {
  return request('/bookings');
}

export function createBookingRequest(payload) {
  return request('/bookings', { method: 'POST', body: JSON.stringify(payload) });
}

export function getAdminUsers() {
  return request('/admin/users?role=client');
}

export function setUserStatusAdmin(userId, status) {
  return request(`/admin/users/${userId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
}
export function getAdminSummary() {
  return request('/admin/reports/summary');
}

export function getAdminBookings() {
  return request('/admin/bookings');
}

export function getAdminTherapists() {
  return request('/admin/therapists');
}

export function setTherapistApprovalAdmin(profileId, approvalStatus) {
  return request(`/admin/therapists/${profileId}/approval`, { method: 'PATCH', body: JSON.stringify({ approvalStatus }) });
}
export function topUpWallet(amount, channel) {
  return request('/wallet/top-up', { method: 'POST', body: JSON.stringify({ amount, channel }) });
}

export function sendMoney(recipientEmail, amount) {
  return request('/wallet/send', { method: 'POST', body: JSON.stringify({ recipientEmail, amount }) });
}

export function withdrawWallet(amount) {
  return request('/wallet/withdraw', { method: 'POST', body: JSON.stringify({ amount }) });
}

export function getWalletTransactions() {
  return request('/wallet/transactions');
}
export function toggleBookingFavorite(bookingId) {
  return request(`/bookings/${bookingId}/favorite`, { method: 'PATCH', body: JSON.stringify({}) });
}
export function getConversations() {
  return request('/messages/conversations');
}

export function startConversation(participantId) {
  return request('/messages/conversations', { method: 'POST', body: JSON.stringify({ participantId }) });
}

export function getMessages(conversationId) {
  return request(`/messages/conversations/${conversationId}/messages`);
}

export function sendMessage(conversationId, body) {
  return request(`/messages/conversations/${conversationId}/messages`, { method: 'POST', body: JSON.stringify({ body }) });
}export function getNearbyTherapists() {
  // Fixed reference point (Ikeja, Lagos) for now - same simplification used
  // everywhere else on the site/app until real device geolocation is wired in.
  return request('/bookings/nearby-therapists?lat=6.6018&lng=3.3515&radiusKm=100');
}
export function respondToBooking(bookingId, accept) {
  return request(`/bookings/${bookingId}/respond`, { method: 'POST', body: JSON.stringify({ accept }) });
}

export function updateBookingStatus(bookingId, status) {
  return request(`/bookings/${bookingId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
}

export function setTherapistAvailability(isAvailable) {
  return request('/therapists/me/availability', { method: 'PATCH', body: JSON.stringify({ isAvailable }) });
}

export function getMyTherapistProfile() {
  return request('/therapists/me');
}

export function updateMyTherapistProfile(data) {
  return request('/therapists/me', { method: 'PATCH', body: JSON.stringify(data) });
}

export function updateMyUser(data) {
  return request('/users/me', { method: 'PATCH', body: JSON.stringify(data) });
}
export function updateMyLocation(lat, lng) {
  return request('/therapists/me/location', { method: 'PATCH', body: JSON.stringify({ lat, lng }) });
}
export function initializePaystackTopUp(amount, callbackUrl) {
  return request('/wallet/paystack/initialize', { method: 'POST', body: JSON.stringify({ amount, callbackUrl }) });
}

export function verifyPaystackTopUp(reference) {
  return request('/wallet/paystack/verify', { method: 'POST', body: JSON.stringify({ reference }) });
}