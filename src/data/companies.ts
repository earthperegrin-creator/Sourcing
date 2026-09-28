import raw from "./companies.json";
import { assertBriefsCover } from "./briefs";
import type { Company } from "../types/company";

export const companies = raw as Company[];

assertBriefsCover(companies.map((company) => company.slug));
