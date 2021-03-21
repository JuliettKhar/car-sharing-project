import Vue from "vue";
import VueI18n from "vue-i18n";

// Element-ui built-in lang
import elementEnLocale from "element-ui/lib/locale/lang/en";
import elementRuLocale from "element-ui/lib/locale/lang/ru-RU";

// User defined lang
import ru from "./ru.json";
import en from "./en.json";

Vue.use(VueI18n);

const messages = {
  en: {
    ...en,
    ...elementEnLocale,
  },
  ru: {
    ...ru,
    ...elementRuLocale,
  },
};

const getLocale = () => {
  const language =
    localStorage
      .getItem("lang")
      .toLowerCase()
      .slice(0, 2) || (navigator.language || "Ru").toLowerCase().slice(0, 2);
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }

  // Default language
  return "Ru";
};

const i18n = new VueI18n({
  locale:
    localStorage
      .getItem("lang")
      .toLowerCase()
      .slice(0, 2) || "Ru",
  fallbackLocale: getLocale(),
  messages,
});
console.log(
  localStorage
    .getItem("lang")
    .toLowerCase()
    .slice(0, 2) || "Ru",
);

const translate = key => i18n.t(key);

export const useI18n = () => {
  return {
    translate,
    getLocale,
  };
};

export default i18n;