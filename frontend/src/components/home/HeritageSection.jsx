// ============================================================
// src/components/home/HeritageSection.jsx
// ============================================================
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const STATS = [
  { value: '1849', label: 'Year Established' },
  { value: '175+', label: 'Years of Heritage' },
  { value: '80+', label: 'Hours Per Garment' },
  { value: '3', label: 'Savile Row Ateliers' },
];

export default function HeritageSection() {
  return (
    <section id="heritage" className="py-24 bg-[#0d0d0f]" aria-label="Our Heritage">
      {/* 50/50 split media block */}
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text */}
          <div>
            <p className="font-mono text-[10px] text-[#c8901a] tracking-[0.35em] uppercase mb-4">
              ✦ Est. London, 1849
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#f9f6f0] leading-tight mb-6">
              Where Tradition<br />
              <span className="italic text-[#c8901a]">Meets Mastery</span>
            </h2>

            {/* Multi-column asymmetric text block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-[#f9f6f0]/50 font-light leading-loose">
              <p>
                Founded in a modest workshop on Savile Row in 1849 by master tailor Edmund Kingsman, 
                our house has dressed statesmen, royalty, and explorers for over 175 years.
              </p>
              <p>
                Every technique is handed down through apprenticeship. Every fabric is selected by 
                hand. Every garment leaves our atelier only when it meets the exacting standards 
                that Edmund himself would recognise.
              </p>
            </div>

            <Link
              to="/shop?category=Bespoke"
              id="heritage-cta"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 border border-[#c8901a]/40 text-[#c8901a] font-medium text-sm tracking-[0.12em] uppercase rounded hover:bg-[#c8901a]/8 transition-colors group"
            >
              Discover Our Story
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Image — semantic img tag (contrasting with Hero's CSS background) */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden zoom-img">
              <img
                src="https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=900&q=85"
                alt="Kingsman artisan at work in the Savile Row atelier"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Floating stat card — absolutely positioned */}
            <div className="absolute -bottom-6 -left-6 glass border border-[#c8901a]/20 rounded-xl px-6 py-4 shadow-xl shadow-black/40">
              <p className="font-mono text-[10px] text-[#c8901a] tracking-widest uppercase mb-1">
                Master Cutters
              </p>
              <p className="font-serif text-3xl font-bold text-[#f9f6f0]">12</p>
              <p className="text-xs text-[#f9f6f0]/40 font-light mt-0.5">
                On Savile Row today
              </p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="text-center py-8 border border-white/6 rounded-xl hover:border-[#c8901a]/25 transition-colors bg-[#141416]/50"
            >
              <p className="font-serif text-4xl font-bold text-[#c8901a] mb-2">{stat.value}</p>
              <p className="text-xs text-[#f9f6f0]/40 tracking-[0.12em] uppercase font-light">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
