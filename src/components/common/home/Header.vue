<template>
  <el-header class="header">
    <div class="header-content__wrapper el-container">
      <p class="header__title">
        {{ translate("header.logo") }}
      </p>
      <div class="header-location">
        <img src="images/icons/point.svg" alt="point image" />
        <el-autocomplete
          v-model="city"
          value-key="name"
          :fetch-suggestions="querySearch"
          :placeholder="translate('header.cityPlaceholder')"
          clearable
          @select="handleSelect"
        ></el-autocomplete>
      </div>
    </div>
  </el-header>
</template>

<script>
  import { ref } from "@vue/composition-api";
  import { useI18n } from "@/lang";

  export default {
    name: "Header",
    setup() {
      const { translate } = useI18n();
      const cities = [
        { name: translate("header.ulyanovsk"), id: 1 },
        { name: translate("header.moscow"), id: 2 },
        { name: translate("header.krasnodar"), id: 3 },
      ];
      const city = ref(
        localStorage.getItem("city") || translate("header.ulyanovsk"),
      );
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

      return {
        city,
        handleSelect,
        querySearch,
        openBurger,
        isOpen,
        translate,
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
    max-width: 96px;
  }

  .el-container {
    @include container;
  }
</style>
