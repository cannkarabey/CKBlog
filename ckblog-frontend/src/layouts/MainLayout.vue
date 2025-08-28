<script setup lang="ts">
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
</script>

<template>
  <div style="min-height:100%; display:flex; flex-direction:column;">
    <AppHeader />
    <main class="container main">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
