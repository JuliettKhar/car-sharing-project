<template>
  <el-header class="header">
    <p class="header__title">Need for drive</p>
    <div class="header-location">
      <img src="/images/point.svg" alt="point image" />
      <el-autocomplete
        v-model="city"
        value-key="name"
        :fetch-suggestions="querySearch"
        placeholder="Начните вводить город"
        clearable
        @select="handleSelect"
      ></el-autocomplete>
    </div>
  </el-header>
</template>

<script>
  import { ref } from "@vue/composition-api";

  export default {
    name: "Header",
    setup() {
      const cities = [
        { name: "Ульяновск", id: 1 },
        { name: "Москва", id: 2 },
        { name: "Краснодар", id: 3 },
      ];
      const city = ref(localStorage.getItem("city") || "Ульяновск");

      function handleSelect(item) {
        city.value = item.name;
        localStorage.setItem("city", item.name);
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

      return { city, handleSelect, querySearch };
    },
  };
</script>

<style scoped lang="scss">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__title {
      font-weight: bold;
      font-size: 30px;
      color: $green;
    }

    &-location {
      display: flex;
      font-size: 14px;
      line-height: 16px;
      color: $gray;

      & img {
        display: block;
      }
    }
  }
</style>
