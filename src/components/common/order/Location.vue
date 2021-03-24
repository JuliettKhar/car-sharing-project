<template>
  <div class="location">
    <div class="location__selectors">
      <div class="location__selectors-city">
        <span>Город</span>
        <Autocomplete model="Ульяновск" />
      </div>
      <div class="location__selectors-location">
        <span>Пункт выдачи</span>
        <Autocomplete />
      </div>
    </div>
    <div class="location__map">
      <p class="map-title">Выбрать на карте:</p>
      <img src="/images/map.png" alt="" />
    </div>
  </div>
</template>

<script>
  import Autocomplete from "@/components/common/order/common/Autocomplete";
  export default {
    name: "Location",
    components: {
      Autocomplete,
    },
  };
</script>

<style scoped lang="scss">
  .location {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 32px;

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
