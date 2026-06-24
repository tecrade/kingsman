// ============================================================
// src/context/AppContext.jsx — Global state via Context API
// ============================================================
import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import contentJson from "../../webedit/content.json";
const content = contentJson;
const AppContext = createContext(null);
export function AppProvider({
  children
}) {
  // Announcement banner
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Mobile nav drawer
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState([]);

  // Checkout / Booking modal state
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutType, setCheckoutType] = useState('cart'); // 'cart' | 'consultation'

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Add to cart
  const addToCart = useCallback((product, size, color, quantity = 1) => {
    setCartItems(prev => {
      const key = `${product.id}-${size}-${color}`;
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i => i.key === key ? {
          ...i,
          quantity: i.quantity + quantity
        } : i);
      }
      return [...prev, {
        key,
        product,
        size,
        color,
        quantity
      }];
    });
    setCartOpen(true);
  }, []);

  // Remove from cart
  const removeFromCart = useCallback(key => {
    setCartItems(prev => prev.filter(i => i.key !== key));
  }, []);

  // Update quantity
  const updateQty = useCallback((key, delta) => {
    setCartItems(prev => prev.map(i => i.key === key ? {
      ...i,
      quantity: Math.max(1, i.quantity + delta)
    } : i));
  }, []);

  // Toggle wishlist
  const toggleWishlist = useCallback(productId => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  }, []);

  // Computed cart totals with luxury surcharge via useMemo
  const cartTotals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
    const luxurySurcharge = cartItems.reduce((sum, item) => {
      return sum + item.product.price * item.product.luxurySurchargeRate * item.quantity;
    }, 0);
    const vat = subtotal * 0.20;
    const total = subtotal + luxurySurcharge + vat;
    return {
      subtotal,
      luxurySurcharge,
      vat,
      total
    };
  }, [cartItems]);
  const cartCount = useMemo(() => cartItems.reduce((sum, i) => sum + i.quantity, 0), [cartItems]);
  const value = {
    announcementVisible,
    setAnnouncementVisible,
    cartItems,
    cartOpen,
    setCartOpen,
    addToCart,
    removeFromCart,
    updateQty,
    cartTotals,
    cartCount,
    mobileNavOpen,
    setMobileNavOpen,
    wishlist,
    toggleWishlist,
    checkoutOpen,
    setCheckoutOpen,
    checkoutType,
    setCheckoutType,
    clearCart
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}