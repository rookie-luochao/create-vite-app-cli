import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./core/store";
import router from "./core/router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { vueQueryPluginOptions } from "./core/http/vueQueryConfig";

const app = createApp(App);

app.use(store).use(router).use(VueQueryPlugin, vueQueryPluginOptions);

app.mount("#app");
