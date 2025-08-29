<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
const props = defineProps<{ postId: string }>();
const auth = useAuthStore();

const key = computed(() => `ckblog:saved:${auth.user?.id || "anon"}`);
const saved = computed<string[]>(() => JSON.parse(localStorage.getItem(key.value) || "[]"));
const isSaved = computed(() => saved.value.includes(props.postId));

function toggle(){
  const set = new Set(saved.value);
  if(set.has(props.postId)) set.delete(props.postId); else set.add(props.postId);
  localStorage.setItem(key.value, JSON.stringify([...set]));
}
</script>

<template>
  <button class="btn" :class="{ 'btn-primary': isSaved }" @click="toggle">
    {{ isSaved ? "Kaydedildi" : "Kaydet" }}
  </button>
</template>
