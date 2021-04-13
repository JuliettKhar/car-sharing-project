<template>
  <div class="confirm-order">
    <amount-list-options :order-options="orderOptions" title />
    <order-aside :order-items="orderItems" :is-disabled="false" />
  </div>
</template>

<script>
  import OrderAside from "@/components/common/order/OrderAside";
  import AmountListOptions from "@/components/common/order/common/AmountListOptions";
  import { onMounted, reactive, ref } from "@vue/composition-api";
  import { getOrderById } from "@/api";

  export default {
    name: "ConfirmOrder",
    components: {
      OrderAside,
      AmountListOptions,
    },
    setup(props, { root }) {
      const orderItems = reactive({
        city: "",
        model: "",
        color: "",
        rent: 0,
        tariff: "",
        tank: "",
      });
      const orderOptions = ref({
        model: "",
        number: "",
        tank: "",
        available: "",
      });
      const orderId = root.$route.query.id;

      async function getOrderFromPreviousStep() {
        const { data } = await getOrderById(orderId);
        const {
          cityId,
          pointId,
          carId,
          color,
          dateFrom,
          dateTo,
          isFullTank,
          isNeedChildChair,
          isRightWheel,
        } = data.data;

        orderItems.city = `${cityId.name}, ${pointId.address}`;
        orderItems.model = carId.name;
        orderItems.color = color;
        orderItems.rent = dateTo - dateFrom;
        orderItems.tank = isFullTank ? "Да" : "";
        orderItems.child = isNeedChildChair ? "Да" : "";
        orderItems.rightDrive = isRightWheel ? "Да" : "";
        orderOptions.value.number = carId.number;
        orderOptions.value.tank = isFullTank ? "100%" : "";
        orderOptions.value.model = carId.name;
        orderOptions.value.available = `${new Date(
          dateFrom,
        ).toLocaleDateString()} ${new Date(dateFrom).getHours()}:${new Date(
          dateFrom,
        ).getMinutes()}`;
      }

      onMounted(() => getOrderFromPreviousStep());

      return {
        orderItems,
        orderOptions,
        orderId,
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
