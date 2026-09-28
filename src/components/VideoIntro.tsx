import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface VideoIntroProps {
  onDone: () => void;
}

const VIDEO_SRC = "/intro/arctic-garden-stroll.mp4";
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
    let alive = true;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");

    const start = () => {
      if (!alive || dimmingRef.current) return;
      const pending = video.play();
      if (!pending) return;
      pending
        .then(() => {
          if (alive) setBlocked(false);
        })
        .catch(() => {
          if (alive) setBlocked(true);
        });
    };

    start();
    video.addEventListener("loadeddata", start);
    video.addEventListener("canplay", start);

    return () => {
      alive = false;
      video.removeEventListener("loadeddata", start);
      video.removeEventListener("canplay", start);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  function playFromTap() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
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
        src={VIDEO_SRC}
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onEnded={beginDim}
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          if (!Number.isFinite(video.duration) || video.duration === 0) return;
          setProgress(video.currentTime / video.duration);
          if (
            video.duration > 4 &&
            video.currentTime > 2 &&
            video.duration - video.currentTime < 0.9
          ) {
            beginDim();
          }
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
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-midnight-deep/70 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="mb-4 h-px w-full overflow-hidden bg-white/15">
          <div className="h-px bg-ice/80" style={{ width: `${Math.min(100, progress * 100)}%` }} />
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
          className="rounded-full border border-white/30 bg-midnight-deep/55 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-pearl backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-midnight-deep/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/60"
        >
          Skip
        </button>
      </div>
    </motion.section>
  );
}
