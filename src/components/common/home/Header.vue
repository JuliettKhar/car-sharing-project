<template>
  <el-header class="header">
    <div class="header__burger">
      <Burger @open="openBurger" />
    </div>
    <div class="header-content__wrapper">
      <p class="header__title">Need for drive</p>
      <div class="header-location">
        <img src="images/icons/point.svg" alt="point image" />
        <el-autocomplete
          v-model="city"
          value-key="name"
          :fetch-suggestions="querySearch"
          placeholder="Начните вводить город"
          clearable
          @select="handleSelect"
        ></el-autocomplete>
      </div>
    </div>
  </el-header>
</template>

<script>
  import { ref } from "@vue/composition-api";
  import Burger from "@/components/common/Burger";

  export default {
    name: "Header",
    components: {
      Burger,
    },
    setup() {
      const cities = [
        { name: "Ульяновск", id: 1 },
        { name: "Москва", id: 2 },
        { name: "Краснодар", id: 3 },
      ];
      const city = ref(localStorage.getItem("city") || "Ульяновск");
      const isOpen = ref(false);

      function handleSelect(item) {
        city.value = item.name;
        localStorage.setItem("city", item.name);
      }

      function openBurger() {
        isOpen.value = true;
      }

      function createFilter(queryString) {
        return link => {
          return (
            link.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          );
        };
      }

      function querySearch(queryString, cb) {
        const links = cities;
        const results = queryString
          ? links.filter(createFilter(queryString))
          : links;
        cb(results);
      }

      return { city, handleSelect, querySearch, openBurger, isOpen };
    },
  };
</script>

<style scoped lang="scss">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

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
    max-width: 96px;
  }
</style>
