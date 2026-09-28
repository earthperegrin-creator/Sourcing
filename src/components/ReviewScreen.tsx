import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { companies } from "../data/companies";
import { useReviewQueue } from "../hooks/useReviewQueue";
import type { ExitKind } from "../hooks/useReviewQueue";
import type { Vote } from "../types/company";
import { CompanyCard } from "./CompanyCard";
import { DecisionBar } from "./DecisionBar";
import { ReviewComplete } from "./ReviewComplete";

const ease = [0.22, 1, 0.36, 1] as const;

const cardVariants: Variants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0, x: 0 },
  exit: (kind: ExitKind) => {
    if (kind === "no") return { opacity: 0, x: -48 };
    if (kind === "yes") return { opacity: 0, x: 48 };
    if (kind === "dig") return { opacity: 0, y: 16 };
    return { opacity: 0, y: -12 };
  },
};

export function ReviewScreen() {
  const queue = useReviewQueue(companies);
  const [lastExit, setLastExit] = useState<ExitKind>("maybe");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const total = companies.length;
  const done = !queue.current;

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0 });
  }, [queue.current?.id]);

  function handleVote(vote: Vote) {
    setLastExit(vote);
    queue.vote(vote);
  }

  function handleDig() {
    setLastExit("dig");
    queue.dig();
  }

  return (
    <motion.main
      className="absolute inset-0 flex flex-col bg-midnight"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease }}
    >
      <header className="relative z-10 px-5 pb-3 pt-[max(1.35rem,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <span className="text-[17px] font-medium tracking-[-0.03em] text-pearl">sourcing</span>
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {queue.canUndo ? (
                <motion.button
                  type="button"
                  onClick={queue.undo}
                  aria-label="Undo last action"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-8 w-8 items-center justify-center text-pearl/40 transition-colors hover:text-pearl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50"
                >
                  <RotateCcw className="h-4 w-4" strokeWidth={1.75} />
                </motion.button>
              ) : null}
            </AnimatePresence>
            <span className="font-mono text-[12px] tabular-nums text-pearl/40" aria-live="polite">
              {Math.min(queue.reviewedCount + (done ? 0 : 1), total)}
              <span className="text-pearl/25"> / {total}</span>
            </span>
          </div>
        </div>
        <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-white/[0.06]" aria-hidden="true">
          <motion.div
            className="h-full rounded-full bg-ice"
            animate={{ width: `${(queue.reviewedCount / total) * 100}%` }}
            transition={{ duration: 0.4, ease }}
          />
        </div>
      </header>

      <div className="relative z-0 min-h-0 flex-1">
        {queue.current ? (
          <div ref={scrollerRef} className="no-scrollbar h-full overflow-y-auto px-4 pb-4 pt-3">
            <AnimatePresence mode="wait" initial={false} custom={lastExit}>
              <motion.div
                key={queue.current.id}
                custom={lastExit}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease }}
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
          <motion.div key="actions" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <DecisionBar onVote={handleVote} onDig={handleDig} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.main>
  );
}
