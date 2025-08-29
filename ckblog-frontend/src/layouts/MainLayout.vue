<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
  <div class="page">                   <!--  page -->
    <AppHeader />
    <main class="container main page-main">
      <RouterView />
    </main>
    <AppFooter />                      <!-- footer her sayfada -->
  </div>
</template>
