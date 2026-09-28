import { useState } from "react";
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

const cardVariants: Variants = {
  enter: { opacity: 0, y: 16, scale: 0.985 },
  center: { opacity: 1, y: 0, scale: 1, x: 0, rotate: 0 },
  exit: (kind: ExitKind) => {
    if (kind === "no") return { opacity: 0, x: -280, rotate: -4 };
    if (kind === "yes") return { opacity: 0, x: 280, rotate: 4 };
    if (kind === "dig") return { opacity: 0, y: 48, scale: 0.96 };
    return { opacity: 0, y: -36, scale: 0.97 };
  },
};

export function ReviewScreen() {
  const queue = useReviewQueue(companies);
  const [lastExit, setLastExit] = useState<ExitKind>("maybe");
  const total = companies.length;
  const done = !queue.current;
  const behind = queue.currentIndex >= 0 ? total - queue.currentIndex - 1 : 0;

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
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[380px] -translate-x-1/2 rounded-full bg-aurora/10 blur-3xl"
      />

      <header className="relative z-10 px-5 pb-3 pt-[max(1.35rem,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <span className="text-[20px] font-light tracking-[-0.03em] text-pearl">sourcing</span>
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {queue.canUndo ? (
                <motion.button
                  type="button"
                  onClick={queue.undo}
                  aria-label="Undo last action"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-pearl/55 ring-1 ring-white/10 transition-colors hover:text-ice hover:ring-ice/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50"
                >
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.8} />
                </motion.button>
              ) : null}
            </AnimatePresence>
            <span className="font-mono text-[12px] tabular-nums text-pearl/50" aria-live="polite">
              {Math.min(queue.reviewedCount + (done ? 0 : 1), total)}
              <span className="text-pearl/25"> / {total}</span>
            </span>
          </div>
        </div>
        <div className="mt-4 h-px w-full bg-white/[0.06]" aria-hidden="true">
          <motion.div
            className="h-px bg-ice/80"
            style={{ boxShadow: "0 0 10px rgba(85,233,255,0.45)" }}
            animate={{ width: `${(queue.reviewedCount / total) * 100}%` }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </header>

      <div className="relative z-0 min-h-0 flex-1">
        {queue.current ? (
          <div className="relative h-full px-4 pb-3 pt-1">
            {behind > 0 ? (
              <div
                aria-hidden="true"
                className="absolute inset-x-7 bottom-1 top-3 rounded-[26px] bg-midnight-raised/70 ring-1 ring-white/[0.04]"
              />
            ) : null}
            <AnimatePresence initial={false} custom={lastExit} mode="popLayout">
              <motion.div
                key={queue.current.id}
                custom={lastExit}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full"
              >
                <CompanyCard company={queue.current} />
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <ReviewComplete votes={queue.votes} digs={queue.digs} onRestart={queue.reset} />
        )}
      </div>

      {queue.current ? <DecisionBar onVote={handleVote} onDig={handleDig} /> : null}
    </motion.main>
  );
}
