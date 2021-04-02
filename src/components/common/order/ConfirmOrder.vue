<template>
  <div class="confirm-order">
    <amount-list-options :order-options="orderOptions" title />
    <order-aside :order-items="orderItems" />
  </div>
</template>

<script>
  import OrderAside from "@/components/common/order/OrderAside";
  import AmountListOptions from "@/components/common/order/common/AmountListOptions";
  import { reactive } from "@vue/composition-api";

  export default {
    name: "ConfirmOrder",
    components: {
      OrderAside,
      AmountListOptions,
    },
    setup() {
      const orderItems = reactive({
        city: "Ульяновск, Нариманова 42",
        model: "Hyndai, i30 N",
        color: "Голубой",
        rent: "1д 2ч",
        tariff: "На сутки",
        tank: "Да",
      });

      const orderOptions = reactive({
        model: "Hyndai, i30 N",
        number: "K 761 HA 73",
        tank: "100%",
        available: "12.06.2019 12:00",
      });

      return {
        orderItems,
        orderOptions,
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
