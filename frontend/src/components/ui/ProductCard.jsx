// ============================================================
// src/components/ui/ProductCard.jsx
// ============================================================
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const formatCurrency = (amount, currency = 'GBP') =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(amount);

export default function ProductCard({ product, layout = 'grid' }) {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const [hovered, setHovered] = useState(false);
  const isWishlisted = wishlist.includes(product.id);
  const isList = layout === 'list';

  const handleQuickAdd = (e) => {
    e.preventDefault();
    const defaultSize = product.availableSizes[0] ?? 'One Size';
    const defaultColor = product.colorVariants.find(c => c.available)?.name ?? '';
    addToCart(product, defaultSize, defaultColor, 1);
  };

  return (
    <article
      id={`product-card-${product.id}`}
      className={`product-card group relative flex bg-[#141416] rounded-xl overflow-hidden border border-white/6 hover:border-[#c8901a]/25 transition-all duration-400 hover:shadow-xl hover:shadow-black/40 ${
        isList ? 'flex-col sm:flex-row' : 'flex-col'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className={`relative overflow-hidden bg-[#1a1a1e] ${
        isList ? 'aspect-[3/4] sm:aspect-[4/5] sm:w-64 flex-shrink-0' : 'aspect-[3/4]'
      }`}>
        <Link to={`/product/${product.id}`} className="absolute inset-0 block">
          {/* Front image */}
          <img
            src={product.images.front}
            alt={`${product.name} — front view`}
            className="img-front absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
          />
          {/* Back image (swaps on hover via CSS) */}
          <img
            src={product.images.back}
            alt={`${product.name} — back view`}
            className="img-back absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-[#c8901a] text-[#0a0a0c] text-[10px] font-bold tracking-[0.15em] uppercase rounded">
              New
            </span>
          )}
          {product.isBespokeOnly && (
            <span className="px-2.5 py-1 bg-[#f9f6f0] text-[#0a0a0c] text-[10px] font-bold tracking-[0.15em] uppercase rounded">
              Bespoke Only
            </span>
          )}
          {product.comparePrice && (
            <span className="px-2.5 py-1 bg-red-900/80 text-red-200 text-[10px] font-bold tracking-[0.15em] uppercase rounded">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          id={`wishlist-${product.id}`}
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full glass-light flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            className={`transition-colors ${isWishlisted ? 'text-red-400 fill-red-400' : 'text-[#f9f6f0]/60'}`}
          />
        </button>

        {/* Quick actions overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 flex gap-2 p-3 transition-all duration-300 z-10 ${
            hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            id={`quick-add-${product.id}`}
            onClick={handleQuickAdd}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#c8901a] hover:bg-[#dda830] text-[#0a0a0c] text-xs font-bold tracking-[0.1em] uppercase rounded transition-colors cursor-pointer"
          >
            <ShoppingBag size={13} />
            Quick Add
          </button>
          <Link
            to={`/product/${product.id}`}
            id={`view-product-${product.id}`}
            className="flex items-center justify-center w-10 h-10 bg-[#f9f6f0]/10 hover:bg-[#f9f6f0]/20 rounded backdrop-blur-sm transition-colors"
            aria-label="View product"
          >
            <Eye size={15} className="text-[#f9f6f0]" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 p-4 ${isList ? 'sm:p-6 sm:justify-center' : ''}`}>
        {/* Category & tags */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#c8901a]/70">
            {product.category}
          </span>
          {product.tags.slice(0, 1).map(tag => (
            <span key={tag} className="text-[10px] text-[#f9f6f0]/30 tracking-wider">
              · {tag}
            </span>
          ))}
        </div>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-base font-medium text-[#f9f6f0] leading-snug hover:text-[#c8901a] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* SKU — monospace */}
        <p className="font-mono text-[10px] text-[#f9f6f0]/25 mt-1 tracking-widest">
          {product.sku}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-xs ${i < Math.floor(product.rating) ? 'text-[#c8901a]' : 'text-[#f9f6f0]/15'}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-[#f9f6f0]/35">({product.reviewCount})</span>
        </div>

        {/* Color dots */}
        <div className="flex items-center gap-1.5 mt-3">
          {product.colorVariants.slice(0, 4).map((c) => (
            <div
              key={c.name}
              title={c.name}
              className={`w-4 h-4 rounded-full border-2 transition-transform hover:scale-110 ${
                c.available ? 'border-white/20 cursor-pointer' : 'border-white/8 opacity-30 cursor-not-allowed'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
          {product.colorVariants.length > 4 && (
            <span className="text-[10px] text-[#f9f6f0]/30">+{product.colorVariants.length - 4}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-auto pt-4">
          <span className="font-semibold text-base text-[#f9f6f0]">
            {formatCurrency(product.price, product.currency)}
          </span>
          {product.comparePrice && (
            <span className="text-sm text-[#f9f6f0]/30 line-through">
              {formatCurrency(product.comparePrice, product.currency)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
