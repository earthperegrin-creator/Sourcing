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
      <span aria-hidden="true" className="mt-6 h-px w-12 self-center bg-ice/70" style={{ boxShadow: "0 0 12px rgba(85,233,255,0.5)" }} />
      <h2 className="mt-6 text-center text-[30px] font-light leading-none tracking-[-0.04em] text-pearl">Queue is clear</h2>

      <dl className="mt-8 grid w-full grid-cols-3 overflow-hidden rounded-[22px] bg-midnight-raised ring-1 ring-white/[0.07]">
        {voteOrder.map(({ key, label }, index) => (
          <div key={key} className={`flex flex-col-reverse items-center py-5 ${index > 0 ? "border-l border-white/[0.06]" : ""}`}>
            <dt className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-pearl/40">{label}</dt>
            <dd className={`text-[30px] font-light leading-none tracking-[-0.04em] tabular-nums ${key === "yes" ? "text-ice" : "text-pearl"}`}>
              {votes[key].length}
            </dd>
          </div>
        ))}
      </dl>

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
