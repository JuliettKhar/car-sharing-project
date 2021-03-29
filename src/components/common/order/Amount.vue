<template>
  <div class="amount">
    <div class="amount__info">
      <p>{{ $translate("orderForm.content.amount.model") }}</p>
      <p>{{ $translate("orderForm.content.amount.number") }}</p>
      <p>
        {{ $translate("orderForm.content.amount.fuel") }}
        <span>{{ $translate("orderForm.content.amount.fuelVal") }}</span>
      </p>
      <p>
        {{ $translate("orderForm.content.amount.available") }}
        <span>{{ $translate("orderForm.content.amount.availableTime") }}</span>
      </p>
    </div>
    <div class="amount__info">
      <img :src="`/images/i30n.png`" alt="" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "Amount",
  };
</script>

<style scoped lang="scss">
  .amount {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    max-width: 80%;

    @include md-and-down {
      flex-direction: column;
      max-width: 100%;
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
