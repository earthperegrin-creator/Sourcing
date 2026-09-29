import { motion } from "framer-motion";
import type { Company, Vote } from "../types/company";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

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

export function ReviewComplete({ votes, digs, onRestart }: ReviewCompleteProps) {
  const voted = voteOrder.flatMap(({ key, label }) => votes[key].map((company) => ({ company, label, key })));

  return (
    <motion.section
      aria-label="Review complete"
      className="no-scrollbar flex h-full flex-col overflow-y-auto px-3 pt-4 pb-8"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h2 className="text-xl font-semibold tracking-tight">Queue is clear</h2>
      <Card className="mt-4 gap-0 py-0 shadow-sm">
        <CardContent className="grid grid-cols-3 px-0 py-0">
          {voteOrder.map(({ key, label }, index) => (
            <div key={key} className={`px-3 py-4 ${index > 0 ? "border-l border-border" : ""}`}>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">{votes[key].length}</p>
            </div>
          ))}
        </CardContent>
        <Separator />
        <CardContent className="px-4 py-3">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm font-medium">Dig</p>
            <p className="text-lg font-semibold tabular-nums">{digs.length}</p>
          </div>
          {digs.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">None flagged.</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {digs.map((company: Company) => (
                <li key={company.id} className="text-sm">
                  {company.name}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {voted.length > 0 ? (
        <ul className="mt-4 divide-y divide-border rounded-xl border">
          {voted.map(({ company, label }) => (
            <li key={company.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="text-sm font-medium">{company.name}</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">No votes this pass.</p>
      )}

      <Button type="button" variant="outline" className="mt-4 w-full" onClick={onRestart}>
        Review again
      </Button>
    </motion.section>
  );
}
