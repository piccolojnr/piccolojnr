import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import { usePortfolio } from "@/hooks/usePortfolio";

const FEATURED_LIMIT = 6;

const Projects = () => {
  const { data, isLoading, isError } = usePortfolio();

  const featured = data?.projects
    .filter((p) => p.featured)
    .slice(0, FEATURED_LIMIT);

  return (
    <section id="projects" className="section-padding bg-muted/25 border-b border-border/60">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
              Featured work
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Case studies from my portfolio repo — production systems, client
              delivery, and products. Open any card for the full write-up and
              screenshots.
            </p>
          </div>
          <Button variant="outline" className="rounded-md shrink-0 w-fit" asChild>
            <Link to="/projects">All projects</Link>
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {isError && (
          <p className="text-center text-destructive py-12 text-sm">
            Could not load projects. Run{" "}
            <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">
              pnpm run sync:portfolio
            </code>{" "}
            then refresh.
          </p>
        )}

        {!isLoading && !isError && featured && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featured.map((project) => (
              <ProjectCard
                key={project.slug}
                slug={project.slug}
                title={project.title}
                description={project.summary}
                technologies={
                  project.tags.length ? project.tags : ["project"]
                }
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                image={project.coverImage ?? ""}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
