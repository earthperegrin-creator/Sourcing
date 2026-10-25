const THIN_CHAR_LIMIT = 120;
const CJK_LETTER = /[\u3040-\u30ff\u3400-\u9fff\uff66-\uff9d]/;

export type EducateMeHint = "thin / needs rewrite" | "still Japanese";

function sentenceCount(text: string): number {
  return text
    .split(/[.!?。！？]+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 1).length;
}

function mostlyCjk(text: string): boolean {
  const letters = [...text].filter((char) => /\p{L}/u.test(char));
  if (letters.length === 0) return false;
  const cjk = letters.filter((char) => CJK_LETTER.test(char)).length;
  return cjk / letters.length >= 0.5;
}

export function educateMeHint(value: string | null | undefined): EducateMeHint | null {
  const text = (value ?? "").replace(/\s+/g, " ").trim();
  if (!text) return "thin / needs rewrite";
  if (mostlyCjk(text)) return "still Japanese";
  if (text.length < THIN_CHAR_LIMIT || sentenceCount(text) < 2) return "thin / needs rewrite";
  return null;
}
