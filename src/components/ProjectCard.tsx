import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  image,
}: ProjectCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden bg-gray-200">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image available
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="bg-blue-50 text-portfolio-blue text-xs px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {githubUrl && (
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github size={16} />
                <span>Code</span>
              </a>
            </Button>
          )}

          {liveUrl && (
            <Button size="sm" className="flex items-center gap-1" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
