import { useEffect } from "react";
import { motion } from "framer-motion";

interface TitleBeatProps {
  onDone: () => void;
}

const HOLD_MS = 2800;

export function TitleBeat({ onDone }: TitleBeatProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.button
      type="button"
      onClick={onDone}
      aria-label="sourcing. Tap to continue."
      className="absolute inset-0 flex items-center justify-center bg-midnight-deep focus-visible:outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-56 w-72 -translate-x-1/2 rounded-full bg-aurora/15 blur-3xl"
      />
      <div className="relative flex flex-col items-center">
        <motion.h1
          className="text-[48px] font-light leading-none tracking-[-0.04em] text-pearl"
          style={{
            textShadow: "0 0 1px rgba(85,233,255,0.55), 0 0 32px rgba(85,233,255,0.22)",
          }}
          initial={{ opacity: 0, y: 8, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.25, duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          sourcing
        </motion.h1>
        <motion.span
          aria-hidden="true"
          className="mt-5 h-px w-16 origin-center bg-ice/80"
          style={{ boxShadow: "0 0 14px rgba(85,233,255,0.55)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.button>
  );
}
