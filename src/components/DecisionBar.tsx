import { useCallback, useEffect, useState } from "react";
import { Check, Minus, Search, X } from "lucide-react";
import type { ExitKind } from "../hooks/useReviewQueue";
import type { Vote } from "../types/company";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

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
    <div className="relative z-20 border-t border-border bg-background px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-6">
      <label htmlFor="review-comment" className="mb-1.5 block text-xs text-muted-foreground">
        Comment
      </label>
      <Textarea
        id="review-comment"
        name="comment"
        rows={2}
        value={comment}
        inputMode="text"
        enterKeyHint="done"
        autoComplete="off"
        autoCapitalize="sentences"
        placeholder="Comment"
        disabled={saving}
        data-voice-target="review-comment"
        data-company-id={companyId}
        onChange={(event) => setComment(event.target.value)}
      />
      {error ? <p className="mt-2 text-sm text-foreground">{error}</p> : null}

      <div className="mt-3 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant={armed === "dig" ? "secondary" : "outline"}
          size="sm"
          disabled={disabled || saving}
          onClick={() => choose("dig")}
          aria-pressed={armed === "dig"}
        >
          <Search className="size-3.5" strokeWidth={2} aria-hidden="true" />
          Dig
        </Button>
        <span className="text-xs text-muted-foreground">{armed ? "Tap again to save" : "Need more info"}</span>
      </div>

      {armed ? (
        <Button type="button" variant="secondary" className="mt-2 w-full" disabled={saving} onClick={() => void commit()}>
          {saving ? "Saving" : `Save ${kindLabel(armed)}`}
        </Button>
      ) : null}

      <div role="group" aria-label="Your call" className="mt-2 grid grid-cols-3 gap-2">
        {votes.map(({ value, label, icon: Icon }) => {
          const selected = armed === value;
          return (
            <Button
              key={value}
              type="button"
              variant={selected ? "default" : "outline"}
              size="lg"
              disabled={disabled || saving}
              onClick={() => choose(value)}
              aria-pressed={selected}
            >
              <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
