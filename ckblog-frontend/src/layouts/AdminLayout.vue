<script setup lang="ts">
import { computed } from "vue";            /* <-- EKLE */
import { useRoute } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

const route = useRoute();
const isLogin = computed(() => route.name === "login");   /* <-- GÜNCELLE */
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
  <div v-else style="min-height:100%; display:grid; grid-template-columns: 240px 1fr;">
    <aside style="border-right:1px solid var(--border); padding:16px;">Admin Sidebar</aside>
    <main class="container main">
      <RouterView />
    </main>
  </div>
</template>
