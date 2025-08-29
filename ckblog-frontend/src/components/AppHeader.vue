<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import LangSwitcher from "./LangSwitcher.vue";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const localeParam = computed(() => (route.params.locale as string) || "tr"); // reaktif
const auth = useAuthStore();
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

        <!-- KULLANICI OTURUM DURUMU -->
        <template v-if="auth.isAuthed">
          <div class="account">
            <button class="avatar-btn" title="Hesabım">
              <img class="avatar" src="https://i.pravatar.cc/100?img=15" alt="Hesap" />
            </button>
            <div class="menu">
              <div class="menu-head">{{ auth.user?.name || "Hesabım" }}</div>
              <!-- ileride profil sayfası eklenecekse:
              <RouterLink class="menu-item" :to="{ name:'user-profile', params:{ locale: localeParam } }">Profil</RouterLink>
              -->
              <button class="menu-item" @click="auth.logout()">Çıkış</button>
              <!-- Admin girişi küçük link olarak kalsın -->
              <RouterLink class="menu-item subtle" :to="{ name: 'login', params: { locale: localeParam } }">
                Admin
              </RouterLink>
            </div>
          </div>
        </template>
        <template v-else>
          <!-- Ziyaretçi: Kullanıcı giriş/üye ol -->
          <RouterLink class="btn" :to="{ name: 'user-login', params: { locale: localeParam } }">
            Giriş
          </RouterLink>
          <RouterLink class="btn btn-primary" :to="{ name: 'user-register', params: { locale: localeParam } }">
            Kayıt Ol
          </RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>
