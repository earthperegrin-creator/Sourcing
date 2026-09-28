import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { countryLabel } from "../lib/countries";
import type { Company } from "../types/company";

interface CompanyCardProps {
  company: Company;
  muted?: boolean;
}

function initials(name: string): string {
  const words = name.split(/[^A-Za-z0-9]+/).filter(Boolean);
  if (words.length === 0) return name.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
}

function tractionParts(traction: string): string[] {
  return traction
    .split(/\s*;\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function leanTone(lean: string): string {
  const value = lean.trim();
  if (value === "Yes" || value.startsWith("Yes ") || value.startsWith("Yes—") || value.startsWith("Yes-")) {
    return "bg-ice/[0.08] text-ice ring-ice/35";
  }
  if (value === "Maybe" || value.startsWith("Maybe ") || value.startsWith("Maybe—") || value.startsWith("Maybe-")) {
    return "bg-white/[0.05] text-pearl ring-white/15";
  }
  return "bg-white/[0.04] text-pearl/75 ring-white/10";
}

export function CompanyCard({ company, muted = false }: CompanyCardProps) {
  const [open, setOpen] = useState(false);
  const parts = tractionParts(company.traction);
  const lead = parts[0] ?? company.traction;
  const rest = parts.slice(1);
  const metricSize = lead.length > 28 ? "text-[22px]" : "text-[30px]";
  const country = countryLabel(company.country);
  const links = [
    ...(company.website_url ? [{ href: company.website_url, label: "Website" }] : []),
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

        <h2 className="mt-5 text-[32px] font-semibold leading-[1.05] tracking-[-0.04em] text-pearl">{company.name}</h2>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex h-6 items-center rounded-full bg-white/[0.04] px-2.5 text-[12px] font-medium text-pearl/80 ring-1 ring-white/[0.1]">
            {country === company.country ? country : `${company.country} ${country}`}
          </span>
          {company.stage ? (
            <span className="inline-flex h-6 items-center rounded-full bg-ice/[0.06] px-2.5 text-[12px] font-medium text-ice ring-1 ring-ice/30">
              {company.stage}
            </span>
          ) : null}
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium leading-snug ring-1 ${leanTone(company.rubric_lean)}`}>
            {company.rubric_lean}
          </span>
        </div>

        <section className="mt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-pearl/40">Summary</p>
          <p className={`mt-2 text-[15px] leading-[1.55] tracking-[-0.01em] text-pearl/75 ${open ? "" : "line-clamp-3"}`}>
            {company.summary}
          </p>
        </section>

        <section className="mt-5 border-t border-white/[0.07] pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-pearl/40">Traction</p>
          <p className={`mt-2 font-medium leading-[1.05] tracking-[-0.035em] text-pearl ${metricSize}`}>{lead}</p>
          {rest.length > 0 ? (
            <ul className={`mt-2 space-y-1 ${open ? "" : "line-clamp-2"}`}>
              {(open ? rest : rest.slice(0, 2)).map((part) => (
                <li key={part} className="text-[13px] leading-snug text-pearl/50">
                  {part}
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        {company.fundraising ? (
          <section className="mt-5 border-t border-white/[0.07] pt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-pearl/40">Fundraising</p>
            <p className={`mt-2 text-[14px] leading-snug text-pearl/75 ${open ? "" : "line-clamp-3"}`}>{company.fundraising}</p>
          </section>
        ) : null}

        {company.team ? (
          <section className="mt-5 border-t border-white/[0.07] pt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-pearl/40">Team</p>
            <p className={`mt-2 text-[14px] leading-snug text-pearl/75 ${open ? "" : "line-clamp-3"}`}>{company.team}</p>
          </section>
        ) : null}

        <section className="mt-5 border-t border-white/[0.07] pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-pearl/40">Why interesting</p>
          <p className={`mt-2 text-[14px] leading-snug tracking-[-0.01em] text-pearl/75 ${open ? "" : "line-clamp-3"}`}>
            {company.why_interesting}
          </p>
        </section>

        {company.decision_hooks.length > 0 ? (
          <section className="mt-5 border-t border-white/[0.07] pt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-pearl/40">Decision hooks</p>
            <ul className="mt-2 space-y-2">
              {company.decision_hooks.map((hook) => (
                <li key={hook} className="flex gap-2.5 text-[13.5px] leading-snug text-pearl/75">
                  <span aria-hidden="true" className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-ice/80" />
                  <span className={open ? "" : "line-clamp-2"}>{hook}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {open && company.sector ? (
          <section className="mt-5 border-t border-white/[0.07] pt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-pearl/40">Sector</p>
            <p className="mt-2 text-[13px] leading-snug text-pearl/55">{company.sector}</p>
          </section>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="mt-4 text-[13px] font-medium text-ice/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50"
        >
          {open ? "Hide details" : "Details"}
        </button>

        {links.length > 0 ? (
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
        ) : null}
      </div>
    </article>
  );
}
