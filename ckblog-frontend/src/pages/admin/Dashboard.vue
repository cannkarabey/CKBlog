<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
const auth = useAuthStore();
</script>

<template>
  <section>
    <h1 style="font-size:24px; font-weight:700; margin:0 0 8px;">Dashboard</h1>
    <p>Hoş geldin, {{ auth.user?.name || "Admin" }}!</p>
    <button class="btn" style="margin-top:12px; border:1px solid var(--border);" @click="auth.logout()">Çıkış</button>
  </section>
</template>
