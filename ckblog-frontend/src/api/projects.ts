import http from "./http";

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

/** Liste */
export async function getList(): Promise<ProjectCard[]> {
  const { data } = await http.get("/projects");
  return data.data as ProjectCard[];
}

/** Tek getirme (admin — by ID) */
export async function getById(id: string): Promise<ProjectCard> {
  const { data } = await http.get(`/projects/${id}`);
  return data.data as ProjectCard;
}

/** Tek getirme (public — by slug) */
export async function getBySlug(slug: string): Promise<ProjectCard> {
  const { data } = await http.get(`/projects/slug/${slug}`);
  return data.data as ProjectCard;
}

/** Kaydet (create / update) */
export async function save(payload: ProjectCard, id?: string): Promise<ProjectCard> {
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
  await http.delete(`/projects/${id}`);
}
