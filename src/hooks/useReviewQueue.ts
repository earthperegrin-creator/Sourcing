import { useCallback, useMemo, useState } from "react";
import type { Company, Vote } from "../types/company";

export type ExitKind = Vote | "dig";

export interface HistoryEntry {
  id: string;
  kind: ExitKind | "row";
}

function historyKey(entries: HistoryEntry[]): string {
  return entries.map((entry) => `${entry.id}:${entry.kind}`).join("|");
}

/**
 * No / Maybe / Yes are votes. Dig is a separate "need more info" flag.
 * Saved review rows decide the open card. If those rows arrive after the
 * first render, an untouched queue adopts them instead of staying on company 1.
 */
export function useReviewQueue(items: Company[], initialHistory: HistoryEntry[] = []) {
  const [history, setHistory] = useState<HistoryEntry[]>(initialHistory);
  const [appliedKey, setAppliedKey] = useState(() => historyKey(initialHistory));
  const nextKey = historyKey(initialHistory);
  if (appliedKey !== nextKey) {
    setAppliedKey(nextKey);
    if (historyKey(history) === appliedKey) setHistory(initialHistory);
  }

  const handled = useMemo(() => new Set(history.map((entry) => entry.id)), [history]);
  const currentIndex = items.findIndex((company) => !handled.has(company.id));
  const current = currentIndex === -1 ? null : items[currentIndex];

  const record = useCallback((id: string, kind: ExitKind) => {
    setHistory((prev) => (prev.some((entry) => entry.id === id) ? prev : [...prev, { id, kind }]));
  }, []);

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
      if (entry.kind !== "no" && entry.kind !== "maybe" && entry.kind !== "yes") continue;
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
    handled,
    canUndo: history.length > 0,
    votes,
    digs,
    record,
    undo,
    reset,
  };
}
