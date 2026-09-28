import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface VideoIntroProps {
  onDone: () => void;
}

const DIM_MS = 1100;

export function VideoIntro({ onDone }: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dimmingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const [dimming, setDimming] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [progress, setProgress] = useState(0);

  const beginDim = useCallback(() => {
    if (dimmingRef.current) return;
    dimmingRef.current = true;
    setDimming(true);
    timerRef.current = window.setTimeout(onDone, DIM_MS);
  }, [onDone]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;
    const attempt = video.play();
    if (attempt) {
      attempt.catch(() => {
        if (!cancelled) setBlocked(true);
      });
    }
    return () => {
      cancelled = true;
      video.pause();
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  function playFromTap() {
    const video = videoRef.current;
    if (!video) return;
    setBlocked(false);
    void video.play().catch(() => setBlocked(true));
  }

  return (
    <motion.section
      className="absolute inset-0 bg-midnight-deep"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      aria-label="Arctic garden stroll"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/intro/arctic-garden-stroll.mp4"
        poster="/intro/poster.jpg"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={beginDim}
        onError={beginDim}
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          if (!video.duration) return;
          setProgress(video.currentTime / video.duration);
          if (video.duration - video.currentTime < 0.85) beginDim();
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-midnight-deep"
        initial={{ opacity: 0 }}
        animate={{ opacity: dimming ? 1 : 0 }}
        transition={{ duration: 1.05, ease: [0.4, 0, 0.2, 1] }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-midnight-deep/80 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="mb-4 h-px w-full overflow-hidden bg-white/10">
          <div
            className="h-px bg-ice/80 shadow-[0_0_12px_rgba(85,233,255,0.65)] transition-[width] duration-200"
            style={{ width: `${Math.min(100, progress * 100)}%` }}
          />
        </div>
        {blocked ? (
          <button
            type="button"
            onClick={playFromTap}
            className="mb-3 h-11 rounded-full bg-pearl px-6 text-[14px] font-medium text-midnight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice"
          >
            Play
          </button>
        ) : null}
        <button
          type="button"
          onClick={beginDim}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-pearl/70 transition-colors hover:text-pearl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/60"
        >
          Skip
        </button>
      </div>
    </motion.section>
  );
}
