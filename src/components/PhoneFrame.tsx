import type { ReactNode } from "react";
import { GrainOverlay } from "./GrainOverlay";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-[#04060F] sm:py-8">
      <div className="sm:rounded-[54px] sm:bg-[#0B0E1A] sm:p-[10px] sm:shadow-[0_50px_140px_rgba(0,0,0,0.7)] sm:ring-1 sm:ring-white/[0.09]">
        <div className="relative h-dvh w-full overflow-hidden bg-midnight sm:aspect-[9/16] sm:h-[min(844px,calc(100dvh-64px))] sm:w-auto sm:rounded-[44px]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[11px] z-[70] hidden h-[32px] w-[112px] -translate-x-1/2 rounded-full bg-black sm:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-50 hidden h-[50px] items-center justify-between px-8 pt-1 text-pearl sm:flex"
          >
            <span className="text-[15px] font-semibold tabular-nums tracking-[-0.01em]">9:41</span>
            <span className="flex items-center gap-1.5">
              <SignalIcon />
              <WifiIcon />
              <BatteryIcon />
            </span>
          </div>
          {children}
          <GrainOverlay />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-1/2 z-[70] hidden h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-pearl/70 sm:block"
          />
        </div>
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="1" y="9" width="2" height="4" rx="0.4" fill="currentColor" />
      <rect x="4.5" y="7" width="2" height="6" rx="0.4" fill="currentColor" />
      <rect x="8" y="4.5" width="2" height="8.5" rx="0.4" fill="currentColor" />
      <rect x="11.5" y="2" width="2" height="11" rx="0.4" fill="currentColor" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path
        d="M1.2 6.2c3.4-3 9.2-3 12.6 0M3.4 8.4c2.2-2 5.9-2 8.2 0M5.6 10.5c1.1-1 2.7-1 3.8 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="7.5" cy="12.4" r="0.9" fill="currentColor" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
      <rect x="0.7" y="0.7" width="18" height="10.6" rx="2.2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="2.2" y="2.2" width="13.4" height="7.6" rx="1" fill="currentColor" />
      <path d="M20 4.2v3.6c.8-.4 1.2-1 1.2-1.8S20.8 4.6 20 4.2Z" fill="currentColor" />
    </svg>
  );
}
