import { useQuery } from "@tanstack/react-query";
import { fetchPortfolio } from "@/lib/projects";

const staleMs = 1000 * 60 * 60;

export function usePortfolio() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: fetchPortfolio,
    staleTime: staleMs,
  });
}
