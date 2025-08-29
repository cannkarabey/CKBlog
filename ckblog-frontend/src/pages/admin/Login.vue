<script setup lang="ts">
import { ref } from "vue"; 
import { useAuthStore } from "../../stores/auth";
import { useRoute, useRouter } from "vue-router";

const route = useRoute(); const router = useRouter();
const auth = useAuthStore();

const email = ref(""); const password = ref("");
const loading = ref(false); const error = ref("");

async function onSubmit(e: Event) {
  e.preventDefault();
  loading.value = true; error.value = "";
  try {
    await auth.login(email.value, password.value);
    router.push({ name: "dashboard", params: { locale: route.params.locale || "tr" } });
  } catch (e: any) {
    error.value = e?.response?.data?.error?.message || "Giriş başarısız";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section style="max-width:380px; margin:0 auto;">
    <h1 style="font-size:20px; font-weight:700; margin:0 0 12px;">Admin Login</h1>
    <form style="display:grid; gap:12px;" @submit="onSubmit">
      <input v-model="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Password" class="input" />
      <button class="btn btn-primary" style="width:100%;" :disabled="loading">
        {{ loading ? "Giriş yapılıyor..." : "Giriş" }}
      </button>
      <p v-if="error" style="color:#b91c1c;">{{ error }}</p>
    </form>
  </section>
</template>

<style scoped>
.input{ width:100%; border:1px solid var(--border); border-radius:12px; padding:8px 12px; }
</style>
