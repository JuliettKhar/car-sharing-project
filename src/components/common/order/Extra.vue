<template>
  <div class="extra">
    <div class="extra__wrapper">
      <div class="extra__color">
        <p>{{ $translate("orderForm.content.extra.color") }}</p>
        <radio-group
          :model-data.sync="extraState.colorFilter"
          :car-filter-data="colorModel"
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
            :clearable="true"
            clear-icon="el-icon-close"
            :placeholder="translate('orderForm.content.extra.placeholder')"
            format="dd-MM-yyyy HH:mm"
            value-format="dd-MM-yyyy HH:mm"
            @change="selectDateFrom"
          >
          </el-date-picker>
        </div>
        <div>
          <span>{{ $translate("orderForm.content.extra.to") }}</span>
          <el-date-picker
            v-model="extraState.to"
            type="datetime"
            editable
            :clearable="true"
            clear-icon="el-icon-close"
            :placeholder="translate('orderForm.content.extra.placeholder')"
            format="dd-MM-yyyy HH:mm"
            value-format="dd-MM-yyyy HH:mm"
            @change="selectDateTo"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="extra__tariff">
        <p>{{ $translate("orderForm.content.extra.tariff") }}</p>
        <radio-group
          :model-data.sync="extraState.tariffFilter"
          :car-filter-data="tariffModel"
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
      @next="updateCurrentOrder"
    />
  </div>
</template>

<script>
  import { computed, onMounted, reactive, ref } from "@vue/composition-api";
  import RadioGroup from "@/components/common/order/common/RadioGroup";
  import CheckboxGroup from "@/components/common/order/common/CheckboxGroup";
  import OrderAside from "@/components/common/order/OrderAside";
  import { useI18n } from "@/lang";
  import { getOrderById, updateOrder } from "@/api";
  import formatDuration from "date-fns/formatDuration";

  export default {
    name: "Extra",
    components: { RadioGroup, CheckboxGroup, OrderAside },
    setup(props, { root }) {
      const { translate } = useI18n();
      const extraState = reactive({
        colorFilter: "",
        tariffFilter: "",
        extraOptions: [],
        from: new Date(),
        to: new Date(),
        priceMin: "",
        priceMax: "",
      });
      const orderItems = ref({
        city: "",
        model: "",
        color: "",
        rent: "",
        tariff: "",
        child: "",
        rightDrive: "",
        full: "",
      });
      const colorModel = ref(["Любой"]);
      const tariffModel = ["На сутки, 1999 ₽/сутки", "Поминутно, 7₽/мин"];
      const extraOptionsData = ["full", "child", "rightDrive"];
      const orderId = root.$route.query.id;
      const currentOrder = ref({});
      const priceRange = computed(
        () => `${extraState.priceMin} - ${extraState.priceMax}`,
      );

      async function getOrderFromPreviousStep() {
        const { data } = await getOrderById(orderId);
        const { cityId, pointId, carId } = data.data;
        currentOrder.value = data.data;
        extraState.priceMin = carId.priceMin;
        extraState.priceMax = carId.priceMax;
        orderItems.value.city = `${cityId.name}, ${pointId.address}`;
        orderItems.value.model = carId.name;
        colorModel.value.push(...carId.colors);
      }

      onMounted(() => getOrderFromPreviousStep());

      return {
        extraState,
        colorModel,
        tariffModel,
        extraOptionsData,
        translate,
        orderItems,
        priceRange,
        currentOrder,
        orderId,
      };
    },
    computed: {
      isDisabledButton() {
        return (
          Boolean(!this.orderItems.model || !this.orderItems.city) || false
        );
      },
    },
    methods: {
      selectColor(color) {
        this.orderItems.color = color;
      },
      addExtraOptions({ item, index }) {
        if (this.extraState.extraOptions[index]) {
          this.orderItems[item] = "";
        } else {
          this.orderItems[item] = "Да";
        }
      },
      addTariff(tariff) {
        this.orderItems.tariff = tariff;
      },
      selectDateFrom() {
        const date = formatDuration({
          from: this.extraState.from,
          to: this.extraState.to,
        });
      },
      selectDateTo() {},
      updateCurrentOrder() {
        const {
          orderStatusId,
          cityId,
          pointId,
          id,
          createdAt,
          carId,
        } = this.currentOrder;
        const order = {
          orderStatusId,
          cityId,
          pointId,
          id,
          carId,
          createdAt,
          color: this.extraState.colorFilter,
          dateFrom: +this.extraState.from,
          dateTo: +this.extraState.to,
          rateId: {},
          price: this.priceRange,
          isFullTank: this.extraState.extraOptions.includes("full"),
          isNeedChildChair: this.extraState.extraOptions.includes("child"),
          isRightWheel: this.extraState.extraOptions.includes("rightDrive"),
        };
        console.log(order);

        updateOrder(this.orderId, order);
        this.$router.push({ name: "Amount", query: { id } });
      },
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
