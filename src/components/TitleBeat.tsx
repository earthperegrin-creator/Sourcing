import { useEffect } from "react";
import { motion } from "framer-motion";
import { AuroraBackdrop } from "./AuroraBackdrop";

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
      <AuroraBackdrop variant="title" />
      <div className="relative -mt-10 flex flex-col items-center">
        <motion.h1
          className="text-[48px] font-light leading-none tracking-[-0.045em] text-pearl"
          style={{ textShadow: "0 0 1px rgba(85,233,255,0.5), 0 0 32px rgba(85,233,255,0.2)" }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          sourcing
        </motion.h1>
        <motion.span
          aria-hidden="true"
          className="mt-5 h-px w-10 origin-center bg-ice/70"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.button>
  );
}
