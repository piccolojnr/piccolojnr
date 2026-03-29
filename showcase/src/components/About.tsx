const About = () => {
  const skills = [
    {
      category: "Frontend",
      list: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
      ],
    },
    {
      category: "Backend & data",
      list: [
        "Node.js",
        "Laravel",
        "FastAPI",
        "PostgreSQL",
        "MySQL",
        "REST APIs",
      ],
    },
    {
      category: "Tools & delivery",
      list: [
        "Git",
        "Docker",
        "Vercel",
        "Railway",
        "Figma",
        "Linux / VPS",
      ],
    },
  ];

  return (
    <section id="about" className="section-padding border-b border-border/60">
      <div className="container-narrow">
        <div className="max-w-2xl mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            About
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I build end-to-end systems as a full-stack engineer in Ghana — web
            platforms (React / Next.js), APIs (Node, FastAPI, Laravel), AI and
            RAG integrations, and IoT when the problem needs hardware. Most work
            is solo ownership: architecture, implementation, deployment, and
            keeping systems running for real users and clients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Based in Accra, Ghana. I care about clear structure, honest
              trade-offs, and shipping that does not fall over when traffic,
              money, or hardware gets involved.
            </p>
            <p>
              Outside of client and product work, I iterate on my own tools
              and experiment with retrieval, agents, and anything that makes
              production systems easier to reason about.
            </p>
          </div>
          <div className="border border-border/80 rounded-xl p-8 bg-card/50">
            <h3 className="text-sm font-semibold text-foreground mb-2 tracking-wide">
              Focus
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full-stack applications, payment and auth flows, multi-service
              backends, and dashboards — plus AI pipelines and embedded or
              device-facing software when the project demands it.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold font-display mb-8 md:mb-10">
            Skills & technologies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="border border-border/80 rounded-xl p-6 md:p-8 bg-background"
              >
                <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide">
                  {skillGroup.category}
                </h4>
                <ul className="space-y-2.5">
                  {skillGroup.list.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm text-muted-foreground border-l-2 border-border pl-3"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
