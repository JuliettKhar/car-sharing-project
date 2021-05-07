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
  import { Notification } from "element-ui";
  import { useOrder } from "@/components/order/composables/useOrder";
  const { configItems, updateConfigFields } = useOrder();

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
        try {
          const { data } = await getOrderById(orderId);
          updateConfigFields(data.data);

          orderItems.city = `${configItems.value.cityId.name}, ${configItems.value.pointId.address}`;
          orderItems.model = configItems.value.carId.name;
          orderItems.color = configItems.value.color;
          orderItems.rent =
            configItems.value.dateTo - configItems.value.dateFrom;
          orderItems.tank = configItems.value.isFullTank ? "Да" : "";
          orderItems.child = configItems.value.isNeedChildChair ? "Да" : "";
          orderItems.rightDrive = configItems.value.isRightWheel ? "Да" : "";
          orderItems.rent = {
            to: configItems.value.dateTo,
            from: configItems.value.dateFrom,
          };
          orderOptions.value.number = configItems.value.carId.number;
          orderOptions.value.tank = configItems.value.isFullTank ? "100%" : "";
          orderOptions.value.model = configItems.value.carId.name;
          orderOptions.value.available = `${new Date(
            configItems.value.dateFrom,
          ).toLocaleDateString()} ${new Date(
            configItems.value.dateFrom,
          ).getHours()}:${new Date(configItems.value.dateFrom).getMinutes()}`;
          orderOptions.value.image = {
            ...configItems.value.carId.thumbnail,
            name: configItems.value.carId.name,
          };
          finalPrice.value = configItems.value.price;
        } catch (e) {
          Notification.error({ message: e });
        }
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
          await cancelOrderById(this.orderId, configItems);
          await Notification.success("Order cancelled");
          await this.$router.push({ name: "Home" });
        } catch (e) {
          Notification.error({ message: e });
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
