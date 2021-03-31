<template>
  <el-autocomplete
    v-model="city"
    value-key="name"
    class="autocomplete"
    :fetch-suggestions="querySearch"
    :placeholder="translate('autocomplete.placeholder')"
    @select="handleSelect"
  >
    <i
      slot="suffix"
      class="el-icon-close el-input__icon"
      @click="handleIconClick"
    >
    </i>
  </el-autocomplete>
</template>

<script>
  import { useI18n } from "@/lang";
  import { ref } from "@vue/composition-api";

  const { translate } = useI18n();

  export default {
    name: "Autocomplete",
    props: {
      model: {
        type: String,
        default: "",
      },
    },
    setup() {
      const cities = [
        { name: translate("cities.ulyanovsk"), id: 1 },
        { name: translate("cities.moscow"), id: 2 },
        { name: translate("cities.krasnodar"), id: 3 },
      ];
      const city = ref(
        localStorage.getItem("city") || translate("cities.ulyanovsk"),
      );

      function querySearch() {}

      function handleSelect() {}

      function handleIconClick() {}

      return {
        city,
        translate,
        querySearch,
        handleSelect,
        handleIconClick,
      };
    },
  };
</script>

<style scoped lang="scss">
  .el-icon-close {
    text-align: right;
    color: $black;
  }

  .el-autocomplete {
    border-bottom: 1px solid $gray;

    & div > input {
      padding-right: 30px !important;
    }
  }

  .autocomplete > .el-input {
    &__suffix {
      right: 0;
      height: 30px;
    }

    ::v-deep &__inner {
      height: 30px;
      font-weight: 300;
      font-size: 14px;
      color: $black;

      &::placeholder {
        color: $gray;
      }
    }
  }
</style>
