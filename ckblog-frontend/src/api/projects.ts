import http from "./http";
import { mockProjects } from "@/mocks/projects";

export interface ProjectCard {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  coverImageUrl?: string;
  techStack?: string[];
  repoUrl?: string;
  liveUrl?: string;
  year?: string;
  role?: string;
  status?: "DRAFT" | "PUBLISHED";
  content?: string;
}

const isMock = import.meta.env.VITE_USE_MOCK === "1";

/** Liste */
export async function getList(): Promise<ProjectCard[]> {
  if (isMock) {
    await new Promise((r) => setTimeout(r, 200));
    return mockProjects;
  }
  const { data } = await http.get("/projects");
  return data.data as ProjectCard[];
}

/** Tek getirme */
export async function getById(id: string): Promise<ProjectCard> {
  if (isMock) {
    const found = mockProjects.find((p) => p.id === id);
    return found || ({} as ProjectCard);
  }
  const { data } = await http.get(`/projects/${id}`);
  return data.data as ProjectCard;
}

/** Kaydet (create / update) */
export async function save(payload: ProjectCard, id?: string): Promise<ProjectCard> {
  if (isMock) {
    if (id) {
      const idx = mockProjects.findIndex((p) => p.id === id);
      if (idx >= 0) mockProjects[idx] = { ...mockProjects[idx], ...payload };
      return mockProjects[idx];
    } else {
      const newItem: ProjectCard = { ...payload, id: String(Date.now()) };
      mockProjects.push(newItem);
      return newItem;
    }
  }
  if (id) {
    const { data } = await http.put(`/projects/${id}`, payload);
    return data.data as ProjectCard;
  } else {
    const { data } = await http.post("/projects", payload);
    return data.data as ProjectCard;
  }
}

/** Silme */
export async function remove(id: string): Promise<void> {
  if (isMock) {
    const idx = mockProjects.findIndex((p) => p.id === id);
    if (idx >= 0) mockProjects.splice(idx, 1);
    return;
  }
  await http.delete(`/projects/${id}`);
}
