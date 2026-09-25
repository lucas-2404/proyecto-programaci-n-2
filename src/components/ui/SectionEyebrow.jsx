import { cn } from "../../utils/cn";

export default function SectionEyebrow({ children, className }) {
  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      <span className="h-px w-10 bg-brand-gold" aria-hidden="true" />
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
        {children}
      </span>
    </div>
  );
}
