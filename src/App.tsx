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
      <div className="relative h-dvh w-full shrink-0 overflow-hidden bg-midnight sm:h-[min(844px,calc(100dvh-32px))] sm:w-[390px] sm:rounded-[40px] sm:shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:ring-1 sm:ring-white/[0.06]">
        <AnimatePresence mode="wait">
          {phase === "video" ? <VideoIntro key="video" onDone={showTitle} /> : null}
          {phase === "title" ? <TitleBeat key="title" onDone={showReview} /> : null}
          {phase === "review" ? <ReviewScreen key="review" /> : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
