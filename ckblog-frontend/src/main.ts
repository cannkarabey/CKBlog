import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import "./styles/base.css"; // <-- tailwind yerine

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(createHead());
app.mount("#app");
