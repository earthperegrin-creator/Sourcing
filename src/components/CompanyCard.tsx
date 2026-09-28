import { ChevronRight } from "lucide-react";
import { splitLean, splitTraction } from "../lib/copy";
import { countryLabel } from "../lib/countries";
import type { Company } from "../types/company";

interface CompanyCardProps {
  company: Company;
  muted?: boolean;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function CompanyCard({ company, muted = false }: CompanyCardProps) {
  const traction = splitTraction(company.traction);
  const lean = splitLean(company.rubric_lean);
  const metricSize = traction.lead.length > 28 ? "text-[22px]" : "text-[30px]";
  const links = [
    { href: company.website_url, label: "Website" },
    ...(company.linkedin_url ? [{ href: company.linkedin_url, label: "LinkedIn" }] : []),
  ];

  return (
    <article
      aria-label={company.name}
      className="relative overflow-hidden rounded-[30px] bg-midnight-raised shadow-[inset_0_1px_0_rgba(243,244,238,0.07)] ring-1 ring-white/[0.07]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-12 top-0 h-px bg-ice/60"
        style={{ boxShadow: "0 0 14px rgba(85,233,255,0.45)", opacity: muted ? 0 : 1 }}
      />
      <div className="px-6 pb-5 pt-6" style={{ opacity: muted ? 0 : 1 }}>
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/[0.05] text-[14px] font-semibold tracking-[-0.02em] text-pearl ring-1 ring-white/[0.09]">
          {initials(company.name)}
        </div>

        <h2 className="mt-5 text-[32px] font-semibold leading-none tracking-[-0.04em] text-pearl">{company.name}</h2>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-white/[0.04] px-2.5 text-[12px] font-medium text-pearl/80 ring-1 ring-white/[0.1]">
            <span className="font-mono text-[10px] text-pearl/45">{company.country}</span>
            {countryLabel(company.country)}
          </span>
          {company.stage ? (
            <span className="inline-flex h-6 items-center rounded-full bg-ice/[0.06] px-2.5 text-[12px] font-medium text-ice ring-1 ring-ice/30">
              {company.stage}
            </span>
          ) : null}
        </div>

        <p className="mt-5 text-[15px] leading-[1.55] tracking-[-0.01em] text-pearl/70">{company.summary}</p>

        <div className="mt-6 border-t border-white/[0.07] pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-pearl/40">Traction</p>
          <p className={`mt-2 font-medium leading-[1.05] tracking-[-0.035em] text-pearl ${metricSize}`}>
            {traction.lead}
          </p>
          {traction.support ? <p className="mt-2 text-[13px] leading-snug text-pearl/50">{traction.support}</p> : null}
        </div>

        <dl className="mt-4">
          {company.fundraising && company.fundraising !== company.stage ? (
            <Fact label="Fundraising" value={company.fundraising} />
          ) : null}
          {lean.stance ? <Fact label="Lean" value={lean.stance} /> : null}
          {company.team ? <Fact label="Team" value={company.team} /> : null}
        </dl>
        {lean.note ? <p className="mt-1 text-[13px] leading-snug text-pearl/45">{lean.note}</p> : null}

        <div className="mt-4 overflow-hidden rounded-[18px] bg-black/20 ring-1 ring-white/[0.06]">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-3 border-t border-white/[0.06] px-4 py-3.5 text-[14px] font-medium text-pearl first:border-t-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50"
            >
              {link.label}
              <ChevronRight className="h-4 w-4 text-pearl/35" strokeWidth={1.8} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-white/[0.07] py-3 first:border-t-0">
      <dt className="text-[13px] text-pearl/45">{label}</dt>
      <dd className="text-right text-[14px] font-medium tracking-[-0.01em] text-pearl">{value}</dd>
    </div>
  );
}
