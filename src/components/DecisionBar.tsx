import { useCallback, useEffect, useState } from "react";
import { Check, Minus, Search, X } from "lucide-react";
import type { ExitKind } from "../hooks/useReviewQueue";
import type { Vote } from "../types/company";

interface DecisionBarProps {
  companyId: string;
  initialComment?: string;
  onCommit: (kind: ExitKind, comment: string) => Promise<void>;
  disabled?: boolean;
}

const votes: { value: Vote; label: string; key: string; icon: typeof X }[] = [
  { value: "no", label: "No", key: "ArrowLeft", icon: X },
  { value: "maybe", label: "Maybe", key: "ArrowDown", icon: Minus },
  { value: "yes", label: "Yes", key: "ArrowRight", icon: Check },
];

function kindLabel(kind: ExitKind): string {
  if (kind === "dig") return "Dig";
  return votes.find((option) => option.value === kind)?.label ?? kind;
}

export function DecisionBar({ companyId, initialComment = "", onCommit, disabled = false }: DecisionBarProps) {
  const [armed, setArmed] = useState<ExitKind | null>(null);
  const [comment, setComment] = useState(initialComment);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setArmed(null);
    setComment(initialComment);
    setError(null);
  }, [companyId, initialComment]);

  const commit = useCallback(async () => {
    if (!armed || saving) return;
    setSaving(true);
    setError(null);
    try {
      await onCommit(armed, comment);
      setArmed(null);
      setComment("");
    } catch {
      setError("Could not save this vote. Try again.");
    } finally {
      setSaving(false);
    }
  }, [armed, comment, onCommit, saving]);

  const choose = useCallback(
    (kind: ExitKind) => {
      if (disabled || saving) return;
      if (armed === kind) {
        void commit();
        return;
      }
      setArmed(kind);
      setError(null);
    },
    [armed, commit, disabled, saving],
  );

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
        choose(match.value);
        return;
      }
      if (event.key === "d" || event.key === "D" || event.key === "?") {
        event.preventDefault();
        choose("dig");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choose, disabled]);

  return (
    <div className="relative z-20 px-4 pb-[max(1.35rem,env(safe-area-inset-bottom))] pt-3 sm:pb-8">
      {armed ? (
        <div className="mb-3">
          <label htmlFor="review-comment" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-pearl/40">
            Note
          </label>
          {/* Voice-ready hook: a later ElevenLabs control can target [data-voice-target="review-comment"]. */}
          <textarea
            id="review-comment"
            name="comment"
            rows={2}
            value={comment}
            inputMode="text"
            enterKeyHint="send"
            autoComplete="off"
            autoCapitalize="sentences"
            placeholder="Comment"
            disabled={saving}
            data-voice-target="review-comment"
            data-company-id={companyId}
            onChange={(event) => setComment(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void commit();
              }
            }}
            className="w-full resize-none rounded-[16px] border border-white/[0.09] bg-midnight-raised px-3 py-2.5 text-[16px] leading-snug tracking-[-0.01em] text-pearl shadow-[inset_0_1px_0_rgba(243,244,238,0.06)] placeholder:text-pearl/35 focus:border-ice/50 focus:outline-none focus:ring-2 focus:ring-ice/25 disabled:opacity-60"
          />
          <button
            type="button"
            onClick={() => void commit()}
            disabled={saving}
            className="mt-2 flex h-10 w-full items-center justify-center rounded-[14px] bg-ice/[0.12] text-[14px] font-medium tracking-[-0.01em] text-ice ring-1 ring-ice/35 transition-colors hover:bg-ice/[0.18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50 disabled:opacity-50"
          >
            {saving ? "Saving" : `Save ${kindLabel(armed)}`}
          </button>
          {error ? <p className="mt-2 text-[13px] leading-snug text-pearl/70">{error}</p> : null}
        </div>
      ) : null}

      <div className="mb-3 flex items-center justify-between px-1">
        <button
          type="button"
          disabled={disabled || saving}
          onClick={() => choose("dig")}
          aria-pressed={armed === "dig"}
          className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-medium tracking-[-0.005em] ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50 disabled:opacity-40 ${
            armed === "dig"
              ? "bg-ice/[0.1] text-ice ring-ice/40"
              : "bg-white/[0.03] text-pearl/70 ring-white/[0.1] hover:text-pearl hover:ring-white/20"
          }`}
        >
          <Search className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          Dig
        </button>
        <span className="text-[12px] tracking-[-0.005em] text-pearl/35">{armed ? "Tap again to save" : "Need more info"}</span>
      </div>

      <div role="group" aria-label="Your call" className="grid grid-cols-3 gap-2">
        {votes.map(({ value, label, icon: Icon }) => {
          const selected = armed === value;
          return (
            <button
              key={value}
              type="button"
              disabled={disabled || saving}
              onClick={() => choose(value)}
              aria-pressed={selected}
              className={`flex h-[58px] items-center justify-center gap-2 rounded-[18px] border bg-midnight-raised text-[15px] font-medium tracking-[-0.015em] shadow-[inset_0_1px_0_rgba(243,244,238,0.06)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/25 active:scale-[0.98] disabled:opacity-40 ${
                selected
                  ? "border-ice/70 text-ice"
                  : "border-white/[0.09] text-pearl hover:border-ice/40 focus-visible:border-ice/60"
              }`}
            >
              <Icon className="h-[17px] w-[17px] opacity-60" strokeWidth={1.8} aria-hidden="true" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
