<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import PostCard from "@/components/PostCard.vue";
import { Search, X } from "lucide-vue-next";

const { t } = useI18n();

type PostItem = {
  id: string; title: string; slug: string;
  coverImage: string; excerpt: string; date: string;
  readingTime: number; tags: string[];
};

const allPosts = ref<PostItem[]>([
  { id:"1",  title:"Vue 3 Composition API", slug:"vue-3-composition-101",
    coverImage:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Setup fonksiyonu, reactive, ref ve computed kullanımıyla modern Vue geliştirme.", date:"2025-08-20", readingTime:5, tags:["vue","composition"] },
  { id:"2",  title:"Prisma ile ORM Akışı", slug:"prisma-orm-akis",
    coverImage:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Model tanımlama, migration ve query zinciri ile veritabanı yönetimi.", date:"2025-08-18", readingTime:7, tags:["node","prisma"] },
  { id:"3",  title:"Markdown'dan Blog'a", slug:"markdown-dan-bloga",
    coverImage:"https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Markdown dosyalarını dinamik blog içeriğine dönüştürmenin pratik yolları.", date:"2025-08-10", readingTime:4, tags:["blog","content"] },
  { id:"4",  title:"Router Guard İpuçları", slug:"router-guard-ipuclari",
    coverImage:"https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Auth guard, locale yönlendirme ve scrollBehavior ayarları.", date:"2025-07-28", readingTime:6, tags:["vue-router","tips"] },
  { id:"5",  title:"TypeScript ile Vue", slug:"typescript-ile-vue",
    coverImage:"https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Props, emits ve generics ile tip-güvenli Vue bileşenleri oluşturma.", date:"2025-07-20", readingTime:8, tags:["typescript","vue"] },
  { id:"6",  title:"Axios Interceptor Yapısı", slug:"axios-interceptor-yapisi",
    coverImage:"https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Refresh token yönetimi ve otomatik retry mekanizması kurulumu.", date:"2025-07-12", readingTime:6, tags:["axios","auth"] },
  { id:"7",  title:"Vite Performans İpuçları", slug:"vite-performans-ipuclari",
    coverImage:"https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Kod bölme, lazy import ve bundle optimizasyonu ile hızlı uygulamalar.", date:"2025-06-30", readingTime:5, tags:["vite","performance"] },
  { id:"8",  title:"Pinia Store Desenleri", slug:"pinia-store-desenleri",
    coverImage:"https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Getter, action ve composition store ile state management pratikleri.", date:"2025-06-25", readingTime:7, tags:["pinia","state"] },
  { id:"9",  title:"Inter Tipografi Sistemi", slug:"ui-inter-tipografi",
    coverImage:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    excerpt:"CSS clamp, fluid typography ve responsive ölçek tasarımı.", date:"2025-06-15", readingTime:4, tags:["ui","typography"] },
  { id:"10", title:"SEO Head Yönetimi", slug:"seo-icin-head-yonetimi",
    coverImage:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Open Graph meta tagları ve dinamik title yönetimi.", date:"2025-06-02", readingTime:5, tags:["seo","head"] },
  { id:"11", title:"Dark Mode Tasarım", slug:"dark-mode-tasarim",
    coverImage:"https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Renk kontrastı, CSS custom property ve token tabanlı tema sistemi.", date:"2025-05-28", readingTime:6, tags:["ui","a11y"] },
  { id:"12", title:"Deploy: Netlify & Vercel", slug:"deploy-netlify-vercel",
    coverImage:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Build konfigürasyonu, preview deployment ve CI/CD entegrasyonu.", date:"2025-05-20", readingTime:5, tags:["deploy","cd"] },
]);

/* Collect unique tags for filter pills */
const allTags = computed(() => {
  const set = new Set<string>();
  allPosts.value.forEach(p => p.tags.forEach(t => set.add(t)));
  return Array.from(set).sort();
});

const activeTag = ref<string | null>(null);
const q = ref("");

const filtered = computed(() => {
  let list = allPosts.value;
  if (activeTag.value) list = list.filter(p => p.tags.includes(activeTag.value!));
  if (q.value.trim()) {
    const s = q.value.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(s) ||
      p.excerpt.toLowerCase().includes(s) ||
      p.tags.some(tg => tg.toLowerCase().includes(s))
    );
  }
  return list;
});

function toggleTag(tag: string) {
  activeTag.value = activeTag.value === tag ? null : tag;
}
function clearSearch() { q.value = ""; }
</script>

<template>
  <section class="blog-list">
    <!-- Header -->
    <div class="blog-header">
      <h1 class="blog-title">{{ t("blog.title") }}</h1>
      <p class="blog-subtitle">{{ t("blog.subtitle") }}</p>
    </div>

    <!-- Search + Tags -->
    <div class="toolbar">
      <div class="search-box">
        <Search class="search-icon" />
        <input
          v-model="q"
          type="text"
          :placeholder="t('blog.search')"
          class="search-input"
        />
        <button v-if="q" class="clear-btn" @click="clearSearch">
          <X class="clear-icon" />
        </button>
      </div>

      <div class="tag-pills">
        <button
          class="pill"
          :class="{ active: !activeTag }"
          @click="activeTag = null"
        >{{ t("blog.allCategories") }}</button>
        <button
          v-for="tag in allTags" :key="tag"
          class="pill"
          :class="{ active: activeTag === tag }"
          @click="toggleTag(tag)"
        >{{ tag }}</button>
      </div>
    </div>

    <!-- Grid -->
    <div v-if="filtered.length" class="card-grid">
      <PostCard
        v-for="post in filtered" :key="post.id"
        :title="post.title"
        :excerpt="post.excerpt"
        :slug="post.slug"
        :cover-image="post.coverImage"
        :date="post.date"
        :reading-time="post.readingTime"
        :tags="post.tags"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="empty-state">
      <p>{{ t("blog.noResults") }}</p>
    </div>
  </section>
</template>

<style scoped>
/* ======= LAYOUT ======= */
.blog-list {
  max-width: 1120px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

/* ======= HEADER ======= */
.blog-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.blog-title {
  font-family: var(--font-heading, "Space Grotesk", sans-serif);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem;
}
.blog-subtitle {
  font-family: var(--font-body, "DM Sans", sans-serif);
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  margin: 0;
}

/* ======= TOOLBAR ======= */
.toolbar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

/* Search */
.search-box {
  position: relative;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}
.search-icon {
  position: absolute;
  left: 14px; top: 50%;
  transform: translateY(-50%);
  width: 18px; height: 18px;
  color: var(--color-text-muted);
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 0.65rem 2.5rem 0.65rem 2.5rem;
  border-radius: 12px;
  border: 1px solid var(--color-border-default);
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  font: inherit;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 18%, transparent);
}
.clear-btn {
  position: absolute;
  right: 10px; top: 50%;
  transform: translateY(-50%);
  background: none; border: none;
  cursor: pointer; padding: 4px;
  color: var(--color-text-muted);
  transition: color 0.15s;
}
.clear-btn:hover { color: var(--color-text-primary); }
.clear-icon { width: 16px; height: 16px; }

/* Tag pills */
.tag-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}
.pill {
  padding: 0.35rem 0.9rem;
  border-radius: 9999px;
  border: 1px solid var(--color-border-default);
  background: var(--color-bg-surface);
  color: var(--color-text-secondary);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.pill:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
.pill.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}

/* ======= CARD GRID ======= */
.card-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}
@media (min-width: 640px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .card-grid { grid-template-columns: repeat(3, 1fr); }
}

/* ======= EMPTY STATE ======= */
.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  color: var(--color-text-muted);
  font-size: 1.05rem;
}
</style>
