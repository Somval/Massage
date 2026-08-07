import { Navigate } from 'react-router-dom';
import { getCurrentUser, getAccessToken } from '../lib/api';

// Wrap any route element with this to require login, and optionally a
// specific role. Usage:
//   <ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>
export default function ProtectedRoute({ children, allowedRoles }) {
  const token = getAccessToken();
  const user = getCurrentUser();

  if (!token || !user) {
    // Not logged in at all - send them to log in first.
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in, but as the wrong role (e.g. a client trying /admin) -
    // send them to their own dashboard instead of showing an error page.
    const fallback = user.role === 'ADMIN' ? '/admin' : user.role === 'THERAPIST' ? '/masseuse' : '/dashboard';
    return <Navigate to={fallback} replace />;
  }

  return children;
}