<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowRight, Code, Terminal } from 'lucide-vue-next'
import PostCard from '@/components/PostCard.vue'
import ProjectCard from '@/components/ProjectCard.vue'

const { t, locale } = useI18n()

const recentPosts = [
  {
    id: '1',
    title: 'Vue 3 Composition API',
    slug: 'vue-3-composition-101',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Setup, reactive, ref, computed ve watchEffect kullanarak modern Vue bileşenleri oluşturma rehberi.',
    date: '2025-08-20',
    readingTime: 5,
    tags: ['Vue', 'Composition API'],
  },
  {
    id: '2',
    title: 'Prisma ile ORM Akışı',
    slug: 'prisma-orm-akis',
    coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Model tanımı, migration, query zinciri ve TypeScript entegrasyonu adım adım.',
    date: '2025-08-18',
    readingTime: 4,
    tags: ['Node.js', 'Prisma'],
  },
  {
    id: '3',
    title: 'Markdown\'dan Blog\'a',
    slug: 'markdown-dan-bloga',
    coverImage: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Markdown içerik yönetimi, sanitizasyon ve güvenli render stratejileri.',
    date: '2025-08-10',
    readingTime: 3,
    tags: ['Blog', 'Content'],
  },
]

const featuredProjects = [
  {
    title: 'CVE Explorer',
    slug: 'cve-explorer',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    summary: 'Elasticsearch tabanlı güvenlik açığı arama ve analiz platformu.',
    techStack: ['Vue', 'Elasticsearch', 'Node.js'],
    repoUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    title: 'YOLOv8 Drone',
    slug: 'yolov8-drone',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    summary: 'Gerçek zamanlı drone görüntülerinde nesne tespiti sistemi.',
    techStack: ['Python', 'YOLOv8', 'OpenCV'],
    repoUrl: 'https://github.com',
  },
  {
    title: 'CKBlog',
    slug: 'ckblog',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    summary: 'Bu blogun kendisi — Vue 3, Tailwind CSS, i18n ve admin panel.',
    techStack: ['Vue 3', 'Tailwind', 'TypeScript'],
    repoUrl: 'https://github.com',
  },
]
</script>

<template>
  <div class="space-y-20 py-4">

    <!-- ===================== HERO SECTION ===================== -->
    <section class="hero-section">
      <!-- Role Badge -->
      <div class="hero-badge">
        <Terminal class="hero-badge-icon" />
        <span>{{ t('home.hero.role') }}</span>
      </div>

      <!-- Main Heading -->
      <h1 class="hero-title">
        {{ t('home.hero.greeting') }}<br />
        <span class="hero-name">{{ t('home.hero.name') }}</span>
      </h1>

      <!-- Description -->
      <p class="hero-desc">
        {{ t('home.hero.desc') }}
      </p>

      <!-- CTA Buttons -->
      <div class="hero-cta">
        <router-link :to="`/${locale}/blog`" class="btn-primary">
          <Code class="btn-icon" />
          {{ t('nav.blog') }}
        </router-link>
        <router-link :to="`/${locale}/projects`" class="btn-outline">
          {{ t('nav.projects') }}
          <ArrowRight class="btn-icon" />
        </router-link>
      </div>
    </section>

    <!-- ================== RECENT POSTS ================== -->
    <section>
      <div class="section-head">
        <div>
          <h2 class="section-title">{{ t('home.recentPosts') }}</h2>
          <p class="section-sub">{{ t('home.recentPostsSub') }}</p>
        </div>
        <router-link :to="`/${locale}/blog`" class="view-all-link">
          {{ t('home.viewAll') }}
          <ArrowRight class="btn-icon" />
        </router-link>
      </div>

      <div class="card-grid">
        <PostCard
          v-for="post in recentPosts"
          :key="post.id"
          :title="post.title"
          :excerpt="post.excerpt"
          :slug="post.slug"
          :cover-image="post.coverImage"
          :date="post.date"
          :reading-time="post.readingTime"
          :tags="post.tags"
        />
      </div>
    </section>

    <!-- ================ FEATURED PROJECTS ================ -->
    <section>
      <div class="section-head">
        <div>
          <h2 class="section-title">{{ t('home.featuredProjects') }}</h2>
          <p class="section-sub">{{ t('home.featuredProjectsSub') }}</p>
        </div>
        <router-link :to="`/${locale}/projects`" class="view-all-link">
          {{ t('home.viewAll') }}
          <ArrowRight class="btn-icon" />
        </router-link>
      </div>

      <div class="card-grid">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.slug"
          :title="project.title"
          :summary="project.summary"
          :slug="project.slug"
          :cover-image="project.coverImage"
          :tech-stack="project.techStack"
          :repo-url="project.repoUrl"
          :live-url="project.liveUrl"
        />
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ===========================
   HERO — full width, centered
   =========================== */
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 0 2rem;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .hero-section { padding: 6rem 0 3rem; }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: var(--color-accent-badge);
  border: 1px solid var(--color-border-default);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent-badge-text);
}
.hero-badge-icon {
  width: 1rem;
  height: 1rem;
  color: var(--color-accent);
}

.hero-title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  margin: 0;
  max-width: 100%;
}

.hero-name {
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-glow) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
  color: var(--color-text-secondary);
  max-width: 38rem;
  margin: 0;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

/* ===========================
   BUTTONS
   =========================== */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 0.75rem;
  background: var(--color-accent);
  color: #0a0e1a;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  transition: filter 0.2s ease;
}
.btn-primary:hover {
  filter: brightness(1.1);
  color: #0a0e1a;
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 0.75rem;
  border: 1px solid var(--color-border-active);
  color: var(--color-text-secondary);
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease;
}
.btn-outline:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.btn-icon {
  width: 1rem;
  height: 1rem;
}

/* ===========================
   SECTION HEADERS
   =========================== */
.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--color-text-primary);
}

.section-sub {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin: 0.25rem 0 0;
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-accent);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
}
.view-all-link:hover {
  color: var(--color-accent-glow);
}

/* ===========================
   CARD GRID
   =========================== */
.card-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}
@media (min-width: 768px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .card-grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
