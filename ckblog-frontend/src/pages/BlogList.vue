<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import PostCard from "@/components/PostCard.vue";
import { Search, X } from "lucide-vue-next";
import { getList } from "@/api/posts";

const { t } = useI18n();

type PostItem = {
  id: string; title: string; slug: string;
  coverImage: string; excerpt: string; date: string;
  readingTime: number; tags: string[];
};

const allPosts = ref<PostItem[]>([]);

onMounted(async () => {
  try {
    const posts = await getList();
    allPosts.value = posts.map((p: any) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      coverImage: p.coverImageUrl || "",
      excerpt: p.excerpt || "",
      date: p.publishedAt || p.createdAt || "",
      readingTime: p.readingTime || 1,
      tags: Array.isArray(p.tags)
        ? p.tags.map((t: any) => (typeof t === "string" ? t : t.name))
        : [],
    }));
  } catch (e) {
    console.error("Failed to load posts", e);
  }
});

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
