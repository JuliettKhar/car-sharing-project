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
  import { computed, onMounted } from "@vue/composition-api";
  import { useOrder } from "@/components/order/composables/useOrder";
  import { useLocation } from "@/components/order/composables/useLocation";

  export default {
    name: "Location",
    components: {
      OrderAside,
      Autocomplete,
      OrderMap,
    },
    setup() {
      const {
        cities,
        city,
        streets,
        street,
        currLocation,
        isDisabledButton,
        isLoading,
        getLocationData,
        updateCity,
        updateStreet,
      } = useLocation();
      const { creationNewOrder } = useOrder();
      const fullAddress = computed(
        () => `${city.value?.name || ""}, ${street.value?.address || ""}`,
      );
      const mapCoords = computed({
        get: () => currLocation.value,
        set: val => (currLocation.value = val),
      });

      function createNewOrder() {
        creationNewOrder({ cityId: city.value.id, pointId: street.value.id });
      }

      onMounted(() =>
        getLocationData()
          .then(() => (isLoading.value = false))
          .catch(e => Notification.error({ message: e }))
          .finally(() => (isLoading.value = false)),
      );

      return {
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
        isDisabledButton,
        createNewOrder,
      };
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
