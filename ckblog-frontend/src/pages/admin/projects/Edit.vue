<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as projects from "@/api/projects";
import MediaPicker from "@/components/admin/MediaPicker.vue";

const route = useRoute(); 
const router = useRouter();
const id = route.params.id as string | undefined;
const locale = (route.params.locale as string) || "tr";

type Status = "DRAFT" | "PUBLISHED";

const model = ref<any>({
  title: "",
  slug: "",
  summary: "",
  content: "",
  coverImageUrl: "",
  techStack: [] as string[],
  repoUrl: "",
  liveUrl: "",
  year: "",
  role: "",
  status: "DRAFT" as Status,
});

const saving = ref(false);

/* MediaPicker kontrol */
const showPicker = ref(false);
function onSelectMedia(item: { id: string; url: string }) {
  model.value.coverImageUrl = item.url;
  showPicker.value = false;
}

/* Tech stack: input’ta virgüllü göster, modelde dizi tut */
const techString = computed({
  get: () => (model.value.techStack || []).join(", "),
  set: (v: string) => {
    model.value.techStack = v.split(",").map(x => x.trim()).filter(Boolean);
  },
});

onMounted(async () => {
  if (id) Object.assign(model.value, await projects.getById(id));
});

watch(() => model.value.title, (t) => {
  if (!id && t) {
    model.value.slug = t
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }
});

async function save() {
  saving.value = true;
  const saved = await projects.save(model.value, id);
  saving.value = false;
  router.push({ name: "admin-project-edit", params: { id: saved.id || id, locale } });
}

async function publish() {
  model.value.status = "PUBLISHED";
  await save();
}
</script>

<template>
  <section class="editor card">
    <div class="editor-grid" style="display:grid; gap:16px; grid-template-columns: 1fr; }
      @media (min-width:1024px){ grid-template-columns: 1fr 320px; }">
      
      <!-- MAIN -->
      <div class="editor-main" style="display:grid; gap:8px;">
        <input v-model="model.title" class="f-input" placeholder="Başlık" />
        <input v-model="model.slug" class="f-input" placeholder="slug" />
        <textarea v-model="model.summary" class="f-input" rows="3" placeholder="Kısa özet"></textarea>
        <textarea v-model="model.content" class="f-input" rows="12" placeholder="İçerik (Markdown/HTML)"></textarea>
      </div>

      <!-- SIDE -->
      <aside class="editor-side" style="display:grid; gap:10px;">
        <!-- Kapak -->
        <div class="card" style="padding:12px; display:grid; gap:10px;">
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <div style="font-weight:700;">Kapak Görseli</div>
            <button class="btn" @click="showPicker = true">Medya Seç</button>
          </div>

          <div v-if="model.coverImageUrl">
            <img :src="model.coverImageUrl" alt="Cover" style="max-width:100%; border-radius:8px;" />
          </div>

          <input
            v-model="model.coverImageUrl"
            class="f-input"
            placeholder="Kapak görseli URL (isteğe bağlı)"
          />
        </div>

        <!-- Tech stack (virgüllü) -->
        <input
          v-model="techString"
          class="f-input"
          placeholder="Teknolojiler (ör: Vue, TypeScript, Pinia)"
        />

        <input v-model="model.repoUrl" class="f-input" placeholder="Repo URL" />
        <input v-model="model.liveUrl" class="f-input" placeholder="Canlı URL" />
        <input v-model="model.year" class="f-input" placeholder="Yıl (örn. 2025)" />
        <input v-model="model.role" class="f-input" placeholder="Rol (örn. Frontend)" />

        <select v-model="model.status" class="f-input">
          <option value="DRAFT">DRAFT</option>
          <option value="PUBLISHED">PUBLISHED</option>
        </select>

        <div style="display:flex; gap:8px;">
          <button class="btn" :disabled="saving" @click="save">Kaydet</button>
          <button class="btn btn-primary" :disabled="saving" @click="publish">
            {{ id ? "Güncelle" : "Yayınla" }}
          </button>
        </div>
      </aside>
    </div>

    <!-- Media Picker Modal -->
    <MediaPicker v-if="showPicker" @select="onSelectMedia" @close="showPicker = false" />
  </section>
</template>
