<script setup lang="ts">
const props = defineProps<{ page: number; pageSize: number; total: number }>();
const emit = defineEmits<{ (e: "change", page: number): void }>();

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));
const canPrev = computed(() => props.page > 1);
const canNext = computed(() => props.page < totalPages.value);

function go(p: number) {
  if (p < 1 || p > totalPages.value) return;
  emit("change", p);
}
</script>

<template>
  <div style="display:flex; align-items:center; gap:8px;">
    <button class="btn" :disabled="!canPrev" @click="go(page - 1)">Önceki</button>
    <span class="muted">Sayfa {{ page }} / {{ totalPages }}</span>
    <button class="btn" :disabled="!canNext" @click="go(page + 1)">Sonraki</button>
  </div>
</template>
