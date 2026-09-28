import { ArrowUpRight } from "lucide-react";
import { splitLean, splitTraction } from "../lib/copy";
import { countryLabel } from "../lib/countries";
import type { Company } from "../types/company";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const traction = splitTraction(company.traction);
  const lean = splitLean(company.rubric_lean);
  const links = [{ href: company.website_url, label: "Website" }];
  if (company.linkedin_url) links.push({ href: company.linkedin_url, label: "LinkedIn" });
  const showRaise = company.fundraising && company.fundraising !== company.stage;

  return (
    <article
      aria-label={company.name}
      className="rounded-[28px] bg-midnight-raised px-5 pb-5 pt-6 ring-1 ring-white/[0.06]"
    >
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-[18px] font-semibold tracking-[-0.03em] text-pearl"
        >
          {company.name.slice(0, 1)}
        </div>
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[12px] font-medium text-pearl/80">
            {countryLabel(company.country)}
          </span>
          {company.stage ? (
            <span className="rounded-full bg-ice/10 px-3 py-1 text-[12px] font-medium text-ice">{company.stage}</span>
          ) : null}
        </div>
      </div>

      <h2 className="mt-5 text-[34px] font-bold leading-[1.02] tracking-[-0.045em] text-pearl">{company.name}</h2>
      <p className="mt-4 text-[15px] leading-[1.6] text-pearl/70">{company.summary}</p>

      <div className="mt-6 rounded-[22px] bg-black/25 px-4 py-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-pearl/40">Traction</p>
        <p className="mt-2 text-[22px] font-semibold leading-[1.15] tracking-[-0.03em] text-pearl">{traction.lead}</p>
        {traction.support ? <p className="mt-2 text-[14px] leading-snug text-pearl/55">{traction.support}</p> : null}
        {showRaise ? (
          <p className="mt-3 text-[13px] text-pearl/45">
            <span className="text-pearl/35">Fundraising · </span>
            {company.fundraising}
          </p>
        ) : null}
      </div>

      <div className="mt-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-pearl/40">Lean</p>
        <div className="mt-2.5 flex items-start gap-2.5">
          {lean.stance ? (
            <span className="mt-0.5 shrink-0 rounded-full bg-white/[0.06] px-2.5 py-1 text-[12px] font-medium text-pearl">
              {lean.stance}
            </span>
          ) : null}
          {lean.note ? <p className="text-[14px] leading-snug text-pearl/60">{lean.note}</p> : null}
        </div>
        {company.team ? <p className="mt-3 text-[13px] leading-snug text-pearl/50">Team · {company.team}</p> : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.06] pt-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[13px] font-medium text-pearl/70 transition-colors hover:text-pearl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50"
          >
            {link.label}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
          </a>
        ))}
      </div>
    </article>
  );
}
