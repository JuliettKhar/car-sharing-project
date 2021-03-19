<template>
  <el-footer class="footer">
    <span class="footer__copyrights">&#169; 2016-2019 «Need for drive»</span>
    <a href="tel:+74952342244" class="footer__phone">8 (495) 234-22-44</a>
  </el-footer>
</template>

<script>
  export default {
    name: "Footer",
  };
</script>

<style scoped lang="scss">
  .footer {
    display: flex;
    justify-content: space-between;

    &__copyrights {
      font-size: 13px;
      color: $gray;
    }

    &__phone {
      font-size: 13px;
      color: $black;

      &:hover {
        color: $green;
      }
    }
  }
</style>
