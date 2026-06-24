import contentJson from "../../../webedit/content.json";
const content = contentJson;
// ============================================================
// src/components/ui/SkeletonCard.jsx — Loading skeleton
// ============================================================
export default function SkeletonCard() {
  return <div className="flex flex-col bg-[#141416] rounded-xl overflow-hidden border border-white/6">
      {/* Image skeleton */}
      <div className="aspect-[3/4] animate-shimmer" />
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-2.5 w-16 rounded animate-shimmer" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded animate-shimmer" />
          <div className="h-4 w-3/4 rounded animate-shimmer" />
        </div>
        <div className="h-2 w-24 rounded animate-shimmer" />
        <div className="flex gap-1 pt-1">
          {Array.from({
          length: 4
        }).map((_, i) => <div key={i} className="w-4 h-4 rounded-full animate-shimmer" />)}
        </div>
        <div className="h-5 w-20 rounded animate-shimmer pt-2" />
      </div>
    </div>;
}