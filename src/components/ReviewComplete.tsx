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

export function ReviewComplete({ votes, digs, onRestart }: ReviewCompleteProps) {
  return (
    <motion.section
      aria-label="Review complete"
      className="no-scrollbar flex h-full flex-col overflow-y-auto px-6 pb-10 pt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        aria-hidden="true"
        className="mx-auto h-px w-12 bg-ice/70"
        style={{ boxShadow: "0 0 12px rgba(85,233,255,0.5)" }}
      />
      <h2 className="mt-6 text-center text-[26px] font-light tracking-[-0.03em] text-pearl">Queue clear</h2>
      <p className="mx-auto mt-2 max-w-[260px] text-center text-[14px] leading-relaxed text-pearl/55">
        Here's how this pass settled.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-2">
        {voteOrder.map(({ key, label }) => (
          <div key={key} className="rounded-2xl bg-midnight-raised px-2 py-4 text-center ring-1 ring-white/[0.07]">
            <div className={`text-[26px] font-light ${key === "yes" ? "text-ice" : "text-pearl"}`}>
              {votes[key].length}
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-pearl/45">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {voteOrder.map(({ key, label }) =>
          votes[key].length === 0 ? null : (
            <div key={key}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-pearl/40">{label}</h3>
              <ul className="mt-2 space-y-1.5">
                {votes[key].map((company) => (
                  <li key={company.id} className="text-[15px] text-pearl/85">
                    {company.name}
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
      </div>

      <div className="mt-8 rounded-2xl bg-midnight-raised px-4 py-4 ring-1 ring-white/[0.07]">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-ice/80">Need more info</h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-pearl/35">Not a vote</span>
        </div>
        {digs.length === 0 ? (
          <p className="mt-3 text-[14px] text-pearl/45">Nothing parked for follow-up.</p>
        ) : (
          <ul className="mt-3 space-y-1.5">
            {digs.map((company) => (
              <li key={company.id} className="text-[15px] text-pearl/85">
                {company.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mx-auto mt-8 h-11 rounded-xl px-5 text-[14px] text-pearl ring-1 ring-white/10 transition-colors hover:bg-white/[0.04] hover:ring-ice/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50"
      >
        Review again
      </button>
    </motion.section>
  );
}
