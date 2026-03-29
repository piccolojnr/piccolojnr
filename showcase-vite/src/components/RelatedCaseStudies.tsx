import { Link } from "react-router-dom";
import type { PortfolioProject } from "@/types/project";
import { sharedTags } from "@/lib/relatedProjects";

type Props = {
  current: PortfolioProject;
  related: PortfolioProject[];
};

function blurb(current: PortfolioProject, other: PortfolioProject): string {
  const overlap = sharedTags(current, other);
  if (overlap.length) {
    const labels = overlap.slice(0, 4).join(", ");
    return `Same stack themes (${labels}) — natural follow-on from this case study.`;
  }
  const s = other.summary.trim();
  return s.length > 160 ? `${s.slice(0, 157)}…` : s;
}

export function RelatedCaseStudies({ current, related }: Props) {
  if (related.length === 0) return null;

  return (
    <section
      className="container-narrow max-w-3xl py-12 md:py-14 border-t border-border/80"
      aria-labelledby="related-case-studies-heading"
    >
      <h2
        id="related-case-studies-heading"
        className="font-display text-xl font-semibold tracking-tight mb-2"
      >
        Related case studies
      </h2>
      <p className="text-sm text-muted-foreground mb-8 max-w-2xl leading-relaxed">
        Internal links between projects help surface how AI, full-stack, and IoT
        work connect across the portfolio.
      </p>
      <ul className="space-y-6">
        {related.map((p) => (
          <li key={p.slug}>
            <h3 className="text-base font-semibold font-display tracking-tight">
              <Link
                to={`/projects/${p.slug}/`}
                className="text-foreground hover:underline underline-offset-4 decoration-border hover:decoration-foreground"
              >
                {p.title}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
              {blurb(current, p)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
