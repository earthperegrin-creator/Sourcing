import { motion } from "framer-motion";
import type { Company, Vote } from "../types/company";

interface ReviewCompleteProps {
  votes: Record<Vote, Company[]>;
  digs: Company[];
  onRestart: () => void;
}

const voteOrder: { key: Vote; label: string }[] = [
  { key: "yes", label: "Yes" },
  { key: "maybe", label: "Maybe" },
  { key: "no", label: "No" },
];

const listEase = [0.22, 1, 0.36, 1] as const;

export function ReviewComplete({ votes, digs, onRestart }: ReviewCompleteProps) {
  const voted = voteOrder.flatMap(({ key, label }) => votes[key].map((company) => ({ company, label, key })));

  return (
    <motion.section
      aria-label="Review complete"
      className="no-scrollbar flex h-full flex-col overflow-y-auto px-5 pb-8 pt-2"
      initial={{ opacity: 0, y: 10 }}
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
            transition={{ duration: 0.4, delay: 0.04 + index * 0.04, ease: listEase }}
          >
            <div className="text-[32px] font-semibold leading-none tracking-[-0.04em] text-pearl">{votes[key].length}</div>
            <div className="mt-2 text-[12px] font-medium text-pearl/45">{label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-3 rounded-[20px] bg-ice/[0.06] px-4 py-3.5 ring-1 ring-ice/25"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.16, ease: listEase }}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-[13px] font-medium text-ice/90">Dig flagged</p>
          <p className="text-[28px] font-semibold leading-none tracking-[-0.04em] text-ice">{digs.length}</p>
        </div>
        {digs.length === 0 ? (
          <p className="mt-2 text-[14px] text-pearl/45">None flagged.</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {digs.map((company: Company) => (
              <li key={company.id} className="text-[15px] font-medium tracking-[-0.015em] text-pearl">
                {company.name}
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      {voted.length > 0 ? (
        <ul className="mt-5 divide-y divide-white/[0.06] overflow-hidden rounded-[24px] bg-midnight-raised px-4 ring-1 ring-white/[0.06]">
          {voted.map(({ company, label }) => (
            <li key={company.id} className="flex items-center justify-between gap-3 py-3.5">
              <span className="text-[15px] font-medium tracking-[-0.015em] text-pearl">{company.name}</span>
              <span className="text-[13px] text-pearl/45">{label}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-[14px] text-pearl/40">No votes this pass.</p>
      )}

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
