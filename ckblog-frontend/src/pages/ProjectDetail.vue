<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useSeo } from "@/composables/useSeo";

type Project = {
  id: string; title: string; slug: string;
  image?: string; summary?: string; content?: string;
  techStack?: string[]; repoUrl?: string; liveUrl?: string; year?: string; role?: string;
};

const mockProjects: Project[] = [
  {
    id: "p1",
    title: "CKBlog – Vue 3 + Vite",
    slug: "ckblog-vue3-vite",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    summary: "Kişisel blog ve proje vitrini. Komponent tabanlı arayüz, mock veri ile hızlı prototip.",
    content: `
<h2>Mimari</h2>
<ul>
  <li>Frontend: Vue 3, Vite, Router, Pinia</li>
  <li>Stil: Inter tipografi, base.css tasarım sistemi</li>
  <li>Backend: (MVP) mock; plan: Node/Express + Prisma</li>
</ul>
<h3>Öne Çıkanlar</h3>
<ul>
  <li>About/Blog/Projects detay sayfaları için tutarlı UI</li>
  <li>Auth: kullanıcı ve admin akışları ayrı</li>
  <li>Yorum &amp; Kaydet (mock) bileşenleri</li>
</ul>`,
    techStack: ["Vue 3", "TypeScript", "Vite", "Pinia", "Vue Router"],
    repoUrl: "https://github.com/username/ckblog",
    liveUrl: "https://ckblog.example.com",
    year: "2025",
    role: "Frontend",
  },
];

const route = useRoute();
const slug = route.params.slug as string;

const loading = ref(true);
const project = ref<Project | null>(null);

onMounted(() => {
  project.value = mockProjects.find(p => p.slug === slug) || mockProjects[0];
  if (project.value) {
    useSeo({ title: project.value.title, description: project.value.summary, image: project.value.image });
  }
  loading.value = false;
});
</script>

<template>
  <section class="container detail" v-if="!loading && project">
    <header class="detail-head">
      <h1 class="post-title h-title">{{ project.title }}</h1>
      <div class="post-meta">
        <span v-if="project.year">{{ project.year }}</span>
        <span v-if="project.role"><span class="dot">•</span> {{ project.role }}</span>
      </div>
    </header>

    <figure class="detail-cover" v-if="project.image">
      <img :src="project.image" :alt="project.title" loading="lazy" />
    </figure>

    <!-- bağlantılar -->
    <div class="project-links card">
      <a v-if="project.liveUrl" class="btn btn-primary" :href="project.liveUrl" target="_blank" rel="noopener">Canlı</a>
      <a v-if="project.repoUrl" class="btn" :href="project.repoUrl" target="_blank" rel="noopener">Repo</a>
    </div>

    <!-- meta & stack -->
    <div class="project-meta card">
      <div class="meta-grid">
        <div class="meta-box">
          <div class="meta-title">Özet</div>
          <p class="meta-text">{{ project.summary }}</p>
        </div>
        <div class="meta-box">
          <div class="meta-title">Teknolojiler</div>
          <div class="chips">
            <span v-for="t in project.techStack" :key="t" class="chip">{{ t }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- içerik -->
    <article class="detail-body card" v-if="project.content">
      <div class="prose" v-html="project.content"></div>
    </article>
  </section>

  <section class="container" v-else>
    <p>Yükleniyor…</p>
  </section>
</template>
