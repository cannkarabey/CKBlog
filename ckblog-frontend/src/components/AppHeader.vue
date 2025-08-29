<script setup lang="ts">
import { useRoute } from "vue-router";
import LangSwitcher from "./LangSwitcher.vue";
const route = useRoute();
const localeParam = (route.params.locale as string) || "tr";
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <RouterLink :to="{ name: 'home', params: { locale: localeParam } }" class="logo">
        CKBlog
      </RouterLink>

      <div class="right">
        <nav class="nav" aria-label="Main">
          <RouterLink :to="{ name: 'blog-list', params: { locale: localeParam } }">Blog</RouterLink>
          <RouterLink :to="{ name: 'projects',  params: { locale: localeParam } }">Projects</RouterLink>
          <RouterLink :to="{ name: 'about',     params: { locale: localeParam } }">About</RouterLink>
        </nav>

        <LangSwitcher />

        <RouterLink class="btn btn-primary" :to="{ name: 'login', params: { locale: localeParam } }">
          Login
        </RouterLink>
      </div>
    </div>
  </header>
</template>
