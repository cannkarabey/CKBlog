<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useSeo } from "@/composables/useSeo";
import { ArrowLeft, Github, ExternalLink, Calendar, Shield } from "lucide-vue-next";
import { getBySlug } from "@/api/projects";

type Project = {
  id: string; title: string; slug: string;
  coverImage?: string; summary?: string; content?: string;
  techStack?: string[]; repoUrl?: string; liveUrl?: string;
  year?: string; role?: string;
};

const route = useRoute();
const router = useRouter();
const { locale, t } = useI18n();
const slug = route.params.slug as string;

const loading = ref(true);
const project = ref<Project | null>(null);

onMounted(async () => {
  try {
    const data = await getBySlug(slug) as any;
    project.value = {
      id: data.id,
      title: data.title,
      slug: data.slug,
      coverImage: data.coverImageUrl,
      summary: data.summary,
      content: data.content,
      techStack: data.techStack,
      repoUrl: data.repoUrl,
      liveUrl: data.liveUrl,
    };
    if (project.value) {
      useSeo({
        title: project.value.title,
        description: project.value.summary,
        image: project.value.coverImage,
      });
    }
  } catch {
    router.replace({ name: "projects", params: { locale: route.params.locale || "tr" } });
  } finally {
    loading.value = false;
  }
});

const coverSrc = computed(
  () => project.value?.coverImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop"
);

function goBack() {
  router.push({ name: "projects", params: { locale: route.params.locale || "tr" } });
}
</script>

<template>
  <!-- Loading -->
  <div v-if="loading" class="project-detail-loading">
    <div class="loading-spinner"></div>
    <p class="loading-text">{{ t("common.loading") }}</p>
  </div>

  <!-- Content -->
  <article v-else-if="project" class="project-detail">
    <!-- Back button -->
    <div class="project-detail-nav">
      <button class="back-btn" @click="goBack">
        <ArrowLeft class="back-icon" />
        <span>{{ t("projects.backToProjects") }}</span>
      </button>
    </div>

    <!-- Hero: Cover Image -->
    <div class="project-detail-hero">
      <img :src="coverSrc" :alt="project.title" loading="lazy" class="hero-cover-img" />
    </div>

    <!-- Main content wrapper -->
    <div class="project-detail-content">
      <!-- Header -->
      <header class="project-detail-header">
        <!-- Tech Stack Tags -->
        <div v-if="project.techStack?.length" class="project-tags">
          <span
            v-for="tech in project.techStack"
            :key="tech"
            class="project-tag"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Title -->
        <h1 class="project-title">{{ project.title }}</h1>

        <!-- Summary -->
        <p v-if="project.summary" class="project-summary">{{ project.summary }}</p>

        <!-- Meta bar -->
        <div class="project-meta">
          <div class="meta-left">
            <span v-if="project.year" class="meta-item">
              <Calendar class="meta-icon" />
              {{ project.year }}
            </span>
            <span v-if="project.role" class="meta-divider"></span>
            <span v-if="project.role" class="meta-item">
              <Shield class="meta-icon" />
              {{ project.role }}
            </span>
          </div>
        </div>
      </header>

      <!-- Action bar: Links -->
      <div class="project-actions">
        <div class="action-group">
          <a
            v-if="project.repoUrl"
            class="action-btn"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener"
          >
            <Github class="action-icon" />
            <span>{{ t("projects.viewRepo") }}</span>
          </a>
          <a
            v-if="project.liveUrl"
            class="action-btn action-btn-primary"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener"
          >
            <ExternalLink class="action-icon" />
            <span>{{ t("projects.viewLive") }}</span>
          </a>
        </div>
      </div>

      <!-- Article body -->
      <div v-if="project.content" class="project-body">
        <div class="prose" v-html="project.content"></div>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* ===========================
   PROJECT DETAIL — Editorial Layout
   =========================== */

/* Loading */
.project-detail-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1rem;
}
.loading-spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid var(--color-border-default);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.loading-text {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

/* Layout */
.project-detail {
  max-width: 100%;
  padding-bottom: 4rem;
}

/* Navigation */
.project-detail-nav {
  max-width: 820px;
  margin: 0 auto;
  padding: 1.25rem 1rem 0;
}
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid var(--color-border-default);
  background: var(--color-bg-surface);
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.back-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: var(--color-bg-elevated);
}
.back-icon {
  width: 0.875rem;
  height: 0.875rem;
}

/* Hero cover */
.project-detail-hero {
  position: relative;
  width: 100%;
  max-width: 820px;
  margin: 1.25rem auto 0;
  padding: 0 1rem;
}
.hero-cover-img {
  width: 100%;
  aspect-ratio: 21 / 9;
  object-fit: cover;
  display: block;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-default);
}

/* Content wrapper */
.project-detail-content {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header */
.project-detail-header {
  padding: 2rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Tags */
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.project-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  background: var(--color-accent-badge);
  color: var(--color-accent-badge-text);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

/* Title */
.project-title {
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  margin: 0;
}

/* Summary */
.project-summary {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 60ch;
}

/* Meta info */
.project-meta {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-top: 1px solid var(--color-border-default);
  border-bottom: 1px solid var(--color-border-default);
}
.meta-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  font-weight: 500;
}
.meta-icon {
  width: 0.875rem;
  height: 0.875rem;
  opacity: 0.7;
}
.meta-divider {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-text-muted);
  opacity: 0.4;
}

/* Action bar */
.project-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
}
.action-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid var(--color-border-default);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}
.action-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: rgba(168, 85, 247, 0.06);
}
.action-btn-primary {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}
.action-btn-primary:hover {
  background: var(--color-accent-glow);
  border-color: var(--color-accent-glow);
  color: #fff;
}
.action-icon {
  width: 0.875rem;
  height: 0.875rem;
}

/* Article body */
.project-body {
  padding: 2rem 0;
}

/* Prose styling (matches BlogDetail) */
.project-body .prose {
  max-width: 100%;
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--color-text-primary);
}
.project-body .prose h2 {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  margin: 2.5rem 0 1rem;
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
}
.project-body .prose h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 2rem 0 0.75rem;
  color: var(--color-text-primary);
}
.project-body .prose p {
  margin: 0 0 1.25rem;
  color: var(--color-text-secondary);
}
.project-body .prose a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s ease;
}
.project-body .prose a:hover {
  color: var(--color-accent-glow);
}
.project-body .prose strong {
  color: var(--color-text-primary);
  font-weight: 600;
}
.project-body .prose blockquote {
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  border-left: 3px solid var(--color-accent);
  background: var(--color-bg-surface);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  color: var(--color-text-secondary);
  font-style: italic;
}
.project-body .prose pre {
  margin: 1.5rem 0;
  padding: 1.25rem 1.5rem;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.7;
}
.project-body .prose code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  color: var(--color-accent-badge-text);
  background: var(--color-accent-badge);
  padding: 0.15em 0.4em;
  border-radius: 0.25rem;
}
.project-body .prose pre code {
  background: none;
  padding: 0;
  color: var(--color-text-primary);
  font-size: 0.875rem;
}
.project-body .prose ul,
.project-body .prose ol {
  margin: 1rem 0 1.5rem;
  padding-left: 1.5rem;
}
.project-body .prose li {
  margin-bottom: 0.5rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}
.project-body .prose li strong {
  color: var(--color-text-primary);
}

/* ===========================
   RESPONSIVE
   =========================== */
@media (max-width: 640px) {
  .project-detail-hero {
    padding: 0 0.5rem;
  }
  .hero-cover-img {
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-lg);
  }
  .project-detail-content {
    padding: 0 1rem;
  }
  .project-title {
    font-size: 1.5rem;
  }
  .project-summary {
    font-size: 1rem;
  }
  .project-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
  .action-group {
    justify-content: center;
  }
  .project-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .meta-left {
    flex-wrap: wrap;
  }
}
</style>
