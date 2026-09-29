import { useEffect, useState } from "react";
import { loadQueue, type QueueLoad } from "../lib/queue";

export interface CompanySourceState extends QueueLoad {
  status: "loading" | "ready";
}

export function useCompanySource(): CompanySourceState {
  const [state, setState] = useState<CompanySourceState>({
    status: "loading",
    companies: [],
    reviews: [],
    persisted: false,
  });

  useEffect(() => {
    let alive = true;
    loadQueue().then((result) => {
      if (!alive) return;
      setState({ status: "ready", ...result });
    });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
