<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useSeo } from "@/composables/useSeo";
import SaveButton from "@/components/SaveButton.vue";
import CommentBox from "@/components/CommentBox.vue";
import { ArrowLeft, Calendar, Clock, Share2, Link2, Tag } from "lucide-vue-next";

import { getMockPostBySlug } from "@/mocks/posts";

type PostLike = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImageUrl?: string;
  image?: string;
  content?: string;
  publishedAt?: string;
  tags?: string[];
};

const route = useRoute();
const router = useRouter();
const { locale, t } = useI18n();
const slug = route.params.slug as string;

const loading = ref(true);
const post = ref<PostLike | null>(null);
const copied = ref(false);

const currentUrl = computed(() =>
  typeof window !== "undefined" ? window.location.origin + route.fullPath : ""
);

const fallbackImage =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop";
const fallbackContent = `
  <h2>Modern Web Geliştirme</h2>
  <p>Bu içerik <strong>mock modunda</strong> gösteriliyor. Backend bağlandığında gerçek içerik buraya yüklenecek.</p>
  <p>Vue 3 Composition API ile modern, reactive ve performanslı uygulamalar geliştirebilirsiniz. <code>ref</code>, <code>reactive</code>, <code>computed</code> ve <code>watchEffect</code> gibi yapılar sayesinde state yönetimi oldukça basitleşiyor.</p>
  <blockquote>İyi bir geliştirici olmak için sürekli öğrenmek ve paylaşmak gerekir.</blockquote>
  <h3>Temel Kavramlar</h3>
  <ul>
    <li><strong>Reactivity:</strong> Vue'nun reaktif sistemi sayesinde veri değişiklikleri otomatik olarak DOM'a yansır.</li>
    <li><strong>Composition API:</strong> Mantığı fonksiyonel olarak organize etmenizi sağlar.</li>
    <li><strong>TypeScript:</strong> Tip güvenliği ile hataları compile time'da yakalarsınız.</li>
  </ul>
  <pre><code>const count = ref(0)
const doubled = computed(() => count.value * 2)</code></pre>
  <p>Daha fazla bilgi için resmi <a href="https://vuejs.org">Vue.js</a> dokümantasyonuna göz atabilirsiniz.</p>
`;

onMounted(() => {
  const data = getMockPostBySlug(slug) as PostLike | null;
  if (!data) {
    router.replace({ name: "blog-list", params: { locale: route.params.locale || "tr" } });
    return;
  }
  post.value = data;

  useSeo({
    title: data.title,
    description: data.excerpt,
    image: data.image || data.coverImageUrl || fallbackImage,
  });

  loading.value = false;
});

const dateFormatted = computed(() => {
  if (!post.value?.publishedAt) return "";
  return new Date(post.value.publishedAt).toLocaleDateString(locale.value === "tr" ? "tr-TR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const readingTime = computed(() => {
  const content = post.value?.content || fallbackContent;
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
});

const coverSrc = computed(
  () => post.value?.image || post.value?.coverImageUrl || fallbackImage
);
const htmlContent = computed(
  () => post.value?.content || fallbackContent
);

function copyLink() {
  navigator.clipboard.writeText(currentUrl.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}

function goBack() {
  router.push({ name: "blog-list", params: { locale: route.params.locale || "tr" } });
}
</script>

<template>
  <!-- Loading state -->
  <div v-if="loading" class="blog-detail-loading">
    <div class="loading-spinner"></div>
    <p class="loading-text">{{ t('common.loading') }}</p>
  </div>

  <!-- Content -->
  <article v-else-if="post" class="blog-detail">
    <!-- Back button -->
    <div class="blog-detail-nav">
      <button class="back-btn" @click="goBack">
        <ArrowLeft class="back-icon" />
        <span>{{ t('nav.blog') }}</span>
      </button>
    </div>

    <!-- Hero: Cover Image -->
    <div class="blog-detail-hero">
      <img :src="coverSrc" :alt="post.title" loading="lazy" class="hero-cover-img" />
      <div class="hero-cover-overlay"></div>
    </div>

    <!-- Main content wrapper -->
    <div class="blog-detail-content">
      <!-- Header -->
      <header class="blog-detail-header">
        <!-- Tags -->
        <div v-if="post.tags?.length" class="blog-tags">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="blog-tag"
          >
            <Tag class="tag-icon" />
            {{ tag }}
          </span>
        </div>

        <!-- Title -->
        <h1 class="blog-title">{{ post.title }}</h1>

        <!-- Excerpt -->
        <p v-if="post.excerpt" class="blog-excerpt">{{ post.excerpt }}</p>

        <!-- Meta bar -->
        <div class="blog-meta">
          <div class="meta-left">
            <span v-if="dateFormatted" class="meta-item">
              <Calendar class="meta-icon" />
              {{ dateFormatted }}
            </span>
            <span class="meta-divider"></span>
            <span class="meta-item">
              <Clock class="meta-icon" />
              {{ readingTime }} {{ t('blog.readingTime') }}
            </span>
          </div>
        </div>
      </header>

      <!-- Action bar -->
      <div class="blog-actions">
        <SaveButton :postId="post.id" />
        <div class="action-group">
          <a
            class="action-btn"
            :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`"
            target="_blank"
            rel="noopener"
            :title="locale === 'tr' ? 'X\'te Paylaş' : 'Share on X'"
          >
            <Share2 class="action-icon" />
            <span>{{ locale === 'tr' ? 'Paylaş' : 'Share' }}</span>
          </a>
          <button class="action-btn" @click="copyLink" :title="locale === 'tr' ? 'Linki Kopyala' : 'Copy Link'">
            <Link2 class="action-icon" />
            <span>{{ copied ? (locale === 'tr' ? 'Kopyalandı!' : 'Copied!') : (locale === 'tr' ? 'Kopyala' : 'Copy') }}</span>
          </button>
        </div>
      </div>

      <!-- Article body -->
      <div class="blog-body">
        <div class="prose" v-html="htmlContent"></div>
      </div>

      <!-- Comments section -->
      <div class="blog-comments">
        <CommentBox />
      </div>
    </div>
  </article>
</template>

<style scoped>
/* ===========================
   BLOG DETAIL — Clean Editorial
   =========================== */

/* Loading */
.blog-detail-loading {
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
.blog-detail {
  max-width: 100%;
  padding-bottom: 4rem;
}

/* Navigation */
.blog-detail-nav {
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
.blog-detail-hero {
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
.hero-cover-overlay {
  display: none;
}

/* Content wrapper */
.blog-detail-content {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header */
.blog-detail-header {
  padding: 2rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Tags */
.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.blog-tag {
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
.tag-icon {
  width: 0.7rem;
  height: 0.7rem;
  opacity: 0.7;
}

/* Title */
.blog-title {
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  margin: 0;
}

/* Excerpt */
.blog-excerpt {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 60ch;
}

/* Meta info */
.blog-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.blog-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.action-icon {
  width: 0.875rem;
  height: 0.875rem;
}

/* Article body */
.blog-body {
  padding: 2rem 0;
}

/* Prose styling */
.blog-body .prose {
  max-width: 100%;
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--color-text-primary);
}
.blog-body .prose h2 {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  margin: 2.5rem 0 1rem;
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
}
.blog-body .prose h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 2rem 0 0.75rem;
  color: var(--color-text-primary);
}
.blog-body .prose p {
  margin: 0 0 1.25rem;
  color: var(--color-text-secondary);
}
.blog-body .prose a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s ease;
}
.blog-body .prose a:hover {
  color: var(--color-accent-glow);
}
.blog-body .prose strong {
  color: var(--color-text-primary);
  font-weight: 600;
}
.blog-body .prose blockquote {
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  border-left: 3px solid var(--color-accent);
  background: var(--color-bg-surface);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  color: var(--color-text-secondary);
  font-style: italic;
}
.blog-body .prose pre {
  margin: 1.5rem 0;
  padding: 1.25rem 1.5rem;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.7;
}
.blog-body .prose code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  color: var(--color-accent-badge-text);
  background: var(--color-accent-badge);
  padding: 0.15em 0.4em;
  border-radius: 0.25rem;
}
.blog-body .prose pre code {
  background: none;
  padding: 0;
  color: var(--color-text-primary);
  font-size: 0.875rem;
}
.blog-body .prose ul,
.blog-body .prose ol {
  margin: 1rem 0 1.5rem;
  padding-left: 1.5rem;
}
.blog-body .prose li {
  margin-bottom: 0.5rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}
.blog-body .prose li strong {
  color: var(--color-text-primary);
}
.blog-body .prose img {
  max-width: 100%;
  border-radius: var(--radius-md);
  margin: 1.5rem 0;
}

/* Comments section */
.blog-comments {
  padding-top: 1rem;
  border-top: 1px solid var(--color-border-default);
}

/* ===========================
   RESPONSIVE
   =========================== */
@media (max-width: 640px) {
  .blog-detail-hero {
    padding: 0 0.5rem;
  }
  .hero-cover-img {
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-lg);
  }
  .blog-detail-content {
    padding: 0 1rem;
  }
  .blog-title {
    font-size: 1.5rem;
  }
  .blog-excerpt {
    font-size: 1rem;
  }
  .blog-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
  .action-group {
    justify-content: center;
  }
  .blog-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .meta-left {
    flex-wrap: wrap;
  }
  .action-btn span {
    display: none;
  }
  .action-btn {
    padding: 0.625rem;
  }
}
</style>
