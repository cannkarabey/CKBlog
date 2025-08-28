<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goBlog() {
  router.push({ name: "blog-list", params: { locale: "tr" } });
}
function goProjects() {
  router.push({ name: "projects", params: { locale: "tr" } });
}
</script>

<template>
  <section class="container" style="padding: 40px 0;">
    <!-- HERO -->
    <div style="display:grid; gap:16px; align-items:center; grid-template-columns: 1fr;">
      <div>
        <h1 style="margin:0 0 8px; font-size:34px; line-height:1.2; font-weight:800;">
          Merhaba, ben Yusuf.
        </h1>
        <p style="margin:0 0 20px; color:var(--muted); max-width:65ch;">
          CKBlog’a hoş geldin. Burada yazılarımı, notlarımı ve Bilgisayar Mühendisliği
          projelerimi paylaşıyorum.
        </p>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <button class="btn btn-primary" @click="goBlog">Yazılara Git</button>
          <button class="btn" style="border-color:var(--border); border-width:1px;" @click="goProjects">
            Projelerim
          </button>
        </div>
      </div>
    </div>

    <!-- SON YAZILAR (placeholder) -->
    <div style="margin-top:40px;">
      <h2 style="font-size:22px; font-weight:700; margin:0 0 16px;">Son Yazılar</h2>
      <div class="grid cols-3">
        <article class="card">
          <h3>Vue Router ile Çok Dillilik</h3>
          <p class="muted">URL tabanlı locale senkronu için pratik ipuçları…</p>
        </article>
        <article class="card">
          <h3>Pratik Proje Notları</h3>
          <p class="muted">Basit iskeletle hızlı blog kurulum deneyimi…</p>
        </article>
        <article class="card">
          <h3>Öğrenci Projeleri</h3>
          <p class="muted">Kısa özet ve repo bağlantılarıyla sunum.</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.muted { color: var(--muted); }
</style>
