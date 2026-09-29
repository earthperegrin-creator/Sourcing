import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PhoneFrame } from "./components/PhoneFrame";
import { ReviewScreen } from "./components/ReviewScreen";
import { TitleBeat } from "./components/TitleBeat";
import { VideoIntro } from "./components/VideoIntro";
import { useCompanySource } from "./hooks/useCompanySource";

type Phase = "video" | "title" | "review";

export function App() {
  const [phase, setPhase] = useState<Phase>("video");
  const source = useCompanySource();
  const showTitle = useCallback(() => setPhase("title"), []);
  const showReview = useCallback(() => setPhase("review"), []);

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
