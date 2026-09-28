const NAMES: Record<string, string> = {
  JP: "Japan",
  US: "United States",
};

export function countryLabel(code: string): string {
  return NAMES[code] ?? code;
}
