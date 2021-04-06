<template>
  <div class="location">
    <div class="location__wrapper">
      <div class="location__selectors">
        <div class="location__selectors-city">
          <span>{{ $translate("orderForm.content.location.city") }}</span>
          <Autocomplete :city.sync="city" :cities="cities" />
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
        <order-map />
      </div>
    </div>
    <order-aside :order-items="orderItems" />
  </div>
</template>

<script>
  import Autocomplete from "@/components/common/order/common/Autocomplete";
  import OrderAside from "@/components/common/order/OrderAside";
  import OrderMap from "@/components/common/order/map/OrderMap";

  import { computed, onMounted, reactive } from "@vue/composition-api";
  import { getPoints, getCity } from "@/api";
  import { useStore } from "@/store";

  export default {
    name: "Location",
    components: {
      OrderAside,
      Autocomplete,
      OrderMap,
    },
    setup() {
      const { store } = useStore();

      const cities = computed({
        get: () => store.state.location.cities,
        set: val => store.commit("location/SET_CITIES", val),
      });
      const city = computed({
        get: () => store.state.location.city,
        set: val => store.commit("location/SET_CITY", val),
      });

      const orderItems = reactive({
        city: "Ульяновск, Нариманова 42",
      });

      async function getPointsByLocation(locationId) {
        const { data } = await getPoints(locationId);
        console.log(data);
      }

      async function getLocationData() {
        const { data } = await getCity();
        const city = data.data.filter(city =>
          city.name
            .toLowerCase()
            .includes(localStorage.getItem("city").toLowerCase()),
        )[0];

        cities.value = data.data;
        await getPointsByLocation(city.id);
      }

      onMounted(() => getLocationData());

      return { OrderAside, cities, city, orderItems };
    },
  };
</script>

<style scoped lang="scss">
  .location {
    display: flex;
    justify-content: space-between;
    height: 100%;

    @include sm {
      flex-wrap: wrap;
    }

    &__wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-top: 32px;
    }

    &__map {
      height: 100%;
      width: 100%;

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
