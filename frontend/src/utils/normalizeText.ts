export function normalizeText(text: string): string {
  return text.toLowerCase().trim();
}

export function textIncludes(haystack: string, needle: string): boolean {
  return normalizeText(haystack).includes(normalizeText(needle));
}