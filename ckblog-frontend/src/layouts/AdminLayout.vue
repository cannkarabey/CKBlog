<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import AdminSidebar from "@/components/admin/AdminSidebar.vue";

const route = useRoute();
const isLogin = computed(() => route.name === "login");
</script>

<template>
  <!-- LOGIN sayfası: header + sade içerik + footer -->
  <div v-if="isLogin" class="page">
    <AppHeader />
    <main class="container page-main">
      <RouterView />
    </main>
    <AppFooter />
  </div>

  <!-- Yönetim ekranları: sol sidebar + içerik -->
  <div v-else class="admin-grid">
    <AdminSidebar />
    <main class="container main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.admin-grid {
  min-height: 100%;
  display: grid;
  grid-template-columns: 240px 1fr;
}
</style>
