import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const site =
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  process.env.PUBLIC_SITE_URL ||
  "http://localhost:4321";

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
});
