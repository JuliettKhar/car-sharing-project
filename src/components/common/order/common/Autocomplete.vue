<template>
  <div class="autocomplete">
    <el-select
      v-model="model"
      filterable
      remote
      reserve-keyword
      value-key="id"
      autocomplete="on"
      :placeholder="translate('autocomplete.placeholder')"
      :remote-method="remoteMethod"
      :loading="loading"
      @change="changeCity"
    >
      <el-option
        v-for="city in citiesModel"
        :key="city.id"
        :label="city.name"
        :value="city"
      >
      </el-option>
    </el-select>
    <i class="el-icon-close el-input__icon" @click="handleIconClick"></i>
  </div>
</template>

<script>
  import { useI18n } from "@/lang";
  import { computed, onMounted, ref } from "@vue/composition-api";
  import { useStore } from "@/store";

  const { translate } = useI18n();

  export default {
    name: "Autocomplete",
    props: {
      city: {
        type: Object,
        default: null,
      },
      cities: {
        type: Array,
        default: () => [],
      },
    },
    setup(props, { emit }) {
      const { store } = useStore();
      const model = computed({
        get: () => props.city,
        set: val => changeCity(val),
      });
      const citiesModel = computed({
        get: () => props.cities,
        set: val => (props.cities = val),
      });
      const loading = ref(false);

      function handleIconClick() {
        emit("update:city", null);
      }

      function createFilter(name, queryString) {
        return name.toLowerCase().includes(queryString.toLowerCase());
      }

      function remoteMethod(queryString) {
        if (queryString !== "") {
          loading.value = true;

          setTimeout(() => {
            loading.value = false;
            citiesModel.value = props.cities.filter(({ name }) =>
              createFilter(name, queryString),
            );
          }, 200);
        } else {
          citiesModel.value = [];
        }
      }

      function changeCity(item) {
        emit("update:city", item);
        localStorage.setItem("city", item.name);
        store.commit("location/SET_CITY", item);
      }

      return {
        model,
        translate,
        handleIconClick,
        remoteMethod,
        loading,
        changeCity,
        citiesModel,
      };
    },
  };
</script>

<style scoped lang="scss">
  .el-icon-close {
    text-align: right;
    color: $black;
    cursor: pointer;
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

    &__inner {
      height: 20px;
      font-weight: 300;
      font-size: 14px;
      color: $black;

      &::placeholder {
        color: $gray;
      }
    }
  }

  .el-select {
    display: flex;
    align-items: flex-end;
    border-bottom: 1px solid #999999;
    box-sizing: border-box;
  }

  .autocomplete {
    display: flex;
  }

  ::v-deep .el-input__inner {
    height: 20px;
  }

  ::v-deep .el-icon-close {
    position: relative;

    &:before {
      position: absolute;
      top: 6px;
      left: -20px;
    }
  }
</style>
