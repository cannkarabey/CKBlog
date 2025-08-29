import http from "./http";
import { mockProjects } from "@/mocks/projects";

export interface ProjectCard {
  id: string; title: string; slug: string;
  summary?: string; coverImageUrl?: string;
  techStack?: string[]; repoUrl?: string; liveUrl?: string;
}
const isMock = import.meta.env.VITE_USE_MOCK === "1";

export async function fetchProjects() {
  if (isMock) {
    await new Promise(r => setTimeout(r, 200));
    return { data: mockProjects as ProjectCard[] };
  }
  const { data } = await http.get("/projects", { params: { status: "ACTIVE" } });
  return data as { data: ProjectCard[] };
}
