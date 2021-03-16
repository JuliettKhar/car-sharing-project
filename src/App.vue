<template>
  <div id="app">
    <el-container class="app__container">
      <Navbar />
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
  export default {
    components: { Navbar },
  };
</script>

<style lang="scss">
  @import "src/assets/scss/index.scss";
</style>
