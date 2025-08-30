<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const locale = (route.params.locale as string) || "tr";
const auth = useAuthStore();
</script>

<template>
  <aside class="admin-sidebar">
    <div class="s-header">
      <RouterLink :to="{ name:'dashboard', params:{locale} }" class="s-logo">
        CKBlog Admin
      </RouterLink>
    </div>

    <nav class="s-nav">
      <RouterLink :to="{name:'dashboard', params:{locale}}" class="s-item">🏠 Dashboard</RouterLink>
      <RouterLink :to="{name:'admin-posts', params:{locale}}" class="s-item">📑 Posts</RouterLink>
      <RouterLink :to="{name:'admin-projects', params:{locale}}" class="s-item">💻 Projects</RouterLink>
      <RouterLink :to="{name:'admin-media', params:{locale}}" class="s-item">🖼️ Media</RouterLink>
      <RouterLink :to="{name:'admin-comments', params:{locale}}" class="s-item">💬 Comments</RouterLink>
      <RouterLink :to="{name:'admin-settings', params:{locale}}" class="s-item">⚙️ Settings</RouterLink>
    </nav>

    <div class="s-footer">
      <button class="btn" @click="auth.logout()">Çıkış</button>
    </div>
  </aside>
</template>