<template>
  <div class="extra">
    <div class="extra__wrapper">
      <div class="extra__color">
        <p>{{ $translate("orderForm.content.extra.color") }}</p>
        <radio-group
          :model-data.sync="extraState.colorFilter"
          :car-filter-data="colorModel"
        />
      </div>
      <div class="extra__picker">
        <p>{{ $translate("orderForm.content.extra.date") }}</p>
        <div>
          <span>{{ $translate("orderForm.content.extra.from") }}</span>
          <el-date-picker
            v-model="extraState.pickerFromVal"
            type="datetime"
            editable
            :clearable="true"
            clear-icon="el-icon-close"
            :placeholder="translate('orderForm.content.extra.placeholder')"
            format="dd.MM.yyyy HH:mm"
            value-format="dd-MM-yyyy HH:mm"
          >
          </el-date-picker>
        </div>
        <div class="">
          <span>{{ $translate("orderForm.content.extra.to") }}</span>
          <el-date-picker
            v-model="extraState.pickerToVal"
            type="datetime"
            editable
            :clearable="true"
            clear-icon="el-icon-close"
            :placeholder="translate('orderForm.content.extra.placeholder')"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="extra__tariff">
        <p>{{ $translate("orderForm.content.extra.tariff") }}</p>
        <radio-group
          :model-data.sync="extraState.tariffFilter"
          :car-filter-data="tariffModel"
        />
      </div>
      <div class="extra__options">
        <p>{{ $translate("orderForm.content.extra.extraOpts") }}</p>
        <checkbox-group
          :checkbox-filter-data.sync="extraOptionsData"
          :checkbox-model-data="extraState.extraOptions"
        />
      </div>
    </div>
    <order-aside :order-items="extraState.orderItems" />
  </div>
</template>

<script>
  import { reactive } from "@vue/composition-api";
  import RadioGroup from "@/components/common/order/common/RadioGroup";
  import CheckboxGroup from "@/components/common/order/common/CheckboxGroup";
  import OrderAside from "@/components/common/order/OrderAside";
  import { useI18n } from "@/lang";

  export default {
    name: "Extra",
    components: { RadioGroup, CheckboxGroup, OrderAside },
    setup() {
      const { translate } = useI18n();
      const extraState = reactive({
        colorFilter: "any",
        tariffFilter: "day",
        extraOptions: ["full"],
        pickerFromVal: "",
        pickerToVal: "",
        orderItems: {
          city: "Ульяновск, Нариманова 42",
          model: "Hyndai, i30 N",
          color: "Голубой",
          rent: "1д 2ч",
          tariff: "На сутки",
          tank: "Да",
        },
      });
      const colorModel = ["any", "red", "blue"];
      const tariffModel = ["minute", "day"];
      const extraOptionsData = ["full", "child", "rightDrive"];

      return {
        extraState,
        colorModel,
        tariffModel,
        extraOptionsData,
        translate,
      };
    },
  };
</script>

<style scoped lang="scss">
  .extra {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    height: 100%;

    @include sm {
      padding-top: 20px;
      flex-wrap: wrap;
    }

    &__wrapper {
      padding-top: 32px;
      width: 100%;
    }

    &__color,
    &__picker,
    &__tariff,
    &__options {
      display: flex;
      align-items: flex-start;
      margin-bottom: 32px;
      flex-direction: column;
    }

    & p {
      margin: 0 0 10px 0;
      text-align: left;
      font-weight: 300;
      font-size: 14px;
      color: $black;
    }

    &__picker {
      & span {
        display: inline-flex;
        justify-content: flex-start;
        margin-right: 4px;
        min-width: 20px;
        font-weight: 300;
        font-size: 14px;
        color: $black;
      }
    }
  }

  ::v-deep .el-input__prefix {
    display: none;
  }

  ::v-deep .el-input--prefix .el-input__inner {
    padding-left: 10px;
  }

  ::v-deep .el-input__inner {
    height: 30px;
    line-height: 30;
    border-bottom: 1px solid $gray;
    border-radius: 0;
  }

  ::v-deep .el-input__icon {
    color: $black;
  }

  ::v-deep .el-input__suffix {
    top: -4px;
  }
</style>
