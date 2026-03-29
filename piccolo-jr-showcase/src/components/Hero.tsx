import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 section-padding bg-gradient-to-b from-sky-50 to-white"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div
            className="w-full lg:w-1/2 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <p className="text-portfolio-blue font-medium mb-2">Hello, I'm</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-portfolio-darkBlue mb-4">
              Rahim <span className="text-portfolio-blue">Daud</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Frontend Developer & UI/UX Enthusiast crafting beautiful,
              responsive, and user-friendly web applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="px-6">
                <a href="#projects">View Projects</a>
              </Button>
              <Button variant="outline" className="px-6">
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            <div className="mt-12 flex gap-5">
              <a
                href="https://github.com/piccolojnr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-portfolio-blue transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="www.linkedin.com/in/rahim-daud-piccolo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-portfolio-blue transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/piccolojnr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-portfolio-blue transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>

          <div
            className="w-full lg:w-1/2 overflow-hidden rounded-xl animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-xl p-10 relative">
              <div className="w-72 h-72 mx-auto bg-white rounded-full overflow-hidden shadow-lg border-4 border-white">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
                  <img
                    src="/profile.jpg"
                    alt="Rahim Daud"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-portfolio-blue/10 rounded-full"></div>
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-portfolio-blue/10 rounded-full"></div>
            </div>
          </div>
        </div>

        <a
          href="#about"
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-500 hover:text-portfolio-blue transition-colors duration-300"
        >
          <span className="mb-2 text-sm">Scroll Down</span>
          <ArrowDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
