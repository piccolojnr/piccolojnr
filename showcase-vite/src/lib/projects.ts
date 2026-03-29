import type { PortfolioData } from "@/types/project";

function dataUrl() {
  const base = import.meta.env.BASE_URL;
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return `${prefix}data/projects.json`;
}

export async function fetchPortfolio(): Promise<PortfolioData> {
  const res = await fetch(dataUrl());
  if (!res.ok) {
    throw new Error(`Failed to load portfolio: ${res.status}`);
  }
  return res.json();
}
