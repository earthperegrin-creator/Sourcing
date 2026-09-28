import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ReviewScreen } from "./components/ReviewScreen";
import { TitleBeat } from "./components/TitleBeat";
import { VideoIntro } from "./components/VideoIntro";

type Phase = "video" | "title" | "review";

export function App() {
  const [phase, setPhase] = useState<Phase>("video");
  const showTitle = useCallback(() => setPhase("title"), []);
  const showReview = useCallback(() => setPhase("review"), []);

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-midnight-deep">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[42vh] w-[78vw] max-w-3xl -translate-x-1/2 rounded-full bg-aurora/[0.08] blur-3xl"
      />
      <div className="relative h-dvh w-full shrink-0 overflow-hidden bg-midnight sm:h-[min(844px,calc(100dvh-32px))] sm:w-[390px] sm:rounded-[42px] sm:shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:ring-1 sm:ring-white/[0.08]">
        <AnimatePresence mode="wait">
          {phase === "video" ? <VideoIntro key="video" onDone={showTitle} /> : null}
          {phase === "title" ? <TitleBeat key="title" onDone={showReview} /> : null}
          {phase === "review" ? <ReviewScreen key="review" /> : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
