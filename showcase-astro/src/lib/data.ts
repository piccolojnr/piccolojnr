import fs from "node:fs";
import path from "node:path";
import type { PortfolioData } from "../types/project";
import ate05Project from "../data/ate05";

export function loadPortfolioData(): PortfolioData {
  const file = path.join(process.cwd(), "public", "data", "projects.json");
  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw) as PortfolioData;
  data.projects = data.projects.filter(
    (project) => project.slug !== "memraiq" && project.slug !== ate05Project.slug
  );
  data.projects.push(ate05Project);
  return data;
}
