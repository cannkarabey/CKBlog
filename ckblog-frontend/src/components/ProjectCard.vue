<script setup lang="ts">
defineProps<{
  title: string; slug: string; summary?: string; coverImageUrl?: string;
  techStack?: string[]; repoUrl?: string; liveUrl?: string;
}>();
</script>

<template>
  <article class="card" style="display:flex; flex-direction:column; gap:10px;">
    <div v-if="coverImageUrl" style="height:140px; overflow:hidden; border-radius:12px;">
      <img :src="coverImageUrl" alt="" style="width:100%; height:100%; object-fit:cover;" />
    </div>
    <RouterLink :to="{ name: 'project-detail', params: { slug } }">
      <h3 style="margin:0 0 6px;">{{ title }}</h3>
    </RouterLink>
    <p v-if="summary" class="muted" style="margin:0;">{{ summary }}</p>
    <div v-if="techStack?.length" style="display:flex; gap:6px; flex-wrap:wrap; margin-top:8px;">
      <span v-for="t in techStack" :key="t" class="muted" style="border:1px solid var(--border); border-radius:999px; padding:4px 8px; font-size:12px;">{{ t }}</span>
    </div>
    <div style="display:flex; gap:8px; margin-top:8px;">
      <a v-if="repoUrl" :href="repoUrl" target="_blank" class="btn" style="border:1px solid var(--border);">Repo</a>
      <a v-if="liveUrl" :href="liveUrl" target="_blank" class="btn btn-primary">Live</a>
    </div>
  </article>
</template>
