<template>
  <div class="amount">
    <amount-list-options :order-options="orderOptions" :loading="isLoading" />
    <order-aside
      :order-items="orderItems"
      :is-disabled="false"
      :loading="isLoading"
      :price="finalPrice"
      @next="confirmOrder"
    />
    <amount-popup :is-active.sync="popupIsActive" @accept="finishOrder" />
  </div>
</template>

<script>
  import OrderAside from "@/components/order/OrderAside";
  import AmountListOptions from "@/components/order/common/AmountListOptions";
  import AmountPopup from "@/components/order/common/AmountPopup";
  import useAmount from "@/components/order/composables/useAmount";

  export default {
    name: "Amount",
    components: {
      OrderAside,
      AmountListOptions,
      AmountPopup,
    },
    setup(props, { root }) {
      const orderId = root.$route.query.id;
      const {
        popupIsActive,
        isLoading,
        finalPrice,
        orderItems,
        orderOptions,
        finishOrder,
        confirmOrder,
      } = useAmount(orderId);

      return {
        orderItems,
        orderOptions,
        finishOrder,
        popupIsActive,
        isLoading,
        finalPrice,
        confirmOrder,
      };
    },
  };
</script>

<style scoped lang="scss">
  .amount {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    height: 100%;

    @include sm {
      flex-wrap: wrap;
    }

    &__wrapper {
      justify-content: space-between;
      max-width: 60%;
      width: 60%;
      display: flex;
      padding-top: 32px;

      @include sm {
        width: 100%;
        max-width: 100%;
        flex-wrap: wrap;
        padding-top: 20px;
      }
    }

    &__info {
      & p {
        text-align: left;
        margin: 0 0 8px 0;

        &:first-child {
          font-size: 18px;
          color: $black;
        }

        &:nth-child(2) {
          font-size: 14px;
          color: $black;
          border: 1px solid $gray;
          border-radius: 3px;
          padding: 4px;
          display: flex;
          max-width: 94px;
          justify-content: center;
        }

        &:nth-child(3),
        &:nth-child(4) {
          font-weight: bold;
          font-size: 14px;
          color: $black;

          & span {
            display: inline-block;
            font-weight: 300;

            @include md-and-down {
              display: block;
              line-height: 20px;
            }
          }
        }
      }

      & img {
        max-width: 100%;

        @include md-and-down {
          max-width: 90%;
        }
      }
    }
  }
</style>
