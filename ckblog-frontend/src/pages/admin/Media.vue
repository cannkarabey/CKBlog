<script setup lang="ts">
import { ref, onMounted } from "vue";

interface MediaItem { id: string; url: string }

const items = ref<MediaItem[]>([]);
const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    items.value = [
      { id: "m1", url: "https://placehold.co/600x400/png" },
      { id: "m2", url: "https://placehold.co/400x400/jpg" },
    ];
    loading.value = false;
  }, 300);
});

function upload(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (!files?.length) return;
  const f = files[0];
  const id = Date.now().toString();
  items.value.unshift({ id, url: URL.createObjectURL(f) });
}

function remove(id: string) {
  if (!confirm("Silinsin mi?")) return;
  items.value = items.value.filter(m => m.id !== id);
}

async function copyUrl(url: string) {
  await navigator.clipboard.writeText(url);
  alert("URL kopyalandı!");
}
</script>

<template>
  <section>
    <div class="list-head">
      <h1 class="h-title" style="margin:0;">Medya Yönetimi</h1>
      <label class="btn btn-primary">
        Dosya Yükle
        <input type="file" style="display:none" @change="upload" />
      </label>
    </div>

    <div v-if="loading" style="margin-top:20px;">Yükleniyor…</div>

    <div v-else class="grid cols-3" style="margin-top:20px;">
      <div v-for="m in items" :key="m.id" class="media-card">
        <img :src="m.url" alt="media" class="media-img" />
        <div class="media-actions">
          <button class="btn" @click="copyUrl(m.url)">Kopyala</button>
          <button class="btn" @click="remove(m.id)">Sil</button>
        </div>
      </div>
    </div>
  </section>
</template>
