import fs from "node:fs";
import path from "node:path";
import type { PortfolioData } from "../types/project";

export function loadPortfolioData(): PortfolioData {
  const file = path.join(process.cwd(), "public", "data", "projects.json");
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw) as PortfolioData;
}
