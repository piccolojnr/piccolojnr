import { Link, Navigate, useParams, useLocation, useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ChevronRight,
  ExternalLink,
  FolderGit2,
  Github,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePortfolio } from "@/hooks/usePortfolio";
import NotFound from "@/pages/NotFound";
import { Seo } from "@/components/Seo";
import { RelatedCaseStudies } from "@/components/RelatedCaseStudies";
import { getRelatedProjects } from "@/lib/relatedProjects";
import { projectDocumentTitle } from "@/lib/site";

function stripLeadingH1(md: string) {
  return md.replace(/^#\s[^\n]+\r?\n+/, "");
}

/** Canonical path for SEO and links (trailing slash so markdown `./artifacts/` resolves correctly). */
function projectDetailPath(slug: string) {
  return `/projects/${slug}/`;
}

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isError } = usePortfolio();

  useLayoutEffect(() => {
    if (!slug || slug === "artifacts") return;
    if (location.pathname === `/projects/${slug}`) {
      navigate(projectDetailPath(slug), { replace: true });
    }
  }, [slug, location.pathname, navigate]);

  if (isLoading) {
    return (
      <div className="container-narrow px-4 py-24 flex justify-center">
        {slug ? (
          <Seo
            title="Project"
            description="Loading case study…"
            path={projectDetailPath(slug)}
          />
        ) : null}
        <Loader2 className="h-9 w-9 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !data || !slug) {
    return <NotFound />;
  }

  const project = data.projects.find((p) => p.slug === slug);
  if (!project) {
    if (slug === "artifacts") {
      return <Navigate to="/projects" replace />;
    }
    return <NotFound />;
  }

  const body = stripLeadingH1(project.body);
  const hasGallery = project.images.length > 0;
  const ogImage =
    project.coverImage?.trim() ||
    project.images.find((u) => /^https?:\/\//i.test(u)) ||
    null;

  const related = getRelatedProjects(project, data.projects, 3);

  return (
    <article className="pb-24">
      <Seo
        title={project.title}
        documentTitle={projectDocumentTitle(project.title)}
        description={project.summary}
        path={projectDetailPath(project.slug)}
        imageUrl={ogImage}
        ogType="article"
      />
      <div className="border-b border-border/80 bg-muted/20">
        <div className="container-narrow py-10 md:py-14">
          <nav className="text-xs text-muted-foreground mb-8 flex items-center gap-2 flex-wrap tracking-wide">
            <Link
              to="/"
              className="hover:text-foreground underline-offset-4 hover:underline"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
            <Link
              to="/projects"
              className="hover:text-foreground underline-offset-4 hover:underline"
            >
              Projects
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
            <span className="text-foreground font-medium truncate max-w-[min(100%,12rem)] sm:max-w-md">
              {project.title}
            </span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] uppercase tracking-wide text-muted-foreground border border-border px-2 py-0.5 rounded capitalize"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-8">
                {project.status && (
                  <span className="border border-border/80 bg-background px-2.5 py-1 rounded-md">
                    {project.status}
                  </span>
                )}
                {project.period && (
                  <span className="border border-border/80 bg-background px-2.5 py-1 rounded-md">
                    {project.period}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.liveUrl && (
                  <Button className="rounded-md" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" strokeWidth={1.5} />
                      Live
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" className="rounded-md" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" strokeWidth={1.5} />
                      Code
                    </a>
                  </Button>
                )}
                <Button variant="outline" className="rounded-md" asChild>
                  <a
                    href={project.repoFolderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FolderGit2 className="h-4 w-4 mr-2" strokeWidth={1.5} />
                    Repo folder
                  </a>
                </Button>
              </div>
            </div>

            {project.coverImage ? (
              <div className="rounded-xl overflow-hidden border border-border bg-muted aspect-video lg:min-h-[240px]">
                <img
                  src={project.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {hasGallery ? (
        <div className="container-narrow py-12 md:py-16">
          <h2 className="font-display text-xl font-semibold mb-8 tracking-tight">
            Screenshots & artifacts
          </h2>
          <div className="flex justify-center">
          <Carousel className="w-full max-w-4xl">
            <CarouselContent>
              {project.images.map((src) => (
                <CarouselItem key={src}>
                  <div className="p-1">
                    <div className="rounded-lg overflow-hidden border border-border bg-muted/40 aspect-video flex items-center justify-center">
                      <img
                        src={src}
                        alt=""
                        className="max-h-[min(70vh,520px)] w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex border-border bg-background h-9 w-9 rounded-md" />
            <CarouselNext className="hidden sm:flex border-border bg-background h-9 w-9 rounded-md" />
          </Carousel>
          </div>
        </div>
      ) : null}

      <RelatedCaseStudies current={project} related={related} />

      <div className="container-narrow max-w-3xl">
        <div
          className="prose prose-neutral lg:prose-lg max-w-none
          prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight
          prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-a:decoration-border hover:prose-a:decoration-foreground
          prose-table:text-sm prose-th:px-3 prose-td:px-3 prose-hr:border-border"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
};

export default ProjectDetailPage;
