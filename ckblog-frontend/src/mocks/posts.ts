export const mockPosts = Array.from({ length: 18 }).map((_, i) => ({
  id: String(i + 1),
  title: `Mock Post ${i + 1}`,
  slug: `mock-post-${i + 1}`,
  excerpt: "Geçici mock içerik. Backend olmadan geliştiriyoruz.",
  coverImageUrl: "",
  publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
  tags: i % 2 ? ["vue","dev"] : ["javascript","tips"]
}));

export function getMockPostBySlug(slug: string) {
  return mockPosts.find(p => p.slug === slug) || {
    id: "0",
    title: "Mock Post",
    slug,
    excerpt: "Detay mock.",
    content: "<p>Bu içerik mock modunda gösteriliyor.</p>",
    publishedAt: new Date().toISOString(),
    tags: ["mock"]
  };
}
