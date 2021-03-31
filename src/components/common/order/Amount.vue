<template>
  <div class="amount">
    <div class="amount__wrapper">
      <div class="amount__info">
        <p>{{ $translate("orderForm.content.amount.model") }}</p>
        <p>{{ $translate("orderForm.content.amount.number") }}</p>
        <p>
          {{ $translate("orderForm.content.amount.fuel") }}
          <span>{{ $translate("orderForm.content.amount.fuelVal") }}</span>
        </p>
        <p>
          {{ $translate("orderForm.content.amount.available") }}
          <span>{{
            $translate("orderForm.content.amount.availableTime")
          }}</span>
        </p>
      </div>
      <div class="amount__info">
        <img :src="`/images/i30n.png`" alt="" />
      </div>
    </div>
    <order-aside :order-items="orderItems" />
  </div>
</template>

<script>
  import OrderAside from "@/components/common/order/OrderAside";
  import { reactive } from "@vue/composition-api";
  export default {
    name: "Amount",
    components: {
      OrderAside,
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

      return {
        orderItems,
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
