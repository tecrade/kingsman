// ============================================================
// src/components/layout/Navbar.jsx
// ============================================================
import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ChevronDown, Crown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import contentJson from "../../../webedit/content.json";
const content = contentJson;
const NAV_LINKS = content["webedit-356"].value;
export default function Navbar() {
  const {
    cartCount,
    setCartOpen,
    setMobileNavOpen,
    setCheckoutOpen,
    setCheckoutType
  } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Scroll tracking useEffect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search on outside click
  useEffect(() => {
    if (!searchOpen) return;
    const handler = e => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [searchOpen]);
  const handleSearch = e => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-16 lg:h-20">
        {/* Mobile menu toggle */}
        <button id="mobile-menu-toggle" className="lg:hidden text-[#f9f6f0] p-1" onClick={() => setMobileNavOpen(true)} aria-label="Open navigation">
          <Menu size={22} />
        </button>

        {/* Logo */}
        <Link to="/" id="nav-logo" className="flex items-center gap-2.5 group">
          <div className="relative">
            <Crown size={28} className="text-[#c8901a] group-hover:scale-110 transition-transform duration-300" fill="#c8901a" strokeWidth={1} />
          </div>
          <span className="font-serif text-xl lg:text-2xl font-bold tracking-[0.18em] text-[#f9f6f0] uppercase" data-editable="true" data-webedit-id="webedit-339">{content["webedit-339"].value}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" data-editable="true" data-webedit-id="webedit-356">
          {NAV_LINKS.map(link => <div key={link.label} className="relative group" onMouseEnter={() => setActiveDropdown(link.label)} onMouseLeave={() => setActiveDropdown(null)}>
              <NavLink to={link.href} id={`nav-${link.label.toLowerCase()}`} className={({
            isActive
          }) => `flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-[0.12em] uppercase transition-colors duration-200
                  ${isActive ? 'text-[#c8901a]' : 'text-[#f9f6f0]/80 hover:text-[#f9f6f0]'}`}>
                {link.label}
                {link.dropdown && <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
              </NavLink>

              {/* Dropdown */}
              {link.dropdown && <div className={`absolute top-full left-0 w-52 pt-2 transition-all duration-200 ${activeDropdown === link.label ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                  <div className="glass rounded-lg overflow-hidden border border-[#c8901a]/15 shadow-xl shadow-black/40">
                    {link.dropdown.map(item => {
                const isConsultation = item.label === 'Book a Consultation';
                return <Link key={item.label} to={isConsultation ? '#' : item.href} onClick={e => {
                  if (isConsultation) {
                    e.preventDefault();
                    setCheckoutType('consultation');
                    setCheckoutOpen(true);
                  }
                }} className="block px-4 py-3 text-xs font-medium tracking-[0.1em] uppercase text-[#f9f6f0]/70 hover:text-[#c8901a] hover:bg-[#c8901a]/5 transition-colors border-b border-white/5 last:border-0">
                          {item.label}
                        </Link>;
              })}
                  </div>
                </div>}
            </div>)}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            <button id="nav-search-toggle" onClick={() => setSearchOpen(prev => !prev)} className="p-2 text-[#f9f6f0]/80 hover:text-[#c8901a] transition-colors" aria-label="Search">
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            {searchOpen && <form onSubmit={handleSearch} className="absolute right-0 top-full mt-2 w-72 glass rounded-lg border border-[#c8901a]/20 shadow-xl shadow-black/40 overflow-hidden">
                <div className="flex items-center px-4 py-3 gap-3">
                  <Search size={16} className="text-[#c8901a] flex-shrink-0" />
                  <input id="nav-search-input" type="text" placeholder="Search the collection…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} autoFocus className="flex-1 bg-transparent text-[#f9f6f0] placeholder-[#f9f6f0]/30 text-sm outline-none tracking-wide" />
                </div>
              </form>}
          </div>

          {/* Cart */}
          <button id="nav-cart-toggle" onClick={() => setCartOpen(true)} className="relative p-2 text-[#f9f6f0]/80 hover:text-[#c8901a] transition-colors" aria-label="Open cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#c8901a] text-[#0a0a0c] text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-pulse-gold">
                {cartCount}
              </span>}
          </button>
        </div>
      </div>
    </header>;
}