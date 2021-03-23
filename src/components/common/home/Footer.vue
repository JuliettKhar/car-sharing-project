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
    align-items: flex-start;
    flex-direction: row;

    @include md-and-down {
      flex-direction: column;
      align-items: flex-end;
      padding: 16px !important;
      background: $blue-dark;
    }

    &__copyrights {
      font-size: 13px;
      color: $gray;

      @include md-and-down {
        order: 2;
      }
    }

    &__phone {
      margin-bottom: 0;
      font-size: 13px;
      color: $black;

      &:hover {
        color: $green;
        transition: color 0.6s ease-in;
      }

      @include md-and-down {
        margin-bottom: 8px;
        color: $green;
        order: 1;

        &:hover {
          color: $white;
        }
      }
    }
  }
</style>
