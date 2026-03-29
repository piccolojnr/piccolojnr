import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import { usePortfolio } from "@/hooks/usePortfolio";

const ProjectsPage = () => {
  const { data, isLoading, isError, error } = usePortfolio();
  const [filter, setFilter] = useState<string>("all");

  const allTags = useMemo(() => {
    if (!data?.projects.length) return [];
    const s = new Set<string>();
    for (const p of data.projects) {
      for (const t of p.tags) s.add(t);
    }
    return Array.from(s).sort();
  }, [data?.projects]);

  const filtered = useMemo(() => {
    if (!data?.projects) return [];
    return data.projects.filter(
      (p) => filter === "all" || p.tags.includes(filter)
    );
  }, [data?.projects, filter]);

  if (isLoading) {
    return (
      <div className="container-narrow px-4 py-24 flex justify-center">
        <Loader2 className="h-9 w-9 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="container-narrow px-4 py-24 text-center text-destructive text-sm">
        {error instanceof Error ? error.message : "Could not load projects."}
      </div>
    );
  }

  return (
    <div className="section-padding min-h-[60vh]">
      <div className="container-narrow">
        <nav className="text-xs text-muted-foreground mb-10 flex items-center gap-2 tracking-wide">
          <Link to="/" className="hover:text-foreground underline-offset-4 hover:underline">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          <span className="text-foreground font-medium">Projects</span>
        </nav>

        <header className="mb-12 md:mb-14 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Projects
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Case studies from{" "}
            <a
              href="https://github.com/piccolojnr/piccolojnr/tree/main/02_projects"
              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              piccolojnr/02_projects
            </a>
            . Regenerated when you run{" "}
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
              pnpm build
            </code>{" "}
            or sync.
          </p>
        </header>

        <div className="flex flex-wrap gap-2 mb-12">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            className="rounded-md capitalize"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={filter === tag ? "default" : "outline"}
              size="sm"
              className="rounded-md capitalize"
              onClick={() => setFilter(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              description={project.summary}
              technologies={project.tags.length ? project.tags : ["project"]}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              image={project.coverImage ?? ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
