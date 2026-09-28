import type { LucideIcon } from "lucide-react";

interface FactRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function FactRow({ icon: Icon, label, value }: FactRowProps) {
  return (
    <div className="flex gap-3 py-3.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-pearl/40" strokeWidth={1.6} aria-hidden="true" />
      <div className="min-w-0">
        <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-pearl/40">{label}</dt>
        <dd className="mt-1 text-[14px] leading-snug text-pearl/85">{value}</dd>
      </div>
    </div>
  );
}
