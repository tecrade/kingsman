// ============================================================
// src/pages/ProductDetailPage.jsx — Detail View with tabs, variants, accordion
// ============================================================
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Shield, Truck, RotateCcw, Star, Plus, Minus, ChevronDown, ChevronUp, Ruler, Scissors, Package } from 'lucide-react';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ui/ProductCard';
import contentJson from "../../webedit/content.json";
const content = contentJson;
const formatCurrency = (amount, currency = 'GBP') => new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency
}).format(amount);

// ── Tab content ────────────────────────────────────────────
const SizingGuide = () => <div className="py-6 space-y-5">
    <p className="text-sm text-[#f9f6f0]/60 font-light leading-relaxed" data-editable="true" data-webedit-id="webedit-430">{content["webedit-430"].value}</p>
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            {['Size', 'Chest (in)', 'Waist (in)', 'Seat (in)', 'Sleeve (in)'].map(h => <th key={h} className="py-3 px-4 text-left font-mono text-[10px] text-[#c8901a] tracking-[0.15em] uppercase">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[['36R', '36–37', '30–31', '38–39', '32.5'], ['38R', '38–39', '32–33', '40–41', '33'], ['40R', '40–41', '34–35', '42–43', '33.5'], ['42R', '42–43', '36–37', '44–45', '34'], ['44R', '44–45', '38–39', '46–47', '34.5']].map((row, i) => <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
              {row.map((cell, j) => <td key={j} className={`py-3 px-4 ${j === 0 ? 'font-mono text-[#c8901a] text-xs' : 'text-[#f9f6f0]/60 text-xs'}`}>
                  {cell}
                </td>)}
            </tr>)}
        </tbody>
      </table>
    </div>
    <p className="text-xs text-[#f9f6f0]/30 font-light italic" data-editable="true" data-webedit-id="webedit-439">{content["webedit-439"].value}</p>
  </div>;
const BespokeCrafting = () => <div className="py-6 space-y-5">
    <p className="text-sm text-[#f9f6f0]/60 font-light leading-relaxed" data-editable="true" data-webedit-id="webedit-441">{content["webedit-441"].value}</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[{
      step: '01',
      title: 'First Consultation',
      desc: 'We discuss your requirements, lifestyle, and aesthetic vision. Fabrics are selected from our archive of over 3,000 cloth swatches.'
    }, {
      step: '02',
      title: 'Pattern & Toile',
      desc: 'Your personal pattern is drafted and a toile (canvas mock-up) is constructed for the first fitting. Adjustments are made until the fit is flawless.'
    }, {
      step: '03',
      title: 'Final Delivery',
      desc: 'The completed garment arrives at your door, wrapped in tissue paper within a monogrammed Kingsman box — or collected in person at our atelier.'
    }].map(item => <div key={item.step} className="p-5 bg-[#1a1a1e] rounded-xl border border-white/6">
          <p className="font-mono text-2xl font-bold text-[#c8901a]/40 mb-3">{item.step}</p>
          <h4 className="font-serif text-base font-semibold text-[#f9f6f0] mb-2">{item.title}</h4>
          <p className="text-xs text-[#f9f6f0]/50 font-light leading-relaxed">{item.desc}</p>
        </div>)}
    </div>
  </div>;
const ShippingMatrix = ({
  product
}) => <div className="py-6 space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Object.entries(product.deliveryInfo).map(([key, value]) => <div key={key} className="flex items-start gap-4 p-4 bg-[#1a1a1e] rounded-xl border border-white/6">
          <div className="w-9 h-9 rounded-full bg-[#c8901a]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Truck size={16} className="text-[#c8901a]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#f9f6f0] tracking-wide capitalize" data-editable="true" data-webedit-id="webedit-453">{key}{content["webedit-453"].value}</p>
            <p className="text-sm text-[#c8901a] font-medium mt-0.5">{value}</p>
          </div>
        </div>)}
    </div>
    <div className="p-4 border border-[#c8901a]/15 rounded-xl bg-[#c8901a]/4">
      <p className="text-xs text-[#f9f6f0]/50 font-light leading-relaxed" data-editable="true" data-webedit-id="webedit-456">{content["webedit-456"].value}</p>
    </div>
  </div>;

// ── Accordion item ─────────────────────────────────────────
function AccordionItem({
  title,
  icon: Icon,
  children,
  isOpen,
  onToggle,
  id
}) {
  return <div className="border-b border-white/8">
      <button id={id} onClick={onToggle} className="flex items-center justify-between w-full py-4 text-left group" aria-expanded={isOpen}>
        <div className="flex items-center gap-3">
          <Icon size={16} className={`transition-colors ${isOpen ? 'text-[#c8901a]' : 'text-[#f9f6f0]/40 group-hover:text-[#f9f6f0]/60'}`} />
          <span className={`font-serif text-sm font-semibold tracking-wide transition-colors ${isOpen ? 'text-[#c8901a]' : 'text-[#f9f6f0]/80 group-hover:text-[#f9f6f0]'}`}>
            {title}
          </span>
        </div>
        {isOpen ? <ChevronUp size={15} className="text-[#c8901a]" /> : <ChevronDown size={15} className="text-[#f9f6f0]/30 group-hover:text-[#f9f6f0]/60" />}
      </button>
      <div className={`overflow-hidden transition-all duration-350 ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`} style={{
      transition: 'max-height 0.35s ease, opacity 0.25s ease'
    }}>
        {children}
      </div>
    </div>;
}

// ── Tab bar ────────────────────────────────────────────────
const TABS = content["webedit-570"].value;
export default function ProductDetailPage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    addToCart,
    wishlist,
    toggleWishlist,
    setCheckoutOpen,
    setCheckoutType
  } = useApp();
  const product = useMemo(() => products.find(p => p.id === id), [id]);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('sizing');
  const [openAccordion, setOpenAccordion] = useState('sizing');
  const [expanded, setExpanded] = useState(false); // Read More toggle
  const [sizeError, setSizeError] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Auto-select first available color
  useEffect(() => {
    if (product) {
      const firstAvailable = product.colorVariants.find(c => c.available);
      setSelectedColor(firstAvailable?.name ?? null);
      setActiveImage(0);
    }
  }, [product]);

  // Navigate to 404 if not found
  useEffect(() => {
    if (!product) navigate('/shop', {
      replace: true
    });
  }, [product, navigate]);
  if (!product) return null;
  const isWishlisted = wishlist.includes(product.id);
  const handleAddToCart = () => {
    if (product.isBespokeOnly) {
      setCheckoutType('consultation');
      setCheckoutOpen(true);
      return;
    }
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addToCart(product, selectedSize, selectedColor ?? 'Standard', quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2500);
  };
  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  // Price computation including luxury surcharge (explicit calculation)
  const priceBreakdown = {
    base: product.price,
    surcharge: Math.round(product.price * product.luxurySurchargeRate * 100) / 100,
    vat: Math.round(product.price * 0.20 * 100) / 100,
    total: Math.round(product.price * (1 + product.luxurySurchargeRate + 0.20) * 100) / 100
  };
  return <main id="product-detail-page" className="min-h-screen bg-[#0a0a0c] pt-20 pb-24">
      {/* Breadcrumb */}
      <div className="max-w-screen-xl mx-auto px-6 py-5">
        <nav className="flex items-center gap-2 text-xs text-[#f9f6f0]/30" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#c8901a] transition-colors" data-editable="true" data-webedit-id="webedit-467">{content["webedit-467"].value}</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-[#c8901a] transition-colors" data-editable="true" data-webedit-id="webedit-469">{content["webedit-469"].value}</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#c8901a] transition-colors">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-[#f9f6f0]/60 truncate max-w-[160px]">{product.shortName}</span>
        </nav>
      </div>

      <div className="max-w-screen-xl mx-auto px-6">
        {/* ── Product Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* ── Left: Image Gallery ── */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#1a1a1e] zoom-img">
              <img src={product.images.gallery[activeImage] ?? product.images.front} alt={`${product.name} — view ${activeImage + 1}`} className="w-full h-full object-cover object-center" />
              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <span className="px-3 py-1.5 bg-[#c8901a] text-[#0a0a0c] text-[10px] font-bold tracking-[0.15em] uppercase rounded-full" data-editable="true" data-webedit-id="webedit-480">{content["webedit-480"].value}</span>}
                {product.isBespokeOnly && <span className="px-3 py-1.5 bg-[#f9f6f0] text-[#0a0a0c] text-[10px] font-bold tracking-[0.15em] uppercase rounded-full" data-editable="true" data-webedit-id="webedit-481">{content["webedit-481"].value}</span>}
              </div>
              {/* Prev / Next on image */}
              {product.images.gallery.length > 1 && <>
                  <button id="gallery-prev" onClick={() => setActiveImage(i => (i - 1 + product.images.gallery.length) % product.images.gallery.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-light flex items-center justify-center text-[#f9f6f0]/70 hover:text-[#f9f6f0] transition-colors" aria-label="Previous image">
                    <ChevronLeft size={16} />
                  </button>
                  <button id="gallery-next" onClick={() => setActiveImage(i => (i + 1) % product.images.gallery.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-light flex items-center justify-center text-[#f9f6f0]/70 hover:text-[#f9f6f0] transition-colors" aria-label="Next image">
                    <ChevronRight size={16} />
                  </button>
                </>}
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.gallery.map((img, i) => <button key={i} id={`gallery-thumb-${i}`} onClick={() => setActiveImage(i)} className={`flex-shrink-0 w-20 h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 ${i === activeImage ? 'border-[#c8901a]' : 'border-transparent opacity-50 hover:opacity-80'}`} aria-label={`View image ${i + 1}`}>
                  <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover object-center" />
                </button>)}
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div className="space-y-6">
            {/* Category + SKU */}
            <div className="flex items-center justify-between">
              <Link to={`/shop?category=${product.category}`} className="font-mono text-[10px] text-[#c8901a] tracking-[0.3em] uppercase hover:text-[#dda830] transition-colors">
                {product.category}
              </Link>
              <span className="font-mono text-[10px] text-[#f9f6f0]/25 tracking-widest">{product.sku}</span>
            </div>

            {/* Name */}
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#f9f6f0] leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({
                length: 5
              }).map((_, i) => <Star key={i} size={15} className={i < Math.floor(product.rating) ? 'text-[#c8901a] fill-[#c8901a]' : 'text-[#f9f6f0]/15'} />)}
              </div>
              <span className="text-sm text-[#f9f6f0]/50" data-editable="true" data-webedit-id="webedit-495">
                {product.rating}{content["webedit-495"].value}{product.reviewCount}{content["webedit-495"].value}</span>
            </div>

            {/* Price display with surcharge breakdown */}
            <div className="bg-[#141416] border border-white/6 rounded-xl p-5">
              <div className="flex items-end gap-3 mb-3">
                <span className="font-serif text-3xl font-bold text-[#f9f6f0]">
                  {formatCurrency(product.price, product.currency)}
                </span>
                {product.comparePrice && <span className="text-lg text-[#f9f6f0]/30 line-through mb-0.5">
                    {formatCurrency(product.comparePrice, product.currency)}
                  </span>}
              </div>
              <div className="space-y-1.5 text-xs text-[#f9f6f0]/40 font-light">
                <div className="flex justify-between">
                  <span data-editable="true" data-webedit-id="webedit-502">{content["webedit-502"].value}</span>
                  <span>{formatCurrency(priceBreakdown.base)}</span>
                </div>
                <div className="flex justify-between text-[#c8901a]/60">
                  <span data-editable="true" data-webedit-id="webedit-505">{content["webedit-505"].value}{(product.luxurySurchargeRate * 100).toFixed(0)}{content["webedit-505"].value}</span>
                  <span>{formatCurrency(priceBreakdown.surcharge)}</span>
                </div>
                <div className="flex justify-between">
                  <span data-editable="true" data-webedit-id="webedit-508">{content["webedit-508"].value}</span>
                  <span>{formatCurrency(priceBreakdown.vat)}</span>
                </div>
                <div className="flex justify-between font-semibold text-[#f9f6f0]/70 pt-1.5 border-t border-white/6">
                  <span data-editable="true" data-webedit-id="webedit-511">{content["webedit-511"].value}</span>
                  <span>{formatCurrency(priceBreakdown.total)}</span>
                </div>
              </div>
            </div>

            {/* Description with Read More */}
            <div>
              <p className={`text-sm text-[#f9f6f0]/60 font-light leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
                {product.description}
                {expanded && <span className="block mt-3 text-[#f9f6f0]/50">{product.longDescription}</span>}
              </p>
              <button id="read-more-toggle" onClick={() => setExpanded(prev => !prev)} className="mt-2 text-xs text-[#c8901a] hover:text-[#dda830] transition-colors font-medium tracking-wide">
                {expanded ? 'Read Less ↑' : 'Read More ↓'}
              </button>
            </div>

            {/* Color Variant Selectors */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[#f9f6f0] tracking-wide" data-editable="true" data-webedit-id="webedit-518">{content["webedit-518"].value}{' '}
                  <span className="text-[#c8901a] font-normal">{selectedColor ?? 'Select'}</span>
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {product.colorVariants.map(color => <button key={color.name} id={`color-${color.name.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => color.available && setSelectedColor(color.name)} disabled={!color.available} title={color.name} aria-label={`Select colour: ${color.name}${!color.available ? ' (unavailable)' : ''}`} className={`relative w-9 h-9 rounded-full border-2 transition-all duration-200 ${!color.available ? 'opacity-25 cursor-not-allowed' : selectedColor === color.name ? 'border-[#c8901a] ring-4 ring-[#c8901a]/20 scale-110' : 'border-white/20 hover:border-white/50 hover:scale-105'}`} style={{
                backgroundColor: color.hex
              }}>
                    {!color.available && <span className="absolute inset-0 flex items-center justify-center">
                        <span className="block w-full h-px bg-white/40 rotate-45" />
                      </span>}
                  </button>)}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className={`text-sm font-semibold tracking-wide transition-colors ${sizeError ? 'text-red-400' : 'text-[#f9f6f0]'}`}>
                  {sizeError ? '⚠ Please select a size' : `Size: ${selectedSize ?? 'Select'}`}
                </p>
                <button id="size-guide-link" onClick={() => setActiveTab('sizing')} className="text-xs text-[#c8901a]/70 hover:text-[#c8901a] transition-colors" data-editable="true" data-webedit-id="size-guide-link">{content["size-guide-link"].value}</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map(size => <button key={size} id={`size-${size.replace(/['"]/g, '').replace(/\s+/g, '-')}`} onClick={() => setSelectedSize(size)} className={`min-w-[48px] px-3 py-2 rounded-lg text-xs font-mono font-medium tracking-wider border transition-all duration-200 ${selectedSize === size ? 'bg-[#c8901a] text-[#0a0a0c] border-[#c8901a]' : 'border-white/12 text-[#f9f6f0]/60 hover:border-[#c8901a]/40 hover:text-[#f9f6f0]'}`}>
                    {size}
                  </button>)}
              </div>
            </div>

            {/* Quantity + CTA */}
            <div className="flex gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-white/12 rounded-xl overflow-hidden">
                <button id="qty-decrease" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-11 h-12 flex items-center justify-center text-[#f9f6f0]/50 hover:text-[#f9f6f0] hover:bg-white/5 transition-colors" aria-label="Decrease quantity">
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-medium text-[#f9f6f0] text-sm">{quantity}</span>
                <button id="qty-increase" onClick={() => setQuantity(q => q + 1)} className="w-11 h-12 flex items-center justify-center text-[#f9f6f0]/50 hover:text-[#f9f6f0] hover:bg-white/5 transition-colors" aria-label="Increase quantity">
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Cart */}
              <button id="add-to-cart-btn" onClick={handleAddToCart} className={`flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-sm tracking-[0.12em] uppercase transition-all duration-300 ${addedFeedback ? 'bg-green-600 text-white' : sizeError ? 'bg-red-900/50 border border-red-800 text-red-300' : 'bg-[#c8901a] hover:bg-[#dda830] text-[#0a0a0c]'}`}>
                <ShoppingBag size={16} />
                {addedFeedback ? 'Added to Cart ✓' : product.isBespokeOnly ? 'Request Bespoke' : 'Add to Selection'}
              </button>

              {/* Wishlist */}
              <button id="wishlist-detail-btn" onClick={() => toggleWishlist(product.id)} className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-200 ${isWishlisted ? 'border-red-500/40 bg-red-900/20 text-red-400' : 'border-white/12 text-[#f9f6f0]/50 hover:border-[#c8901a]/40 hover:text-[#c8901a]'}`} aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
                <Heart size={16} className={isWishlisted ? 'fill-red-400' : ''} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[{
              icon: Shield,
              label: 'Authenticity Guaranteed'
            }, {
              icon: Truck,
              label: 'Insured Delivery'
            }, {
              icon: RotateCcw,
              label: '28-Day Returns'
            }].map(({
              icon: Icon,
              label
            }) => <div key={label} className="flex flex-col items-center gap-2 p-3 bg-[#141416] rounded-xl border border-white/5 text-center">
                  <Icon size={16} className="text-[#c8901a]" />
                  <span className="text-[10px] text-[#f9f6f0]/40 font-light leading-tight">{label}</span>
                </div>)}
            </div>

            {/* Fabric Composition — key-value map rendering */}
            <div className="bg-[#141416] rounded-xl border border-white/6 overflow-hidden">
              <div className="px-5 py-4 border-b border-white/6">
                <p className="font-serif text-sm font-semibold text-[#f9f6f0] tracking-wide" data-editable="true" data-webedit-id="webedit-542">{content["webedit-542"].value}</p>
              </div>
              <div className="px-5 py-4 space-y-2">
                {Object.entries(product.fabricComposition).map(([key, value]) => <div key={key} className="flex justify-between gap-4 text-xs">
                    <span className="text-[#f9f6f0]/40 font-light flex-shrink-0">{key}</span>
                    <span className="text-[#f9f6f0]/70 text-right font-light">{value}</span>
                  </div>)}
              </div>
            </div>
          </div>
        </div>

        {/* ── Tab / Accordion Hub ── */}
        <div className="mt-20">
          <div className="border-b border-white/8 mb-0">
            <div className="flex gap-0 overflow-x-auto" data-editable="true" data-webedit-id="webedit-570">
              {TABS.map(tab => <button key={tab.id} id={`tab-${tab.id}`} onClick={() => {
              setActiveTab(tab.id);
              setOpenAccordion(tab.id);
            }} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium tracking-wide border-b-2 transition-all duration-200 whitespace-nowrap ${activeTab === tab.id ? 'border-[#c8901a] text-[#c8901a]' : 'border-transparent text-[#f9f6f0]/40 hover:text-[#f9f6f0]/70'}`} aria-selected={activeTab === tab.id} role="tab">
                  <tab.icon size={14} />
                  {tab.label}
                </button>)}
            </div>
          </div>

          {/* Tab content panel */}
          <div role="tabpanel" className="mt-0">
            {activeTab === 'sizing' && <SizingGuide />}
            {activeTab === 'bespoke' && <BespokeCrafting />}
            {activeTab === 'shipping' && <ShippingMatrix product={product} />}
          </div>

          {/* Accordion (mirrors tabs — alternate UX for same content) */}
          <div className="mt-12 border-t border-white/6 pt-6">
            <p className="font-mono text-[10px] text-[#f9f6f0]/20 tracking-[0.3em] uppercase mb-4" data-editable="true" data-webedit-id="webedit-557">{content["webedit-557"].value}</p>
            <AccordionItem id="accordion-sizing" title="Sizing Guide" icon={Ruler} isOpen={openAccordion === 'sizing'} onToggle={() => setOpenAccordion(p => p === 'sizing' ? null : 'sizing')}>
              <SizingGuide />
            </AccordionItem>
            <AccordionItem id="accordion-bespoke" title="Bespoke Crafting Process" icon={Scissors} isOpen={openAccordion === 'bespoke'} onToggle={() => setOpenAccordion(p => p === 'bespoke' ? null : 'bespoke')}>
              <BespokeCrafting />
            </AccordionItem>
            <AccordionItem id="accordion-shipping" title="Shipping & Delivery" icon={Package} isOpen={openAccordion === 'shipping'} onToggle={() => setOpenAccordion(p => p === 'shipping' ? null : 'shipping')}>
              <ShippingMatrix product={product} />
            </AccordionItem>
            <AccordionItem id="accordion-care" title="Care Instructions" icon={Shield} isOpen={openAccordion === 'care'} onToggle={() => setOpenAccordion(p => p === 'care' ? null : 'care')}>
              <div className="py-6">
                <ul className="space-y-3">
                  {product.careInstructions.map((instruction, i) => <li key={i} className="flex items-center gap-3 text-sm text-[#f9f6f0]/60 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8901a] flex-shrink-0" />
                      {instruction}
                    </li>)}
                </ul>
              </div>
            </AccordionItem>
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-[#f9f6f0]" data-editable="true" data-webedit-id="webedit-567">{content["webedit-567"].value}</h2>
              <Link to={`/shop?category=${product.category}`} id="related-view-all" className="text-xs text-[#c8901a] tracking-[0.15em] uppercase hover:text-[#dda830] transition-colors font-medium" data-editable="true" data-webedit-id="related-view-all">{content["related-view-all"].value}</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>}
      </div>
    </main>;
}