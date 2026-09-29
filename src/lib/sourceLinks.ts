import type { Company } from "../types/company";

export type SourceKind = "website" | "twincn" | "104" | "linkedin";

export interface SourceLink {
  kind: SourceKind;
  href: string;
  label: string;
}

export function sourceLinksFor(
  company: Pick<Company, "website_url" | "twincn_url" | "url_104" | "job_board_104_url" | "linkedin_url">,
): SourceLink[] {
  const links: SourceLink[] = [];
  if (company.website_url) links.push({ kind: "website", href: company.website_url, label: "Website" });
  if (company.twincn_url) links.push({ kind: "twincn", href: company.twincn_url, label: "TwinCN incorporation" });
  const jobs = company.url_104 || company.job_board_104_url;
  if (jobs) links.push({ kind: "104", href: jobs, label: "104 job board" });
  if (company.linkedin_url) links.push({ kind: "linkedin", href: company.linkedin_url, label: "LinkedIn" });
  return links;
}
