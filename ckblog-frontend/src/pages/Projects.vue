<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import ProjectCard from "@/components/ProjectCard.vue";
import { Search, X } from "lucide-vue-next";

const { t } = useI18n();

type ProjectItem = {
  id: string; title: string; slug: string;
  coverImage: string; summary: string;
  techStack: string[];
  repoUrl?: string; liveUrl?: string;
};

const allProjects = ref<ProjectItem[]>([
  { id: "p1", title: "CVE Explorer", slug: "cve-explorer",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    summary: "Elasticsearch tabanlı güvenlik açığı arama ve analiz platformu.",
    techStack: ["Vue", "Elasticsearch", "Node.js"],
    repoUrl: "https://github.com", liveUrl: "https://example.com" },
  { id: "p2", title: "YOLOv8 Drone", slug: "yolov8-drone",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    summary: "Drone üzerinde gerçek zamanlı nesne tespiti sistemi.",
    techStack: ["Python", "YOLOv8", "OpenCV"],
    repoUrl: "https://github.com" },
  { id: "p3", title: "CKBlog", slug: "ckblog",
    coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    summary: "Bu blogun kendisi — Vue 3, Tailwind CSS, i18n ve admin panel.",
    techStack: ["Vue 3", "Tailwind", "TypeScript"],
    repoUrl: "https://github.com" },
  { id: "p4", title: "Öğrenci Portal", slug: "ogrenci-portal",
    coverImage: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1600&auto=format&fit=crop",
    summary: "Not ve ders yönetimi uygulaması. Express + PostgreSQL backend.",
    techStack: ["Vue", "Express", "PostgreSQL"],
    repoUrl: "https://github.com" },
  { id: "p5", title: "Portfolio", slug: "portfolio",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    summary: "Kişisel site ve portfolyo. Responsive tasarım, dark mode.",
    techStack: ["Vue", "Tailwind"],
    repoUrl: "https://github.com", liveUrl: "https://example.com" },
  { id: "p6", title: "CK Notes", slug: "ck-notes",
    coverImage: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1600&auto=format&fit=crop",
    summary: "Tarayıcı içi not alma uygulaması. IndexedDB ile offline destek.",
    techStack: ["Vue", "IndexedDB"],
    repoUrl: "https://github.com" },
]);

/* Collect unique techs for filter pills */
const allTechs = computed(() => {
  const set = new Set<string>();
  allProjects.value.forEach(p => p.techStack.forEach(t => set.add(t)));
  return Array.from(set).sort();
});

const activeTech = ref<string | null>(null);
const q = ref("");

const filtered = computed(() => {
  let list = allProjects.value;
  if (activeTech.value) list = list.filter(p => p.techStack.includes(activeTech.value!));
  if (q.value.trim()) {
    const s = q.value.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(s) ||
      p.summary.toLowerCase().includes(s) ||
      p.techStack.some(tg => tg.toLowerCase().includes(s))
    );
  }
  return list;
});

function toggleTech(tech: string) {
  activeTech.value = activeTech.value === tech ? null : tech;
}
function clearSearch() { q.value = ""; }
</script>

<template>
  <section class="projects-list">
    <!-- Header -->
    <div class="projects-header">
      <h1 class="projects-title">{{ t("projects.title") }}</h1>
      <p class="projects-subtitle">{{ t("projects.subtitle") }}</p>
    </div>

    <!-- Search + Tech filter -->
    <div class="toolbar">
      <div class="search-box">
        <Search class="search-icon" />
        <input
          v-model="q"
          type="text"
          :placeholder="t('projects.search')"
          class="search-input"
        />
        <button v-if="q" class="clear-btn" @click="clearSearch">
          <X class="clear-icon" />
        </button>
      </div>

      <div class="tag-pills">
        <button
          class="pill"
          :class="{ active: !activeTech }"
          @click="activeTech = null"
        >{{ t("projects.allTech") }}</button>
        <button
          v-for="tech in allTechs" :key="tech"
          class="pill"
          :class="{ active: activeTech === tech }"
          @click="toggleTech(tech)"
        >{{ tech }}</button>
      </div>
    </div>

    <!-- Grid -->
    <div v-if="filtered.length" class="card-grid">
      <ProjectCard
        v-for="project in filtered" :key="project.id"
        :title="project.title"
        :summary="project.summary"
        :slug="project.slug"
        :cover-image="project.coverImage"
        :tech-stack="project.techStack"
        :repo-url="project.repoUrl"
        :live-url="project.liveUrl"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="empty-state">
      <p>{{ t("projects.noResults") }}</p>
    </div>
  </section>
</template>

<style scoped>
/* ======= LAYOUT ======= */
.projects-list {
  max-width: 1120px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

/* ======= HEADER ======= */
.projects-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.projects-title {
  font-family: var(--font-heading, "Space Grotesk", sans-serif);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem;
}
.projects-subtitle {
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

/* Tech filter pills */
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
