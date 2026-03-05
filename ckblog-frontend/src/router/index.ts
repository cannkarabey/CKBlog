import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
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
      { path: "login", name: "user-login", component: () => import("../pages/auth/Login.vue") },
      { path: "register", name: "user-register", component: () => import("../pages/auth/Register.vue") },
    ],
  },
  {
    path: "/:locale(tr|en)?/admin",
    component: () => import("../layouts/AdminLayout.vue"),
    children: [
      { path: "login", name: "login", component: () => import("../pages/admin/Login.vue") },
      { path: "", name: "dashboard", component: () => import("../pages/admin/Dashboard.vue"), meta: { requiresAdmin: true } },
      { path: "posts", name: "admin-posts", component: () => import("../pages/admin/posts/Index.vue"), meta: { requiresAdmin: true } },
      { path: "posts/new", name: "admin-post-new", component: () => import("../pages/admin/posts/Edit.vue"), meta: { requiresAdmin: true } },
      { path: "posts/:id", name: "admin-post-edit", component: () => import("../pages/admin/posts/Edit.vue"), meta: { requiresAdmin: true } },
      { path: "projects", name: "admin-projects", component: () => import("../pages/admin/projects/Index.vue"), meta: { requiresAdmin: true } },
      { path: "projects/new", name: "admin-project-new", component: () => import("../pages/admin/projects/Edit.vue"), meta: { requiresAdmin: true } },
      { path: "projects/:id", name: "admin-project-edit", component: () => import("../pages/admin/projects/Edit.vue"), meta: { requiresAdmin: true } },
    ],
  },
  { path: "/", redirect: "/tr" },
  { path: "/:pathMatch(.*)*", redirect: "/tr" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach(async (to) => {
  // (locale senkronu burada kalabilir)

  // 🔐 Guard
  if (isMock) return true; // mock modda engel yok

  const auth = useAuthStore();

  // loginli ama store boş ise me'yi çek
  if (!auth.user && localStorage.getItem("ckblog:accessToken")) {
    try { await auth.fetchMe(); } catch { }
  }

  // sadece admin sayfaları için kontrol
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return { name: "login", params: { locale: (to.params.locale as string) || "tr" } };
  }

  // (ileride requiresAuth eklemek istersen buraya koşul ekleyebilirsin)
  return true;
});

export default router;
