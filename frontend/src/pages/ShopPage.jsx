// ============================================================
// src/pages/ShopPage.jsx — Archive / Collections listing
// ============================================================
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, ChevronUp, LayoutGrid, List } from 'lucide-react';
import { products, CATEGORIES, TAGS } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import contentJson from "../../webedit/content.json";
const content = contentJson;
const PRICE_RANGES = content["webedit-631"].value;
const SORT_OPTIONS = content["sort-select"].value;
export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    tags: true,
    price: true
  });

  // Read URL params and set initial filter state
  useEffect(() => {
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    if (category && CATEGORIES.includes(category)) {
      setSelectedCategories([category]);
    } else {
      setSelectedCategories([]);
    }
    if (tag && TAGS.includes(tag)) {
      setSelectedTags([tag]);
    } else {
      setSelectedTags([]);
    }
  }, [searchParams]);

  // Simulate API fetch delay
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, [selectedCategories, selectedTags, selectedPriceRange, sortBy]);

  // Filter and sort via useMemo
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    const q = searchParams.get('q')?.toLowerCase();
    if (q) {
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Tag filter
    if (selectedTags.length > 0) {
      result = result.filter(p => selectedTags.some(t => p.tags.includes(t)));
    }

    // Price filter
    if (selectedPriceRange !== null) {
      const {
        min,
        max
      } = PRICE_RANGES[selectedPriceRange];
      result = result.filter(p => p.price >= min && p.price <= max);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }
    return result;
  }, [products, selectedCategories, selectedTags, selectedPriceRange, sortBy, searchParams]);
  const toggleCategory = cat => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };
  const toggleTag = tag => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedPriceRange(null);
  };
  const hasFilters = selectedCategories.length > 0 || selectedTags.length > 0 || selectedPriceRange !== null;
  const toggleFilterSection = key => {
    setExpandedFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Filter Panel Component (inline for brevity — reused on desktop + mobile)
  const FilterPanel = () => <div className="space-y-6">
      {/* Clear filters */}
      {hasFilters && <button id="clear-filters" onClick={clearAllFilters} className="flex items-center gap-2 text-xs text-[#c8901a] hover:text-[#dda830] transition-colors font-medium tracking-wide" data-editable="true" data-webedit-id="clear-filters">
          <X size={12} />{content["clear-filters"].value}</button>}

      {/* Category */}
      <div>
        <button id="filter-category-toggle" onClick={() => toggleFilterSection('category')} className="flex items-center justify-between w-full text-left mb-3">
          <h3 className="font-serif text-sm font-semibold text-[#f9f6f0] tracking-wide" data-editable="true" data-webedit-id="webedit-574">{content["webedit-574"].value}</h3>
          {expandedFilters.category ? <ChevronUp size={14} className="text-[#f9f6f0]/40" /> : <ChevronDown size={14} className="text-[#f9f6f0]/40" />}
        </button>
        {expandedFilters.category && <div className="space-y-2">
            {CATEGORIES.filter(c => c !== 'All').map(cat => <label key={cat} className="flex items-center gap-3 cursor-pointer group" id={`filter-cat-${cat.toLowerCase()}`}>
                <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} className="w-4 h-4 rounded border-white/20 bg-transparent accent-[#c8901a] cursor-pointer" />
                <span className={`text-sm transition-colors ${selectedCategories.includes(cat) ? 'text-[#c8901a]' : 'text-[#f9f6f0]/60 group-hover:text-[#f9f6f0]'}`}>
                  {cat}
                </span>
              </label>)}
          </div>}
      </div>

      <div className="border-t border-white/6" />

      {/* Tags */}
      <div>
        <button id="filter-tags-toggle" onClick={() => toggleFilterSection('tags')} className="flex items-center justify-between w-full text-left mb-3">
          <h3 className="font-serif text-sm font-semibold text-[#f9f6f0] tracking-wide" data-editable="true" data-webedit-id="webedit-583">{content["webedit-583"].value}</h3>
          {expandedFilters.tags ? <ChevronUp size={14} className="text-[#f9f6f0]/40" /> : <ChevronDown size={14} className="text-[#f9f6f0]/40" />}
        </button>
        {expandedFilters.tags && <div className="flex flex-wrap gap-2">
            {TAGS.map(tag => <button key={tag} id={`filter-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => toggleTag(tag)} className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide border transition-all duration-200 ${selectedTags.includes(tag) ? 'bg-[#c8901a] text-[#0a0a0c] border-[#c8901a]' : 'border-white/12 text-[#f9f6f0]/50 hover:border-[#c8901a]/40 hover:text-[#f9f6f0]'}`}>
                {tag}
              </button>)}
          </div>}
      </div>

      <div className="border-t border-white/6" />

      {/* Price */}
      <div>
        <button id="filter-price-toggle" onClick={() => toggleFilterSection('price')} className="flex items-center justify-between w-full text-left mb-3">
          <h3 className="font-serif text-sm font-semibold text-[#f9f6f0] tracking-wide" data-editable="true" data-webedit-id="webedit-590">{content["webedit-590"].value}</h3>
          {expandedFilters.price ? <ChevronUp size={14} className="text-[#f9f6f0]/40" /> : <ChevronDown size={14} className="text-[#f9f6f0]/40" />}
        </button>
        {expandedFilters.price && <div className="space-y-2" data-editable="true" data-webedit-id="webedit-631">
            {PRICE_RANGES.map((range, i) => <label key={range.label} className="flex items-center gap-3 cursor-pointer group" id={`filter-price-${i}`}>
                <input type="radio" name="price-range" checked={selectedPriceRange === i} onChange={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)} className="w-4 h-4 accent-[#c8901a] cursor-pointer" />
                <span className={`text-sm transition-colors ${selectedPriceRange === i ? 'text-[#c8901a]' : 'text-[#f9f6f0]/60 group-hover:text-[#f9f6f0]'}`}>
                  {range.label}
                </span>
              </label>)}
          </div>}
      </div>
    </div>;
  return <main id="shop-page" className="min-h-screen bg-[#0a0a0c] pt-28 pb-20">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Page header */}
        <div className="mb-10">
          <p className="font-mono text-[10px] text-[#c8901a] tracking-[0.35em] uppercase mb-3" data-editable="true" data-webedit-id="webedit-599">{content["webedit-599"].value}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#f9f6f0] mb-4">
            {selectedCategories.length === 1 ? selectedCategories[0] : 'All Collections'}
          </h1>
          {searchParams.get('q') && <p className="text-sm text-[#f9f6f0]/40 font-light" data-editable="true" data-webedit-id="webedit-601">{content["webedit-601"].value}<span className="text-[#c8901a]" data-editable="true" data-webedit-id="webedit-602">{content["webedit-602"].value}{searchParams.get('q')}{content["webedit-602"].value}</span>
            </p>}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button id="mobile-filter-toggle" onClick={() => setFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 border border-white/12 rounded-lg text-sm text-[#f9f6f0]/70 hover:text-[#f9f6f0] transition-colors" data-editable="true" data-webedit-id="mobile-filter-toggle">
              <SlidersHorizontal size={15} />{content["mobile-filter-toggle"].value}{hasFilters && <span className="w-4 h-4 rounded-full bg-[#c8901a] text-[#0a0a0c] text-[10px] font-bold flex items-center justify-center">
                  {selectedCategories.length + selectedTags.length + (selectedPriceRange !== null ? 1 : 0)}
                </span>}
            </button>
            <p className="text-sm text-[#f9f6f0]/40">
              {loading ? '…' : `${filteredProducts.length} pieces`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <select id="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-[#141416] border border-white/10 text-[#f9f6f0]/70 text-sm px-4 py-2 rounded-lg focus:outline-none focus:border-[#c8901a]/40 cursor-pointer" data-editable="true" data-webedit-id="sort-select">
              {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>

            {/* View mode */}
            <div className="flex border border-white/10 rounded-lg overflow-hidden">
              <button id="view-grid" onClick={() => setViewMode('grid')} className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-[#c8901a]/15 text-[#c8901a]' : 'text-[#f9f6f0]/40 hover:text-[#f9f6f0]'}`} aria-label="Grid view">
                <LayoutGrid size={16} />
              </button>
              <button id="view-list" onClick={() => setViewMode('list')} className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-[#c8901a]/15 text-[#c8901a]' : 'text-[#f9f6f0]/40 hover:text-[#f9f6f0]'}`} aria-label="List view">
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Main layout — dual column */}
        <div className="flex gap-8">
          {/* Left sticky filter pane — desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <FilterPanel />
            </div>
          </aside>

          {/* Right product grid */}
          <div className="flex-1 min-w-0">
            {loading ? <div className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {Array.from({
              length: 6
            }).map((_, i) => <SkeletonCard key={i} />)}
              </div> : filteredProducts.length === 0 ? <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="font-serif text-2xl text-[#f9f6f0]/40 mb-3" data-editable="true" data-webedit-id="webedit-621">{content["webedit-621"].value}</p>
                <p className="text-sm text-[#f9f6f0]/25 font-light" data-editable="true" data-webedit-id="webedit-622">{content["webedit-622"].value}<button onClick={clearAllFilters} className="text-[#c8901a] hover:underline" data-editable="true" data-webedit-id="webedit-623">{content["webedit-623"].value}</button>
                </p>
              </div> : <div className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map(product => <ProductCard key={product.id} product={product} layout={viewMode} />)}
              </div>}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setFilterOpen(false)} aria-hidden="true" />
          <aside id="mobile-filter-drawer" className="fixed left-0 top-0 h-full w-72 z-50 bg-[#0f0f12] border-r border-[#c8901a]/15 px-6 py-6 overflow-y-auto animate-slide-in-left lg:hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-lg font-semibold text-[#f9f6f0]" data-editable="true" data-webedit-id="webedit-628">{content["webedit-628"].value}</h2>
              <button id="mobile-filter-close" onClick={() => setFilterOpen(false)} className="p-2 text-[#f9f6f0]/40 hover:text-[#f9f6f0] transition-colors" aria-label="Close filters">
                <X size={18} />
              </button>
            </div>
            <FilterPanel />
          </aside>
        </>}
    </main>;
}