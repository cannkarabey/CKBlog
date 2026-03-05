<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
</script>

<template>
  <div class="min-h-screen flex flex-col bg-bg-primary">
    <AppHeader />
    <main class="flex-1 pt-20 pb-12">
      <div class="container-main">
        <RouterView />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
