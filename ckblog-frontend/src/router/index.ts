import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";  // tip olarak import et. Bu hata, RouteRecordRaw’ı runtime’da import etmeye çalıştığın için oluyor. RouteRecordRaw sadece TypeScript tipi; JS çıktısında yok. Çözüm: onu type import yap veya tamamen kaldır.
import i18n from "../i18n";
import { useAuthStore } from "../stores/auth";
const isMock = import.meta.env.VITE_USE_MOCK === "1";

const routes: RouteRecordRaw[] = [
  {
    path: "/:locale(tr|en)?",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      { path: "", name: "home", component: () => import("../pages/Home.vue") },
      { path: "blog", name: "blog-list", component: () => import("../pages/BlogList.vue") },
      { path: "blog/:slug", name: "blog-detail", component: () => import("../pages/BlogDetail.vue") },
      { path: "projects", name: "projects", component: () => import("../pages/Projects.vue") },
      { path: "projects/:slug", name: "project-detail", component: () => import("../pages/ProjectDetail.vue") },
      { path: "about", name: "about", component: () => import("../pages/About.vue") },
    ],
  },
  {
    path: "/:locale(tr|en)?/admin",
    component: () => import("../layouts/AdminLayout.vue"),
    children: [
      { path: "login", name: "login", component: () => import("../pages/admin/Login.vue") },
      { path: "", name: "dashboard", component: () => import("../pages/admin/Dashboard.vue"), meta: { requiresAuth: true } },
    ],
  },

  // locale’siz köke geleni default locale’e gönder
  { path: "/", redirect: "/tr" },

  // fallback
  { path: "/:pathMatch(.*)*", redirect: "/tr" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach(async (to) => {
  // LOCALE SENKRONU (sende zaten var)
  // ...

  // AUTH GUARD
  if (!to.meta.requiresAuth) return true;
  if (isMock) return true; // ⬅️ mock modda koruma yok

  const auth = useAuthStore();
  if (!auth.user && localStorage.getItem("ckblog:accessToken")) {
    try { await auth.fetchMe(); } catch {}
  }
  if (!auth.user) {
    return { name: "login", params: { locale: (to.params.locale as string) || "tr" } };
  }
  return true;
});
export default router;
