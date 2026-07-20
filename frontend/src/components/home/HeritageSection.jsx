// ============================================================
// src/components/home/HeritageSection.jsx
// ============================================================
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import contentJson from "../../../webedit/content.json";
const content = contentJson;
const STATS = content["webedit-43"].value;
export default function HeritageSection() {
  return <section id="heritage" className="py-24 bg-[#0d0d0f]" aria-label="Our Heritage">
      {/* 50/50 split media block */}
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text */}
          <div>
            <p className="font-mono text-[10px] text-[#c8901a] tracking-[0.35em] uppercase mb-4" data-editable="true" data-webedit-id="webedit-24">{content["webedit-24"].value}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#f9f6f0] leading-tight mb-6" data-editable="true" data-webedit-id="webedit-25">{content["webedit-25"].value}<br />
              <span className="italic text-[#c8901a]" data-editable="true" data-webedit-id="webedit-27">{content["webedit-27"].value}</span>
            </h2>

            {/* Multi-column asymmetric text block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-[#f9f6f0]/50 font-light leading-loose">
              <p data-editable="true" data-webedit-id="webedit-29">{content["webedit-29"].value}</p>
              <p data-editable="true" data-webedit-id="webedit-30">{content["webedit-30"].value}</p>
            </div>

            <Link to="/shop?category=Bespoke" id="heritage-cta" className="inline-flex items-center gap-2 mt-8 px-6 py-3 border border-[#c8901a]/40 text-[#c8901a] font-medium text-sm tracking-[0.12em] uppercase rounded hover:bg-[#c8901a]/8 transition-colors group" data-editable="true" data-webedit-id="heritage-cta">{content["heritage-cta"].value}<ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Image — semantic img tag (contrasting with Hero's CSS background) */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden zoom-img">
              <img src={content["webedit-34"].src} alt={content["webedit-34"].alt} className="w-full h-full object-cover object-center" data-editable="true" data-webedit-id="webedit-34" />
            </div>
            {/* Floating stat card — absolutely positioned */}
            <div className="absolute -bottom-6 -left-6 glass border border-[#c8901a]/20 rounded-xl px-6 py-4 shadow-xl shadow-black/40">
              <p className="font-mono text-[10px] text-[#c8901a] tracking-widest uppercase mb-1" data-editable="true" data-webedit-id="webedit-36">{content["webedit-36"].value}</p>
              <p className="font-serif text-3xl font-bold text-[#f9f6f0]" data-editable="true" data-webedit-id="webedit-37">{content["webedit-37"].value}</p>
              <p className="text-xs text-[#f9f6f0]/40 font-light mt-0.5" data-editable="true" data-webedit-id="webedit-38">{content["webedit-38"].value}</p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-editable="true" data-webedit-id="webedit-43">
          {STATS.map((stat, i) => <div key={i} className="text-center py-8 border border-white/6 rounded-xl hover:border-[#c8901a]/25 transition-colors bg-[#141416]/50">
              <p className="font-serif text-4xl font-bold text-[#c8901a] mb-2">{stat.value}</p>
              <p className="text-xs text-[#f9f6f0]/40 tracking-[0.12em] uppercase font-light">{stat.label}</p>
            </div>)}
        </div>
      </div>
    </section>;
}