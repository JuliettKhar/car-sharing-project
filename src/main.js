import "regenerator-runtime/runtime.js";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCompositionAPI from "@vue/composition-api";
import i18n from "@/lang";
import { useI18n } from "@/lang";
import ElementUI from "element-ui";
import "./assets/scss/core/element-ui/_variables.scss";

const { translate } = useI18n();

Vue.use(VueCompositionAPI);

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
});

Vue.config.productionTip = false;
Vue.prototype.$translate = function(value) {
  return translate(value);
};

new Vue({
  router,
  i18n,
  mounted() {
    const { getLocale } = useI18n();
    const LSCity = localStorage.getItem("city");
    const currCity = !LSCity ? "Ульяновск" : LSCity;

    i18n.locale = getLocale();
    localStorage.setItem("lang", getLocale() === "ru" ? "Ru" : "Eng");
    localStorage.setItem("city", currCity);
  },
  store,
  render: h => h(App),
}).$mount("#app");
