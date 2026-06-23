// ============================================================
// src/components/layout/CheckoutModal.jsx
// ============================================================
import { useState } from 'react';
import { X, Crown, Calendar, MapPin, CreditCard, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const formatCurrency = (amount, currency = 'GBP') =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(amount);

export default function CheckoutModal() {
  const {
    checkoutOpen,
    setCheckoutOpen,
    checkoutType,
    cartItems,
    cartTotals,
    clearCart
  } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postcode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    location: 'London — Savile Row',
    consultationDate: '',
    consultationTime: 'Morning (09:00 - 12:00)'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [errors, setErrors] = useState({});

  if (!checkoutOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email';
    }

    if (checkoutType === 'cart') {
      if (!formData.address.trim()) tempErrors.address = 'Delivery address is required';
      if (!formData.city.trim()) tempErrors.city = 'City is required';
      if (!formData.postcode.trim()) tempErrors.postcode = 'Postcode is required';
      
      const cardNumClean = formData.cardNumber.replace(/\s+/g, '');
      if (!formData.cardNumber.trim()) {
        tempErrors.cardNumber = 'Card number is required';
      } else if (cardNumClean.length < 16) {
        tempErrors.cardNumber = 'Must be a 16-digit card number';
      }

      if (!formData.cardExpiry.trim()) {
        tempErrors.cardExpiry = 'Expiry required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        tempErrors.cardExpiry = 'Format MM/YY';
      }

      if (!formData.cardCvc.trim()) {
        tempErrors.cardCvc = 'CVC required';
      } else if (formData.cardCvc.replace(/\D/g, '').length < 3) {
        tempErrors.cardCvc = '3-4 digits';
      }
    } else {
      if (!formData.consultationDate) {
        tempErrors.consultationDate = 'Please select a date';
      } else {
        const selectedDate = new Date(formData.consultationDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          tempErrors.consultationDate = 'Appointments cannot be in the past';
        }
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate luxury transaction API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const prefix = checkoutType === 'cart' ? 'KS' : 'KBC';
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      setOrderRef(`${prefix}-${randomNum}-2026`);
      
      if (checkoutType === 'cart') {
        clearCart();
      }
    }, 1500);
  };

  const handleClose = () => {
    setCheckoutOpen(false);
    setIsSuccess(false);
    setFormData({
      name: '',
      email: '',
      address: '',
      city: '',
      postcode: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      location: 'London — Savile Row',
      consultationDate: '',
      consultationTime: 'Morning (09:00 - 12:00)'
    });
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-[#141416] border border-[#c8901a]/25 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Crown size={20} className="text-[#c8901a]" fill="#c8901a" strokeWidth={1} />
            <h2 className="font-serif text-lg font-semibold tracking-wider text-[#f9f6f0] uppercase">
              {checkoutType === 'cart' ? 'Kingsman Atelier Checkout' : 'Savile Row Consultation'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-[#f9f6f0]/40 hover:text-[#f9f6f0] transition-colors rounded-lg hover:bg-white/5"
            aria-label="Close atelier checkout"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto px-6 py-6">
          {isSuccess ? (
            /* Success View */
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#c8901a]/15 flex items-center justify-center animate-pulse-gold">
                <Check size={28} className="text-[#c8901a]" strokeWidth={3} />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#f9f6f0]">
                  Thank you, Sir.
                </h3>
                <p className="text-sm text-[#f9f6f0]/50 max-w-md font-light leading-relaxed">
                  {checkoutType === 'cart' 
                    ? 'Your order has been received at our Mayfair atelier. An advisor is preparing your shipment.'
                    : `Your consultation request is registered. A master cutter will contact you within 24 hours to confirm details.`
                  }
                </p>
              </div>

              <div className="bg-[#1a1a1e] border border-white/5 px-6 py-4 rounded-xl space-y-1.5 w-full max-w-sm">
                <p className="text-[10px] font-mono tracking-widest text-[#f9f6f0]/30 uppercase">Reference Number</p>
                <p className="text-base font-mono font-bold text-[#c8901a] tracking-wider">{orderRef}</p>
              </div>

              <button
                onClick={handleClose}
                className="px-8 py-3 bg-[#c8901a] hover:bg-[#dda830] text-[#0a0a0c] font-semibold text-xs tracking-[0.15em] uppercase rounded-xl transition-all duration-300 shadow-lg shadow-black/40"
              >
                Close Atelier
              </button>
            </div>
          ) : (
            /* Form View */
            <form onSubmit={handleSubmit} className="space-y-6">
              {checkoutType === 'cart' && (
                <div className="p-4 bg-[#c8901a]/5 border border-[#c8901a]/15 rounded-xl flex items-start gap-3">
                  <ShieldCheck className="text-[#c8901a] flex-shrink-0 mt-0.5" size={16} />
                  <div className="text-xs font-light text-[#f9f6f0]/60 leading-relaxed">
                    <span className="font-semibold text-[#f9f6f0]">Secured Luxury Dispatch.</span> Your transaction is encrypted. Items will be packaged in signature Kingsman wardrobe cartons with custom wooden hangers.
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Section 1: Customer Details */}
                <div className="space-y-4">
                  <h4 className="font-serif text-sm font-semibold text-[#c8901a] tracking-wide border-b border-white/5 pb-2">
                    1. Contact Information
                  </h4>
                  
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono tracking-wider text-[#f9f6f0]/50 uppercase">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-[#1a1a1e] border text-sm rounded-lg px-4 py-2.5 outline-none transition-colors ${
                        errors.name ? 'border-red-500 text-red-200' : 'border-white/10 focus:border-[#c8901a]/40 text-[#f9f6f0]'
                      }`}
                      placeholder="e.g. Lord Arthur Pendelton"
                    />
                    {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono tracking-wider text-[#f9f6f0]/50 uppercase">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-[#1a1a1e] border text-sm rounded-lg px-4 py-2.5 outline-none transition-colors ${
                        errors.email ? 'border-red-500 text-red-200' : 'border-white/10 focus:border-[#c8901a]/40 text-[#f9f6f0]'
                      }`}
                      placeholder="e.g. arthur@pendelton.co.uk"
                    />
                    {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Section 2: Type Specific details */}
                <div className="space-y-4">
                  {checkoutType === 'cart' ? (
                    <>
                      <h4 className="font-serif text-sm font-semibold text-[#c8901a] tracking-wide border-b border-white/5 pb-2">
                        2. Atelier Delivery Address
                      </h4>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono tracking-wider text-[#f9f6f0]/50 uppercase">Delivery Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`w-full bg-[#1a1a1e] border text-sm rounded-lg px-4 py-2.5 outline-none transition-colors ${
                            errors.address ? 'border-red-500 text-red-200' : 'border-white/10 focus:border-[#c8901a]/40 text-[#f9f6f0]'
                          }`}
                          placeholder="e.g. 11 Savile Row"
                        />
                        {errors.address && <p className="text-[10px] text-red-400 mt-1">{errors.address}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono tracking-wider text-[#f9f6f0]/50 uppercase">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full bg-[#1a1a1e] border text-sm rounded-lg px-4 py-2.5 outline-none transition-colors ${
                              errors.city ? 'border-red-500 text-red-200' : 'border-white/10 focus:border-[#c8901a]/40 text-[#f9f6f0]'
                            }`}
                            placeholder="London"
                          />
                          {errors.city && <p className="text-[10px] text-red-400 mt-1">{errors.city}</p>}
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono tracking-wider text-[#f9f6f0]/50 uppercase">Postcode</label>
                          <input
                            type="text"
                            name="postcode"
                            value={formData.postcode}
                            onChange={handleInputChange}
                            className={`w-full bg-[#1a1a1e] border text-sm rounded-lg px-4 py-2.5 outline-none transition-colors ${
                              errors.postcode ? 'border-red-500 text-red-200' : 'border-white/10 focus:border-[#c8901a]/40 text-[#f9f6f0]'
                            }`}
                            placeholder="W1S 3PG"
                          />
                          {errors.postcode && <p className="text-[10px] text-red-400 mt-1">{errors.postcode}</p>}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4 className="font-serif text-sm font-semibold text-[#c8901a] tracking-wide border-b border-white/5 pb-2">
                        2. Consultation Details
                      </h4>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono tracking-wider text-[#f9f6f0]/50 uppercase flex items-center gap-1">
                          <MapPin size={10} className="text-[#c8901a]" /> Atelier Location
                        </label>
                        <select
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full bg-[#1a1a1e] border border-white/10 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-[#c8901a]/40 text-[#f9f6f0] cursor-pointer"
                        >
                          <option>London — Savile Row</option>
                          <option>New York — Madison Avenue</option>
                          <option>Paris — Rue Saint-Honoré</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono tracking-wider text-[#f9f6f0]/50 uppercase flex items-center gap-1">
                            <Calendar size={10} className="text-[#c8901a]" /> Date
                          </label>
                          <input
                            type="date"
                            name="consultationDate"
                            value={formData.consultationDate}
                            onChange={handleInputChange}
                            className={`w-full bg-[#1a1a1e] border text-sm rounded-lg px-4 py-2.5 outline-none transition-colors cursor-pointer ${
                              errors.consultationDate ? 'border-red-500 text-red-200' : 'border-white/10 focus:border-[#c8901a]/40 text-[#f9f6f0]'
                            }`}
                          />
                          {errors.consultationDate && <p className="text-[10px] text-red-400 mt-1">{errors.consultationDate}</p>}
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono tracking-wider text-[#f9f6f0]/50 uppercase">Time Slot</label>
                          <select
                            name="consultationTime"
                            value={formData.consultationTime}
                            onChange={handleInputChange}
                            className="w-full bg-[#1a1a1e] border border-white/10 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-[#c8901a]/40 text-[#f9f6f0] cursor-pointer"
                          >
                            <option>Morning (09:00 - 12:00)</option>
                            <option>Afternoon (13:00 - 17:00)</option>
                            <option>Evening Slot (17:30 - 19:30)</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Lower Section: Billing or Consultation confirmation */}
              {checkoutType === 'cart' ? (
                <div className="space-y-4 pt-2">
                  <h4 className="font-serif text-sm font-semibold text-[#c8901a] tracking-wide border-b border-white/5 pb-2 flex items-center gap-1.5">
                    <CreditCard size={14} className="text-[#c8901a]" /> 3. Secure Card Payment
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="block text-[10px] font-mono tracking-wider text-[#f9f6f0]/50 uppercase">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                          const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
                          setFormData(prev => ({ ...prev, cardNumber: formatted }));
                          if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: '' }));
                        }}
                        className={`w-full bg-[#1a1a1e] border text-sm rounded-lg px-4 py-2.5 outline-none transition-colors ${
                          errors.cardNumber ? 'border-red-500 text-red-200' : 'border-white/10 focus:border-[#c8901a]/40 text-[#f9f6f0]'
                        }`}
                        placeholder="•••• •••• •••• ••••"
                      />
                      {errors.cardNumber && <p className="text-[10px] text-red-400 mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:col-span-1">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono tracking-wider text-[#f9f6f0]/50 uppercase">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                            if (val.length >= 3) {
                              val = `${val.slice(0, 2)}/${val.slice(2)}`;
                            }
                            setFormData(prev => ({ ...prev, cardExpiry: val }));
                            if (errors.cardExpiry) setErrors(prev => ({ ...prev, cardExpiry: '' }));
                          }}
                          className={`w-full bg-[#1a1a1e] border text-sm rounded-lg px-4 py-2.5 outline-none transition-colors ${
                            errors.cardExpiry ? 'border-red-500 text-red-200' : 'border-white/10 focus:border-[#c8901a]/40 text-[#f9f6f0]'
                          }`}
                          placeholder="MM/YY"
                        />
                        {errors.cardExpiry && <p className="text-[10px] text-red-400 mt-1">{errors.cardExpiry}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono tracking-wider text-[#f9f6f0]/50 uppercase">CVC</label>
                        <input
                          type="password"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                            setFormData(prev => ({ ...prev, cardCvc: val }));
                            if (errors.cardCvc) setErrors(prev => ({ ...prev, cardCvc: '' }));
                          }}
                          className={`w-full bg-[#1a1a1e] border text-sm rounded-lg px-4 py-2.5 outline-none transition-colors ${
                            errors.cardCvc ? 'border-red-500 text-red-200' : 'border-white/10 focus:border-[#c8901a]/40 text-[#f9f6f0]'
                          }`}
                          placeholder="•••"
                        />
                        {errors.cardCvc && <p className="text-[10px] text-red-400 mt-1">{errors.cardCvc}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-[#1a1a1e] border border-white/5 rounded-xl">
                  <p className="text-xs text-[#f9f6f0]/40 font-light leading-relaxed">
                    Note: General bespoke garments require custom drafting and hand-sewing. Fitting consultations are hosted private sessions with our master tailors. There is no charge for the consultation. Pricing is determined post-fitting based on selected fabrics and customizations.
                  </p>
                </div>
              )}

              {/* Sticky Footer Area in Form */}
              <div className="border-t border-white/8 pt-5 mt-6 flex items-center justify-between flex-wrap gap-4">
                {checkoutType === 'cart' ? (
                  <div>
                    <span className="block text-[10px] font-mono tracking-wider text-[#f9f6f0]/40 uppercase">Total Due</span>
                    <span className="font-serif text-xl font-bold text-[#c8901a]">{formatCurrency(cartTotals.total)}</span>
                  </div>
                ) : (
                  <div>
                    <span className="block text-[10px] font-mono tracking-wider text-[#f9f6f0]/40 uppercase font-light">Consultation Cost</span>
                    <span className="font-serif text-xl font-bold text-[#c8901a]">Complimentary</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#c8901a] hover:bg-[#dda830] disabled:bg-[#c8901a]/50 text-[#0a0a0c] font-semibold text-xs tracking-[0.15em] uppercase rounded-xl transition-all duration-300 disabled:cursor-not-allowed group shadow-lg shadow-black/30"
                >
                  {isSubmitting ? (
                    'Contacting Atelier...'
                  ) : checkoutType === 'cart' ? (
                    <>
                      Place Order
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      Book Appointment
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
