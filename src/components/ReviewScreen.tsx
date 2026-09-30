import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useReviewQueue } from "../hooks/useReviewQueue";
import type { ExitKind } from "../hooks/useReviewQueue";
import type { CompanySourceState } from "../hooks/useCompanySource";
import { historyFromReviews, saveReview, type SavedReview } from "../lib/queue";
import type { Company } from "../types/company";
import { CompanyCard } from "./CompanyCard";
import { DecisionBar } from "./DecisionBar";
import { ReviewComplete } from "./ReviewComplete";
import { Button } from "./ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

const cardVariants: Variants = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

function notesFromReviews(reviews: SavedReview[]): Map<string, string> {
  const notes = new Map<string, string>();
  for (const review of reviews) {
    if (review.comment) notes.set(review.companyId, review.comment);
  }
  return notes;
}

function ReviewSession({
  companies,
  reviews,
  persisted,
}: {
  companies: Company[];
  reviews: SavedReview[];
  persisted: boolean;
}) {
  const initialHistory = useMemo(() => historyFromReviews(companies, reviews), [companies, reviews]);
  const queue = useReviewQueue(companies, initialHistory);
  const [notes, setNotes] = useState(() => notesFromReviews(reviews));
  const scrollerRef = useRef<HTMLDivElement>(null);
  const total = companies.length;
  const done = !queue.current;
  const position = Math.min(queue.reviewedCount + (done ? 0 : 1), total);
  const initialComment = queue.current ? notes.get(queue.current.id) ?? "" : "";
  const progress = total === 0 ? 0 : (queue.reviewedCount / total) * 100;

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0 });
  }, [queue.current?.id]);

  async function handleCommit(kind: ExitKind, comment: string) {
    const company = queue.current;
    if (!company) return;
    const text = comment.trim();
    await saveReview({
      companyId: company.id,
      kind,
      comment: text.length > 0 ? text : null,
    });
    setNotes((prev) => {
      const next = new Map(prev);
      if (text) next.set(company.id, text);
      else next.delete(company.id);
      return next;
    });
    queue.record(company.id, kind);
  }

  return (
    <motion.main
      className="absolute inset-0 flex flex-col bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease }}
    >
      <header className="relative z-20 shrink-0 border-b border-border px-4 pt-[max(0.85rem,env(safe-area-inset-top))] pb-3 sm:pt-[62px]">
        <div className="flex h-8 items-center justify-between gap-3">
          <span className="text-sm font-medium tracking-tight text-foreground">sourcing</span>
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {queue.canUndo && !done ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Button type="button" variant="outline" size="icon" onClick={queue.undo} aria-label="Undo last decision">
                    <RotateCcw className="size-3.5" strokeWidth={1.75} />
                  </Button>
                </motion.div>
              ) : null}
            </AnimatePresence>
            {!persisted ? <span className="text-xs text-muted-foreground">Local</span> : null}
            <span className="text-xs text-muted-foreground tabular-nums" aria-live="polite">
              {position} / {total}
            </span>
          </div>
        </div>
        <div className="mt-3 h-px w-full bg-border" aria-hidden="true">
          <div className="h-px bg-foreground/80" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <div className="relative z-10 min-h-0 flex-1">
        {queue.current ? (
          <div ref={scrollerRef} className="no-scrollbar absolute inset-0 overflow-x-hidden overflow-y-auto px-3 py-3">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={queue.current.id}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease }}
              >
                <CompanyCard company={queue.current} />
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <ReviewComplete votes={queue.votes} digs={queue.digs} onRestart={queue.reset} />
        )}
      </div>

      <AnimatePresence>
        {queue.current ? (
          <motion.div key="actions" className="shrink-0" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <DecisionBar companyId={queue.current.id} initialComment={initialComment} onCommit={handleCommit} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.main>
  );
}

export function ReviewScreen({ source }: { source: CompanySourceState }) {
  if (source.status !== "ready") {
    return (
      <main className="absolute inset-0 flex flex-col bg-background">
        <header className="border-b border-border px-4 pt-[max(0.85rem,env(safe-area-inset-top))] pb-3 sm:pt-[62px]">
          <span className="text-sm font-medium tracking-tight">sourcing</span>
        </header>
        <p className="px-4 pt-8 text-sm text-muted-foreground">Loading companies</p>
      </main>
    );
  }

  return <ReviewSession companies={source.companies} reviews={source.reviews} persisted={source.persisted} />;
}
