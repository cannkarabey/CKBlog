<script setup lang="ts">
type Link = { label: string; href: string };
type Chip = string;
type TimelineItem = { when: string; title: string; desc: string };

const social: Link[] = [
  { label: "GitHub",   href: "https://github.com/username" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/username" },
  { label: "E-posta",  href: "mailto:hello@ckblog.dev" },
];

const skills = {
  Languages: ["Java", "TypeScript", "JavaScript", "C", "SQL"] as Chip[],
  Frontend:  ["Vue 3", "Vite", "Pinia", "Vue Router"] as Chip[],
  Backend:   ["Node.js", "Express", "Prisma", "REST"] as Chip[],
  Tools:     ["Git", "Docker", "Postman", "Figma"] as Chip[],
};

const timeline: TimelineItem[] = [
  { when: "2025 — Güncel", title: "CKBlog", desc: "Kişisel blog ve proje vitrinim. Vue 3 + Vite ile tasarım & geliştirme." },
  { when: "2024 — 2025",   title: "Staj · Siber Güvenlik", desc: "Elasticsearch, Node.js, Vue 3 ile CVE arama projesi." },
  { when: "2013 — …",      title: "Bilgisayar Mühendisliği", desc: "Algoritmalar, veri yapıları, dağıtık sistemler ve web." },
];
</script>

<template>
  <section class="container about">
    <!-- Üst başlık: BlogList ile aynı hiyerarşi -->
    <header class="about-head">
      <h1 class="h-title" style="margin:0;">Hakkımda</h1>
      <p class="h-sub">
        Merhaba, ben Yusuf. Bilgisayar Mühendisliği öğrencisiyim. 
        Web geliştirme, veri yapıları ve uygulamalı projelerle ilgileniyorum. 
        CKBlog’da öğrendiklerimi ve ürettiğim işleri paylaşırım.
      </p>
    </header>

    <!-- Hero kart -->
    <div class="about-hero card">
      <div class="about-hero-left">
        <div class="about-avatar">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
            alt="Yusuf profil fotoğrafı"
            loading="lazy"
          />
        </div>
      </div>
      <div class="about-hero-right">
        <h2 class="about-name">Yusuf Karabey</h2>
        <p class="about-role">Bilgisayar Mühendisliği · Developer</p>
        <p class="about-bio">
          Frontend’de Vue ekosistemi, backend’de Node.js & Express ağırlıklı çalışıyorum. 
          Basit, hızlı ve sürdürülebilir arayüzler kurmayı seviyorum.
        </p>

        <div class="about-actions">
          <a v-for="l in social" :key="l.href" class="btn" :href="l.href" target="_blank" rel="noopener">
            {{ l.label }}
          </a>
        </div>
      </div>
    </div>

    <!-- Grid: Yetenekler + Zaman Çizelgesi -->
    <div class="about-grid">
      <!-- Yetenekler -->
      <section class="about-section card">
        <h3 class="about-section-title">Yetenekler</h3>

        <div class="about-skill-groups">
          <div class="about-skill-group" v-for="(list, group) in skills" :key="group">
            <div class="about-skill-head">{{ group }}</div>
            <div class="chips">
              <span class="chip" v-for="c in list" :key="c">{{ c }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Zaman Çizelgesi -->
      <section class="about-section card">
        <h3 class="about-section-title">Zaman Çizelgesi</h3>

        <ol class="about-timeline">
          <li v-for="(t, i) in timeline" :key="i" class="t-item">
            <div class="t-dot"></div>
            <div class="t-content">
              <div class="t-when">{{ t.when }}</div>
              <div class="t-title">{{ t.title }}</div>
              <p class="t-desc">{{ t.desc }}</p>
            </div>
          </li>
        </ol>
      </section>
    </div>

    <!-- İletişim Çağrısı -->
    <section class="about-cta card">
      <div class="about-cta-inner">
        <div>
          <h3 class="about-cta-title">Bir proje fikrin mi var?</h3>
          <p class="about-cta-sub h-sub" style="margin:6px 0 0;">
            Teknik yazılar, açık kaynak katkıları veya yeni bir ürün—bağlanalım.
          </p>
        </div>
        <a class="btn btn-primary" href="mailto:hello@ckblog.dev">İletişime Geç</a>
      </div>
    </section>
  </section>
</template>
