<script setup lang="ts">
import SectionHeader from "../components/SectionHeader.vue";
import ProjectCard from "../components/ProjectCard.vue";

const projects = [
  { title: "CVE Explorer", slug: "cve-explorer", summary: "Elasticsearch + Vue arayüz", techStack: ["Vue","Elasticsearch","Node"], repoUrl: "#", liveUrl: "#" },
  { title: "YOLOv8 Drone", slug: "yolov8-drone", summary: "Drone obje tespiti", techStack: ["Python","YOLOv8"], repoUrl: "#", liveUrl: "#" },
  { title: "CKBlog", slug: "ckblog", summary: "Bu blogun kendisi", techStack: ["Vue 3","Vite"], repoUrl: "#", liveUrl: "#" },
  { title: "Öğrenci Portal", slug: "ogrenci-portal", summary: "Not ve ders yönetimi", techStack: ["Vue","Express","Postgres"], repoUrl: "#", liveUrl: "#" },
  { title: "Portfolio", slug: "portfolio", summary: "Kişisel site", techStack: ["Vue","Tailwind"], repoUrl: "#", liveUrl: "#" },
  { title: "CK Notes", slug: "ck-notes", summary: "Not alma uygulaması", techStack: ["Vue","IndexedDB"], repoUrl: "#", liveUrl: "#" },
];
</script>

<template>
  <section>
    <SectionHeader title="Projeler" subtitle="Üzerinde çalıştığım işler." />
    <div class="grid cols-3">
      <ProjectCard v-for="p in projects" :key="p.slug" v-bind="p" />
    </div>
  </section>
</template>
