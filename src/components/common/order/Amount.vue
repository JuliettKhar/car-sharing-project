<template>
  <div class="amount">
    <amount-list-options :order-options="orderOptions" />
    <order-aside
      :order-items="orderItems"
      :is-disabled="false"
      @next="finishOrder"
    />
  </div>
</template>

<script>
  import OrderAside from "@/components/common/order/OrderAside";
  import AmountListOptions from "@/components/common/order/common/AmountListOptions";
  import { onMounted, reactive, ref } from "@vue/composition-api";
  import { useRouter } from "@/router";
  import { getOrderById } from "@/api";

  export default {
    name: "Amount",
    components: {
      OrderAside,
      AmountListOptions,
    },
    setup(props, { root }) {
      const order = ref({});
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

      const { router } = useRouter();
      const orderId = root.$route.query.id;

      function finishOrder() {
        router.push({ name: "Confirm", query: { id: orderId } });
      }

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
        console.log(data.data);
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
        finishOrder,
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
