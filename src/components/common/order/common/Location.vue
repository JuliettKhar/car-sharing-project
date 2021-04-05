<template>
  <div class="location">
    <div class="location__wrapper">
      <div class="location__selectors">
        <div class="location__selectors-city">
          <span>{{ $translate("orderForm.content.location.city") }}</span>
          <Autocomplete
            :city.sync="locationState.city"
            :cities="locationState.cities"
          />
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
    <order-aside :order-items="orderItems" />
  </div>
</template>

<script>
  import Autocomplete from "@/components/common/order/common/Autocomplete";
  import OrderAside from "@/components/common/order/OrderAside";
  import {
    computed,
    onMounted,
    reactive,
    ref,
    watchEffect,
  } from "@vue/composition-api";
  import { useI18n } from "@/lang";
  import { getCars, getCity } from "@/api";

  export default {
    name: "Location",
    components: {
      OrderAside,
      Autocomplete,
    },
    setup() {
      const { translate } = useI18n();
      const locationState = reactive({
        cities: [],
        city: null,
      });
      const orderItems = reactive({
        city: "Ульяновск, Нариманова 42",
      });

      async function getLocationData() {
        const { data } = await getCity();
        const currentCity =
          localStorage.getItem("city") || translate("cities.ulyanovsk");

        locationState.cities = data.data;
        locationState.city = locationState.cities.filter(city =>
          city.name.toLowerCase().includes(currentCity.toLowerCase()),
        )[0];
      }
      onMounted(() => getLocationData());

      return { OrderAside, locationState, orderItems };
    },
  };
</script>

<style scoped lang="scss">
  .location {
    display: flex;
    justify-content: space-between;

    @include sm {
      flex-wrap: wrap;
    }

    &__wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-top: 32px;
    }

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
        line-height: 20px;
        font-weight: 300;
        font-size: 14px;
        color: $black;

        @include sm {
          text-align: left;
        }
      }
    }
  }

  .map {
    &-title {
      margin-top: 50px;
      text-align: left;
    }
  }
</style>
