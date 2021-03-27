<template>
  <a role="button" class="navbar-lang" @click="toggleLang">
    {{ displayedLang }}
  </a>
</template>

<script>
  import { computed, ref } from "@vue/composition-api";
  import i18n from "@/lang";

  export default {
    name: "NavbarLangToggle",
    setup() {
      const currentLang = ref(localStorage.getItem("lang"));
      const isToggleLang = ref(currentLang.value === "Eng" || false);
      const language = computed(() => (isToggleLang.value ? "Eng" : "Ru"));
      const displayedLang = computed(() => currentLang.value || "Ru");

      function toggleLang() {
        isToggleLang.value = !isToggleLang.value;

        localStorage.setItem("lang", language.value);
        i18n.locale = language.value.toLowerCase().slice(0, 2);
        currentLang.value = language.value;
        localStorage.removeItem("city");
      }

      return { toggleLang, displayedLang };
    },
  };
</script>

<style scoped lang="scss">
  .navbar {
    &-lang {
      position: relative;
      display: block;
      margin-bottom: 32px;
      width: 23px;
      height: 16px;
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 13px;
      color: $green;
      text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      cursor: pointer;

      @include xl {
        display: none;
      }

      @include lg-and-down {
        display: none;
      }

      @include sm {
        display: block;
        position: absolute;
        left: 26px;
        bottom: 0;
        margin-bottom: 26px;
      }

      &:hover {
        color: $gray-light;
      }

      &:before {
        position: absolute;
        content: "";
        width: 40px;
        height: 40px;
        top: 50%;
        left: 50%;
        border: 1px solid $gray-light;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
      }

      &:hover:before {
        opacity: 1;
        transition: opacity 0.5s ease-in;
      }

      &:active {
        color: $green;
      }
    }
  }
</style>
