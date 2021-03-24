<template>
  <div class="order-form">
    <Header />
    <div class="order-form__breadcrumb-wrapper">
      <Breadcrumbs :routes="breadcrumb" />
    </div>
    <div class="el-container">
      <div class="order-form__content">
        <router-view></router-view>
      </div>
      <aside class="order-form__aside">
        <p class="aside__order">Ваш заказ:</p>
        <div class="aside__location">
          <span>Пункт выдачи</span>
          <span class=""></span>
          <span>Ульяновск, Нариманова 42</span>
        </div>
        <div class="aside__total">
          <span>Цена:</span>
          <span>от 8 000 до 12 000 ₽</span>
        </div>
        <el-button disabled>Выбрать модель</el-button>
      </aside>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/common/home/Header";
  import Breadcrumbs from "@/components/common/order/Breadcrumbs";
  import { useRouter } from "@/router";
  import { computed } from "@vue/composition-api";

  export default {
    name: "OrderForm",
    components: {
      Header,
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

    &__content {
      width: 70%;
      max-width: 70%;
    }

    &__aside {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 32px 0 0 32px;
      width: 30%;
      max-width: 30%;
      border-left: 1px solid $gray-light;
    }
  }

  .el-container {
    padding: 0 64px;
    width: 100%;
  }

  .aside {
    &__order {
      display: inline-block;
      margin: 0 0 26px 0;
      font-weight: 500;
      font-size: 18px;
      color: $black;
    }

    &__location {
      display: flex;
      justify-content: space-between;
      margin-bottom: 32px;
      width: 100%;

      & span {
        &:first-child {
          font-size: 14px;
          color: $black;
          text-align: left;
        }
        &:last-child {
          font-size: 14px;
          color: $gray;
          text-align: right;
          max-width: 120px;
        }
        &:nth-child(2) {
          border-bottom: 2px dotted $gray-light;
          width: 74px;
        }
      }
    }

    &__total {
      width: 100%;
      text-align: left;
      margin-bottom: 32px;

      & span {
        &:first-child,
        &:last-child {
          font-size: 16px;
          color: $black;
        }

        &:first-child {
          font-weight: 500;
        }
      }
    }
  }
</style>
