export interface PortfolioMeta {
  generatedAt: string;
  source: string;
  branch: string;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  featured: boolean;
  sortOrder: number;
  status?: string;
  period?: string;
  liveUrl?: string;
  githubUrl?: string;
  coverImage?: string;
  images: string[];
  body: string;
  repoFolderUrl: string;
}

export interface PortfolioData {
  meta: PortfolioMeta;
  projects: PortfolioProject[];
}
