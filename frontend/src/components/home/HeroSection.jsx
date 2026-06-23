// ============================================================
// src/components/home/HeroSection.jsx
// ============================================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 'hero-1',
    headline: 'The Art of\nBritish Tailoring',
    subheadline: 'Autumn / Winter 2025 Collection',
    body: 'Over 175 years of craft, tradition, and uncompromising excellence. Each garment, a conversation between artisan and cloth.',
    cta: 'Explore the Collection',
    ctaHref: '/shop',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=85',
    accent: 'Suits & Tailoring',
  },
  {
    id: 'hero-2',
    headline: 'Woven from\nScottish Heritage',
    subheadline: 'The Mayfair Overcoat',
    body: 'Harris Tweed, hand-woven in the Outer Hebrides. A coat that carries the weather, the landscape, and the legacy of Scotland.',
    cta: 'Discover Outerwear',
    ctaHref: '/shop?category=Outerwear',
    image: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=1600&q=85',
    accent: 'Outerwear',
  },
  {
    id: 'hero-3',
    headline: 'Yours Alone.\nBespoke.',
    subheadline: 'The Balmoral Consultation',
    body: 'Not every man is built for off-the-peg. Book your consultation at our Savile Row atelier and experience what true luxury means.',
    cta: 'Book a Consultation',
    ctaHref: '/shop?category=Bespoke',
    image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=1600&q=85',
    accent: 'Bespoke',
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const slide = HERO_SLIDES[activeIndex];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setActiveIndex(prev => (prev + 1) % HERO_SLIDES.length);
        setTransitioning(false);
      }, 400);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (idx) => {
    if (idx === activeIndex) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveIndex(idx);
      setTransitioning(false);
    }, 300);
  };

  return (
    <section id="hero" className="relative h-screen min-h-[640px] overflow-hidden" aria-label="Hero section">
      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{ backgroundImage: `url(${slide.image})` }}
        role="img"
        aria-label={slide.headline.replace('\n', ' ')}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/90 via-[#0a0a0c]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/70 via-transparent to-transparent" />

      {/* Gold accent line — absolute positioned design element */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#c8901a] to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-screen-xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            {/* Accent label */}
            <div
              className={`inline-flex items-center gap-3 mb-6 transition-all duration-400 ${
                transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              <div className="w-8 h-px bg-[#c8901a]" />
              <span className="font-mono text-[10px] text-[#c8901a] tracking-[0.35em] uppercase">
                {slide.accent}
              </span>
            </div>

            {/* Headline — serif with whitespace-pre */}
            <h1
              className={`font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[#f9f6f0] leading-tight whitespace-pre-line transition-all duration-400 ${
                transitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: '60ms' }}
            >
              {slide.headline}
            </h1>

            {/* Subheadline */}
            <p
              className={`mt-3 font-serif italic text-lg text-[#c8901a] tracking-wide transition-all duration-400 ${
                transitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: '120ms' }}
            >
              {slide.subheadline}
            </p>

            {/* Body */}
            <p
              className={`mt-5 text-base text-[#f9f6f0]/60 leading-relaxed max-w-md font-light transition-all duration-400 ${
                transitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: '180ms' }}
            >
              {slide.body}
            </p>

            {/* CTAs */}
            <div
              className={`mt-8 flex flex-wrap items-center gap-4 transition-all duration-400 ${
                transitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: '240ms' }}
            >
              <Link
                to={slide.ctaHref}
                id={`hero-cta-${activeIndex}`}
                className="flex items-center gap-2.5 px-7 py-3.5 bg-[#c8901a] hover:bg-[#dda830] text-[#0a0a0c] font-semibold text-sm tracking-[0.12em] uppercase rounded transition-colors duration-200 group"
              >
                {slide.cta}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                id="hero-watch"
                className="flex items-center gap-2.5 px-6 py-3.5 border border-[#f9f6f0]/25 hover:border-[#f9f6f0]/50 text-[#f9f6f0]/80 font-medium text-sm tracking-[0.1em] uppercase rounded transition-all duration-200 backdrop-blur-sm"
              >
                <Play size={14} fill="currentColor" />
                Watch Film
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            id={`hero-dot-${i}`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === activeIndex
                ? 'w-8 h-1.5 bg-[#c8901a]'
                : 'w-1.5 h-1.5 bg-[#f9f6f0]/30 hover:bg-[#f9f6f0]/60'
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 z-10 flex items-center gap-2">
        <span className="font-mono text-xs text-[#c8901a]">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <div className="w-8 h-px bg-[#f9f6f0]/20" />
        <span className="font-mono text-xs text-[#f9f6f0]/30">
          {String(HERO_SLIDES.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
