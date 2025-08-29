<script setup lang="ts">
import HeroSlider from "@/components/HeroSlider.vue";
import RecentPosts from "@/components/RecentPosts.vue";
import FeaturedProjects from "@/components/FeaturedProjects.vue";

const slides = [
  { title: "Vue Router ile Çok Dillilik", slug: "vue-router-i18n", image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop", excerpt: "URL senkronu ve ipuçları." },
  { title: "CKBlog Mimari Notları", slug: "ckblog-mimari", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop", excerpt: "Basit ama ölçeklenebilir iskelet." },
  { title: "Öğrenci Projelerini Sunma", slug: "ogrenci-proje-sunum", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop", excerpt: "Kısa özet + linklerle anlatım." },
];

const recent = [
  { id: "1", title: "Vue 3 Composition 101", slug: "vue-3-composition-101", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop", excerpt: "Setup, reactive, ref, computed…", publishedAt: "2025-08-20", tags: ["vue","composition"] },
  { id: "2", title: "Prisma ile Basit ORM Akışı", slug: "prisma-orm-akis", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop", excerpt: "Model → migrate → query zinciri.", publishedAt: "2025-08-18", tags: ["node","prisma"] },
  { id: "3", title: "Markdown’dan Blog’a", slug: "markdown-dan-bloga", image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1600&auto=format&fit=crop", excerpt: "Basit ve hızlı içerik akışı.", publishedAt: "2025-08-10", tags: ["blog","content"] },
];

const featured = [
  { title: "CVE Explorer", slug: "cve-explorer", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop", summary: "Elasticsearch + Vue arayüz", techStack: ["Vue","Elasticsearch","Node"] },
  { title: "YOLOv8 Drone", slug: "yolov8-drone", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop", summary: "Drone obje tespiti", techStack: ["Python","YOLOv8"] },
  { title: "CKBlog", slug: "ckblog", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop", summary: "Bu blogun kendisi", techStack: ["Vue 3","Vite"] },
];
</script>

<template>
  <section class="container" style="padding: 40px 0;">
    <HeroSlider :items="slides" :autoplayMs="5000" />

    <RecentPosts
      :items="recent"
      title="Son Yazılar"
      subtitle="Yeni öğrendiklerimi kısa ve anlaşılır notlarla paylaşıyorum. Kod örnekleri, mimari notlar ve pratik ipuçları burada."
    />

    <FeaturedProjects
      :items="featured"
      title="Öne Çıkan Projeler"
      subtitle="Üzerinde gururla çalıştığım projelerden bir seçki. Kod bağlantıları ve canlı demolar yakında burada."
    />
  </section>
</template>
