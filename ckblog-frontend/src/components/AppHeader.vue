<script setup lang="ts">
import LangSwitcher from "./LangSwitcher.vue";
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <RouterLink to="/" style="font-weight:800; letter-spacing:.2px;">CKBlog</RouterLink>

      <nav class="nav" aria-label="Main">
        <RouterLink :to="{ name: 'blog-list' }">Blog</RouterLink>
        <RouterLink :to="{ name: 'projects' }">Projects</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
      </nav>

      <div style="display:flex; align-items:center; gap:12px;">
        <LangSwitcher />
        <button class="btn btn-primary">Login</button>
      </div>
    </div>
  </header>
</template>
