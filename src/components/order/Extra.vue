<template>
  <div class="extra">
    <div class="extra__wrapper">
      <div class="extra__color">
        <p>{{ $translate("orderForm.content.extra.color") }}</p>
        <radio-group
          :model-data.sync="extraState.colorFilter"
          :car-filter-data="extraState.colorModel"
          @change="selectColor"
        />
      </div>
      <div class="extra__picker">
        <p>{{ $translate("orderForm.content.extra.date") }}</p>
        <div>
          <span>{{ $translate("orderForm.content.extra.from") }}</span>
          <el-date-picker
            v-model="extraState.from"
            type="datetime"
            editable
            clear-icon="el-icon-close"
            :clearable="true"
            :placeholder="translate('orderForm.content.extra.placeholder')"
            :picker-options="extraState.pickerOptionsFrom"
            format="dd-MM-yyyy HH:mm"
          >
          </el-date-picker>
        </div>
        <div>
          <span>{{ $translate("orderForm.content.extra.to") }}</span>
          <el-date-picker
            v-model="extraState.to"
            type="datetime"
            editable
            clear-icon="el-icon-close"
            :clearable="true"
            :picker-options="extraState.pickerOptionsTo"
            :placeholder="translate('orderForm.content.extra.placeholder')"
            format="dd-MM-yyyy HH:mm"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="extra__tariff">
        <p>{{ $translate("orderForm.content.extra.tariff") }}</p>
        <radio-group
          :model-data.sync="extraState.tariffFilter"
          :car-filter-data="extraState.tariffModel"
          @change="addTariff"
        />
      </div>
      <div class="extra__options">
        <p>{{ $translate("orderForm.content.extra.extraOpts") }}</p>
        <checkbox-group
          :checkbox-filter-data="extraOptionsData"
          :checkbox-model-data.sync="extraState.extraOptions"
          @change="addExtraOptions"
        />
      </div>
    </div>
    <order-aside
      :order-items="orderItems"
      :is-disabled="isDisabledButton"
      :price="priceRange"
      :loading="extraState.isLoading"
      @next="updateCurrentOrder"
    />
  </div>
</template>

<script>
  import RadioGroup from "@/components/order/common/RadioGroup";
  import CheckboxGroup from "@/components/order/common/CheckboxGroup";
  import OrderAside from "@/components/order/OrderAside";
  import { useI18n } from "@/lang";
  import useExtra from "@/components/order/composables/useExtra";

  export default {
    name: "Extra",
    components: { RadioGroup, CheckboxGroup, OrderAside },
    setup(props, { root }) {
      const orderId = root.$route.query.id;
      const {
        extraState,
        orderItems,
        tariffModel,
        extraOptionsData,
        priceRange,
        selectColor,
        addExtraOptions,
        addTariff,
        isRentAccepted,
        isDisabledButton,
        updateCurrentOrder,
      } = useExtra(orderId);
      const { translate } = useI18n();

      return {
        extraState,
        tariffModel,
        extraOptionsData,
        orderItems,
        priceRange,
        selectColor,
        addExtraOptions,
        addTariff,
        updateCurrentOrder,
        isDisabledButton,
        isRentAccepted,
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
