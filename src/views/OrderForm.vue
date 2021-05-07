<template>
  <div class="order-form">
    <home-header />
    <div class="order-form__breadcrumb-wrapper">
      <breadcrumbs :routes="breadcrumb" />
    </div>
    <div class="el-container">
      <div class="order-form__content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import HomeHeader from "@/components/common/home/Header";
  import Breadcrumbs from "@/components/order/Breadcrumbs";
  import { useRouter } from "@/router";
  import { computed } from "@vue/composition-api";

  export default {
    name: "OrderForm",
    components: {
      HomeHeader,
      Breadcrumbs,
    },
    setup() {
      const { routes } = useRouter();
      const breadcrumb = computed(
        () =>
          routes.filter(crumb => crumb.name.toLowerCase().includes("order"))[0]
            .children,
      );

      return { routes, breadcrumb };
    },
  };
</script>

<style scoped lang="scss">
  .order-form {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__breadcrumb-wrapper {
      position: relative;

      @include sm {
        margin-bottom: 0;
      }

      &:before,
      &:after {
        position: absolute;
        content: "";
        left: 0;
        height: 1px;
        width: 100vw;
        background: $gray-light;
      }

      &:before {
        top: 0;
      }

      &:after {
        bottom: 0;
      }
    }

    &__aside {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 32px 0 0 32px;
      width: 30%;
      max-width: 30%;
      border-left: 1px solid $gray-light;

      @include sm {
        padding: 32px 0 32px 0;
        width: 100%;
        max-width: 100%;
        border-left: none;
        align-items: flex-start;
      }
    }
  }

  .el-container {
    padding: 0 64px;
    width: 100%;
    overflow-y: auto;
    flex-wrap: nowrap;

    @include sm {
      flex-wrap: wrap;
      padding: 0 30px;
    }
  }
</style>
