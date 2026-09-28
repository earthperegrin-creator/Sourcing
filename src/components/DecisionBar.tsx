import { useEffect } from "react";
import { Check, Minus, Search, X } from "lucide-react";
import type { Vote } from "../types/company";

interface DecisionBarProps {
  onVote: (vote: Vote) => void;
  onDig: () => void;
  disabled?: boolean;
}

const votes: { value: Vote; label: string; key: string; icon: typeof X }[] = [
  { value: "no", label: "No", key: "ArrowLeft", icon: X },
  { value: "maybe", label: "Maybe", key: "ArrowDown", icon: Minus },
  { value: "yes", label: "Yes", key: "ArrowRight", icon: Check },
];

export function DecisionBar({ onVote, onDig, disabled = false }: DecisionBarProps) {
  useEffect(() => {
    if (disabled) return;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      const match = votes.find((option) => option.key === event.key);
      if (match) {
        event.preventDefault();
        onVote(match.value);
        return;
      }
      if (event.key === "d" || event.key === "D" || event.key === "?") {
        event.preventDefault();
        onDig();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [disabled, onDig, onVote]);

  return (
    <div className="relative z-20 px-4 pb-[max(1.35rem,env(safe-area-inset-bottom))] pt-3 sm:pb-8">
      <div className="mb-3 flex items-center justify-between px-1">
        <button
          type="button"
          disabled={disabled}
          onClick={onDig}
          aria-pressed="false"
          className="flex h-8 items-center gap-1.5 rounded-full bg-white/[0.03] px-3 text-[12.5px] font-medium tracking-[-0.005em] text-pearl/70 ring-1 ring-white/[0.1] transition-colors hover:text-pearl hover:ring-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50 disabled:opacity-40"
        >
          <Search className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          Dig
        </button>
        <span className="text-[12px] tracking-[-0.005em] text-pearl/35">Need more info</span>
      </div>

      <div role="group" aria-label="Your call" className="grid grid-cols-3 gap-2">
        {votes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            disabled={disabled}
            onClick={() => onVote(value)}
            className="flex h-[58px] items-center justify-center gap-2 rounded-[18px] border border-white/[0.09] bg-midnight-raised text-[15px] font-medium tracking-[-0.015em] text-pearl shadow-[inset_0_1px_0_rgba(243,244,238,0.06)] transition-colors hover:border-ice/40 focus-visible:border-ice/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/25 active:scale-[0.98] active:border-ice/70 active:text-ice disabled:opacity-40"
          >
            <Icon className="h-[17px] w-[17px] opacity-60" strokeWidth={1.8} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
