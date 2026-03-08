<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useSeo } from "@/composables/useSeo";
import { ArrowLeft, Github, ExternalLink, Calendar, Shield } from "lucide-vue-next";

type Project = {
  id: string; title: string; slug: string;
  coverImage?: string; summary?: string; content?: string;
  techStack?: string[]; repoUrl?: string; liveUrl?: string;
  year?: string; role?: string;
};

const mockProjects: Project[] = [
  {
    id: "p1",
    title: "CVE Explorer",
    slug: "cve-explorer",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    summary: "Elasticsearch tabanlı güvenlik açığı arama ve analiz platformu. CVE kayıtlarını hızlıca arayabilir, filtreleyebilir ve detaylarını inceleyebilirsiniz.",
    content: `
<h2>Mimari</h2>
<p>Proje, Elasticsearch üzerinde indekslenen CVE verilerini Vue 3 tabanlı bir SPA ile sunar. Arama sonuçları debounce ile optimize edilmiştir.</p>
<ul>
  <li><strong>Frontend:</strong> Vue 3 Composition API, TypeScript</li>
  <li><strong>Backend:</strong> Node.js + Express REST API</li>
  <li><strong>Veritabanı:</strong> Elasticsearch 8.x</li>
  <li><strong>Veri Kaynağı:</strong> NVD (National Vulnerability Database)</li>
</ul>
<h3>Öne Çıkanlar</h3>
<ul>
  <li>Full-text search ile milisaniye seviyesinde sorgulama</li>
  <li>Severity (CVSS) filtresi ve tarih aralığı seçimi</li>
  <li>Detay sayfasında referans linkleri ve etkilenen ürünler</li>
  <li>Responsive kart tabanlı listeleme</li>
</ul>
<blockquote>Güvenlik açıklarını takip etmek, sadece savunma değil — bir alışkanlıktır.</blockquote>`,
    techStack: ["Vue 3", "TypeScript", "Node.js", "Elasticsearch"],
    repoUrl: "https://github.com/username/cve-explorer",
    liveUrl: "https://cve.example.com",
    year: "2025",
    role: "Full-Stack",
  },
  {
    id: "p2",
    title: "YOLOv8 Drone",
    slug: "yolov8-drone",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    summary: "Drone üzerinde gerçek zamanlı nesne tespiti. YOLOv8 modeli ile eğitim ve inference pipeline.",
    content: `
<h2>Proje Detayı</h2>
<p>Bu proje, drone kameralarından gelen canlı görüntülerde YOLOv8 modeliyle nesne tespiti yapmayı amaçlar.</p>
<ul>
  <li><strong>Model:</strong> YOLOv8n (nano) — düşük gecikmeli inference</li>
  <li><strong>Framework:</strong> Ultralytics + OpenCV</li>
  <li><strong>Veri Seti:</strong> Özel etiketlenmiş drone görüntüleri</li>
</ul>
<h3>Sonuçlar</h3>
<p>Model, 30 FPS hızında %87 mAP50 başarımı elde etmiştir.</p>`,
    techStack: ["Python", "YOLOv8", "OpenCV", "Ultralytics"],
    repoUrl: "https://github.com/username/yolov8-drone",
    year: "2025",
    role: "ML Engineer",
  },
  {
    id: "p3",
    title: "CKBlog",
    slug: "ckblog",
    coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    summary: "Kişisel blog ve proje vitrini. Komponent tabanlı arayüz, mock veri ile hızlı prototip.",
    content: `
<h2>Mimari</h2>
<ul>
  <li><strong>Frontend:</strong> Vue 3, Vite, Router, Pinia</li>
  <li><strong>Stil:</strong> Tailwind CSS 4, Space Grotesk + DM Sans tipografi</li>
  <li><strong>Backend:</strong> (MVP) mock veri; plan: Node/Express + Prisma</li>
</ul>
<h3>Öne Çıkanlar</h3>
<ul>
  <li>Blog, Proje ve Hakkımda sayfaları için tutarlı UI sistemi</li>
  <li>Türkçe / İngilizce çok dilli destek (vue-i18n)</li>
  <li>Dark mode temalı design token sistemi</li>
  <li>Yorum ve Kaydet (mock) bileşenleri</li>
</ul>`,
    techStack: ["Vue 3", "TypeScript", "Vite", "Tailwind CSS", "Pinia"],
    repoUrl: "https://github.com/username/ckblog",
    liveUrl: "https://ckblog.example.com",
    year: "2025",
    role: "Frontend Developer",
  },
  {
    id: "p4",
    title: "Öğrenci Portal",
    slug: "ogrenci-portal",
    coverImage: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1600&auto=format&fit=crop",
    summary: "Not ve ders yönetimi uygulaması. Express + PostgreSQL backend ile RESTful API.",
    content: `
<h2>Proje Kapsamı</h2>
<p>Öğrencilerin derslerini, notlarını ve ödevlerini yönetebilecekleri full-stack bir web uygulaması.</p>
<ul>
  <li><strong>Auth:</strong> JWT tabanlı kimlik doğrulama</li>
  <li><strong>CRUD:</strong> Ders, not, ödev işlemleri</li>
  <li><strong>Dashboard:</strong> Özet istatistikler ve takvim görünümü</li>
</ul>`,
    techStack: ["Vue", "Express", "PostgreSQL", "JWT"],
    repoUrl: "https://github.com/username/ogrenci-portal",
    year: "2024",
    role: "Full-Stack",
  },
  {
    id: "p5",
    title: "Portfolio",
    slug: "portfolio",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    summary: "Kişisel site ve portfolyo. Responsive tasarım, dark mode, animasyonlar.",
    content: `
<h2>Tasarım Yaklaşımı</h2>
<p>Mobile-first responsive tasarım. CSS custom property ile tema yönetimi.</p>
<ul>
  <li>Intersection Observer ile scroll animasyonları</li>
  <li>Dark / Light mode geçişi</li>
  <li>Proje ve beceri kartları</li>
</ul>`,
    techStack: ["Vue", "Tailwind CSS"],
    repoUrl: "https://github.com/username/portfolio",
    liveUrl: "https://portfolio.example.com",
    year: "2024",
    role: "Frontend Developer",
  },
  {
    id: "p6",
    title: "CK Notes",
    slug: "ck-notes",
    coverImage: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1600&auto=format&fit=crop",
    summary: "Tarayıcı içi not alma uygulaması. IndexedDB ile offline destek.",
    content: `
<h2>Teknik Detaylar</h2>
<p>Tüm veriler IndexedDB’de saklanır, sunucu gerektirmez.</p>
<ul>
  <li>Markdown desteği ile zengin not biçimlendirme</li>
  <li>Etiketleme ve arama özellikleri</li>
  <li>Export/Import (JSON format)</li>
</ul>`,
    techStack: ["Vue", "IndexedDB"],
    repoUrl: "https://github.com/username/ck-notes",
    year: "2024",
    role: "Frontend Developer",
  },
];

const route = useRoute();
const router = useRouter();
const { locale, t } = useI18n();
const slug = route.params.slug as string;

const loading = ref(true);
const project = ref<Project | null>(null);

onMounted(() => {
  project.value = mockProjects.find(p => p.slug === slug) || mockProjects[0];
  if (project.value) {
    useSeo({
      title: project.value.title,
      description: project.value.summary,
      image: project.value.coverImage,
    });
  }
  loading.value = false;
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
