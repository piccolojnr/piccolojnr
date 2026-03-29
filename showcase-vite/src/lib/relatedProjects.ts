import type { PortfolioProject } from "@/types/project";

/**
 * Prefer tag overlap, then fill with other projects by sort order.
 */
export function getRelatedProjects(
  current: PortfolioProject,
  all: PortfolioProject[],
  limit = 3
): PortfolioProject[] {
  const others = all.filter((p) => p.slug !== current.slug);
  const tagSet = new Set(current.tags);
  const scored = others.map((p) => ({
    p,
    score: p.tags.reduce((n, t) => n + (tagSet.has(t) ? 1 : 0), 0),
  }));
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.p.sortOrder - b.p.sortOrder;
  });

  const picked: PortfolioProject[] = [];
  for (const { p, score } of scored) {
    if (picked.length >= limit) break;
    if (score > 0) picked.push(p);
  }
  for (const { p } of scored) {
    if (picked.length >= limit) break;
    if (!picked.includes(p)) picked.push(p);
  }
  return picked.slice(0, limit);
}

export function sharedTags(a: PortfolioProject, b: PortfolioProject): string[] {
  const bt = new Set(b.tags);
  return a.tags.filter((t) => bt.has(t));
}
