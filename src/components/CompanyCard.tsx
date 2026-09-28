import { ArrowUpRight, Banknote, Globe, Linkedin, NotebookPen, TrendingUp, Users } from "lucide-react";
import type { ReactNode } from "react";
import { countryLabel } from "../lib/countries";
import type { Company } from "../types/company";
import { FactRow } from "./FactRow";

interface CardLink {
  href: string;
  label: string;
  icon: ReactNode;
}

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const links: CardLink[] = [
    { href: company.website_url, label: "Website", icon: <Globe className="h-4 w-4" strokeWidth={1.6} /> },
  ];
  if (company.linkedin_url) {
    links.push({
      href: company.linkedin_url,
      label: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" strokeWidth={1.6} />,
    });
  }

  return (
    <article
      aria-label={company.name}
      className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-midnight-raised ring-1 ring-ice/20"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-ice/70"
        style={{ boxShadow: "0 0 14px rgba(85,233,255,0.5)" }}
      />

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-6">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-pearl/80 ring-1 ring-white/10">
            <span className="mr-1 font-mono text-pearl/45">{company.country}</span>
            {countryLabel(company.country)}
          </span>
          {company.stage ? (
            <span className="rounded-full bg-ice/[0.06] px-2.5 py-1 text-[11px] font-medium text-ice ring-1 ring-ice/30">
              {company.stage}
            </span>
          ) : null}
        </div>

        <h2 className="mt-5 text-[30px] font-medium leading-[1.05] tracking-[-0.03em] text-pearl">
          {company.name}
        </h2>
        <p className="mt-4 text-[15px] leading-[1.6] text-pearl/75">{company.summary}</p>

        <dl className="mt-5 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          <FactRow icon={TrendingUp} label="Traction" value={company.traction} />
          {company.fundraising ? (
            <FactRow icon={Banknote} label="Fundraising" value={company.fundraising} />
          ) : null}
          {company.team ? <FactRow icon={Users} label="Team" value={company.team} /> : null}
          <FactRow icon={NotebookPen} label="Rubric" value={company.rubric_lean} />
        </dl>

        <div className={`mt-5 grid gap-2 ${links.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-11 items-center justify-between rounded-xl bg-white/[0.04] px-3.5 text-[13px] font-medium text-pearl/80 ring-1 ring-white/[0.07] transition-colors hover:text-pearl hover:ring-ice/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice/50"
            >
              <span className="flex items-center gap-2">
                <span className="text-pearl/50 group-hover:text-ice">{link.icon}</span>
                {link.label}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-pearl/35 group-hover:text-ice" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
