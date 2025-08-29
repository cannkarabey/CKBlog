<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { locale } = useI18n();
const route = useRoute();
const router = useRouter();

function setLocale(loc: "tr" | "en") {
  locale.value = loc;
  const name = (route.name as string) || "home";
  router.push({ name, params: { ...route.params, locale: loc }, query: route.query });
}
</script>

<template>
  <div class="segment">
    <button class="seg-btn" :class="{ 'is-active': locale === 'tr' }" @click="setLocale('tr')">TR</button>
    <button class="seg-btn" :class="{ 'is-active': locale === 'en' }" @click="setLocale('en')">EN</button>
  </div>
</template>
