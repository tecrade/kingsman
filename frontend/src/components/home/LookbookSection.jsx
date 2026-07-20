// ============================================================
// src/components/home/LookbookSection.jsx
// ============================================================
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { lookbookEntries } from '../../data/products';
import contentJson from "../../../webedit/content.json";
const content = contentJson;
export default function LookbookSection() {
  const [hoveredId, setHoveredId] = useState(null);
  return <section id="lookbook" className="py-24 bg-[#0d0d0f]" aria-label="Lookbook">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Editorial header — asymmetric typography */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-end">
          <div>
            <p className="font-mono text-[10px] text-[#c8901a] tracking-[0.35em] uppercase mb-4" data-editable="true" data-webedit-id="webedit-76">{content["webedit-76"].value}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#f9f6f0] leading-tight" data-editable="true" data-webedit-id="webedit-77">{content["webedit-77"].value}<br />
              <span className="italic text-[#c8901a]" data-editable="true" data-webedit-id="webedit-79">{content["webedit-79"].value}</span>
            </h2>
          </div>
          <div className="lg:max-w-sm lg:ml-auto">
            {/* Editorial drop-cap paragraph */}
            <p className="drop-cap text-sm text-[#f9f6f0]/50 leading-loose font-light" data-editable="true" data-webedit-id="webedit-81">{content["webedit-81"].value}</p>
          </div>
        </div>

        {/* Asymmetric masonry lookbook grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Large left feature */}
          <div className="lg:col-span-7 relative group zoom-img rounded-xl overflow-hidden cursor-pointer" onMouseEnter={() => setHoveredId(lookbookEntries[0].id)} onMouseLeave={() => setHoveredId(null)}>
            <div className="aspect-[4/5] lg:aspect-auto lg:h-[600px]">
              <img src={lookbookEntries[0].image} alt={lookbookEntries[0].title} className="w-full h-full object-cover object-center" loading="lazy" />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex gap-2 mb-3 flex-wrap">
                {lookbookEntries[0].tags.map(t => <span key={t} className="text-[10px] font-mono text-[#c8901a] tracking-widest uppercase border border-[#c8901a]/30 px-2 py-0.5 rounded">
                    {t}
                  </span>)}
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#f9f6f0] mb-2">
                {lookbookEntries[0].title}
              </h3>
              <p className="text-sm text-[#f9f6f0]/60 font-light leading-relaxed max-w-md">
                {lookbookEntries[0].description}
              </p>
              <Link to="/shop" id={`lookbook-cta-${lookbookEntries[0].id}`} className={`inline-flex items-center gap-2 mt-4 text-xs font-semibold tracking-[0.15em] uppercase text-[#c8901a] transition-all duration-300 ${hoveredId === lookbookEntries[0].id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} data-editable="true" data-webedit-id="webedit-92">{content["webedit-92"].value}<ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right column — 2 stacked */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {lookbookEntries.slice(1).map(entry => <div key={entry.id} className="relative group zoom-img rounded-xl overflow-hidden cursor-pointer flex-1" onMouseEnter={() => setHoveredId(entry.id)} onMouseLeave={() => setHoveredId(null)}>
                <div className="aspect-video lg:aspect-auto lg:h-[285px]">
                  <img src={entry.image} alt={entry.title} className="w-full h-full object-cover object-center" loading="lazy" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-xl font-bold text-[#f9f6f0] mb-1.5">
                    {entry.title}
                  </h3>
                  <p className="text-xs text-[#f9f6f0]/50 font-light leading-relaxed line-clamp-2">
                    {entry.description}
                  </p>
                  <Link to="/shop" id={`lookbook-cta-${entry.id}`} className={`inline-flex items-center gap-2 mt-3 text-[10px] font-semibold tracking-[0.15em] uppercase text-[#c8901a] transition-all duration-300 ${hoveredId === entry.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} data-editable="true" data-webedit-id="webedit-102">{content["webedit-102"].value}<ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}