import { useCallback, useMemo, useState } from "react";
import type { Company, Vote } from "../types/company";

export type ExitKind = Vote | "dig";

interface HistoryEntry {
  id: string;
  kind: ExitKind;
}

/**
 * No / Maybe / Yes are votes. Dig is a separate "need more info" flag:
 * it parks the company and advances the queue without recording a score.
 */
export function useReviewQueue(items: Company[]) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const handled = useMemo(() => new Set(history.map((entry) => entry.id)), [history]);
  const currentIndex = items.findIndex((company) => !handled.has(company.id));
  const current = currentIndex === -1 ? null : items[currentIndex];

  const act = useCallback(
    (kind: ExitKind) => {
      if (!current) return;
      const id = current.id;
      setHistory((prev) => (prev.some((entry) => entry.id === id) ? prev : [...prev, { id, kind }]));
    },
    [current],
  );

  const undo = useCallback(() => {
    setHistory((prev) => prev.slice(0, -1));
  }, []);

  const reset = useCallback(() => {
    setHistory([]);
  }, []);

  const byId = useMemo(() => new Map(items.map((company) => [company.id, company])), [items]);

  const votes = useMemo(() => {
    const grouped: Record<Vote, Company[]> = { no: [], maybe: [], yes: [] };
    for (const entry of history) {
      if (entry.kind === "dig") continue;
      const company = byId.get(entry.id);
      if (company) grouped[entry.kind].push(company);
    }
    return grouped;
  }, [history, byId]);

  const digs = useMemo(
    () =>
      history
        .filter((entry) => entry.kind === "dig")
        .map((entry) => byId.get(entry.id))
        .filter((company): company is Company => Boolean(company)),
    [history, byId],
  );

  const next = currentIndex >= 0 ? items[currentIndex + 1] ?? null : null;

  return {
    current,
    next,
    currentIndex,
    reviewedCount: history.length,
    canUndo: history.length > 0,
    votes,
    digs,
    vote: (vote: Vote) => act(vote),
    dig: () => act("dig"),
    undo,
    reset,
  };
}
