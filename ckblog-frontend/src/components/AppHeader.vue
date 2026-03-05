<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Menu, X, Globe, Sun, Moon, BookOpen, FolderKanban, User } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

const mobileOpen = ref(false)
const isDark = ref(true)

const navItems = [
  { key: 'blog', icon: BookOpen, path: 'blog' },
  { key: 'projects', icon: FolderKanban, path: 'projects' },
  { key: 'about', icon: User, path: 'about' },
]

onMounted(() => {
  const saved = localStorage.getItem('ckblog:theme')
  isDark.value = saved ? saved === 'dark' : true
  applyTheme()
})

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('ckblog:theme', isDark.value ? 'dark' : 'light')
  applyTheme()
}

function applyTheme() {
  document.documentElement.classList.toggle('light', !isDark.value)
}

function switchLocale() {
  const next = locale.value === 'tr' ? 'en' : 'tr'
  locale.value = next
  const currentPath = route.path.replace(/^\/(tr|en)/, '')
  router.push(`/${next}${currentPath}`)
}

function closeMobile() {
  mobileOpen.value = false
}

watch(() => route.path, closeMobile)
</script>

<template>
  <header class="site-header">
    <div class="header-inner container-main">
      <!-- Logo -->
      <router-link :to="`/${locale}`" class="logo">
        CKBlog<span class="logo-dot">.</span>
      </router-link>

      <!-- Desktop Nav -->
      <nav class="desktop-nav">
        <router-link
          v-for="item in navItems"
          :key="item.key"
          :to="`/${locale}/${item.path}`"
          class="nav-link"
          active-class="nav-link--active"
        >
          {{ t(`nav.${item.key}`) }}
        </router-link>
      </nav>

      <!-- Right Controls -->
      <div class="header-controls">
        <!-- Theme Toggle -->
        <button @click="toggleTheme" class="control-btn" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
          <Sun v-if="isDark" class="control-icon" />
          <Moon v-else class="control-icon" />
        </button>

        <!-- Locale Toggle -->
        <button @click="switchLocale" class="control-btn locale-btn">
          <Globe class="control-icon" />
          <span>{{ locale.toUpperCase() }}</span>
        </button>

        <!-- Mobile Hamburger -->
        <button @click="mobileOpen = !mobileOpen" class="control-btn mobile-toggle">
          <Menu v-if="!mobileOpen" class="control-icon" />
          <X v-else class="control-icon" />
        </button>
      </div>
    </div>

    <!-- Mobile Nav Panel -->
    <Transition
      enter-active-class="mobile-enter-active"
      leave-active-class="mobile-leave-active"
      enter-from-class="mobile-enter-from"
      leave-to-class="mobile-leave-to"
    >
      <div v-if="mobileOpen" class="mobile-panel">
        <nav class="container-main mobile-nav">
          <router-link
            v-for="item in navItems"
            :key="item.key"
            :to="`/${locale}/${item.path}`"
            class="mobile-link"
            active-class="mobile-link--active"
          >
            <component :is="item.icon" class="mobile-link-icon" />
            {{ t(`nav.${item.key}`) }}
          </router-link>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* ===========================
   HEADER — 1.1x scaled, polished
   =========================== */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  border-bottom: 1px solid var(--color-border-default);
  background: color-mix(in srgb, var(--color-bg-primary) 92%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.5rem; /* ~72px, 1.1x of 64px */
}

/* ===========================
   LOGO
   =========================== */
.logo {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  text-decoration: none;
  transition: opacity 0.2s ease;
}
.logo:hover {
  opacity: 0.85;
  color: var(--color-text-primary);
}
.logo-dot {
  color: var(--color-accent);
}

/* ===========================
   DESKTOP NAV
   =========================== */
.desktop-nav {
  display: none;
  align-items: center;
  gap: 2.25rem;
}
@media (min-width: 768px) {
  .desktop-nav { display: flex; }
}

.nav-link {
  position: relative;
  font-size: 0.9375rem; /* 15px — 1.1x of ~14px */
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: 0.25rem 0;
  transition: color 0.2s ease;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background: var(--color-accent);
  border-radius: 1px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}
.nav-link:hover {
  color: var(--color-text-primary);
}
.nav-link:hover::after {
  transform: scaleX(1);
}
.nav-link--active {
  color: var(--color-accent);
}
.nav-link--active::after {
  transform: scaleX(1);
}

/* ===========================
   CONTROLS (right side)
   =========================== */
.header-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border-default);
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8125rem;
  font-weight: 600;
}
.control-btn:hover {
  border-color: var(--color-border-active);
  color: var(--color-text-primary);
  background: var(--color-bg-surface);
}

.control-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.locale-btn span {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.mobile-toggle {
  display: flex;
}
@media (min-width: 768px) {
  .mobile-toggle { display: none; }
}

/* ===========================
   MOBILE PANEL
   =========================== */
.mobile-panel {
  border-top: 1px solid var(--color-border-default);
  background: color-mix(in srgb, var(--color-bg-primary) 97%, transparent);
  backdrop-filter: blur(12px);
}
@media (min-width: 768px) {
  .mobile-panel { display: none; }
}

.mobile-nav {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.625rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
}
.mobile-link:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-surface);
}
.mobile-link--active {
  color: var(--color-accent);
  background: var(--color-bg-surface);
}
.mobile-link-icon {
  width: 1.125rem;
  height: 1.125rem;
}

/* === Mobile Transitions === */
.mobile-enter-active { transition: all 0.3s ease-out; }
.mobile-leave-active { transition: all 0.2s ease-in; }
.mobile-enter-from,
.mobile-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}
</style>
