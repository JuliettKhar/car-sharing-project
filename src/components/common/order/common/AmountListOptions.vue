<template>
  <div class="amount-options__wrapper">
    <p v-if="title" class="amount-options__title">Ваш заказ подтверждён</p>
    <div class="amount-options__info">
      <p>{{ items.model }}</p>
      <p>{{ items.number }}</p>
      <p>
        {{ $translate("orderForm.content.amount.fuel") }}
        <span>{{ items.tank }}</span>
      </p>
      <p>
        {{ $translate("orderForm.content.amount.available") }}
        <span>{{ items.available }}</span>
      </p>
    </div>
    <div class="amount__info">
      <img :src="`/images/i30n.png`" alt="" />
    </div>
  </div>
</template>

<script>
  import { computed } from "@vue/composition-api";

  export default {
    name: "AmountListOptions",
    props: {
      orderOptions: {
        type: Object,
        default: () => ({}),
      },
      title: {
        type: Boolean,
        required: false,
      },
    },
    setup(props) {
      const items = computed(() => props.orderOptions);

      return { items };
    },
  };
</script>

<style scoped lang="scss">
  .amount-options {
    display: flex;
    justify-content: space-between;
    height: 100%;

    @include sm {
      flex-wrap: wrap;
    }

    &__wrapper {
      position: relative;
      justify-content: space-between;
      flex-wrap: wrap;
      max-width: 60%;
      width: 60%;
      display: flex;
      padding-top: 64px;

      @include md-and-down {
        padding-top: 46px;
        width: 100%;
        max-width: 100%;
        flex-wrap: wrap;
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

    &__title {
      height: min-content;
      position: absolute;
      top: 0;
      width: 100%;
      text-align: left;
      font-size: 24px;
      color: $black;
      margin: 24px 0 0 0;

      @include md-and-down {
        font-size: 20px;
        top: -14px;
      }
    }
  }
</style>
