// ============================================================
// src/pages/HomePage.jsx
// ============================================================
import HeroSection from '../components/home/HeroSection';
import ProductCarousel from '../components/home/ProductCarousel';
import LookbookSection from '../components/home/LookbookSection';
import HeritageSection from '../components/home/HeritageSection';
import TestimonialsSection from '../components/home/TestimonialsSection';

export default function HomePage() {
  return (
    <main id="home-page">
      <HeroSection />
      <ProductCarousel />
      <LookbookSection />
      <HeritageSection />
      <TestimonialsSection />
    </main>
  );
}
