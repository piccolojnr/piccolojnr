import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { title: "Home", to: "/" },
    { title: "Projects", to: "/projects" },
    { title: "About", to: "/#about" },
    { title: "Contact", to: "/#contact" },
  ];

  const linkClass =
    "text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline decoration-border";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-200 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-border shadow-sm"
          : "bg-background/70 backdrop-blur-sm border-transparent"
      }`}
    >
      <div className="container-narrow px-4 md:px-6 flex h-14 md:h-16 items-center justify-between">
        <Link
          to="/"
          className="font-display text-lg font-semibold tracking-tight text-foreground"
        >
          piccolojnr
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.title} to={link.to} className={linkClass}>
              {link.title}
            </Link>
          ))}
          <Button size="sm" variant="default" className="rounded-md" asChild>
            <Link to="/#contact">Get in touch</Link>
          </Button>
        </nav>

        <button
          className="md:hidden p-2 text-foreground -mr-2"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} strokeWidth={1.5} /> : <MenuIcon size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-narrow px-4 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.to}
                className="py-3 text-base text-foreground border-b border-border/60 last:border-0"
              >
                {link.title}
              </Link>
            ))}
            <Button className="mt-4 w-full rounded-md" variant="default" asChild>
              <Link to="/#contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
