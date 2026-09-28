export type Vote = "no" | "maybe" | "yes";

export interface Company {
  id: string;
  slug: string;
  name: string;
  country: string;
  stage: string | null;
  website_url: string;
  linkedin_url: string | null;
  sector: string | null;
  summary: string;
  traction: string;
  fundraising: string | null;
  team: string | null;
  rubric_lean: string;
  why_interesting: string;
  decision_hooks: string[];
  sources_note: string | null;
  headcount_104: string | null;
  headcount_104_num: number | null;
  open_jobs_104: string | null;
  open_jobs_104_num: number | null;
  hiring_activity_104: string | null;
}
