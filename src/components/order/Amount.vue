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
  import { onMounted, reactive, ref } from "@vue/composition-api";
  import { useRouter } from "@/router";
  import { getOrderById, updateOrder } from "@/api";
  import AmountPopup from "@/components/order/common/AmountPopup";
  import { Notification } from "element-ui";
  import { useOrder } from "@/components/order/composables/useOrder";
  const { configItems, updateConfigFields } = useOrder();

  export default {
    name: "Amount",
    components: {
      OrderAside,
      AmountListOptions,
      AmountPopup,
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
        image: {},
      });

      const { router } = useRouter();
      const orderId = root.$route.query.id;
      const popupIsActive = ref(false);
      const isLoading = ref(true);
      const finalPrice = ref(0);

      function finishOrder() {
        updateOrder(orderId, {
          ...configItems.value,
          orderStatusId: {
            name: "confirmed",
            id: "5e26a1f0099b810b946c5d8b",
          },
        });
        router.push({ name: "Confirm", query: { id: orderId } });
      }

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
          finalPrice.value = configItems.value.price;
          orderOptions.value.number = configItems.value.carId.number;
          orderOptions.value.tank = configItems.value.isFullTank ? "100%" : "";
          orderOptions.value.model = configItems.value.carId.name;
          orderOptions.value.image = {
            ...configItems.value.carId.thumbnail,
            name: configItems.value.carId.name,
          };
          orderOptions.value.available = `${new Date(
            configItems.value.dateFrom,
          ).toLocaleDateString()} ${new Date(
            configItems.value.dateFrom,
          ).getHours()}:${new Date(configItems.value.dateFrom).getMinutes()}`;
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
        finishOrder,
        popupIsActive,
        isLoading,
        finalPrice,
      };
    },
    methods: {
      confirmOrder() {
        this.popupIsActive = true;
      },
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
