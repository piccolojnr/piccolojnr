import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404: non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center py-28 px-4">
      <div className="text-center max-w-md">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
          Error
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight mb-4">
          404
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          This page does not exist or was moved.
        </p>
        <Link
          to="/"
          className="text-sm font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
