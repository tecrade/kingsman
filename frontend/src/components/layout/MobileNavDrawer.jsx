// ============================================================
// src/components/layout/MobileNavDrawer.jsx
// ============================================================
import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, Crown, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import contentJson from "../../../webedit/content.json";
const content = contentJson;
const MOBILE_LINKS = content["webedit-342"].value;
export default function MobileNavDrawer() {
  const {
    mobileNavOpen,
    setMobileNavOpen
  } = useApp();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);
  return <>
      {mobileNavOpen && <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden" onClick={() => setMobileNavOpen(false)} aria-hidden="true" />}

      <aside id="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Navigation menu" className={`fixed left-0 top-0 h-full w-72 z-50 flex flex-col bg-[#0f0f12] border-r border-[#c8901a]/15 shadow-2xl shadow-black/60 transition-transform duration-350 ease-in-out lg:hidden ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <Link to="/" onClick={() => setMobileNavOpen(false)} className="flex items-center gap-2">
            <Crown size={22} className="text-[#c8901a]" fill="#c8901a" strokeWidth={1} />
            <span className="font-serif text-lg font-bold tracking-[0.18em] text-[#f9f6f0] uppercase" data-editable="true" data-webedit-id="webedit-332">{content["webedit-332"].value}</span>
          </Link>
          <button id="mobile-nav-close" onClick={() => setMobileNavOpen(false)} className="p-2 text-[#f9f6f0]/40 hover:text-[#f9f6f0] transition-colors" aria-label="Close navigation">
            <X size={18} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-1" data-editable="true" data-webedit-id="webedit-342">
            {MOBILE_LINKS.map(link => <li key={link.label}>
                <NavLink to={link.href} onClick={() => setMobileNavOpen(false)} className={({
              isActive
            }) => `flex items-center justify-between px-4 py-3.5 rounded-lg text-sm font-medium tracking-[0.1em] uppercase transition-colors ${isActive ? 'text-[#c8901a] bg-[#c8901a]/8' : 'text-[#f9f6f0]/70 hover:text-[#f9f6f0] hover:bg-white/5'}`}>
                  {link.label}
                  <ChevronRight size={14} className="opacity-40" />
                </NavLink>
              </li>)}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-white/8">
          <p className="text-[10px] text-[#f9f6f0]/20 tracking-[0.15em] uppercase mb-1" data-editable="true" data-webedit-id="webedit-340">{content["webedit-340"].value}</p>
          <p className="text-xs text-[#f9f6f0]/35 font-light" data-editable="true" data-webedit-id="webedit-341">{content["webedit-341"].value}</p>
        </div>
      </aside>
    </>;
}