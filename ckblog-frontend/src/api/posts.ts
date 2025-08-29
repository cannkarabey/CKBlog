import { mockPosts, getMockPostBySlug } from "@/mocks/posts";

export async function fetchPosts(params: { page?: number; pageSize?: number } = {}) {
  const page = params.page || 1;
  const pageSize = params.pageSize || 9;
  const start = (page - 1) * pageSize;
  const slice = mockPosts.slice(start, start + pageSize);

  await new Promise(r => setTimeout(r, 200)); // küçük delay
  return { data: slice, meta: { page, pageSize, total: mockPosts.length } };
}

export async function fetchPostBySlug(slug: string) {
  await new Promise(r => setTimeout(r, 150));
  return { data: getMockPostBySlug(slug) };
}
