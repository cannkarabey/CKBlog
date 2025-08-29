<script setup lang="ts">
defineProps<{
  title: string; slug: string; excerpt?: string;
  coverImageUrl?: string; publishedAt?: string; tags?: string[];
}>();
</script>

<template>
  <article class="card" style="display:flex; flex-direction:column; gap:10px;">
    <div v-if="coverImageUrl" style="height:160px; overflow:hidden; border-radius:12px;">
      <img :src="coverImageUrl" alt="" style="width:100%; height:100%; object-fit:cover;" />
    </div>
    <RouterLink :to="{ name: 'blog-detail', params: { slug } }">
      <h3 style="margin:0 0 6px;">{{ title }}</h3>
    </RouterLink>
    <p v-if="excerpt" class="muted" style="margin:0;">{{ excerpt }}</p>
    <small class="muted">
      <span v-if="publishedAt">{{ new Date(publishedAt).toLocaleDateString() }}</span>
      <template v-if="tags?.length"> · {{ tags.join(", ") }}</template>
    </small>
  </article>
</template>
