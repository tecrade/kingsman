// ============================================================
// src/App.jsx — Root application with routing
// ============================================================
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from './context/AppContext';

// Layout
import AnnouncementBanner from './components/layout/AnnouncementBanner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import MobileNavDrawer from './components/layout/MobileNavDrawer';
import CheckoutModal from './components/layout/CheckoutModal';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll-to-top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

// Inner app — needs router context
function AppInner() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0c]">
      <ScrollToTop />

      {/* Persistent global overlays */}
      <AnnouncementBanner />
      <Navbar />
      <CartDrawer />
      <MobileNavDrawer />
      <CheckoutModal />

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppInner />
      </AppProvider>
    </BrowserRouter>
  );
}
