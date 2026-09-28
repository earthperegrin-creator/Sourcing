interface FactRowProps {
  label: string;
  value: string;
  emphasis?: boolean;
}

export function FactRow({ label, value, emphasis = false }: FactRowProps) {
  return (
    <div className={emphasis ? "mt-7" : "mt-5"}>
      <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-pearl/40">{label}</dt>
      <dd
        className={
          emphasis
            ? "mt-2 text-[16px] font-medium leading-snug tracking-[-0.015em] text-pearl"
            : "mt-1.5 text-[14px] leading-relaxed text-pearl/70"
        }
      >
        {value}
      </dd>
    </div>
  );
}
