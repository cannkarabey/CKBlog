<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>();
</script>

<template>
  <header style="margin: 8px 0 16px;">
    <h2 style="font-size:24px; font-weight:800; margin:0;">{{ title }}</h2>
    <p v-if="subtitle" class="muted" style="margin:6px 0 0;">{{ subtitle }}</p>
  </header>
</template>
