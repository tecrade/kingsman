// ============================================================
// src/components/layout/CartDrawer.jsx
// ============================================================
import { useApp } from '../../context/AppContext';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import contentJson from "../../../webedit/content.json";
const content = contentJson;
const formatCurrency = (amount, currency = 'GBP') => new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency
}).format(amount);
export default function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cartItems,
    removeFromCart,
    updateQty,
    cartTotals,
    setCheckoutOpen,
    setCheckoutType
  } = useApp();
  return <>
      {/* Backdrop */}
      {cartOpen && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} aria-hidden="true" />}

      {/* Drawer */}
      <aside id="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart" className={`fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col bg-[#141416] border-l border-[#c8901a]/15 shadow-2xl shadow-black/60 transition-transform duration-350 ease-in-out ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-[#c8901a]" />
            <h2 className="font-serif text-lg font-semibold text-[#f9f6f0] tracking-wide" data-editable="true" data-webedit-id="webedit-153">{content["webedit-153"].value}</h2>
          </div>
          <button id="cart-close" onClick={() => setCartOpen(false)} className="p-2 text-[#f9f6f0]/50 hover:text-[#f9f6f0] transition-colors rounded-lg hover:bg-white/5" aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6">
          {cartItems.length === 0 ? <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
              <div className="w-16 h-16 rounded-full bg-[#c8901a]/10 flex items-center justify-center">
                <ShoppingBag size={28} className="text-[#c8901a]/60" />
              </div>
              <div>
                <p className="font-serif text-lg text-[#f9f6f0]/60" data-editable="true" data-webedit-id="webedit-160">{content["webedit-160"].value}</p>
                <p className="text-sm text-[#f9f6f0]/30 mt-1 font-light" data-editable="true" data-webedit-id="webedit-161">{content["webedit-161"].value}</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="px-6 py-2.5 border border-[#c8901a]/40 text-[#c8901a] text-sm font-medium tracking-[0.1em] uppercase rounded hover:bg-[#c8901a]/10 transition-colors" data-editable="true" data-webedit-id="webedit-162">{content["webedit-162"].value}</button>
            </div> : <ul className="space-y-5">
              {cartItems.map(item => <li key={item.key} className="flex gap-4 pb-5 border-b border-white/6 group">
                  {/* Product image */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-[#1a1a1e]">
                    <img src={content["webedit-166"].src} alt={content["webedit-166"].alt} className="w-full h-full object-cover object-center" data-editable="true" data-webedit-id="webedit-166" />
                  </div>
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm font-medium text-[#f9f6f0] leading-snug line-clamp-2">
                      {item.product.name}
                    </p>
                    <div className="mt-1 flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] text-[#c8901a]/70 tracking-wider bg-[#c8901a]/8 px-2 py-0.5 rounded">
                        {item.product.sku}
                      </span>
                    </div>
                    <p className="text-xs text-[#f9f6f0]/40 mt-1" data-editable="true" data-webedit-id="webedit-171">{content["webedit-171"].value}{item.size}{content["webedit-171"].value}{item.color}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center gap-1 border border-white/12 rounded">
                        <button id={`qty-minus-${item.key}`} onClick={() => updateQty(item.key, -1)} className="w-7 h-7 flex items-center justify-center text-[#f9f6f0]/60 hover:text-[#f9f6f0] transition-colors" aria-label="Decrease quantity">
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-[#f9f6f0]">
                          {item.quantity}
                        </span>
                        <button id={`qty-plus-${item.key}`} onClick={() => updateQty(item.key, 1)} className="w-7 h-7 flex items-center justify-center text-[#f9f6f0]/60 hover:text-[#f9f6f0] transition-colors" aria-label="Increase quantity">
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-sm text-[#f9f6f0]">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                        <button id={`remove-${item.key}`} onClick={() => removeFromCart(item.key)} className="text-[#f9f6f0]/20 hover:text-red-400 transition-colors" aria-label="Remove item">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>)}
            </ul>}
        </div>

        {/* Footer totals */}
        {cartItems.length > 0 && <div className="border-t border-white/8 px-6 py-5 space-y-3 bg-[#0f0f12]">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#f9f6f0]/60">
                <span data-editable="true" data-webedit-id="webedit-186">{content["webedit-186"].value}</span>
                <span>{formatCurrency(cartTotals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#c8901a]/80">
                <span data-editable="true" data-webedit-id="webedit-189">{content["webedit-189"].value}</span>
                <span>{formatCurrency(cartTotals.luxurySurcharge)}</span>
              </div>
              <div className="flex justify-between text-[#f9f6f0]/60">
                <span data-editable="true" data-webedit-id="webedit-192">{content["webedit-192"].value}</span>
                <span>{formatCurrency(cartTotals.vat)}</span>
              </div>
              <div className="flex justify-between font-semibold text-[#f9f6f0] text-base pt-2 border-t border-white/8">
                <span className="font-serif" data-editable="true" data-webedit-id="webedit-195">{content["webedit-195"].value}</span>
                <span>{formatCurrency(cartTotals.total)}</span>
              </div>
            </div>
            <button id="cart-checkout" onClick={() => {
          setCheckoutType('cart');
          setCartOpen(false);
          setCheckoutOpen(true);
        }} className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#c8901a] hover:bg-[#dda830] text-[#0a0a0c] font-semibold text-sm tracking-[0.12em] uppercase rounded transition-colors duration-200 group" data-editable="true" data-webedit-id="cart-checkout">{content["cart-checkout"].value}<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-xs text-[#f9f6f0]/25 tracking-wide" data-editable="true" data-webedit-id="webedit-198">{content["webedit-198"].value}</p>
          </div>}
      </aside>
    </>;
}