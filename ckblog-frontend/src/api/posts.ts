import http from "./http";

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

/** Liste */
export async function getList(): Promise<Post[]> {
  const { data } = await http.get("/posts");
  return data.data as Post[];
}

/** Tek getirme (admin — by ID) */
export async function getById(id: string): Promise<Post> {
  const { data } = await http.get(`/posts/${id}`);
  return data.data as Post;
}

/** Tek getirme (public — by slug) */
export async function getBySlug(slug: string): Promise<Post> {
  const { data } = await http.get(`/posts/slug/${slug}`);
  return data.data as Post;
}

/** Kaydet (create / update) */
export async function save(payload: Post, id?: string): Promise<Post> {
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
  await http.delete(`/posts/${id}`);
}
