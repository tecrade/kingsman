// ============================================================
// src/components/home/TestimonialsSection.jsx
// ============================================================
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/products';

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = testimonials[activeIdx];

  return (
    <section id="testimonials" className="py-24 bg-[#0a0a0c] relative overflow-hidden" aria-label="Client Testimonials">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-serif text-[12rem] font-bold text-white/[0.015] whitespace-nowrap">
          KINGSMAN
        </span>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] text-[#c8901a] tracking-[0.35em] uppercase mb-3">
            ✦ Client Testimonials
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#f9f6f0]">
            Voices of Distinction
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-[#141416] border border-[#c8901a]/12 rounded-2xl p-8 md:p-12 text-center">
            {/* Quote icon */}
            <Quote size={40} className="text-[#c8901a]/20 mx-auto mb-6" fill="#c8901a" strokeWidth={0} />

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-[#c8901a] text-lg">★</span>
              ))}
            </div>

            {/* Quote text */}
            <blockquote className="font-serif text-xl md:text-2xl text-[#f9f6f0]/85 leading-relaxed font-light italic mb-8">
              "{active.text}"
            </blockquote>

            {/* Product reference */}
            <p className="font-mono text-[10px] text-[#c8901a] tracking-[0.2em] uppercase mb-6">
              Wearing: {active.product}
            </p>

            {/* Avatar — circle masked */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#c8901a]/30 ring-4 ring-[#c8901a]/5">
                <img
                  src={active.avatar}
                  alt={active.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <p className="font-semibold text-[#f9f6f0] text-sm">{active.name}</p>
                <p className="text-xs text-[#f9f6f0]/40 font-light">{active.title}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              id="testimonial-prev"
              onClick={() => setActiveIdx(i => (i - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-[#f9f6f0]/50 hover:text-[#f9f6f0] hover:border-[#c8901a]/40 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>

            {testimonials.map((t, i) => (
              <button
                key={t.id}
                id={`testimonial-dot-${i}`}
                onClick={() => setActiveIdx(i)}
                aria-label={`View testimonial from ${t.name}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIdx ? 'w-6 h-1.5 bg-[#c8901a]' : 'w-1.5 h-1.5 bg-[#f9f6f0]/20 hover:bg-[#f9f6f0]/40'
                }`}
              />
            ))}

            <button
              id="testimonial-next"
              onClick={() => setActiveIdx(i => (i + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-[#f9f6f0]/50 hover:text-[#f9f6f0] hover:border-[#c8901a]/40 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
