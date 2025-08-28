<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { locale } = useI18n();
const route = useRoute();
const router = useRouter();

function setLocale(loc: "tr" | "en") {
  locale.value = loc;
  const params = { ...route.params, locale: loc === "tr" ? "tr" : "en" };
  router.push({ name: route.name as string, params, query: route.query });
}
</script>

<template>
  <div class="flex items-center gap-2">
    <button class="text-sm underline" @click="setLocale('tr')">TR</button>
    <span>/</span>
    <button class="text-sm underline" @click="setLocale('en')">EN</button>
  </div>
</template>
