<script setup lang="ts">
import { ref, computed } from "vue";
import RecentPosts from "@/components/RecentPosts.vue";

/** Demo veri — backend gelince API'den dolduracağız */
type PostItem = {
  id: string; title: string; slug: string;
  image: string; excerpt?: string; publishedAt?: string; tags?: string[];
};

const allPosts = ref<PostItem[]>([
  { id:"1",  title:"Vue 3 Composition 101", slug:"vue-3-composition-101",
    image:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Setup, reactive, ref, computed…", publishedAt:"2025-08-20", tags:["vue","composition"] },
  { id:"2",  title:"Prisma ile Basit ORM Akışı", slug:"prisma-orm-akis",
    image:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Model → migrate → query zinciri.", publishedAt:"2025-08-18", tags:["node","prisma"] },
  { id:"3",  title:"Markdown’dan Blog’a", slug:"markdown-dan-bloga",
    image:"https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Basit ve hızlı içerik akışı.", publishedAt:"2025-08-10", tags:["blog","content"] },
  { id:"4",  title:"Router Guard İpuçları", slug:"router-guard-ipuclari",
    image:"https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Auth, locale ve scrollBehavior.", publishedAt:"2025-07-28", tags:["vue-router","tips"] },
  { id:"5",  title:"TypeScript ile Vue", slug:"typescript-ile-vue",
    image:"https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Props, emits ve generics.", publishedAt:"2025-07-20", tags:["typescript","vue"] },
  { id:"6",  title:"Axios Interceptor Yapısı", slug:"axios-interceptor-yapisi",
    image:"https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Refresh token ve retry akışı.", publishedAt:"2025-07-12", tags:["axios","auth"] },
  { id:"7",  title:"Performans: Vite İpuçları", slug:"vite-performans-ipuclari",
    image:"https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Kod bölme, lazy import.", publishedAt:"2025-06-30", tags:["vite","performance"] },
  { id:"8",  title:"Pinia Store Desenleri", slug:"pinia-store-desenleri",
    image:"https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Getters ve action pratikleri.", publishedAt:"2025-06-25", tags:["pinia","state"] },
  { id:"9",  title:"UI: Inter Tipografi", slug:"ui-inter-tipografi",
    image:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Clamp ve responsive ölçek.", publishedAt:"2025-06-15", tags:["ui","typography"] },
  { id:"10", title:"SEO için Head Yönetimi", slug:"seo-icin-head-yonetimi",
    image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Og tags ve dinamik title.", publishedAt:"2025-06-02", tags:["seo","head"] },
  { id:"11", title:"Dark Mode Tasarım", slug:"dark-mode-tasarim",
    image:"https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Kontrast ve token yaklaşımı.", publishedAt:"2025-05-28", tags:["ui","a11y"] },
  { id:"12", title:"Deploy: Netlify / Vercel", slug:"deploy-netlify-vercel",
    image:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop",
    excerpt:"Build config ve preview.", publishedAt:"2025-05-20", tags:["deploy","cd"] },
]);

/** Basit arama (başlık + tag) */
const q = ref("");
const filtered = computed(() => {
  if (!q.value.trim()) return allPosts.value;
  const s = q.value.toLowerCase();
  return allPosts.value.filter(p =>
    p.title.toLowerCase().includes(s) ||
    (p.tags || []).some(t => t.toLowerCase().includes(s))
  );
});
</script>

<template>
  <section class="container">
    
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
      Tüm yazılarım: notlar, mimari fikirler ve pratik ipuçları. Okumaya değer bir şey bulacağına eminim.
    </p>

    <!-- Aynı tasarım: RecentPosts bileşenini liste olarak kullan -->
    <RecentPosts
      :items="filtered"
      title="Yazılarım"
      subtitle=""
    />
  </section>
</template>
