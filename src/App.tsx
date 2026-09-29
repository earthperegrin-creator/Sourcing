import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PhoneFrame } from "./components/PhoneFrame";
import { ReviewScreen } from "./components/ReviewScreen";
import { TitleBeat } from "./components/TitleBeat";
import { VideoIntro } from "./components/VideoIntro";
import { useCompanySource } from "./hooks/useCompanySource";

type Phase = "video" | "title" | "review";

const OPENING_SEEN_KEY = "sourcing-opening-seen";

function openingSeenThisSession(): boolean {
  try {
    return sessionStorage.getItem(OPENING_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberOpening(): void {
  try {
    sessionStorage.setItem(OPENING_SEEN_KEY, "1");
  } catch {
    // Storage can throw in private mode. The opening plays again on the next load.
  }
}

export function App() {
  const [phase, setPhase] = useState<Phase>(() => (openingSeenThisSession() ? "review" : "video"));
  const source = useCompanySource();
  const showTitle = useCallback(() => setPhase("title"), []);
  const showReview = useCallback(() => {
    rememberOpening();
    setPhase("review");
  }, []);

  return (
    <PhoneFrame>
      <AnimatePresence mode="wait">
        {phase === "video" ? <VideoIntro key="video" onDone={showTitle} /> : null}
        {phase === "title" ? <TitleBeat key="title" onDone={showReview} /> : null}
        {phase === "review" ? <ReviewScreen key="review" source={source} /> : null}
      </AnimatePresence>
    </PhoneFrame>
  );
}
