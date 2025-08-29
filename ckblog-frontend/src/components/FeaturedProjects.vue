<script setup lang="ts">
import { RouterLink } from "vue-router";

type Item = {
  id?: string;
  title: string;
  slug: string;
  image: string;       // kapak görseli
  summary?: string;    // kısa açıklama
  techStack?: string[];// rozetler (opsiyonel)
};

const props = defineProps<{
  items: Item[];
  title?: string;
  subtitle?: string;
}>();
</script>

<template>
  <section class="featured">
    <header class="featured-head">
      <h2 class="featured-title h-title">{{ title || 'Öne Çıkan Projeler' }}</h2>
      <p v-if="subtitle" class="featured-sub h-sub">{{ subtitle }}</p>
    </header>

    <div class="featured-grid">
      <RouterLink
        v-for="p in items"
        :key="p.id || p.slug"
        class="featured-card"
        :to="{ name: 'project-detail', params: { slug: p.slug } }"
      >
        <img :src="p.image" :alt="p.title" loading="lazy" />
        <div class="featured-overlay">
          <h3 class="featured-card-title">{{ p.title }}</h3>
          <p v-if="p.summary" class="featured-excerpt">{{ p.summary }}</p>

          <div v-if="p.techStack?.length" class="featured-tags">
            <span v-for="t in p.techStack.slice(0,4)" :key="t" class="tag">{{ t }}</span>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
