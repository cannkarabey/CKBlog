<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Github, Linkedin, Mail } from 'lucide-vue-next'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border-default bg-bg-primary">
    <div class="container-main py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-sm text-text-muted">
        &copy; {{ year }} CKBlog — {{ t('footer.rights') }}
      </p>

      <div class="flex items-center gap-4">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener"
          class="text-text-muted hover:text-accent transition-colors duration-200"
          aria-label="GitHub"
        >
          <Github class="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener"
          class="text-text-muted hover:text-accent transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <Linkedin class="w-5 h-5" />
        </a>
        <a
          href="mailto:contact@ckblog.com"
          class="text-text-muted hover:text-accent transition-colors duration-200"
          aria-label="Email"
        >
          <Mail class="w-5 h-5" />
        </a>
      </div>
    </div>
  </footer>
</template>
