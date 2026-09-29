import type { Company } from "../types/company";

export interface BoardMetric {
  id: "headcount" | "jobs" | "hiring";
  label: string;
  value: string;
  known: boolean;
  hint: string;
}

const WITHHELD = new Set(["", "暫不提供", "null", "n/a", "N/A", "-"]);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatAppeared(token: string): string {
  const [monthRaw, dayRaw] = token.split("/");
  const month = MONTHS[Number(monthRaw) - 1];
  const day = Number(dayRaw);
  if (!month || !Number.isInteger(day) || day < 1 || day > 31) return token;
  return `${month} ${day}`;
}

function tractionApprox(company: Company): string | null {
  const part = partsOf(company.traction).find((item) => /^104 headcount\b/i.test(item));
  const match = part?.match(/~\s*(\d+)/);
  return match ? match[1] : null;
}

function withheld(value: string | null | undefined): boolean {
  if (value == null) return true;
  return WITHHELD.has(value.trim());
}

function partsOf(traction: string | null | undefined): string[] {
  if (!traction) return [];
  return traction
    .split(/\s*;\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function jobBoardMetrics(company: Company): BoardMetric[] {
  const headcountKnown = company.headcount_104_num != null || !withheld(company.headcount_104);
  const headcountValue =
    company.headcount_104_num != null
      ? String(company.headcount_104_num)
      : !withheld(company.headcount_104)
        ? company.headcount_104!.trim()
        : "Unknown";

  const jobsKnown = company.open_jobs_104_num != null || !withheld(company.open_jobs_104);
  const jobsValue =
    company.open_jobs_104_num != null
      ? String(company.open_jobs_104_num)
      : !withheld(company.open_jobs_104)
        ? company.open_jobs_104!.trim()
        : "Unknown";

  const hiringRaw = company.hiring_activity_104?.trim() ?? "";
  const appeared = hiringRaw.match(/recent_job_appear=(\d{1,2}\/\d{1,2})/);
  const hiringKnown = hiringRaw.length > 0 && !WITHHELD.has(hiringRaw);
  const hiringValue = appeared ? formatAppeared(appeared[1]) : hiringKnown ? hiringRaw : "Unknown";
  const approx = !headcountKnown ? tractionApprox(company) : null;

  return [
    {
      id: "headcount",
      label: "Headcount",
      value: headcountValue,
      known: headcountKnown,
      hint: headcountKnown ? "people" : approx ? `~${approx} noted` : "not disclosed",
    },
    {
      id: "jobs",
      label: "Open jobs",
      value: jobsValue,
      known: jobsKnown,
      hint: jobsKnown ? "posts" : "not disclosed",
    },
    {
      id: "hiring",
      label: "Hiring",
      value: hiringValue,
      known: hiringKnown,
      hint: hiringKnown ? (appeared ? "latest post" : "104") : "not disclosed",
    },
  ];
}

function headcountCaveat(company: Company, parts: string[]): string | null {
  if (company.headcount_104_num != null || !withheld(company.headcount_104)) return null;
  const part = parts.find((item) => /^104 headcount\b/i.test(item));
  const approx = part?.match(/~\s*(\d+)/);
  if (approx) {
    return `Traction text approximates headcount at ~${approx[1]}. Structured 104 headcount is empty.`;
  }
  if (part && /暫不提供/.test(part)) return "104 withholds headcount (暫不提供).";
  return "Structured 104 headcount is empty.";
}

function unit(count: string, one: string, many: string): string {
  return count === "1" ? one : many;
}

function translateResume(raw: string): string {
  const text = raw.trim();
  const hours = text.match(/^(\d+)\s*小時前處理過履歷$/);
  if (hours) return `Resume handled ${hours[1]} ${unit(hours[1], "hour", "hours")} ago.`;
  const days = text.match(/^(\d+)\s*天內處理過履歷$/);
  if (days) return `Resume handled within ${days[1]} ${unit(days[1], "day", "days")}.`;
  return `Resume note: ${text}.`;
}

function translateReply(raw: string): string {
  const text = raw.trim();
  const days = text.match(/^(\d+)\s*天內聯絡過求職者$/);
  if (days) return `Applicant contacted within ${days[1]} ${unit(days[1], "day", "days")}.`;
  const hours = text.match(/^(\d+)\s*小時(?:前|內)聯絡過求職者$/);
  if (hours) return `Applicant contacted within ${hours[1]} ${unit(hours[1], "hour", "hours")}.`;
  return `Reply note: ${text}.`;
}

function parseActivity(part: string): string | null {
  const marker = "=resume:";
  const idx = part.indexOf(marker);
  if (idx === -1) return null;
  const title = part.slice(0, idx).trim();
  const rest = part.slice(idx + marker.length).trim();
  const [resumeRaw, replyRaw] = rest.split(/\s*\/\s*reply:\s*/);
  const bits = [`Latest 104 post: “${title}”.`, translateResume(resumeRaw ?? ""), replyRaw ? translateReply(replyRaw) : null];
  return bits.filter(Boolean).join(" ");
}

function hookSignals(hooks: string[]): string[] {
  const signals: string[] = [];
  for (const hook of hooks) {
    const web = hook.match(/Website live=(yes|error|no);\s*name_match=(yes|no)/i);
    if (web) {
      const live = web[1].toLowerCase() === "yes" ? "live" : web[1].toLowerCase();
      signals.push(`Website check: ${live}. Name match: ${web[2].toLowerCase()}.`);
      continue;
    }
    if (hook.startsWith("Hiring:")) {
      const roles = hook
        .slice("Hiring:".length)
        .split(";")
        .map((role) => role.trim())
        .filter(Boolean);
      if (roles.length > 0) signals.push(`Open roles named: ${roles.join("; ")}.`);
      continue;
    }
    if (/shape_conf=([0-9.]+)/.test(hook)) {
      const shape = hook.match(/shape_conf=([0-9.]+)/);
      if (shape) signals.push(`Shape confidence: ${shape[1]}.`);
      continue;
    }
    if (hook.includes("TwinCN/104-linked")) {
      signals.push("TwinCN and 104 both have a linked company record.");
      continue;
    }
  }
  return signals;
}

export function signalBullets(company: Company): string[] {
  const parts = partsOf(company.traction);
  const bullets: string[] = [];
  const caveat = headcountCaveat(company, parts);
  if (caveat) bullets.push(caveat);

  for (const part of parts) {
    if (/^104 headcount\b/i.test(part)) continue;
    if (/^Open 104 jobs\b/i.test(part)) continue;
    if (/^Hiring activity\b/i.test(part)) continue;

    const capital = part.match(/^104 capital:\s*(.+)$/i);
    if (capital) {
      const value = capital[1].trim();
      bullets.push(value === "暫不提供" ? "104 capital: not disclosed (暫不提供)." : `104 capital: ${value}.`);
      continue;
    }

    const founded = part.match(/^Founded:\s*(.+)$/i);
    if (founded) {
      bullets.push(`Founded ${founded[1].trim()}.`);
      continue;
    }

    const rank = part.match(/^Reachout rank_score:\s*(.+)$/i);
    if (rank) {
      bullets.push(`Reachout rank score: ${rank[1].trim()}.`);
      continue;
    }

    const activity = parseActivity(part);
    if (activity) {
      bullets.push(activity);
      continue;
    }

    bullets.push(part.endsWith(".") ? part : `${part}.`);
  }

  bullets.push(...hookSignals(company.decision_hooks));
  if (company.sector) bullets.push(`Sector: ${company.sector}.`);
  return bullets;
}
