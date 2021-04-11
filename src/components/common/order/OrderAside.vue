<template>
  <aside class="order-form__aside">
    <p class="aside__order">{{ $translate("orderForm.aside.order") }}</p>
    <template v-for="(item, key) of orderItems">
      <div v-if="item" :key="key" class="aside__item">
        <span>{{ $translate(`orderForm.aside.${key}`) }}</span>
        <span></span>
        <span>{{ item }}</span>
      </div>
    </template>
    <div class="aside__amount">
      <span>{{ $translate("orderForm.aside.price") }}</span>
      <span>{{ price }} ₽</span>
    </div>
    <el-button
      type="success"
      :class="[isFinishOrder ? 'aside__amount-finish-btn' : '']"
      :disabled="isDisabled"
      @click="getNextStep"
    >
      {{ $translate("orderForm.aside.chooseModel") }}</el-button
    >
  </aside>
</template>

<script>
  import { computed } from "@vue/composition-api";

  export default {
    name: "OrderAside",
    props: {
      orderItems: {
        type: Object,
        default: () => ({}),
      },
      isDisabled: {
        type: Boolean,
        default: true,
      },
      price: {
        type: String,
        default: "0",
      },
    },
    setup(props, { emit, root }) {
      const isFinishOrder = computed(() =>
        root.$route.path.includes("confirm-order"),
      );
      function getNextStep() {
        emit("next");
      }

      return { getNextStep, isFinishOrder };
    },
  };
</script>

<style scoped lang="scss">
  .el-button--success {
    border-radius: 8px !important;
  }
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
          margin-right: 6px;
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

      &-finish-btn {
        background: linear-gradient(90deg, $brown 0%, $pink 100%);
        border-radius: 8px !important;
      }
    }
  }
</style>
