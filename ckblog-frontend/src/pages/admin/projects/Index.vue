<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import * as projects from "@/api/projects";
import AdminTable from "@/components/admin/AdminTable.vue";

const route = useRoute();
const locale = (route.params.locale as string) || "tr";

const q = ref("");
const status = ref("");
const year = ref("");
const rows = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  rows.value = await projects.getList();
  loading.value = false;
});

const filtered = computed(() =>
  rows.value.filter((r) => {
    const okQ = q.value
      ? r.title?.toLowerCase().includes(q.value.toLowerCase())
      : true;
    const okS = status.value ? r.status === status.value : true; // DRAFT | PUBLISHED
    const okY = year.value ? String(r.year || "").includes(year.value) : true;
    return okQ && okS && okY;
  })
);

async function removeItem(id: string) {
  if (!confirm("Silinsin mi?")) return;
  await projects.remove(id);
  rows.value = rows.value.filter((r) => r.id !== id);
}
</script>

<template>
  <section>
    <!-- başlık + yeni proje -->
    <div class="list-head">
      <h1 class="h-title">Projeler</h1>
      <RouterLink
        class="btn btn-primary"
        :to="{ name: 'admin-project-new', params: { locale } }"
      >
        Yeni Proje
      </RouterLink>
    </div>

    <!-- filtreler -->
    <div class="filters">
      <input v-model="q" class="f-input" placeholder="Başlık ara…" />
      <input v-model="year" class="f-input" placeholder="Yıl (örn. 2025)" />
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
        { key: 'year', label: 'Yıl' },
        { key: 'role', label: 'Rol' },
        { key: 'status', label: 'Durum' },
      ]"
      :rows="filtered"
    >
      <template #actions="{ row }">
        <RouterLink
          class="btn"
          :to="{ name: 'admin-project-edit', params: { id: row.id, locale } }"
        >
          Düzenle
        </RouterLink>
        <button class="btn" @click="removeItem(row.id)">Sil</button>
      </template>
    </AdminTable>
  </section>
</template>
