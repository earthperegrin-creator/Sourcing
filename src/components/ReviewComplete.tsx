import { motion } from "framer-motion";
import type { Company, Vote } from "../types/company";

interface ReviewCompleteProps {
  votes: Record<Vote, Company[]>;
  digs: Company[];
  onRestart: () => void;
}

const voteOrder: { key: Vote; label: string }[] = [
  { key: "no", label: "No" },
  { key: "maybe", label: "Maybe" },
  { key: "yes", label: "Yes" },
];

const listEase = [0.22, 1, 0.36, 1] as const;

export function ReviewComplete({ votes, digs, onRestart }: ReviewCompleteProps) {
  const voted = voteOrder.flatMap(({ key, label }) => votes[key].map((company) => ({ company, label, key })));

  return (
    <motion.section
      aria-label="Review complete"
      className="no-scrollbar flex h-full flex-col overflow-y-auto px-5 pb-8 pt-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: listEase }}
    >
      <h2 className="text-[34px] font-bold leading-none tracking-[-0.04em] text-pearl">Done</h2>

      <div className="mt-7 grid grid-cols-3 gap-2">
        {voteOrder.map(({ key, label }, index) => (
          <motion.div
            key={key}
            className="rounded-[20px] bg-midnight-raised px-3 py-4 ring-1 ring-white/[0.06]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + index * 0.05, ease: listEase }}
          >
            <div className={`text-[32px] font-semibold leading-none tracking-[-0.04em] ${key === "yes" ? "text-ice" : "text-pearl"}`}>
              {votes[key].length}
            </div>
            <div className="mt-2 text-[12px] font-medium text-pearl/45">{label}</div>
          </motion.div>
        ))}
      </div>

      {voted.length > 0 ? (
        <ul className="mt-6 divide-y divide-white/[0.06] overflow-hidden rounded-[24px] bg-midnight-raised px-4 ring-1 ring-white/[0.06]">
          {voted.map(({ company, label, key }) => (
            <li key={company.id} className="flex items-center justify-between gap-3 py-3.5">
              <span className="text-[15px] font-medium tracking-[-0.015em] text-pearl">{company.name}</span>
              <span className={`text-[13px] ${key === "yes" ? "text-ice" : "text-pearl/45"}`}>{label}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-[14px] text-pearl/40">No votes this pass.</p>
      )}

      <div className="mt-4 rounded-[24px] bg-midnight-raised px-4 py-4 ring-1 ring-white/[0.06]">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[13px] font-medium text-pearl/80">Need more info</h3>
          <span className="text-[12px] text-pearl/35">Not a vote</span>
        </div>
        {digs.length === 0 ? (
          <p className="mt-3 text-[14px] text-pearl/40">None parked.</p>
        ) : (
          <ul className="mt-3 space-y-2.5">
            {digs.map((company: Company) => (
              <li key={company.id} className="text-[15px] font-medium tracking-[-0.015em] text-pearl">
                {company.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-6 h-12 w-full rounded-[16px] text-[15px] font-medium text-pearl/80 ring-1 ring-white/10 transition-colors hover:bg-white/[0.04] hover:text-pearl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50"
      >
        Review again
      </button>
    </motion.section>
  );
}
