<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Clock, ArrowRight } from 'lucide-vue-next'

defineProps<{
  title: string
  excerpt: string
  slug: string
  coverImage?: string
  date?: string
  readingTime?: number
  tags?: string[]
}>()

const { locale, t } = useI18n()
</script>

<template>
  <router-link
    :to="`/${locale}/blog/${slug}`"
    class="group block card-surface card-surface-hover p-0 overflow-hidden no-underline cursor-pointer"
  >
    <!-- Cover Image -->
    <div class="aspect-video overflow-hidden bg-bg-surface-alt">
      <img
        v-if="coverImage"
        :src="coverImage"
        :alt="title"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-text-muted">
        <span class="text-3xl">📝</span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col gap-3">
      <!-- Tags -->
      <div v-if="tags?.length" class="flex flex-wrap gap-2">
        <span
          v-for="tag in tags.slice(0, 3)"
          :key="tag"
          class="px-2.5 py-1 text-xs font-semibold rounded-full bg-accent-badge text-accent-badge-text"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-semibold text-text-primary leading-snug m-0 group-hover:text-accent transition-colors duration-200">
        {{ title }}
      </h3>

      <!-- Excerpt -->
      <p class="text-sm text-text-secondary line-clamp-2 m-0">
        {{ excerpt }}
      </p>

      <!-- Meta -->
      <div class="flex items-center justify-between text-xs text-text-muted mt-auto pt-2 border-t border-border-default">
        <div class="flex items-center gap-3">
          <span v-if="date">{{ date }}</span>
          <span v-if="readingTime" class="flex items-center gap-1">
            <Clock class="w-3 h-3" />
            {{ readingTime }} {{ t('blog.readingTime') }}
          </span>
        </div>
        <ArrowRight class="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
    </div>
  </router-link>
</template>
