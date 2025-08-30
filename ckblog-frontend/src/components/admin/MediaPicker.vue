<script setup lang="ts">
import { ref, onMounted } from "vue";

interface MediaItem {
  id: string;
  url: string;
}

const emit = defineEmits<{
  (e: "select", item: MediaItem): void;
  (e: "close"): void;
}>();

const items = ref<MediaItem[]>([]);
const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    items.value = [
      { id: "m1", url: "https://placehold.co/600x400/png" },
      { id: "m2", url: "https://placehold.co/400x400/jpg" },
      { id: "m3", url: "https://placehold.co/300x500/webp" },
    ];
    loading.value = false;
  }, 300);
});

function choose(item: MediaItem) {
  emit("select", item);
}
</script>

<template>
  <div class="media-overlay">
    <div class="media-modal">
      <header class="media-head">
        <h2>Medya Seç</h2>
        <button class="btn" @click="emit('close')">Kapat</button>
      </header>

      <div v-if="loading" class="media-loading">Yükleniyor…</div>

      <div v-else class="media-grid">
        <div
          v-for="m in items"
          :key="m.id"
          class="media-card"
          @click="choose(m)"
        >
          <img :src="m.url" :alt="m.id" />
        </div>
      </div>
    </div>
  </div>
</template>
