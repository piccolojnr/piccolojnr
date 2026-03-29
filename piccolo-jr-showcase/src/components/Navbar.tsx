import { useState, useEffect } from "react";
import { MenuIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { title: "Home", href: "#home" },
    { title: "About", href: "#about" },
    { title: "Projects", href: "#projects" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-md backdrop-blur-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#home" className="text-xl font-bold text-portfolio-darkBlue">
          piccolojnr<span className="text-portfolio-blue">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="text-gray-700 hover:text-portfolio-blue transition-colors duration-300"
            >
              {link.title}
            </a>
          ))}
          <Button variant="default">
            <a href="#contact">Get in touch</a>
          </Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-white z-40 md:hidden">
          <div className="flex flex-col items-center justify-center gap-6 h-full">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="text-lg text-gray-700 hover:text-portfolio-blue transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </a>
            ))}
            <Button variant="default" onClick={() => setIsOpen(false)}>
              <a href="#contact">Get in touch</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
