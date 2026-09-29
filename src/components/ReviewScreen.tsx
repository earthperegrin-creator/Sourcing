import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useReviewQueue } from "../hooks/useReviewQueue";
import type { ExitKind } from "../hooks/useReviewQueue";
import type { CompanySourceState } from "../hooks/useCompanySource";
import { historyFromReviews, saveReview, type SavedReview } from "../lib/queue";
import type { Company } from "../types/company";
import { AuroraBackdrop } from "./AuroraBackdrop";
import { CompanyCard } from "./CompanyCard";
import { DecisionBar } from "./DecisionBar";
import { ReviewComplete } from "./ReviewComplete";

const ease = [0.22, 1, 0.36, 1] as const;

const cardVariants: Variants = {
  enter: { opacity: 0, y: 18, scale: 0.98 },
  center: { opacity: 1, y: 0, x: 0, scale: 1 },
  exit: (kind: ExitKind) => {
    if (kind === "no") return { opacity: 0, x: -48, rotate: -6, scale: 0.98 };
    if (kind === "yes") return { opacity: 0, x: 48, rotate: 6, scale: 0.98 };
    if (kind === "dig") return { opacity: 0, y: 24, scale: 0.96 };
    return { opacity: 0, y: -16, scale: 0.98 };
  },
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
  const [lastExit, setLastExit] = useState<ExitKind>("maybe");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const total = companies.length;
  const done = !queue.current;
  const position = Math.min(queue.reviewedCount + (done ? 0 : 1), total);
  const initialComment = queue.current ? notes.get(queue.current.id) ?? "" : "";

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
    setLastExit(kind);
    queue.record(company.id, kind);
  }

  return (
    <motion.main
      className="absolute inset-0 flex flex-col bg-midnight"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease }}
    >
      <AuroraBackdrop variant="ambient" />

      <header className="relative z-20 px-6 pt-[max(1.15rem,env(safe-area-inset-top))] sm:pt-[62px]">
        <div className="flex h-9 items-center justify-between">
          <span className="text-[21px] font-light leading-none tracking-[-0.045em] text-pearl">sourcing</span>
          <div className="flex items-center gap-2.5">
            <AnimatePresence>
              {queue.canUndo && !done ? (
                <motion.button
                  type="button"
                  onClick={queue.undo}
                  aria-label="Undo last decision"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-pearl/55 ring-1 ring-white/[0.09] transition-colors hover:text-pearl hover:ring-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/60"
                >
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.9} />
                </motion.button>
              ) : null}
            </AnimatePresence>
            {!persisted ? <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-pearl/35">Local</span> : null}
            <span className="font-mono text-[12px] tabular-nums tracking-[0.02em] text-pearl/55" aria-live="polite">
              {String(position).padStart(2, "0")}
              <span className="text-pearl/25"> / {String(total).padStart(2, "0")}</span>
            </span>
          </div>
        </div>
        <div
          className="mt-4 grid"
          style={{
            gridTemplateColumns: `repeat(${Math.max(total, 1)}, minmax(0, 1fr))`,
            columnGap: total > 40 ? 2 : 4,
          }}
          aria-hidden="true"
        >
          {companies.map((company) => {
            const decided = queue.handled.has(company.id);
            const isCurrent = queue.current?.id === company.id;
            return (
              <div key={company.id} className="h-[2px] overflow-hidden rounded-full bg-white/[0.07]">
                <motion.div
                  className="h-full rounded-full"
                  initial={false}
                  animate={{
                    width: decided || isCurrent ? "100%" : "0%",
                    backgroundColor: isCurrent ? "rgba(85,233,255,0.9)" : "rgba(243,244,238,0.45)",
                  }}
                  transition={{ duration: 0.35, ease }}
                />
              </div>
            );
          })}
        </div>
      </header>

      <div className="relative z-10 min-h-0 flex-1 px-4 pt-5">
        {queue.current ? (
          <div className="relative h-full">
            {queue.next ? (
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-3 top-0">
                <div className="h-7 rounded-t-[26px] bg-white/[0.045] ring-1 ring-white/[0.06]" />
              </div>
            ) : null}
            <div ref={scrollerRef} className="no-scrollbar absolute inset-x-0 top-3 bottom-0 overflow-x-hidden overflow-y-auto pb-2">
              <AnimatePresence mode="popLayout" initial={false} custom={lastExit}>
                <motion.div
                  key={queue.current.id}
                  custom={lastExit}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.42, ease }}
                >
                  <CompanyCard company={queue.current} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <ReviewComplete votes={queue.votes} digs={queue.digs} onRestart={queue.reset} />
        )}
      </div>

      <AnimatePresence>
        {queue.current ? (
          <motion.div key="actions" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
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
      <main className="absolute inset-0 flex flex-col bg-midnight">
        <AuroraBackdrop variant="ambient" />
        <header className="relative z-20 px-6 pt-[max(1.15rem,env(safe-area-inset-top))] sm:pt-[62px]">
          <span className="text-[21px] font-light leading-none tracking-[-0.045em] text-pearl">sourcing</span>
        </header>
        <p className="relative z-10 px-6 pt-10 text-[16px] text-pearl/55">Loading companies</p>
      </main>
    );
  }

  return <ReviewSession companies={source.companies} reviews={source.reviews} persisted={source.persisted} />;
}
