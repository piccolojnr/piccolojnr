import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export interface ProjectCardProps {
  slug?: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
}

const ProjectCard = ({
  slug,
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  image,
}: ProjectCardProps) => {
  const media = (
    <>
      {image ? (
        <img src={image} alt="" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
          No preview
        </div>
      )}
    </>
  );

  return (
    <div className="group flex flex-col border border-border/80 rounded-xl overflow-hidden bg-card/40 hover:border-border transition-colors">
      <div className="aspect-[16/10] overflow-hidden bg-muted/50 shrink-0">
        {slug ? (
          <Link
            to={`/projects/${slug}/`}
            className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {media}
          </Link>
        ) : (
          media
        )}
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="font-display text-lg font-semibold mb-2 tracking-tight">
          {slug ? (
            <Link
              to={`/projects/${slug}/`}
              className="hover:underline decoration-border underline-offset-4"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-[11px] uppercase tracking-wide text-muted-foreground border border-border/80 px-2 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {slug && (
            <Button size="sm" variant="default" className="rounded-md" asChild>
              <Link to={`/projects/${slug}/`} className="gap-1.5">
                Case study
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </Button>
          )}
          {githubUrl && (
            <Button size="sm" variant="outline" className="rounded-md gap-1.5" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github size={14} strokeWidth={1.5} />
                Code
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button size="sm" variant="ghost" className="rounded-md gap-1.5" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} strokeWidth={1.5} />
                Live
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
