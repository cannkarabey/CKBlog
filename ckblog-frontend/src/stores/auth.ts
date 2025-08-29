import { defineStore } from "pinia";
import { login as apiLogin, me as apiMe, logout as apiLogout } from "@/api/auth";

interface User { id: string; name: string; email: string; role: "ADMIN" | "AUTHOR"; }

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    loading: false,
  }),
  getters: {
    isAuthed: (s) => !!s.user,
    isAdmin: (s) => s.user?.role === "ADMIN",
  },
  actions: {
    async fetchMe() {
      try {
        this.loading = true;
        const data = await apiMe();
        this.user = data?.data || null;
      } finally {
        this.loading = false;
      }
    },
    async login(email: string, password: string) {
      await apiLogin(email, password);
      await this.fetchMe();
    },
    async logout() {
      await apiLogout();
      localStorage.removeItem("ckblog:accessToken");
      this.user = null;
    }
  }
});

