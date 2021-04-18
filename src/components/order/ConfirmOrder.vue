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
      @cancel="cancelOrder"
    />
  </div>
</template>

<script>
  import OrderAside from "@/components/order/OrderAside";
  import AmountListOptions from "@/components/order/common/AmountListOptions";
  import { onMounted, reactive, ref } from "@vue/composition-api";
  import { getOrderById, cancelOrderById } from "@/api";

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
        rent: {},
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
      const isLoading = ref(true);
      const finalPrice = ref(0);

      async function getOrderFromPreviousStep() {
        // TODO: отрефакторить
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
          price,
        } = data.data;

        orderItems.city = `${cityId.name}, ${pointId.address}`;
        orderItems.model = carId.name;
        orderItems.color = color;
        orderItems.rent = dateTo - dateFrom;
        orderItems.tank = isFullTank ? "Да" : "";
        orderItems.child = isNeedChildChair ? "Да" : "";
        orderItems.rightDrive = isRightWheel ? "Да" : "";
        orderItems.rent = {
          to: dateTo,
          from: dateFrom,
        };
        orderOptions.value.number = carId.number;
        orderOptions.value.tank = isFullTank ? "100%" : "";
        orderOptions.value.model = carId.name;
        orderOptions.value.available = `${new Date(
          dateFrom,
        ).toLocaleDateString()} ${new Date(dateFrom).getHours()}:${new Date(
          dateFrom,
        ).getMinutes()}`;
        orderOptions.value.image = { ...carId.thumbnail, name: carId.name };
        finalPrice.value = price;
      }

      onMounted(() =>
        getOrderFromPreviousStep().then(() => (isLoading.value = false)),
      );

      return {
        orderItems,
        orderOptions,
        orderId,
        isLoading,
        finalPrice,
      };
    },
    methods: {
      async cancelOrder() {
        try {
          await cancelOrderById(this.orderId);
          await this.$router.push({ name: "Home" });
        } catch (e) {
          console.log(e);
        }
      },
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
