import type { Company } from "../types/company";

function asString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) return Number(value);
  return null;
}

function asHooks(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

export function toCompany(row: unknown): Company | null {
  if (!row || typeof row !== "object") return null;
  const record = row as Record<string, unknown>;
  const id = asString(record.id);
  const name = asString(record.name);
  const slug = asString(record.slug) ?? id;
  if (!id || !name || !slug) return null;

  return {
    id,
    slug,
    name,
    country: asString(record.country) ?? "Taiwan",
    stage: asString(record.stage),
    website_url: asString(record.website_url),
    linkedin_url: asString(record.linkedin_url),
    twincn_url: asString(record.twincn_url),
    url_104: asString(record.url_104),
    job_board_104_url: asString(record.job_board_104_url),
    sector: asString(record.sector),
    summary: asString(record.summary) ?? "",
    traction: asString(record.traction),
    fundraising: asString(record.fundraising),
    team: asString(record.team),
    rubric_lean: asString(record.rubric_lean) ?? "",
    why_interesting: asString(record.why_interesting) ?? "",
    decision_hooks: asHooks(record.decision_hooks),
    sources_note: asString(record.sources_note),
    headcount_104: asString(record.headcount_104),
    headcount_104_num: asNumber(record.headcount_104_num),
    open_jobs_104: asString(record.open_jobs_104),
    open_jobs_104_num: asNumber(record.open_jobs_104_num),
    hiring_activity_104: asString(record.hiring_activity_104),
    what_it_is: asString(record.what_it_is),
    kind_plain: asString(record.kind_plain),
  };
}
