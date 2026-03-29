import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { Seo } from "@/components/Seo";
import { SITE_NAME, SITE_DESCRIPTION, homeJsonLd } from "@/lib/site";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={SITE_NAME}
        description={SITE_DESCRIPTION}
        path="/"
        jsonLd={homeJsonLd()}
      />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
};

export default Index;
