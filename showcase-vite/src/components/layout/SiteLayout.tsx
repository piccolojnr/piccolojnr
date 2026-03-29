import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SiteLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-14 md:pt-16 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
