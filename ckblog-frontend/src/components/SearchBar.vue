<script setup lang="ts">
/**
 * Büyük (lg) pill arama çubuğu + isteğe bağlı buton.
 * v-model: modelValue
 */
const props = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
  ariaLabel?: string
  buttonText?: string          // ör: "Ara"
  showButton?: boolean         // buton göster/gizle
  size?: "md" | "lg"           // varsayılan: lg
}>(), {
  placeholder: "Ara…",
  ariaLabel: "Arama",
  buttonText: "Ara",
  showButton: true,
  size: "lg",
});

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void
  (e: "submit"): void
}>();

function onInput(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
function onSubmit(e: Event) {
  e.preventDefault();
  emit("submit");
}
</script>

<template>
  <form class="search" :class="{'search-lg': size==='lg'}" @submit="onSubmit" role="search">
    <input
      class="search-input"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      :value="modelValue"
      @input="onInput"
      type="search"
    />
    <button v-if="showButton" class="search-btn btn-primary" type="submit">
      {{ buttonText }}
    </button>
  </form>
</template>
