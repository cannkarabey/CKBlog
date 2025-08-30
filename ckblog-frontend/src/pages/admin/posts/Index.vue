<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import * as posts from "@/api/posts";
import AdminTable from "@/components/admin/AdminTable.vue";

const route = useRoute();
const locale = (route.params.locale as string) || "tr";

const q = ref("");
const status = ref("");
const rows = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  rows.value = await posts.getList();
  loading.value = false;
});

const filtered = computed(() =>
  rows.value.filter((r) => {
    const okQ = q.value
      ? r.title?.toLowerCase().includes(q.value.toLowerCase())
      : true;
    const okS = status.value ? r.status === status.value : true;
    return okQ && okS;
  })
);

async function remove(id: string) {
  if (!confirm("Silinsin mi?")) return;
  await posts.remove(id);
  rows.value = rows.value.filter((r) => r.id !== id);
}
</script>

<template>
  <section>
    <!-- başlık + yeni yazı butonu -->
    <div class="list-head">
      <h1 class="h-title">Yazılar</h1>
      <RouterLink
        class="btn btn-primary"
        :to="{ name: 'admin-post-new', params: { locale } }"
      >
        Yeni Yazı
      </RouterLink>
    </div>

    <!-- filtreler -->
    <div class="filters">
      <input v-model="q" class="f-input" placeholder="Başlık ara…" />
      <select v-model="status" class="f-input">
        <option value="">Tümü</option>
        <option value="DRAFT">Taslak</option>
        <option value="PUBLISHED">Yayında</option>
      </select>
    </div>

    <!-- tablo -->
    <div v-if="loading">Yükleniyor…</div>
    <AdminTable
      v-else
      :columns="[
        { key: 'title', label: 'Başlık' },
        { key: 'status', label: 'Durum' },
        { key: 'publishedAt', label: 'Tarih' },
      ]"
      :rows="filtered"
    >
      <template #actions="{ row }">
        <RouterLink
          class="btn"
          :to="{ name: 'admin-post-edit', params: { id: row.id, locale } }"
        >
          Düzenle
        </RouterLink>
        <button class="btn" @click="remove(row.id)">Sil</button>
      </template>
    </AdminTable>
  </section>
</template>
