<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute(); const router = useRouter();
const auth = useAuthStore();

const name = ref(""); const email = ref(""); const password = ref("");
const loading = ref(false); const error = ref("");

async function onSubmit(e: Event) {
  e.preventDefault(); if (loading.value) return;
  loading.value = true; error.value = "";
  try {
    // backend yok: demo kayıt → login
    await new Promise(r => setTimeout(r, 700));
    localStorage.setItem("ckblog:accessToken","demo-user");
    // @ts-ignore
    auth.user = { id:"u1", name: name.value || "Ziyaretçi", email: email.value, role:"AUTHOR" };
    router.push({ name:"home", params:{ locale: route.params.locale || "tr" } });
  } catch (e: any) {
    error.value = e?.response?.data?.error?.message || "Kayıt başarısız";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="auth">
    <div class="auth-head">
      <h1 class="h-title" style="margin:0;">Kayıt Ol</h1>
      <p class="h-sub">Yorum, kaydetme ve daha fazlası için bir hesap oluştur.</p>
    </div>

    <form class="auth-card card" @submit="onSubmit">
      <div class="f-group">
        <label class="f-label" for="name">Ad Soyad</label>
        <input id="name" v-model="name" class="f-input" placeholder="Adın" required />
      </div>

      <div class="f-group">
        <label class="f-label" for="email">Email</label>
        <input id="email" v-model="email" type="email" class="f-input" placeholder="ornek@email.com" required />
      </div>

      <div class="f-group">
        <label class="f-label" for="pw">Şifre</label>
        <input id="pw" v-model="password" type="password" class="f-input" placeholder="En az 6 karakter" required />
      </div>

      <button class="btn btn-primary auth-btn" :disabled="loading">{{ loading ? "Oluşturuluyor..." : "Kayıt Ol" }}</button>
      <p v-if="error" class="auth-error">{{ error }}</p>

      <p class="muted" style="text-align:center; margin:8px 0 0;">
        Hesabın var mı?
        <RouterLink :to="{ name:'user-login', params:{ locale: route.params.locale || 'tr' } }">Giriş Yap</RouterLink>
      </p>
    </form>
  </section>
</template>
