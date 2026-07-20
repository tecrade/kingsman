// ============================================================
// src/pages/NotFoundPage.jsx
// ============================================================
import { Link } from 'react-router-dom';
import { Crown, ArrowRight } from 'lucide-react';
import contentJson from "../../webedit/content.json";
const content = contentJson;
export default function NotFoundPage() {
  return <main className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center px-6 text-center">
      <Crown size={48} className="text-[#c8901a] mb-6" fill="#c8901a" strokeWidth={1} />
      <p className="font-mono text-[#c8901a] text-sm tracking-[0.3em] uppercase mb-4" data-editable="true" data-webedit-id="webedit-425">{content["webedit-425"].value}</p>
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#f9f6f0] mb-4" data-editable="true" data-webedit-id="webedit-426">{content["webedit-426"].value}</h1>
      <p className="text-[#f9f6f0]/40 font-light max-w-md mb-8" data-editable="true" data-webedit-id="webedit-427">{content["webedit-427"].value}</p>
      <Link to="/" id="not-found-home-link" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#c8901a] hover:bg-[#dda830] text-[#0a0a0c] font-semibold text-sm tracking-[0.12em] uppercase rounded transition-colors group" data-editable="true" data-webedit-id="not-found-home-link">{content["not-found-home-link"].value}<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </main>;
}