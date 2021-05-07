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
  import { onBeforeUnmount, onMounted } from "@vue/composition-api";
  import RadioGroup from "@/components/order/common/RadioGroup";
  import CheckboxGroup from "@/components/order/common/CheckboxGroup";
  import OrderAside from "@/components/order/OrderAside";
  import { useI18n } from "@/lang";
  import { Notification } from "element-ui";
  import { useOrder } from "@/components/order/composables/useOrder";
  import { useExtra } from "@/components/order/composables/useExtra";

  export default {
    name: "Extra",
    components: { RadioGroup, CheckboxGroup, OrderAside },
    setup(props, { root }) {
      const {
        configItems,
        getOrderFromPreviousStep,
        updatingCurrentOrder,
      } = useOrder();
      const {
        extraState,
        orderItems,
        tariffModel,
        extraOptionsData,
        priceRange,
        getExtraOptions,
        getRateList,
        selectColor,
        addExtraOptions,
        addTariff,
        isDisabledButton,
      } = useExtra();
      const { translate } = useI18n();
      const orderId = root.$route.query.id;

      async function getPreviousOrder() {
        try {
          await getOrderFromPreviousStep(orderId);

          extraState.priceMin = configItems.value.carId.priceMin;
          extraState.priceMax = configItems.value.carId.priceMax;
          extraState.to = configItems.value.dateTo
            ? configItems.value.dateTo
            : new Date();
          extraState.from = configItems.value.dateFrom
            ? configItems.value.dateFrom
            : new Date();
          extraState.colorFilter = configItems.value.color
            ? configItems.value.color
            : "Любой";
          extraState.tariffFilter = configItems.value.rateId.id || "";
          extraState.extraOptions.push(
            ...getExtraOptions([
              { isFullTank: configItems.value.isFullTank },
              { isNeedChildChair: configItems.value.isNeedChildChair },
              { isRightWheel: configItems.value.isRightWheel },
            ]),
          );

          orderItems.value.city = `${configItems.value.cityId.name}, ${configItems.value.pointId.address}`;
          orderItems.value.model = configItems.value.carId.name;
          orderItems.value.color = configItems.value.color
            ? configItems.value.color
            : "Любой";
          orderItems.value.tariff =
            configItems.value.rateId?.rateTypeId.name || "";
          configItems.value.carId.colors.length
            ? extraState.colorModel.push(...configItems.value.carId.colors)
            : extraState.colorModel.push("Любой");
          priceRange.value = configItems.value.carId.priceMin;
          orderItems.value.tank = configItems.value.isFullTank ? "Да" : "";
          orderItems.value.child = configItems.value.isNeedChildChair
            ? "Да"
            : "";
          orderItems.value.rightDrive = configItems.value.isRightWheel
            ? "Да"
            : "";
        } catch (e) {
          Notification.error({ message: e });
        }
      }

      function updateCurrentOrder() {
        updatingCurrentOrder(
          {
            color: extraState.colorFilter,
            dateFrom: +extraState.from,
            dateTo: +extraState.to,
            rateId: extraState.tariffModel.filter(
              model => model.id === extraState.tariffFilter,
            )[0],
            price: priceRange,
            isFullTank: extraState.extraOptions.includes("full"),
            isNeedChildChair: extraState.extraOptions.includes("child"),
            isRightWheel: extraState.extraOptions.includes("rightDrive"),
          },
          orderId,
          "Amount",
        );
      }

      onMounted(() =>
        Promise.all([getRateList(), getPreviousOrder()])
          .then(() => (extraState.isLoading = false))
          .catch(e => Notification.error({ message: e }))
          .finally(() => (extraState.isLoading = false)),
      );
      onBeforeUnmount(() => {
        extraState.colorModel = [];
        extraState.tariffModel = [];
        extraState.extraOptions = [];
        extraState.extraOptionsData = [];
      });

      return {
        extraState,
        tariffModel,
        extraOptionsData,
        translate,
        orderItems,
        priceRange,
        selectColor,
        addExtraOptions,
        addTariff,
        updateCurrentOrder,
        isDisabledButton,
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
