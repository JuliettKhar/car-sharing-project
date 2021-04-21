<template>
  <div class="location">
    <div class="location__wrapper">
      <div class="location__selectors">
        <div class="location__selectors-city">
          <span>{{ $translate("orderForm.content.location.city") }}</span>
          <autocomplete
            :item.sync="city"
            :items.sync="cities"
            @change="updateCity"
          />
        </div>
        <div class="location__selectors-location">
          <span>{{ $translate("orderForm.content.location.location") }}</span>
          <autocomplete
            :item.sync="street"
            :items.sync="streets"
            hasAddress
            @change="updateStreet"
          />
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
      :loading="isLoading"
      :price="null"
      @next="createNewOrder"
    />
  </div>
</template>

<script>
  import Autocomplete from "@/components/order/common/Autocomplete";
  import OrderAside from "@/components/order/OrderAside";
  import OrderMap from "@/components/order/map/OrderMap";
  import {
    citiesLocations,
    streetsLocations,
  } from "@/components/order/map/coordinates";

  import { computed, onMounted, ref } from "@vue/composition-api";
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
      const locationsOfCities = citiesLocations();
      const locationsOfStreets = streetsLocations();
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
        () => `${city.value?.name || ""}, ${street.value?.address || ""}`,
      );

      const currLocation = ref([]);
      const mapCoords = computed({
        get: () => currLocation.value,
        set: val => (currLocation.value = val),
      });
      const isLoading = ref(true);
      const pointsLocations = cityId =>
        locationsOfStreets[cityId] ? locationsOfStreets[cityId] : [];

      function updateStreet() {
        currLocation.value.push(locationsOfStreets[city.value.id].flat());
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

      async function updateCity(item) {
        localStorage.setItem("city", item.name);
        store.commit("location/SET_CITY", item);
        street.value = null;
        currLocation.value = [];
        const streetsLocations = pointsLocations(item.id);
        if (!streetsLocations.length) {
          currLocation.value.push(locationsOfCities[item.id]);
        } else {
          streetsLocations.forEach(location =>
            currLocation.value.push(location),
          );
        }
        await getPointsByLocation(item.id);
      }

      async function getLocationData() {
        const { data } = await getCity();
        const LSCity = localStorage.getItem("city");
        const currCity = !LSCity ? "Ульяновск" : LSCity;
        const citiesWithLocations = getCitiesWithLocation(data.data);
        const cityWithLocation = getCityWithLocation(
          citiesWithLocations,
          currCity,
        );

        cities.value = citiesWithLocations;
        city.value = cityWithLocation;

        await getPointsByLocation(cityWithLocation.id);
        const streetsLocations = pointsLocations(cityWithLocation.id);
        if (!streetsLocations.length) {
          currLocation.value.push(cityWithLocation.coords);
        }
        streetsLocations.forEach(location => currLocation.value.push(location));
      }

      onMounted(
        async () =>
          await getLocationData().then(() => (isLoading.value = false)),
      );

      return {
        OrderAside,
        cities,
        city,
        streets,
        street,
        updateCity,
        fullAddress,
        mapCoords,
        updateStreet,
        currLocation,
        isLoading,
      };
    },
    computed: {
      isDisabledButton() {
        return Boolean(!this.street || !this.city) || false;
      },
    },
    methods: {
      async createNewOrder() {
        const order = {
          orderStatusId: "607069ad2aed9a0b9b7e5530",
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

        const { data } = await createOrder(order);
        await this.$router.push({ name: "Model", query: { id: data.data.id } });
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

      @include md-and-down {
        height: min-content;
      }
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

    &__selectors-city {
      margin-bottom: 8px;
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
        min-width: 50px;

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

  ::v-deep .el-input__inner {
    width: 193px;
    height: 30px;
  }
</style>
