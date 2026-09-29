import { seedCompanies } from "../data/companies";
import type { ExitKind, HistoryEntry } from "../hooks/useReviewQueue";
import type { Company, Vote } from "../types/company";
import { toCompany } from "./companyRecord";
import { getSupabase } from "./supabase";

export interface SavedReview {
  companyId: string;
  vote: Vote | null;
  dig: boolean;
  comment: string | null;
  updatedAt: string | null;
}

export interface QueueLoad {
  companies: Company[];
  reviews: SavedReview[];
  persisted: boolean;
}

export interface ReviewWrite {
  companyId: string;
  kind: ExitKind;
  comment: string | null;
}

function asString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function asVote(value: unknown): Vote | null {
  return value === "no" || value === "maybe" || value === "yes" ? value : null;
}

function orderBySeed(companies: Company[]): Company[] {
  const byId = new Map(seedCompanies.map((company, index) => [company.id, index]));
  const bySlug = new Map(seedCompanies.map((company, index) => [company.slug, index]));
  return [...companies].sort((a, b) => {
    const rankA = byId.get(a.id) ?? bySlug.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
    const rankB = byId.get(b.id) ?? bySlug.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
    if (rankA !== rankB) return rankA - rankB;
    return a.name.localeCompare(b.name);
  });
}

function mapReviews(rows: unknown): SavedReview[] {
  if (!Array.isArray(rows)) return [];
  const reviews: SavedReview[] = [];
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const record = row as Record<string, unknown>;
    const companyId = asString(record.company_id);
    if (!companyId) continue;
    reviews.push({
      companyId,
      vote: asVote(record.vote),
      dig: record.dig === true,
      comment: asString(record.comment),
      updatedAt: asString(record.updated_at),
    });
  }
  return reviews;
}

export function historyFromReviews(companies: Company[], reviews: SavedReview[]): HistoryEntry[] {
  const allowed = new Set(companies.map((company) => company.id));
  return [...reviews]
    .filter((review) => allowed.has(review.companyId))
    .sort((a, b) => (a.updatedAt ?? "").localeCompare(b.updatedAt ?? ""))
    .map((review) => ({
      id: review.companyId,
      kind: review.vote ?? (review.dig ? "dig" : "row"),
    }));
}

export async function loadQueue(): Promise<QueueLoad> {
  const supabase = getSupabase();
  if (!supabase) {
    return { companies: seedCompanies, reviews: [], persisted: false };
  }

  try {
    const [companiesResult, reviewsResult] = await Promise.all([
      supabase.from("companies").select("*").limit(1000),
      supabase.from("reviews").select("company_id,vote,dig,comment,updated_at").limit(1000),
    ]);

    const live =
      !companiesResult.error && Array.isArray(companiesResult.data)
        ? orderBySeed(
            companiesResult.data
              .map((row) => toCompany(row))
              .filter((company): company is Company => company !== null),
          )
        : [];

    const reviews =
      !reviewsResult.error && reviewsResult.data ? mapReviews(reviewsResult.data) : [];

    return {
      companies: live.length > 0 ? live : seedCompanies,
      reviews,
      persisted: true,
    };
  } catch (error) {
    console.error("Company queue fell back to the local seed.", error);
    return { companies: seedCompanies, reviews: [], persisted: true };
  }
}

export async function saveReview(input: ReviewWrite): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  const { data, error } = await supabase
    .from("reviews")
    .upsert(
      {
        company_id: input.companyId,
        vote: input.kind === "dig" ? null : input.kind,
        dig: input.kind === "dig",
        comment: input.comment,
      },
      { onConflict: "company_id" },
    )
    .select("company_id")
    .limit(1);

  if (error) throw new Error(error.message);
  if (!data || data.length === 0) throw new Error("Review did not save.");
}
