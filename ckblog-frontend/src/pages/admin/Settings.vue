<script setup lang="ts">
import { ref } from "vue";

const profile = ref({
  name: "Admin Kullanıcı",
  email: "admin@example.com",
  bio: "Kısa bio burada.",
  theme: "light",
});

function save(){
  alert("Kaydedildi (mock).");
}
</script>

<template>
  <section>
    <h1 class="h-title">Ayarlar</h1>

    <div class="grid cols-2" style="gap:20px; max-width:700px;">
      <div class="card" style="display:grid; gap:12px;">
        <input v-model="profile.name" class="f-input" placeholder="İsim" />
        <input v-model="profile.email" class="f-input" placeholder="Email" />
        <textarea v-model="profile.bio" class="f-input" rows="3" placeholder="Bio"></textarea>
        <select v-model="profile.theme" class="f-input">
          <option value="light">Açık Tema</option>
          <option value="dark">Koyu Tema</option>
        </select>

        <button class="btn btn-primary" @click="save">Kaydet</button>
      </div>
    </div>
  </section>
</template>
