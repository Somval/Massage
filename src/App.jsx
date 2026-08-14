import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import MasseuseDashboard from './pages/MasseuseDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function Shell() {
  const location = useLocation();
  const bare = ['/dashboard', '/login', '/signup', '/admin', '/masseuse', '/forgot-password', '/reset-password'].includes(location.pathname);
  return (
    <>
      {!bare && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['CLIENT']}><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
<Route path="/masseuse" element={<ProtectedRoute allowedRoles={['THERAPIST']}><MasseuseDashboard /></ProtectedRoute>} />
      </Routes>
      {!bare && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Shell />
    </HashRouter>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  if (typeof window !== 'undefined') {
    window.__lastPath = window.__lastPath || '';
    if (window.__lastPath !== pathname) {
      window.__lastPath = pathname;
      window.scrollTo(0, 0);
    }
  }
  return null;
}
