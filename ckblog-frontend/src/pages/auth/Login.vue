<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute(); const router = useRouter();
const auth = useAuthStore();

const email = ref(""); const password = ref("");
const loading = ref(false); const error = ref("");

async function onSubmit(e: Event) {
  e.preventDefault(); if (loading.value) return;
  loading.value = true; error.value = "";
  try {
    // backend yoksa demo akış
    if (import.meta.env.DEV) {
      await new Promise(r => setTimeout(r, 600));
      localStorage.setItem("ckblog:accessToken","demo-user");
      // sahte kullanıcı
      // @ts-ignore
      auth.user = { id:"u1", name:"Ziyaretçi", email: email.value, role:"AUTHOR" };
    } else {
      await auth.login(email.value, password.value);
    }
    router.push({ name: "home", params:{ locale: route.params.locale || "tr" } });
  } catch (e: any) {
    error.value = e?.response?.data?.error?.message || "Giriş başarısız";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="auth">
    <div class="auth-head">
      <h1 class="h-title" style="margin:0;">Giriş Yap</h1>
      <p class="h-sub">Yorum yapabilmek ve yazıları kaydetmek için giriş yap.</p>
    </div>

    <form class="auth-card card" @submit="onSubmit">
      <div class="f-group">
        <label class="f-label" for="email">Email</label>
        <input id="email" v-model="email" type="email" class="f-input" placeholder="ornek@email.com" required />
      </div>

      <div class="f-group">
        <label class="f-label" for="pw">Şifre</label>
        <input id="pw" v-model="password" type="password" class="f-input" placeholder="••••••••" required />
      </div>

      <button class="btn btn-primary auth-btn" :disabled="loading">{{ loading ? "Giriş..." : "Giriş" }}</button>
      <p v-if="error" class="auth-error">{{ error }}</p>

      <p class="muted" style="text-align:center; margin:8px 0 0;">
        Hesabın yok mu?
        <RouterLink :to="{ name:'user-register', params:{ locale: route.params.locale || 'tr' } }">Kayıt Ol</RouterLink>
      </p>
    </form>
  </section>
</template>
