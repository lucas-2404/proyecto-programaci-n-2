import { cn } from "../../utils/cn";

export default function ScrollIndicator({ className }) {
  return (
    <div aria-hidden="true" className={cn("flex flex-col items-center gap-2.5", className)}>
      <div className="relative h-[42px] w-[26px] rounded-[13px] border-[1.5px] border-brand-text/50">
        <span className="absolute left-1/2 top-2 -ml-[1.5px] h-[9px] w-[3px] rounded-sm bg-brand-gold shadow-[0_0_6px_rgba(212,160,23,0.7)] will-change-transform motion-safe:animate-scroll-bob" />
      </div>
      <div className="relative h-10 w-px overflow-hidden bg-brand-text/15">
        <span className="absolute left-0 top-0 h-3.5 w-px bg-brand-gold shadow-[0_0_6px_rgba(212,160,23,0.8)] will-change-transform motion-safe:animate-scroll-rail" />
      </div>
    </div>
  );
}
