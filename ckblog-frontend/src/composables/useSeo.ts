import { useHead } from "@vueuse/head";

export function useSeo(opts: { title?: string; description?: string; image?: string } = {}) {
  const site = import.meta.env.VITE_SITE_NAME || "CKBlog";
  const title = opts.title ? `${opts.title} · ${site}` : site;
  const desc = opts.description || "CKBlog — Yazılar ve projeler.";
  const image = opts.image || "/og-default.png";

  useHead({
    title,
    meta: [
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: image },
    ],
  });
}
