import { useState } from "react";
import { Globe, Landmark, Linkedin } from "lucide-react";
import { briefFor } from "../data/briefs";
import { countryLabel } from "../lib/countries";
import { jobBoardMetrics, signalBullets, type BoardMetric } from "../lib/cardFacts";
import { sourceLinksFor, type SourceKind } from "../lib/sourceLinks";
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

function BulletList({ items, className }: { items: string[]; className: string }) {
  return (
    <ul className="mt-2.5 space-y-2">
      {items.map((item, index) => {
        const quiet = item.startsWith("Not disclosed") || item.startsWith("No founder");
        return (
          <li key={`${index}-${item.slice(0, 24)}`} className={`flex gap-2.5 ${className} ${quiet ? "text-pearl/45" : "text-pearl/80"}`}>
            <span aria-hidden="true" className={`mt-[0.55em] h-1 w-1 shrink-0 rounded-full ${quiet ? "bg-pearl/25" : "bg-ice/80"}`} />
            <span className="min-w-0 break-words">{item}</span>
          </li>
        );
      })}
    </ul>
  );
}

function MetricCell({ metric }: { metric: BoardMetric }) {
  return (
    <div
      className={`flex min-h-[96px] min-w-0 flex-col justify-between rounded-[16px] border px-2.5 py-3 ${
        metric.known
          ? "border-ice/35 bg-ice/[0.08] shadow-[inset_0_1px_0_rgba(85,233,255,0.22)]"
          : "border-dashed border-white/20 bg-white/[0.03]"
      }`}
      aria-label={`${metric.label} ${metric.value}, ${metric.hint}, 104.com`}
    >
      <p className={`font-mono text-[10px] uppercase tracking-[0.12em] ${metric.known ? "text-ice/80" : "text-pearl/40"}`}>
        {metric.label}
      </p>
      <p
        className={`mt-1.5 tracking-[-0.04em] ${
          metric.known
            ? "text-[28px] font-semibold leading-none text-pearl tabular-nums"
            : "text-[17px] font-medium leading-tight text-pearl/45"
        }`}
      >
        {metric.value}
      </p>
      <p className="mt-1.5 text-[11px] leading-none text-pearl/40">{metric.hint}</p>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-pearl/40">{children}</p>;
}

const sourceButtonClass =
  "inline-flex h-8 items-center justify-center rounded-full bg-white/[0.04] text-pearl/75 ring-1 ring-white/[0.1] transition-colors hover:text-ice hover:ring-ice/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50";

function SourceMark({ kind }: { kind: SourceKind }) {
  if (kind === "104") {
    return <span className="font-mono text-[11px] font-semibold tracking-[-0.04em]">104</span>;
  }
  if (kind === "website") return <Globe className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />;
  if (kind === "linkedin") return <Linkedin className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />;
  return <Landmark className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />;
}

function SourceLinks({ company }: { company: Company }) {
  const links = sourceLinksFor(company);
  if (links.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5" aria-label="Company sources">
      {links.map((link) => (
        <a
          key={link.kind}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={link.label}
          title={link.label}
          data-source={link.kind}
          className={`${sourceButtonClass} ${link.kind === "104" ? "px-2" : "w-8"}`}
        >
          <SourceMark kind={link.kind} />
        </a>
      ))}
    </div>
  );
}

export function CompanyCard({ company, muted = false }: CompanyCardProps) {
  const [open, setOpen] = useState(false);
  const country = countryLabel(company.country);
  const brief = briefFor(company.slug);
  const metrics = jobBoardMetrics(company);
  const signals = signalBullets(company);

  const summary = brief?.summary ?? [company.summary];
  const why = brief?.why ?? [company.why_interesting];
  const hooks = brief?.hooks ?? company.decision_hooks;
  const fundraising = brief?.fundraising ?? (company.fundraising ? [company.fundraising] : ["Not disclosed in this record."]);
  const team = brief?.team ?? (company.team ? [company.team] : ["Not disclosed in this record."]);

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
        <SourceLinks company={company} />

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

        <section className="mt-5" aria-label="104.com job board">
          <SectionLabel>104.com</SectionLabel>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {metrics.map((metric) => (
              <MetricCell key={metric.id} metric={metric} />
            ))}
          </div>
        </section>

        <section className="mt-5">
          <SectionLabel>Summary</SectionLabel>
          <BulletList items={summary} className="text-[17px] leading-[1.45] tracking-[-0.01em]" />
        </section>

        <section className="mt-5 border-t border-white/[0.07] pt-4">
          <SectionLabel>Signals</SectionLabel>
          <BulletList items={signals} className="text-[15px] leading-snug" />
        </section>

        <section className="mt-5 border-t border-white/[0.07] pt-4">
          <SectionLabel>Fundraising</SectionLabel>
          <BulletList items={fundraising} className="text-[16px] leading-snug tracking-[-0.01em]" />
        </section>

        <section className="mt-5 border-t border-white/[0.07] pt-4">
          <SectionLabel>Team</SectionLabel>
          <BulletList items={team} className="text-[16px] leading-snug tracking-[-0.01em]" />
        </section>

        <section className="mt-5 border-t border-white/[0.07] pt-4">
          <SectionLabel>Why interesting</SectionLabel>
          <BulletList items={why} className="text-[16px] leading-snug tracking-[-0.01em]" />
        </section>

        {hooks.length > 0 ? (
          <section className="mt-5 border-t border-white/[0.07] pt-4">
            <SectionLabel>Decision hooks</SectionLabel>
            <BulletList items={hooks} className="text-[15.5px] leading-snug" />
          </section>
        ) : null}

        {open ? (
          <div className="mt-5 space-y-5 border-t border-white/[0.07] pt-4">
            <section>
              <SectionLabel>Seed summary</SectionLabel>
              <p className="mt-2 break-words text-[15px] leading-snug text-pearl/60">{company.summary}</p>
            </section>
            <section>
              <SectionLabel>Traction line</SectionLabel>
              <p className="mt-2 break-words text-[15px] leading-snug text-pearl/60">{company.traction ?? "Not in this record."}</p>
            </section>
            {company.sources_note ? (
              <section>
                <SectionLabel>Sources</SectionLabel>
                <p className="mt-2 break-words text-[15px] leading-snug text-pearl/55">{company.sources_note}</p>
              </section>
            ) : null}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="mt-4 text-[13px] font-medium text-ice/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50"
        >
          {open ? "Hide details" : "Details"}
        </button>
      </div>
    </article>
  );
}
