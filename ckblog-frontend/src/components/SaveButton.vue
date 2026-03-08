<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { Bookmark, BookmarkCheck } from "lucide-vue-next";

const props = defineProps<{ postId: string }>();
const auth = useAuthStore();
const { locale } = useI18n();

const key = computed(() => `ckblog:saved:${auth.user?.id || "anon"}`);
const saved = computed<string[]>(() => JSON.parse(localStorage.getItem(key.value) || "[]"));
const isSaved = computed(() => saved.value.includes(props.postId));

function toggle() {
  const set = new Set(saved.value);
  if (set.has(props.postId)) set.delete(props.postId);
  else set.add(props.postId);
  localStorage.setItem(key.value, JSON.stringify([...set]));
}
</script>

<template>
  <button
    class="save-btn"
    :class="{ 'is-saved': isSaved }"
    @click="toggle"
    :title="isSaved ? (locale === 'tr' ? 'Kaydedildi' : 'Saved') : (locale === 'tr' ? 'Kaydet' : 'Save')"
  >
    <BookmarkCheck v-if="isSaved" class="save-icon" />
    <Bookmark v-else class="save-icon" />
    <span>{{ isSaved ? (locale === 'tr' ? 'Kaydedildi' : 'Saved') : (locale === 'tr' ? 'Kaydet' : 'Save') }}</span>
  </button>
</template>

<style scoped>
.save-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid var(--color-border-default);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.save-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: rgba(168, 85, 247, 0.06);
}
.save-btn.is-saved {
  border-color: var(--color-accent);
  background: var(--color-accent-badge);
  color: var(--color-accent-badge-text);
}
.save-icon {
  width: 0.875rem;
  height: 0.875rem;
}
</style>
