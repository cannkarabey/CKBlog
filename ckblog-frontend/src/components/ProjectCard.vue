<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ExternalLink, Github } from 'lucide-vue-next'

defineProps<{
  title: string
  summary: string
  slug: string
  coverImage?: string
  techStack?: string[]
  repoUrl?: string
  liveUrl?: string
}>()

const { locale } = useI18n()
</script>

<template>
  <router-link
    :to="`/${locale}/projects/${slug}`"
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
        <span class="text-3xl">🚀</span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col gap-3">
      <!-- Title -->
      <h3 class="text-lg font-semibold text-text-primary leading-snug m-0 group-hover:text-accent transition-colors duration-200">
        {{ title }}
      </h3>

      <!-- Summary -->
      <p class="text-sm text-text-secondary line-clamp-2 m-0">
        {{ summary }}
      </p>

      <!-- Tech Stack -->
      <div v-if="techStack?.length" class="flex flex-wrap gap-2">
        <span
          v-for="tech in techStack"
          :key="tech"
          class="px-2.5 py-1 text-xs font-semibold rounded-full bg-accent-badge text-accent-badge-text"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Links -->
      <div class="flex items-center gap-3 pt-2 border-t border-border-default">
        <a
          v-if="repoUrl"
          :href="repoUrl"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-accent transition-colors duration-200 no-underline"
          @click.stop
        >
          <Github class="w-3.5 h-3.5" />
          GitHub
        </a>
        <a
          v-if="liveUrl"
          :href="liveUrl"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-accent transition-colors duration-200 no-underline"
          @click.stop
        >
          <ExternalLink class="w-3.5 h-3.5" />
          Live
        </a>
      </div>
    </div>
  </router-link>
</template>
