<script setup lang="ts">
import AppFooter from "../components/AppFooter.vue";
</script>

<template>
  <div class="page">
    <div style="display:grid; grid-template-columns: 240px 1fr; flex:1 0 auto; min-height:0;">
      <aside style="border-right:1px solid var(--border); padding:16px;">Admin Sidebar</aside>
      <main class="container main page-main" style="padding:16px 0;">
        <RouterView />
      </main>
    </div>
    <AppFooter />
  </div>
</template>
