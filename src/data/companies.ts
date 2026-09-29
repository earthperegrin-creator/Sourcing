import raw from "./companies.json";
import { assertBriefsExist } from "./briefs";
import { toCompany } from "../lib/companyRecord";
import type { Company } from "../types/company";

const rows = Array.isArray(raw) ? raw : [];

export const seedCompanies: Company[] = rows
  .map((row) => toCompany(row))
  .filter((company): company is Company => company !== null);

assertBriefsExist(seedCompanies.map((company) => company.slug));
