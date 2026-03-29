import { Code, Layout, Database } from "lucide-react";

const About = () => {
  const skills = [
    {
      category: "Frontend",
      list: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "HTML5/CSS3",
        "JavaScript (ES6+)",
        "Shadcn/ui",
      ],
    },
    {
      category: "Backend",
      list: [
        "Node.js",
        "Express",
        "MongoDB",
        "PostgreSQL",
        "RESTful APIs",
        "GraphQL",
        "Laravel",
      ],
    },
    {
      category: "Tools & Others",
      list: [
        "Git & GitHub",
        "Docker",
        "Vercel",
        "VS Code",
        "Figma",
        "Jest",
        "Postman",
      ],
    },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <div className="w-20 h-1 bg-portfolio-blue mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Passionate developer focused on creating innovative web solutions
            with modern technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Who am I?</h3>
            <p className="text-gray-600 mb-4">
              I'm a passionate Full Stack Developer with a strong focus on
              frontend technologies. I enjoy turning complex problems into
              simple, beautiful, and intuitive solutions.
            </p>
            <p className="text-gray-600 mb-4">
              With a background in Computer Science and several years of
              experience in web development, I've worked on various projects
              ranging from small business websites to complex web applications.
            </p>
            <p className="text-gray-600 mb-4">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or enjoying outdoor
              activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Code size={24} className="text-portfolio-blue" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Frontend</h4>
              <p className="text-gray-600 text-sm">
                Creating responsive, accessible and beautiful user interfaces.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Database size={24} className="text-portfolio-blue" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Backend</h4>
              <p className="text-gray-600 text-sm">
                Building robust APIs and efficient database solutions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Layout size={24} className="text-portfolio-blue" />
              </div>
              <h4 className="font-semibold text-lg mb-2">UI/UX</h4>
              <p className="text-gray-600 text-sm">
                Designing intuitive experiences that users love.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Skills & Technologies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h4 className="font-semibold text-lg mb-4 text-portfolio-blue">
                  {skillGroup.category}
                </h4>
                <ul className="space-y-2">
                  {skillGroup.list.map((skill) => (
                    <li key={skill} className="flex items-center">
                      <div className="w-2 h-2 bg-portfolio-blue rounded-full mr-3"></div>
                      <span className="text-gray-700">{skill}</span>
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
