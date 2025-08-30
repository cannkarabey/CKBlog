<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";

const auth = useAuthStore();

// mock son içerikler
const recentPosts = ref<any[]>([]);
const recentProjects = ref<any[]>([]);

onMounted(() => {
  recentPosts.value = [
    { id:"p1", title:"Vue 3 ile Başlarken", slug:"vue3-baslangic" },
    { id:"p2", title:"Pinia Store Pratikleri", slug:"pinia-store" },
  ];
  recentProjects.value = [
    { id:"pr1", title:"CKBlog – Vue 3 + Vite", slug:"ckblog-vue3-vite" },
  ];
});
</script>

<template>
  <section>
    <h1 class="h-title">Dashboard</h1>
    <p class="h-sub">Hoş geldin, {{ auth.user?.name || "Admin" }}!</p>

    <div class="grid cols-3" style="margin-top:24px;">
      <RouterLink class="card" :to="{ name:'admin-posts', params:{ locale:'tr' }}">
        <h3>📑 Yazılar</h3>
        <p class="muted">Tüm blog yazılarını yönet.</p>
      </RouterLink>
      <RouterLink class="card" :to="{ name:'admin-projects', params:{ locale:'tr' }}">
        <h3>💻 Projeler</h3>
        <p class="muted">Projelerini ekle ve düzenle.</p>
      </RouterLink>
      <RouterLink class="card" :to="{ name:'admin-media', params:{ locale:'tr' }}">
        <h3>🖼️ Medya</h3>
        <p class="muted">Görselleri yükle ve yönet.</p>
      </RouterLink>
      <RouterLink class="card" :to="{ name:'admin-comments', params:{ locale:'tr' }}">
        <h3>💬 Yorumlar</h3>
        <p class="muted">Kullanıcı yorumlarını yönet.</p>
      </RouterLink>
      <RouterLink class="card" :to="{ name:'admin-settings', params:{ locale:'tr' }}">
        <h3>⚙️ Ayarlar</h3>
        <p class="muted">Profil ve site ayarları.</p>
      </RouterLink>
    </div>

    <div style="margin-top:40px;">
      <h2 class="h-title" style="font-size:20px;">Son Yazılar</h2>
      <ul style="margin:0; padding-left:18px;">
        <li v-for="p in recentPosts" :key="p.id">
          <RouterLink :to="{ name:'admin-post-edit', params:{ id:p.id, locale:'tr' } }">
            {{ p.title }}
          </RouterLink>
        </li>
      </ul>

      <h2 class="h-title" style="font-size:20px; margin-top:20px;">Son Projeler</h2>
      <ul style="margin:0; padding-left:18px;">
        <li v-for="p in recentProjects" :key="p.id">
          <RouterLink :to="{ name:'admin-project-edit', params:{ id:p.id, locale:'tr' } }">
            {{ p.title }}
          </RouterLink>
        </li>
      </ul>
    </div>

    <button class="btn" style="margin-top:24px; border:1px solid var(--border);" @click="auth.logout()">
      Çıkış
    </button>
  </section>
</template>
