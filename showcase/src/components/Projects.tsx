import { useState } from "react";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const [filter, setFilter] = useState<string>("all");

  const projects: (ProjectCardProps & { category: string })[] = [
    {
      title: "Emani Laundry and dry cleaning",
      description:
        "A laundry and dry cleaning service platform with user authentication, order management, and payment integration.",
      technologies: ["React", "Node.js", "Nextjs", "prisma", "Tailwind CSS"],
      liveUrl: "https://emani-luxe-launch.vercel.app/",
      image: "/assets/projects/emani.png",
      category: "fullstack",
    },
    {
      title: "Allied Ghana",
      description:
        "A responsive website for a Ghanaian company, showcasing their services and portfolio.",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Sanity"],
      liveUrl: "https://allied-ghana.vercel.app/",
      image: "/assets/projects/allied-ghana.png",
      category: "frontend",
    },
    {
      title: "Kgl Group",
      description:
        "A responsive website for a Ghanaian company, showcasing their services and portfolio.",
      technologies: [
        "React",
        "Tailwind CSS",
        "Next.js",
        "TypeScript",
        "Sanity",
      ],
      liveUrl: "https://kgl-drab.vercel.app/",
      image: "/assets/projects/kgl.png",
      category: "frontend",
    },
    {
      title: "Valentine Request",
      description:
        "A fun web application that allows users to send anonymous Valentine's Day requests to their crushes.",
      technologies: ["React", "Node.js", "Next.js", "Supabase", "Tailwind CSS"],
      githubUrl: "https://github.com/piccolojnr/valentine_request/tree/main",
      liveUrl: "https://valentine-request.vercel.app/",
      image: "/assets/projects/valentine-request.png",
      category: "fullstack",
    },

    {
      title: "Pico Torrent",
      description:
        "A torrent client built with Express and Node.js, allowing users to download and manage torrents.",
      technologies: ["Express"],
      liveUrl: "https://pico-torrent.vercel.app/",
      image: "/assets/projects/pico-torrent.png",
      category: "fullstack",
    },
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "frontend", label: "Frontend" },
    { id: "fullstack", label: "Full Stack" },
    { id: "mobile", label: "Mobile Apps" },
  ];

  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.category === filter
  );

  return (
    <section id="projects" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">My Projects</h2>
          <div className="w-20 h-1 bg-portfolio-blue mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here are some of my recent projects. Feel free to explore them and
            check out the code on GitHub.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? "default" : "outline"}
              onClick={() => setFilter(category.id)}
              className={`${
                filter === category.id ? "" : "hover:text-portfolio-blue"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
