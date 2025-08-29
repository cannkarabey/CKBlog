<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
const text = ref("");
function submit(){ if(!auth.isAuthed) return alert("Yorum için giriş yap."); alert("Demo: yorum gönderildi."); text.value=""; }
</script>

<template>
  <div class="card" style="display:grid; gap:8px;">
    <h3 style="margin:0;">Yorum Yap</h3>
    <textarea v-model="text" class="f-input" rows="4" placeholder="Fikrini yaz..."></textarea>
    <button class="btn btn-primary" @click="submit">Gönder</button>
    <p v-if="!auth.isAuthed" class="muted" style="margin:0;">Yorum için giriş yapmalısın.</p>
  </div>
</template>
