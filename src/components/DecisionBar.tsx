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
    <div className="relative z-10 bg-midnight px-4 pb-[max(1.15rem,env(safe-area-inset-bottom))] pt-3">
      <div role="group" aria-label="Review vote" className="grid grid-cols-3 gap-2">
        {votes.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            disabled={disabled}
            onClick={() => onVote(value)}
            className="h-[52px] rounded-[16px] bg-white/[0.08] text-[15px] font-semibold tracking-[-0.01em] text-pearl transition-[transform,background-color] hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50 active:scale-[0.98] disabled:opacity-40"
          >
            {label}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={onDig}
        className="mx-auto mt-1 flex h-10 items-center gap-1.5 px-3 text-[13px] text-pearl/45 transition-colors hover:text-pearl/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/40 disabled:opacity-40"
      >
        <span className="font-medium text-pearl/70">Dig</span>
        <span aria-hidden="true" className="text-pearl/25">
          ·
        </span>
        <span>need more info</span>
      </button>
    </div>
  );
}
