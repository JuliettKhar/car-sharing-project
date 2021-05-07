<template>
  <div class="autocomplete">
    <el-select
      v-model="model"
      filterable
      reserve-keyword
      value-key="id"
      autocomplete="on"
      :placeholder="translate('autocomplete.placeholder')"
      no-data-text="Нет доступных локаций"
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
  import { computed } from "@vue/composition-api";
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
        require: true,
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
      const citiesModel = computed(() => props.items);

      function handleIconClick() {
        emit("update:item", null);
        emit("update:items", props.items);
      }

      function changeCity(item) {
        emit("update:item", item);
        emit("change", item);
      }

      return {
        model,
        translate,
        handleIconClick,
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
    border-bottom: 1px solid $gray;
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

  ::v-deep .el-icon-arrow-up:before {
    display: none;
  }
</style>
