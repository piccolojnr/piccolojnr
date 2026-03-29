import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { Seo } from "@/components/Seo";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  HOME_DOCUMENT_TITLE,
  homeJsonLd,
} from "@/lib/site";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={SITE_NAME}
        documentTitle={HOME_DOCUMENT_TITLE}
        description={SITE_DESCRIPTION}
        path="/"
        keywords={SITE_KEYWORDS}
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
