<template>
  <aside class="order-form__aside">
    <p class="aside__order">{{ $translate("orderForm.aside.order") }}</p>
    <template v-for="(item, key) of orderItems">
      <div :key="key" class="aside__item">
        <span>{{ $translate(`orderForm.aside.${key}`) }}</span>
        <span></span>
        <span>{{ item }}</span>
      </div>
    </template>
    <div class="aside__amount">
      <span>{{ $translate("orderForm.aside.price") }}</span>
      <span>{{ $translate("orderForm.aside.amount") }}</span>
    </div>
    <el-button type="success">{{
      $translate("orderForm.aside.chooseModel")
    }}</el-button>
  </aside>
</template>

<script>
  export default {
    name: "OrderAside",
    props: {
      orderItems: {
        type: Object,
        default: () => ({}),
      },
    },
  };
</script>

<style scoped lang="scss">
  .order-form {
    display: flex;
    flex-direction: column;
    height: 100%;

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

  .aside {
    &__order {
      display: inline-block;
      margin: 0 0 26px 0;
      font-weight: 500;
      font-size: 18px;
      color: $black;
    }

    &__item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 20px;
      width: 100%;

      @include sm {
        flex-wrap: wrap;
        flex-direction: column;
      }

      & span {
        &:first-child {
          display: flex;
          align-items: flex-end;
          font-size: 14px;
          color: $black;
          text-align: left;
        }
        &:last-child {
          font-size: 14px;
          color: $gray;
          text-align: right;
          max-width: 120px;

          @include sm {
            text-align: left;
          }
        }
        &:nth-child(2) {
          display: inline-block;
          border-bottom: 2px dotted $gray-light;
          width: 74px;

          @include sm {
            display: none;
          }
        }
      }
    }

    &__amount {
      width: 100%;
      text-align: left;
      margin-bottom: 32px;

      & span:first-child {
        margin-right: 4px;
      }

      & span {
        &:first-child,
        &:last-child {
          font-size: 16px;
          color: $black;

          @include md-and-down {
            font-size: 14px;
          }
        }

        &:first-child {
          font-weight: 500;
        }
      }
    }
  }
</style>
