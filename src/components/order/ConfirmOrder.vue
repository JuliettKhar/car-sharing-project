<template>
  <div class="confirm-order">
    <amount-list-options
      title
      :order-options="orderOptions"
      :loading="isLoading"
    />
    <order-aside
      :order-items="orderItems"
      :is-disabled="false"
      :loading="isLoading"
      :price="finalPrice"
      @cancel="cancelUserOrder"
    />
  </div>
</template>

<script>
  import OrderAside from "@/components/order/OrderAside";
  import AmountListOptions from "@/components/order/common/AmountListOptions";
  import useConfirmOrder from "@/components/order/composables/useConfirmOrder";

  export default {
    name: "ConfirmOrder",
    components: {
      OrderAside,
      AmountListOptions,
    },
    setup(props, { root }) {
      const orderId = root.$route.query.id;
      const {
        orderItems,
        orderOptions,
        isLoading,
        finalPrice,
        cancelUserOrder,
      } = useConfirmOrder(orderId);

      return {
        orderItems,
        orderOptions,
        orderId,
        isLoading,
        finalPrice,
        cancelUserOrder,
      };
    },
  };
</script>

<style scoped lang="scss">
  .confirm-order {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;

    @include sm {
      flex-wrap: wrap;
    }
  }
</style>
