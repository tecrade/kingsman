// ============================================================
// src/components/home/ProductCarousel.jsx
// ============================================================
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';
import { products } from '../../data/products';

export default function ProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const VISIBLE = 3;

  const maxIndex = Math.max(0, products.length - VISIBLE);

  const prev = () => setActiveIndex(i => Math.max(0, i - 1));
  const next = () => setActiveIndex(i => Math.min(maxIndex, i + 1));

  // Drag / swipe support
  const handleDragStart = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  };
  const handleDragEnd = (e) => {
    if (!isDragging) return;
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStartX.current;
    const delta = dragStartX.current - endX;
    if (delta > 60) next();
    else if (delta < -60) prev();
    setIsDragging(false);
  };

  return (
    <section id="product-carousel" className="py-20 bg-[#0a0a0c]" aria-label="Featured Products Carousel">
      {/* Section header */}
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-[10px] text-[#c8901a] tracking-[0.35em] uppercase mb-3">
              ✦ Featured Selection
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#f9f6f0]">
              The Kingsman Edit
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="carousel-prev"
              onClick={prev}
              disabled={activeIndex === 0}
              className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-[#f9f6f0]/60 hover:text-[#f9f6f0] hover:border-[#c8901a]/40 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
              aria-label="Previous products"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              id="carousel-next"
              onClick={next}
              disabled={activeIndex === maxIndex}
              className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-[#f9f6f0]/60 hover:text-[#f9f6f0] hover:border-[#c8901a]/40 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
              aria-label="Next products"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div
          className="overflow-hidden"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <div
            className="flex gap-5 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(calc(-${activeIndex} * (33.333% + 20px / 3)))` }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[calc(33.333%-14px)] min-w-[260px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Index indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              id={`carousel-dot-${i}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to position ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-6 h-1.5 bg-[#c8901a]' : 'w-1.5 h-1.5 bg-[#f9f6f0]/20 hover:bg-[#f9f6f0]/40'
              }`}
            />
          ))}
        </div>

        {/* View all CTA */}
        <div className="flex justify-center mt-10">
          <Link
            to="/shop"
            id="carousel-view-all"
            className="inline-flex items-center gap-2 px-8 py-3 border border-[#c8901a]/40 text-[#c8901a] font-medium text-sm tracking-[0.15em] uppercase rounded hover:bg-[#c8901a]/8 transition-colors group"
          >
            View Full Collection
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
