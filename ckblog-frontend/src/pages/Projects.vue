<script setup lang="ts">
import { ref, computed } from "vue";
import FeaturedProjects from "@/components/FeaturedProjects.vue";

type ProjectItem = {
  id?: string;
  title: string;
  slug: string;
  image: string;
  summary?: string;
  techStack?: string[];
};

const allProjects = ref<ProjectItem[]>([
  {
    title: "CVE Explorer",
    slug: "cve-explorer",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    summary: "Elasticsearch tabanlı zafiyet arama arayüzü.",
    techStack: ["Vue", "Elasticsearch", "Node"]
  },
  {
    title: "YOLOv8 Drone",
    slug: "yolov8-drone",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    summary: "Drone üzerinde gerçek zamanlı obje tespiti.",
    techStack: ["Python", "YOLOv8"]
  },
  {
    title: "CKBlog",
    slug: "ckblog",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    summary: "Bu blogun kendisi: Vue 3 + Vite.",
    techStack: ["Vue 3", "Vite"]
  },
  {
    title: "Öğrenci Portal",
    slug: "ogrenci-portal",
    image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1600&auto=format&fit=crop",
    summary: "Not ve ders yönetimi uygulaması.",
    techStack: ["Vue", "Express", "Postgres"]
  },
  {
    title: "Portfolio",
    slug: "portfolio",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    summary: "Kişisel site / portfolyo.",
    techStack: ["Vue", "Tailwind"]
  },
  {
    title: "CK Notes",
    slug: "ck-notes",
    image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1600&auto=format&fit=crop",
    summary: "Tarayıcı içi not alma (IndexedDB).",
    techStack: ["Vue", "IndexedDB"]
  },
]);

/** Basit arama + teknoloji filtresi */
const q = ref("");
const activeTech = ref<string | null>(null);
const techs = computed(() => {
  const set = new Set<string>();
  allProjects.value.forEach(p => (p.techStack || []).forEach(t => set.add(t)));
  return Array.from(set).sort();
});

const filtered = computed(() => {
  let list = allProjects.value;
  if (activeTech.value) {
    list = list.filter(p => (p.techStack || []).includes(activeTech.value!));
  }
  if (q.value.trim()) {
    const s = q.value.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(s) ||
      (p.summary || "").toLowerCase().includes(s) ||
      (p.techStack || []).some(t => t.toLowerCase().includes(s))
    );
  }
  return list;
});

function toggleTech(t: string) {
  activeTech.value = activeTech.value === t ? null : t;
}
</script>

<template>
  <section class="container" style="padding-bottom: 8px;">
    <!-- Başlık + arama -->
    <!-- Üst bar: arama -->
    <div style="display:flex; align-items:center; justify-content:space-between; gap:16px; margin: 18px 0 6px;">
      <h1 class="h-title" style="margin:0;">Blog</h1>
      <div style="flex:0 0 120px; max-width:100%;">
        <input
          v-model="q"
          type="search"
          placeholder="Ara: başlık, etiket…"
          aria-label="Blog içinde ara"
          style="width:10 0%; padding:10px 14px;   border-radius:14px; border:1px solid var(--border); font: inherit;"
        />
      </div>
    </div>
    <p class="h-sub" style="margin: 2px 0 14px;">
      Üzerinde çalıştığım işlerden bir seçki. Kod bağlantıları ve canlı demoları da zamanla ekleyeceğim.
    </p>

    <!-- Tech filtre chip'leri -->
    <div v-if="techs.length" style="display:flex; gap:8px; flex-wrap:wrap; margin: 8px 0 18px;">
      <button
        class="btn"
        :class="{ 'btn-primary': !activeTech }"
        style="padding:8px 12px;"
        @click="activeTech = null"
      >
        Hepsi
      </button>
      <button
        v-for="t in techs"
        :key="t"
        class="btn"
        :class="{ 'btn-primary': activeTech === t }"
        style="padding:8px 12px;"
        @click="toggleTech(t)"
      >
        {{ t }}
      </button>
    </div>

    <!-- Liste: FeaturedProjects tasarımıyla aynı -->
    <FeaturedProjects
      :items="filtered"
      title=""
      subtitle=""
    />
  </section>
</template>
