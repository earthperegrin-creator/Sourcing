import type { Company } from "../types/company";
import { whatItIs } from "./plainCompany";

export interface CardBullet {
  label: string | null;
  text: string;
}

const FILLER =
  /^(not disclosed(?:\s+in this record)?|unknown|n\/a|none|null|暫不提供|—|-)\.?$/i;

function clean(value: string | null | undefined): string {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

/** True when the field adds nothing beyond the what-it-is already on the card. */
function repeatsAbout(field: string, about: string): boolean {
  const left = field.toLowerCase();
  const right = about.toLowerCase();
  if (!left || !right) return false;
  if (left === right) return true;
  return left.length >= 40 && right.includes(left);
}

function extraBullet(label: string, value: string | null, about: string): CardBullet | null {
  const text = clean(value);
  if (!text || FILLER.test(text) || repeatsAbout(text, about)) return null;
  return { label, text };
}

export function cardAbout(
  company: Pick<Company, "what_it_is" | "summary" | "sector" | "decision_hooks">,
): string {
  const written = clean(company.what_it_is);
  if (written) return written;
  return whatItIs(company);
}

export function cardBullets(
  company: Pick<Company, "decision_hooks" | "fundraising" | "traction" | "team">,
  about: string,
): CardBullet[] {
  const hooks = company.decision_hooks
    .map((hook) => clean(hook))
    .filter((hook) => hook.length > 0)
    .map((text) => ({ label: null, text }));

  const extras = [
    extraBullet("Fundraising", company.fundraising, about),
    extraBullet("Traction", company.traction, about),
    extraBullet("Team", company.team, about),
  ].filter((bullet): bullet is CardBullet => bullet !== null);

  return [...hooks, ...extras];
}

export function countOrNull(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
