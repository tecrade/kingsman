// ============================================================
// src/components/layout/AnnouncementBanner.jsx
// ============================================================
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AnnouncementBanner() {
  const { announcementVisible, setAnnouncementVisible } = useApp();

  if (!announcementVisible) return null;

  return (
    <div className="relative bg-[#c8901a] text-[#0a0a0c] overflow-hidden">
      <div className="flex items-center overflow-hidden py-2.5">
        {/* Marquee text */}
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-8 px-8 text-xs font-semibold tracking-[0.2em] uppercase">
              <span>Complimentary Shipping on Orders Over £500</span>
              <span className="text-[#0a0a0c]/50">✦</span>
              <span>New Autumn / Winter Collection Now Available</span>
              <span className="text-[#0a0a0c]/50">✦</span>
              <span>Bespoke Consultations — Book at Our Savile Row Atelier</span>
              <span className="text-[#0a0a0c]/50">✦</span>
            </span>
          ))}
        </div>
      </div>
      <button
        id="close-announcement"
        onClick={() => setAnnouncementVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[#0a0a0c]/10 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}
