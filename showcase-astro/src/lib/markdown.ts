import { marked, type Tokens } from "marked";

export function stripLeadingH1(md: string): string {
  return md.replace(/^#\s[^\n]+\r?\n+/, "");
}

export function resolvePortfolioLink(href: string, repoFolderUrl: string): string {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(href)) return href;
  const base = repoFolderUrl.replace(/\/$/, "") + "/";
  return new URL(href, base).href;
}

export async function renderPortfolioMarkdown(md: string, repoFolderUrl: string): Promise<string> {
  const body = stripLeadingH1(md)
    .replace(/^## How to pitch this project[\s\S]*?(?=^## Tags|$(?![\s\S]))/m, "")
    .replace(/^## Tags[\s\S]*$/, "");
  const renderer = new marked.Renderer();
  renderer.link = function (token: Tokens.Link) {
    const href = resolvePortfolioLink(token.href, repoFolderUrl);
    const safeHref = href.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    return `<a href="${safeHref}">${this.parser.parseInline(token.tokens)}</a>`;
  };
  return await marked.parse(body, { async: true, gfm: true, renderer });
}
