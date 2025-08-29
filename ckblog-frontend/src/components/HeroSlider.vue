<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { RouterLink } from "vue-router";

type Slide = {
  title: string;
  slug: string;
  image: string;
  excerpt?: string;
};

const props = defineProps<{
  items: Slide[];
  autoplayMs?: number;   // default 5000
}>();

const idx = ref(0);
const hovering = ref(false);
const len = () => props.items?.length || 0;

function go(i: number) { idx.value = (i + len()) % len(); }
function next() { go(idx.value + 1); }
function prev() { go(idx.value - 1); }

let timer: number | null = null;
function start() {
  stop();
  timer = window.setInterval(() => { if (!hovering.value) next(); }, props.autoplayMs ?? 5000);
}
function stop() { if (timer) { clearInterval(timer); timer = null; } }

onMounted(start);
onBeforeUnmount(stop);
watch(() => props.items, start);

function onKey(e: KeyboardEvent) {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft")  prev();
}

// touch swipe
let startX = 0;
function onTouchStart(e: TouchEvent){ startX = e.touches[0].clientX; }
function onTouchEnd(e: TouchEvent){
  const dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) > 40){ dx < 0 ? next() : prev(); }
}
</script>

<template>
  <section class="hero-slider"
           role="region"
           aria-label="Öne çıkan yazılar"
           tabindex="0"
           @keydown="onKey"
           @mouseenter="hovering = true"
           @mouseleave="hovering = false"
           @touchstart.passive="onTouchStart"
           @touchend.passive="onTouchEnd">

    <!-- Track -->
    <div class="hero-track" :style="{ transform: `translateX(-${idx * 100}%)` }">
      <RouterLink v-for="(s, i) in items" :key="s.slug"
                  class="hero-slide"
                  :to="{ name: 'blog-detail', params: { slug: s.slug } }">
        <img :src="s.image" :alt="s.title" loading="lazy" />
        <div class="hero-overlay">
          <h3 class="hero-title">{{ s.title }}</h3>
          <p v-if="s.excerpt" class="hero-excerpt">{{ s.excerpt }}</p>
          <span class="hero-cta">Oku →</span>
        </div>
      </RouterLink>
    </div>

    <!-- Arrows -->
    <button class="hero-arrow left" aria-label="Önceki" @click="prev">‹</button>
    <button class="hero-arrow right" aria-label="Sonraki" @click="next">›</button>

    <!-- Dots -->
    <div class="hero-dots" role="tablist" aria-label="Slider sayfaları">
      <button v-for="(s, i) in items" :key="i"
              class="dot" :class="{ active: i === idx }"
              role="tab" :aria-selected="i === idx"
              :aria-label="`${i+1}. slayt`"
              @click="go(i)"></button>
    </div>
  </section>
</template>
