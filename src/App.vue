<template>
  <div id="app">
    <el-container class="app__container">
      <navbar @open="openBurgerMenu" />
      <navbar-burger-menu :isMenuOpen.sync="isMenuOpen" />
      <el-container>
        <el-main>
          <transition name="fade">
            <router-view />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Navbar from "@/components/common/navbar/Navbar";
  import NavbarBurgerMenu from "@/components/common/navbar/NavbarBurgerMenu";
  import { ref } from "@vue/composition-api";

  export default {
    components: { Navbar, NavbarBurgerMenu },
    setup() {
      const isMenuOpen = ref(false);

      function openBurgerMenu() {
        isMenuOpen.value = true;
      }

      return {
        isMenuOpen,
        openBurgerMenu,
      };
    },
  };
</script>

<style lang="scss">
  @import "src/assets/scss/index.scss";
</style>
