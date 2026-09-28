import { useEffect } from "react";
import { Check, Minus, Search, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Vote } from "../types/company";

interface DecisionBarProps {
  onVote: (vote: Vote) => void;
  onDig: () => void;
  disabled?: boolean;
}

const votes: { value: Vote; label: string; icon: LucideIcon; key: string }[] = [
  { value: "no", label: "No", icon: X, key: "ArrowLeft" },
  { value: "maybe", label: "Maybe", icon: Minus, key: "ArrowDown" },
  { value: "yes", label: "Yes", icon: Check, key: "ArrowRight" },
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
    <div className="relative z-10 border-t border-white/[0.06] bg-midnight/95 px-4 pb-[max(1.15rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md">
      <div role="group" aria-label="Review vote" className="grid grid-cols-3 gap-2.5">
        {votes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            disabled={disabled}
            onClick={() => onVote(value)}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-white/[0.035] text-[15px] font-medium text-pearl ring-1 ring-white/10 transition-all hover:bg-white/[0.06] hover:ring-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50 active:scale-[0.97] disabled:opacity-40"
          >
            <Icon className="h-4 w-4 opacity-70" strokeWidth={1.8} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={onDig}
        aria-label="Dig, need more info. Not a vote."
        className="mt-2.5 flex h-11 w-full items-center justify-center gap-2 rounded-2xl text-pearl/70 ring-1 ring-white/[0.06] transition-colors hover:text-ice hover:ring-ice/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/40 disabled:opacity-40"
      >
        <Search className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
        <span className="text-[13px] font-medium text-pearl/85">Dig</span>
        <span className="text-[12px] text-pearl/40">need more info</span>
      </button>
    </div>
  );
}
