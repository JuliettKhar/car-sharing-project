<template>
  <el-header class="header">
    <div
      :class="[
        'header-content__wrapper',
        hasOrderForm ? 'el-container has-order-form' : '',
      ]"
    >
      <router-link :to="{ name: 'Home' }" class="header__title">
        {{ translate("header.logo") }}
      </router-link>
      <div class="header-location">
        <img src="images/icons/point.svg" alt="point image" />
        <el-select
          v-model="city"
          filterable
          remote
          reserve-keyword
          value-key="id"
          autocomplete="on"
          :placeholder="translate('header.cityPlaceholder')"
          :remote-method="querySearch"
          @change="changeCity"
        >
          <el-option
            v-for="city in cities"
            :key="city.id"
            :label="city.name"
            :value="city"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </el-header>
</template>

<script>
  import { computed, onBeforeMount, ref } from "@vue/composition-api";
  import { useI18n } from "@/lang";
  import { useStore } from "@/store";
  import { getCity } from "@/api";

  export default {
    name: "Header",
    setup(props, { root }) {
      const { store } = useStore();
      const { translate } = useI18n();

      const cities = computed(() => store.state.location.cities);
      const city = computed({
        get: () => store.state.location.city,
        set: val => store.commit("location/SET_CITY", val),
      });
      const isOpen = ref(false);
      const hasOrderForm = computed(
        () => root.$route?.path.toLowerCase().includes("order") || false,
      );

      function handleSelect({ name }) {
        city.value = name;
        localStorage.setItem("city", name);
        store.commit("location/SET_CITY", name);
      }

      function openBurger() {
        isOpen.value = true;
      }

      function createFilter(name, queryString) {
        return name.toLowerCase().includes(queryString.toLowerCase());
      }

      function querySearch(queryString, cb) {
        const links = cities.value;
        const results = queryString
          ? links.filter(({ name }) => createFilter(name, queryString))
          : links;
        cb(results);
      }

      async function getCitiesData() {
        const { data } = await getCity();
        const city = data.data.filter(city =>
          city.name
            .toLowerCase()
            .includes(localStorage.getItem("city").toLowerCase()),
        )[0];
        store.commit("location/SET_CITIES", data.data);
        store.commit("location/SET_CITY", city);
      }

      function changeCity(item) {
        localStorage.setItem("city", item.name);
        store.commit("location/SET_CITY", item);
      }

      onBeforeMount(() => getCitiesData());

      return {
        city,
        cities,
        handleSelect,
        querySearch,
        openBurger,
        isOpen,
        translate,
        hasOrderForm,
        changeCity,
      };
    },
  };
</script>

<style scoped lang="scss">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @include md-and-down {
      padding: 16px 16px 32px 16px !important;
    }

    &__title {
      font-weight: bold;
      font-size: 30px;
      color: $green;

      @include md-and-down {
        margin: 0 0 8px 0;
      }
    }

    &-location {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 16px;
      color: $gray;

      & img {
        display: block;
      }
    }

    &-content__wrapper {
      display: flex;
      justify-content: space-between;
      width: 100%;

      @include md-and-down {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
    }
  }

  .el-autocomplete {
    max-width: 120px;
  }

  .el-container {
    padding: 0 64px;
  }

  .has-order-form {
    padding: 32px 64px;
  }
</style>
