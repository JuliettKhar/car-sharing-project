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
        v-for="item in citiesModel"
        :key="item.id"
        :label="item.name"
        :value="item"
      >
        <template v-if="hasAddress">
          <span style="float: left; margin-right: 6px">{{ item.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">
            {{ item.address }}
          </span>
        </template>
      </el-option>
    </el-select>
    <i class="el-icon-close el-input__icon" @click="handleIconClick"></i>
  </div>
</template>

<script>
  import { useI18n } from "@/lang";
  import { computed, ref } from "@vue/composition-api";
  import { useStore } from "@/store";

  const { translate } = useI18n();
  const { store } = useStore();

  export default {
    name: "Autocomplete",
    props: {
      item: {
        type: Object,
        default: null,
      },
      items: {
        type: Array,
        default: () => [],
      },
      hasAddress: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { emit }) {
      const model = computed({
        get: () => props.item,
        set: val => changeCity(val),
      });
      const citiesModel = computed({
        get: () => props.items,
        set: val => (props.items = val),
      });
      const loading = ref(false);

      function handleIconClick() {
        emit("update:item", null);
      }

      function createFilter(name, queryString) {
        return name.toLowerCase().includes(queryString.toLowerCase());
      }

      function remoteMethod(queryString) {
        if (queryString !== "") {
          loading.value = true;

          setTimeout(() => {
            loading.value = false;
            citiesModel.value = props.items.filter(({ name }) =>
              createFilter(name, queryString),
            );
          }, 200);
        } else {
          citiesModel.value = [];
        }
      }

      function changeCity(item) {
        emit("update:item", item);
        emit("change", item);
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
