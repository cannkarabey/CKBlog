<script setup lang="ts">
import { ref, onMounted } from "vue";
import AdminTable from "@/components/admin/AdminTable.vue";

interface Comment {
  id: string;
  post: string;
  author: string;
  text: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const rows = ref<Comment[]>([]);
const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    rows.value = [
      {
        id: "c1",
        post: "Mock Post 1",
        author: "Ali",
        text: "Harika yazı!",
        status: "PENDING",
      },
      {
        id: "c2",
        post: "Mock Post 2",
        author: "Ayşe",
        text: "Katılmıyorum…",
        status: "APPROVED",
      },
    ];
    loading.value = false;
  }, 200);
});

function setStatus(c: Comment, status: Comment["status"]) {
  c.status = status;
}
</script>

<template>
  <section>
    <h1 class="h-title">Yorum Moderasyonu</h1>

    <div v-if="loading">Yükleniyor…</div>
    <AdminTable
      v-else
      :columns="[
        { key: 'post', label: 'Yazı' },
        { key: 'author', label: 'Yazar' },
        { key: 'text', label: 'Yorum' },
        { key: 'status', label: 'Durum' },
      ]"
      :rows="rows"
    >
      <template #actions="{ row }">
        <button class="btn" @click="setStatus(row,'APPROVED')">Onayla</button>
        <button class="btn" @click="setStatus(row,'REJECTED')">Reddet</button>
      </template>
    </AdminTable>
  </section>
</template>
