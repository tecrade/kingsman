// ============================================================
// src/components/layout/Footer.jsx
// ============================================================
import { Link } from 'react-router-dom';
import { Crown, Globe, Share2, MessageCircle, Mail } from 'lucide-react';
import contentJson from "../../../webedit/content.json";
const content = contentJson;
const FOOTER_LINKS = {
  'Collections': [{
    label: 'New Arrivals',
    href: '/shop?tag=New+Season'
  }, {
    label: 'Suits',
    href: '/shop?category=Suits'
  }, {
    label: 'Outerwear',
    href: '/shop?category=Outerwear'
  }, {
    label: 'Shirts',
    href: '/shop?category=Shirts'
  }, {
    label: 'Accessories',
    href: '/shop?category=Accessories'
  }],
  'Bespoke': [{
    label: 'About Bespoke',
    href: '/shop?category=Bespoke'
  }, {
    label: 'Book Consultation',
    href: '/shop?category=Bespoke'
  }, {
    label: 'Bespoke Archive',
    href: '/shop?tag=Archive'
  }, {
    label: 'Gift a Consultation',
    href: '/shop?category=Bespoke'
  }],
  'Company': [{
    label: 'Our Heritage',
    href: '/#heritage'
  }, {
    label: 'The Atelier',
    href: '/#heritage'
  }, {
    label: 'Careers',
    href: '/'
  }, {
    label: 'Press',
    href: '/'
  }],
  'Client Services': [{
    label: 'Sizing Guide',
    href: '/'
  }, {
    label: 'Care Instructions',
    href: '/'
  }, {
    label: 'Shipping & Returns',
    href: '/'
  }, {
    label: 'Contact Us',
    href: '/'
  }]
};
export default function Footer() {
  return <footer className="bg-[#0a0a0c] border-t border-[#c8901a]/12">
      {/* Main footer */}
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <Crown size={26} className="text-[#c8901a]" fill="#c8901a" strokeWidth={1} />
              <span className="font-serif text-xl font-bold tracking-[0.18em] text-[#f9f6f0] uppercase" data-editable="true" data-webedit-id="webedit-313">{content["webedit-313"].value}</span>
            </Link>
            <p className="text-sm text-[#f9f6f0]/40 leading-relaxed max-w-xs font-light" data-editable="true" data-webedit-id="webedit-314">{content["webedit-314"].value}</p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {[{
              Icon: Globe,
              label: 'Instagram',
              id: 'footer-instagram'
            }, {
              Icon: Share2,
              label: 'Twitter / X',
              id: 'footer-twitter'
            }, {
              Icon: MessageCircle,
              label: 'Facebook',
              id: 'footer-facebook'
            }, {
              Icon: Mail,
              label: 'Email',
              id: 'footer-email'
            }].map(({
              Icon,
              label,
              id
            }) => <button key={id} id={id} aria-label={label} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#f9f6f0]/40 hover:text-[#c8901a] hover:border-[#c8901a]/40 transition-all duration-200">
                  <Icon size={15} />
                </button>)}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => <div key={category}>
              <h3 className="font-serif text-sm font-semibold text-[#f9f6f0] tracking-[0.15em] uppercase mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map(link => <li key={link.label}>
                    <Link to={link.href} className="text-sm text-[#f9f6f0]/40 hover:text-[#c8901a] transition-colors font-light gold-underline">
                      {link.label}
                    </Link>
                  </li>)}
              </ul>
            </div>)}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-6 py-5">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#f9f6f0]/20 tracking-wide" data-editable="true" data-webedit-id="webedit-325">{content["webedit-325"].value}{new Date().getFullYear()}{content["webedit-325"].value}</p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map(item => <button key={item} className="text-xs text-[#f9f6f0]/20 hover:text-[#f9f6f0]/50 transition-colors">
                {item}
              </button>)}
          </div>
        </div>
      </div>
    </footer>;
}