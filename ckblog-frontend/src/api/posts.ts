import http from "./http";
import { mockPosts } from "@/mocks/posts";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImageUrl?: string;
  content?: string;
  tags?: string[];
  status?: "DRAFT" | "PUBLISHED";
  publishedAt?: string;
}

const isMock = import.meta.env.VITE_USE_MOCK === "1";

/** Liste */
export async function getList(): Promise<Post[]> {
  if (isMock) {
    await new Promise((r) => setTimeout(r, 200));
    return mockPosts;
  }
  const { data } = await http.get("/posts");
  return data.data as Post[];
}

/** Tek getirme */
export async function getById(id: string): Promise<Post> {
  if (isMock) {
    const found = mockPosts.find((p) => p.id === id);
    return found || ({} as Post);
  }
  const { data } = await http.get(`/posts/${id}`);
  return data.data as Post;
}

/** Kaydet (create / update) */
export async function save(payload: Post, id?: string): Promise<Post> {
  if (isMock) {
    if (id) {
      const idx = mockPosts.findIndex((p) => p.id === id);
      if (idx >= 0) mockPosts[idx] = { ...mockPosts[idx], ...payload };
      return mockPosts[idx];
    } else {
      const newItem: Post = { ...payload, id: String(Date.now()) };
      mockPosts.push(newItem);
      return newItem;
    }
  }
  if (id) {
    const { data } = await http.put(`/posts/${id}`, payload);
    return data.data as Post;
  } else {
    const { data } = await http.post("/posts", payload);
    return data.data as Post;
  }
}

/** Silme */
export async function remove(id: string): Promise<void> {
  if (isMock) {
    const idx = mockPosts.findIndex((p) => p.id === id);
    if (idx >= 0) mockPosts.splice(idx, 1);
    return;
  }
  await http.delete(`/posts/${id}`);
}
