<script setup lang="ts">
import { RouterLink } from "vue-router";

type Item = {
  id: string;
  title: string;
  slug: string;
  image: string;
  excerpt?: string;
  publishedAt?: string;
  tags?: string[];
};

const props = defineProps<{
  items: Item[];
  title?: string;
  subtitle?: string;
}>();
</script>

<template>
  <section class="recent">
    <header class="recent-head">
        <h2 class="recent-title h-title">{{ title || 'Son Yazılar' }}</h2>
        <p v-if="subtitle" class="recent-sub h-sub">{{ subtitle }}</p>
    </header>


    <div class="recent-grid">
      <RouterLink
        v-for="p in items"
        :key="p.id"
        class="recent-card"
        :to="{ name: 'blog-detail', params: { slug: p.slug } }"
      >
        <img :src="p.image" :alt="p.title" loading="lazy" />
        <div class="recent-overlay">          
          <h3 class="recent-card-title">{{ p.title }}</h3>
          <p v-if="p.excerpt" class="recent-excerpt">{{ p.excerpt }}</p>
          <span class="recent-meta" v-if="p.publishedAt">
            {{ new Date(p.publishedAt).toLocaleDateString() }}
          </span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
