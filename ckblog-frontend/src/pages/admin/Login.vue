<script setup lang="ts">
import { ref } from "vue";                 /* <-- EKLE */
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute(); 
const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const showPw = ref(false);
const loading = ref(false);
const error = ref("");

async function onSubmit(e: Event) {
  e.preventDefault();
  if (loading.value) return;
  loading.value = true; error.value = "";
  try {
    await auth.login(email.value, password.value);
    router.push({ name: "dashboard", params: { locale: route.params.locale || "tr" } });
  } catch (e: any) {
    if (import.meta.env.DEV) {
      await new Promise(r => setTimeout(r, 700));
      localStorage.setItem("ckblog:accessToken", "demo");
      await auth.fetchMe().catch(()=>{});
      router.push({ name: "dashboard", params: { locale: route.params.locale || "tr" } });
    } else {
      error.value = e?.response?.data?.error?.message || "Giriş başarısız. Bilgileri kontrol et.";
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="auth">
    <div class="auth-head">
      <h1 class="h-title" style="margin:0;">Admin Login</h1>
      <p class="h-sub">Yönetim paneline giriş yap.</p>
    </div>

    <form class="auth-card card" @submit="onSubmit">
      <div class="f-group">
        <label class="f-label" for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="username"
          class="f-input"
          placeholder="Email"
          required
        />
      </div>

      <div class="f-group">
        <label class="f-label" for="password">Password</label>
        <div class="f-input-wrap">
          <input
            id="password"
            v-model="password"
            :type="showPw ? 'text' : 'password'"
            autocomplete="current-password"
            class="f-input no-margin"
            placeholder="Password"
            required
          />
          <button type="button" class="f-toggle" @click="showPw = !showPw">
            {{ showPw ? "Gizle" : "Göster" }}
          </button>
        </div>
      </div>

      <button class="btn btn-primary auth-btn" :disabled="loading">
        {{ loading ? "Giriş yapılıyor…" : "Giriş" }}
      </button>

      <p v-if="error" class="auth-error">{{ error }}</p>
    </form>
  </section>
</template>
