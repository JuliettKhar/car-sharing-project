<template>
  <div class="location">
    <div class="location__wrapper">
      <div class="location__selectors">
        <div class="location__selectors-city">
          <span>{{ $translate("orderForm.content.location.city") }}</span>
          <Autocomplete
            :item.sync="city"
            :items="cities"
            @change="updateCity"
          />
        </div>
        <div class="location__selectors-location">
          <span>{{ $translate("orderForm.content.location.location") }}</span>
          <Autocomplete :item.sync="street" :items="streets" hasAddress />
        </div>
      </div>
      <div class="location__map">
        <p class="map-title">
          {{ $translate("orderForm.content.location.map.title") }}
        </p>
        <order-map :coords="mapCoords" />
      </div>
    </div>
    <order-aside
      :order-items="{ city: fullAddress }"
      :is-disabled="isDisabledButton"
      @next="updateOrder"
    />
  </div>
</template>

<script>
  import Autocomplete from "@/components/common/order/common/Autocomplete";
  import OrderAside from "@/components/common/order/OrderAside";
  import OrderMap from "@/components/common/order/map/OrderMap";

  import { computed, onMounted, reactive, ref } from "@vue/composition-api";
  import { getCity, getPoints, createOrder } from "@/api";
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
      const streets = ref([]);
      const street = ref(null);
      const fullAddress = computed(
        () => `${city.value?.name || ""}, ${street.value?.name || ""}`,
      );
      const locationsOfCities = {
        "5e26a128099b810b946c5d87": [54, 48],
        "5ea07ad3099b810b946c6254": [54, 45],
        "5ea07bae099b810b946c6271": [55, 49],
        "5ea07c10099b810b946c627a": [51, 46],
        "5ea07c3b099b810b946c627b": [45, 38],
        "5f5a09329d3a610b850fd69d": [53, 55],
        "5f686a3a9d3a610b850fda92": [52, 41],
        "5f691cda9d3a610b850fdb20": [64, 40],
        "5f691dd59d3a610b850fdb25": [55, 52],
        "6005b8f9ad015e0bb6997778": [59, 30],
        "6010606bad015e0bb6997dca": [54, 39],
        "60114f64ad015e0bb6997e2c": [43, 131],
        "60154906ad015e0bb6997ecb": [55, 61],
        "6011452fad015e0bb6997e1d": [54, 48],
        "5f69460d9d3a610b850fdb4d": [55, 52],
      };
      const mapCoords = computed(() => [
        city.value?.coords || [],
        [55.75, 37.5],
      ]);

      function updateCity(item) {
        localStorage.setItem("city", item.name);
        store.commit("location/SET_CITY", item);
      }

      function getCityWithLocation(cities, currCity) {
        return cities.filter(city =>
          city.name.toLowerCase().includes(currCity.toLowerCase()),
        )[0];
      }

      function getCitiesWithLocation(data) {
        return data.map(city => {
          return { ...city, coords: locationsOfCities[city.id] };
        });
      }

      async function getPointsByLocation(locationId) {
        const { data } = await getPoints(locationId);
        streets.value = data.data;
      }

      async function getLocationData() {
        const { data } = await getCity();
        const LSCity = localStorage.getItem("city");
        const currCity = !LSCity ? "Ульяновск" : LSCity;
        const citiesWithLocations = getCitiesWithLocation(data.data);

        cities.value = citiesWithLocations;
        const city = getCityWithLocation(citiesWithLocations, currCity);
        store.commit("location/SET_CITY", city);
        await getPointsByLocation(city.id);
      }

      onMounted(() => getLocationData());

      return {
        OrderAside,
        cities,
        city,
        streets,
        street,
        updateCity,
        fullAddress,
        mapCoords,
      };
    },
    computed: {
      isDisabledButton() {
        return Boolean(!this.street || !this.city) || false;
      },
    },
    methods: {
      updateOrder() {
        const order = {
          orderStatusId: {},
          cityId: this.city.id,
          pointId: this.street.id,
          carId: {},
          color: "",
          dateFrom: 0,
          dateTo: 0,
          rateId: {},
          price: 0,
          isFullTank: false,
          isNeedChildChair: false,
          isRightWheel: false,
        };

        createOrder(order);
      },
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
