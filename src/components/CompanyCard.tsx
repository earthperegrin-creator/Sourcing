import { ArrowUpRight } from "lucide-react";
import { countryLabel } from "../lib/countries";
import type { Company } from "../types/company";
import { FactRow } from "./FactRow";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const links = [{ href: company.website_url, label: "Website" }];
  if (company.linkedin_url) {
    links.push({ href: company.linkedin_url, label: "LinkedIn" });
  }

  return (
    <article
      aria-label={company.name}
      className="rounded-[28px] bg-midnight-raised px-6 pb-6 pt-7 ring-1 ring-white/[0.06]"
    >
      <h2 className="text-[34px] font-bold leading-[1.02] tracking-[-0.04em] text-pearl">{company.name}</h2>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[12px] font-medium text-pearl/80">
          {countryLabel(company.country)}
        </span>
        {company.stage ? (
          <span className="rounded-full bg-ice/10 px-3 py-1 text-[12px] font-medium text-ice">{company.stage}</span>
        ) : null}
      </div>

      <p className="mt-6 text-[15px] leading-[1.6] text-pearl/75">{company.summary}</p>

      <dl>
        <FactRow emphasis label="Traction" value={company.traction} />
        {company.fundraising ? <FactRow label="Fundraising" value={company.fundraising} /> : null}
        {company.team ? <FactRow label="Team" value={company.team} /> : null}
      </dl>

      <p className="mt-6 border-t border-white/[0.06] pt-5 text-[13px] leading-relaxed text-pearl/45">
        <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.16em] text-pearl/35">Rubric</span>
        {company.rubric_lean}
      </p>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
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
