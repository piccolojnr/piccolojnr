import { marked } from "marked";

marked.use({ gfm: true });

/** Remove first markdown H1 (case study title duplicate). */
export function stripLeadingH1(md: string): string {
  return md.replace(/^#\s[^\n]+\r?\n+/, "");
}

export async function renderPortfolioMarkdown(md: string): Promise<string> {
  const raw = await marked.parse(stripLeadingH1(md), { async: true });
  return typeof raw === "string" ? raw : String(raw);
}
