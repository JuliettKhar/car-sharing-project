<template>
  <section class="home">
    <div class="home__main">
      <el-header></el-header>
      <div class="home__main-content">main</div>
      <el-footer></el-footer>
    </div>
    <div class="home__slider">
      slider
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Home',
    components: {},
  };
</script>
<style lang="scss">
  .home {
    display: flex;
    height: 100%;

    &__main {
      display: flex;
      flex-direction: column;
      width: 50%;
      max-width: 50%;
    }

    &__main-content {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
    }

    &__slider {
      width: 50%;
      max-width: 50%;
    }
  }
</style>
