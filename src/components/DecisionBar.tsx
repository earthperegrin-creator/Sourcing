import { useEffect } from "react";
import type { Vote } from "../types/company";

interface DecisionBarProps {
  onVote: (vote: Vote) => void;
  onDig: () => void;
  disabled?: boolean;
}

const votes: { value: Vote; label: string; key: string }[] = [
  { value: "no", label: "No", key: "ArrowLeft" },
  { value: "maybe", label: "Maybe", key: "ArrowDown" },
  { value: "yes", label: "Yes", key: "ArrowRight" },
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
    <div className="relative z-10 bg-midnight px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
      <button
        type="button"
        disabled={disabled}
        onClick={onDig}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-[16px] text-pearl/75 ring-1 ring-white/[0.1] transition-colors hover:bg-white/[0.03] hover:text-pearl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/40 disabled:opacity-40"
      >
        <span className="text-[14px] font-semibold tracking-[-0.01em] text-pearl/90">Dig</span>
        <span className="text-[13px] text-pearl/40">Need more info</span>
      </button>

      <div role="group" aria-label="Review vote" className="mt-3 grid grid-cols-3 gap-2">
        {votes.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            disabled={disabled}
            onClick={() => onVote(value)}
            className="h-14 rounded-[16px] bg-white/[0.09] text-[16px] font-semibold tracking-[-0.015em] text-pearl transition-[transform,background-color] hover:bg-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50 active:scale-[0.98] disabled:opacity-40"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
