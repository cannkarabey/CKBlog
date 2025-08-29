<script setup lang="ts">
import SectionHeader from "../components/SectionHeader.vue";
import PostCard from "../components/PostCard.vue";

const posts = Array.from({ length: 9 }).map((_, i) => ({
  id: String(i+1),
  title: `Örnek Yazı ${i+1}`,
  slug: `ornek-yazi-${i+1}`,
  excerpt: "Kısa açıklama…",
  publishedAt: new Date(Date.now() - i*86400000).toISOString(),
  tags: i%2 ? ["vue","tips"] : ["javascript"],
}));
</script>

<template>
  <section>
    <SectionHeader title="Blog" subtitle="Yazılarımın listesi." />
    <div class="grid cols-3">
      <PostCard v-for="p in posts" :key="p.id" v-bind="p" />
    </div>
  </section>
</template>
