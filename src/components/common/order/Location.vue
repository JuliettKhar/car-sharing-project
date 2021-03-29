<template>
  <div class="location">
    <div class="location__selectors">
      <div class="location__selectors-city">
        <span>{{ $translate("orderForm.content.location.city") }}</span>
        <Autocomplete :model="model" />
      </div>
      <div class="location__selectors-location">
        <span>{{ $translate("orderForm.content.location.location") }}</span>
        <Autocomplete />
      </div>
    </div>
    <div class="location__map">
      <p class="map-title">
        {{ $translate("orderForm.content.location.map.title") }}
      </p>
      <img src="/images/map.png" alt="" />
    </div>
  </div>
</template>

<script>
  import Autocomplete from "@/components/common/order/common/Autocomplete";
  import { ref } from "@vue/composition-api";
  import { useI18n } from "@/lang";

  export default {
    name: "Location",
    components: {
      Autocomplete,
    },
    setup() {
      const { translate } = useI18n();
      const model = ref(translate("cities.ulyanovsk"));

      return { model };
    },
  };
</script>

<style scoped lang="scss">
  .location {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__map {
      & img {
        max-width: 100%;
      }

      & p {
        font-weight: 300;
        font-size: 14px;
        color: $black;
      }
    }

    &__selectors {
      flex-direction: column;
    }

    &__selectors-city,
    &__selectors-location {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;

      span {
        margin-right: 10px;
        padding-bottom: 6px;
        font-weight: 300;
        font-size: 14px;
        color: $black;

        @include sm {
          text-align: left;
        }
      }
    }

    &__selectors-city {
    }
  }

  .map {
    &-title {
      margin-top: 50px;
      text-align: left;
    }
  }
</style>
