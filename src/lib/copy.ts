const STANCES = ["Yes", "No", "Maybe", "Dig"] as const;

export function splitTraction(traction: string): { lead: string; support: string | null } {
  const cleaned = traction.trim().replace(/\.$/, "");
  const parts = cleaned
    .split(/\s*;\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length > 1) {
    const support = parts.slice(1).join(". ");
    return { lead: parts[0], support: support.charAt(0).toUpperCase() + support.slice(1) };
  }
  return { lead: cleaned, support: null };
}

export function splitLean(rubric: string): { stance: string | null; note: string } {
  const trimmed = rubric.trim();
  const stance = STANCES.find(
    (item) =>
      trimmed === item ||
      trimmed.startsWith(`${item} `) ||
      trimmed.startsWith(`${item}—`) ||
      trimmed.startsWith(`${item}–`) ||
      trimmed.startsWith(`${item}-`),
  );
  if (!stance) return { stance: null, note: trimmed };
  const note = trimmed.slice(stance.length).replace(/^[\s—–-]+/, "").trim();
  return { stance, note };
}
