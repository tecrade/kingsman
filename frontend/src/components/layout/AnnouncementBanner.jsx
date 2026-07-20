// ============================================================
// src/components/layout/AnnouncementBanner.jsx
// ============================================================
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import contentJson from "../../../webedit/content.json";
const content = contentJson;
export default function AnnouncementBanner() {
  const {
    announcementVisible,
    setAnnouncementVisible
  } = useApp();
  if (!announcementVisible) return null;
  return <div className="relative bg-[#c8901a] text-[#0a0a0c] overflow-hidden">
      <div className="flex items-center overflow-hidden py-2.5">
        {/* Marquee text */}
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({
          length: 6
        }).map((_, i) => <span key={i} className="inline-flex items-center gap-8 px-8 text-xs font-semibold tracking-[0.2em] uppercase">
              <span data-editable="true" data-webedit-id="webedit-151">{content["webedit-151"].value}</span>
              <span className="text-[#0a0a0c]/50" data-editable="true" data-webedit-id="webedit-152">{content["webedit-152"].value}</span>
              <span data-editable="true" data-webedit-id="webedit-153">{content["webedit-153"].value}</span>
              <span className="text-[#0a0a0c]/50" data-editable="true" data-webedit-id="webedit-154">{content["webedit-154"].value}</span>
              <span data-editable="true" data-webedit-id="webedit-155">{content["webedit-155"].value}</span>
              <span className="text-[#0a0a0c]/50" data-editable="true" data-webedit-id="webedit-156">{content["webedit-156"].value}</span>
            </span>)}
        </div>
      </div>
      <button id="close-announcement" onClick={() => setAnnouncementVisible(false)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[#0a0a0c]/10 transition-colors" aria-label="Dismiss announcement">
        <X size={14} strokeWidth={2.5} />
      </button>
    </div>;
}