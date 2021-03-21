import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCompositionAPI from "@vue/composition-api";
import i18n from "@/lang";
import { useI18n } from "@/lang";
import ElementUI from "element-ui";
import "./assets/scss/core/element-ui/_variables.scss";

Vue.use(VueCompositionAPI);

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
});

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  created() {
    const { getLocale } = useI18n();
    i18n.locale = getLocale();
    localStorage.setItem("lang", getLocale() === "ru" ? "Ru" : "Eng");
  },
  store,
  render: h => h(App),
}).$mount("#app");
