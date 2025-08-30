<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSeo } from "@/composables/useSeo";
import SaveButton from "@/components/SaveButton.vue";
import CommentBox from "@/components/CommentBox.vue";

/* 👇 Senin mock'unu içeri alıyoruz */
import { getMockPostBySlug } from "@/mocks/posts";

type PostLike = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImageUrl?: string;  // mock'ta bu var
  image?: string;          // bazı senaryolarda image kullandık
  content?: string;        // mock listesinde yok, detail'de fallback var
  publishedAt?: string;
  tags?: string[];
};

const route = useRoute();
const router = useRouter();
const slug = route.params.slug as string;

const loading = ref(true);
const post = ref<PostLike | null>(null);

/* Paylaş/kopyala için güvenli URL */
const currentUrl = computed(() =>
  typeof window !== "undefined" ? window.location.origin + route.fullPath : ""
);

/* Fallback görsel ve içerik */
const fallbackImage =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop";
const fallbackContent = `<p>Bu içerik <strong>mock modunda</strong> gösteriliyor. Backend bağlanınca gerçek içerik yüklenecek.</p>`;

onMounted(() => {
  // mock detail'i çek (senin fonksiyonun bulunamazsa default döndürüyor)
  const data = getMockPostBySlug(slug) as PostLike | null;
  if (!data) {
    // bulunamazsa blog listeye dön
    router.replace({ name: "blog-list", params: { locale: route.params.locale || "tr" } });
    return;
  }
  post.value = data;

  // SEO
  useSeo({
    title: data.title,
    description: data.excerpt,
    image: data.image || data.coverImageUrl || fallbackImage,
  });

  loading.value = false;
});

const dateText = computed(() =>
  post.value?.publishedAt ? new Date(post.value.publishedAt).toLocaleDateString() : ""
);

/* Template kolaylığı için normalize alanlar */
const coverSrc = computed(
  () => post.value?.image || post.value?.coverImageUrl || fallbackImage
);
const htmlContent = computed(
  () => post.value?.content || fallbackContent
);
</script>

<template>
  <section class="container detail" v-if="!loading && post">
    <!-- başlık -->
    <header class="detail-head">
      <h1 class="post-title h-title">{{ post.title }}</h1>
      <div class="post-meta">
        <span v-if="dateText">{{ dateText }}</span>
        <template v-if="post.tags?.length">
          <span class="dot">•</span>
          <span class="tags">
            <span class="tag" v-for="t in post.tags" :key="t">#{{ t }}</span>
          </span>
        </template>
      </div>
    </header>

    <!-- kapak -->
    <figure class="detail-cover">
      <img :src="coverSrc" :alt="post.title" loading="lazy" />
    </figure>

    <!-- aksiyonlar -->
    <div class="detail-actions card">
      <SaveButton :postId="post.id" />
      <div class="share">
        <a
          class="btn"
          :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`"
          target="_blank" rel="noopener"
        >Paylaş (X)</a>
        <button class="btn" @click="navigator.clipboard.writeText(currentUrl)">Linki Kopyala</button>
      </div>
    </div>

    <!-- içerik -->
    <article class="detail-body card">
      <div class="prose" v-html="htmlContent"></div>
    </article>

    <!-- yorumlar -->
    <section class="detail-comments">
      <CommentBox />
    </section>
  </section>

  <section class="container" v-else>
    <p>Yükleniyor…</p>
  </section>
</template>
