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
  import { computed, onMounted, reactive, ref } from "@vue/composition-api";
  import RadioGroup from "@/components/order/common/RadioGroup";
  import CheckboxGroup from "@/components/order/common/CheckboxGroup";
  import OrderAside from "@/components/order/OrderAside";
  import { useI18n } from "@/lang";
  import { getOrderById, updateOrder, getRate } from "@/api";
  import { Notification } from "element-ui";
  import { useOrder } from "@/components/order/composables/useOrder";

  const { configItems, updateConfigFields } = useOrder();

  export default {
    name: "Extra",
    components: { RadioGroup, CheckboxGroup, OrderAside },
    setup(props, { root }) {
      const { translate } = useI18n();
      const extraState = reactive({
        colorFilter: "",
        colorModel: [],
        tariffFilter: "",
        tariffModel: [],
        extraOptions: [],
        extraOptionsData: [],
        from: new Date(),
        to: new Date(),
        priceMin: "",
        priceMax: "",
        extraPrice: 0,
        pickerOptionsFrom: {
          disabledDate: val => {
            return val > new Date();
          },
        },
        pickerOptionsTo: {
          disabledDate: val => {
            return val < new Date();
          },
        },
        isLoading: true,
      });
      const rent = computed(() => {
        return {
          to: extraState.to,
          from: extraState.from,
        };
      });
      const orderItems = ref({
        city: "",
        model: "",
        color: "",
        rent: rent,
        tariff: "",
        child: "",
        rightDrive: "",
        full: "",
      });
      const tariffModel = [
        { name: "На сутки, 1999 ₽/сутки", value: "day" },
        { name: "Поминутно, 7₽/мин", value: "minute" },
      ];
      const extraOptionsData = [
        { name: "full", value: 500 },
        { name: "child", value: 200 },
        { name: "rightDrive", value: 1600 },
      ];
      const orderId = root.$route.query.id;
      const currentOrder = ref({});
      const priceRange = ref(0);

      function getExtraOptions(options) {
        const availableOptions = [];

        options.forEach(item => {
          if (item.isFullTank) {
            availableOptions.push("full");
          } else if (item.isNeedChildChair) {
            availableOptions.push("child");
          } else if (item.isRightWheel) {
            availableOptions.push("rightDrive");
          }
        });

        return availableOptions;
      }

      async function getOrderFromPreviousStep() {
        try {
          const { data } = await getOrderById(orderId);
          updateConfigFields(data.data);

          currentOrder.value = data.data;
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
          extraState.tariffFilter = configItems.value.rateId?.id || "";
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
            configItems.value.rateId?.rateTypeId?.name || "";
          configItems.value.carId.colors.length
            ? extraState.colorModel.push(...configItems.value.carId.colors)
            : extraState.colorModel.push("Любой");
          priceRange.value = configItems.value.carId.priceMin;
        } catch (e) {
          Notification.error({ message: e });
        }
      }

      async function getRateList() {
        try {
          const { data } = await getRate();
          extraState.tariffModel = data.data.map(item => {
            const { rateTypeId } = item;
            const { id, unit, name } = rateTypeId;

            return {
              ...item,
              rateTypeId: id,
              name,
              unit,
            };
          });
        } catch (e) {
          Notification.error({ message: e });
        }
      }

      onMounted(() =>
        Promise.all([getRateList(), getOrderFromPreviousStep()]).then(
          () => (extraState.isLoading = false),
        ),
      );

      return {
        extraState,
        tariffModel,
        extraOptionsData,
        translate,
        orderItems,
        priceRange,
        currentOrder,
        orderId,
        configItems,
      };
    },
    computed: {
      // TODO: отрефакторить
      isRentAccepted() {
        const toDay = new Date(this.extraState.to).getDate();
        const toMonth = new Date(this.extraState.to).getMonth();
        const toHours = new Date(this.extraState.to).getHours();
        const toMinutes = new Date(this.extraState.to).getMinutes();

        const fromDay = new Date(this.extraState.from).getDate();
        const fromMonth = new Date(this.extraState.from).getMonth();
        const fromHours = new Date(this.extraState.from).getHours();
        const fromMinutes = new Date(this.extraState.from).getMinutes();

        return (
          toDay === fromDay &&
          toMonth === fromMonth &&
          toHours === fromHours &&
          toMinutes === fromMinutes
        );
      },
      isDisabledButton() {
        return Boolean(
          !this.orderItems.color ||
            this.isRentAccepted ||
            !this.orderItems.tariff,
        );
      },
    },
    methods: {
      selectColor(color) {
        this.orderItems.color = color;
      },
      addExtraOptions({ item }) {
        if (this.orderItems[item.name]) {
          this.orderItems[item.name] = "";
          this.getPriceWithExtraOptions(-item.value);
        } else {
          this.orderItems[item.name] = "Да";
          this.getPriceWithExtraOptions(item.value);
        }
      },
      getPriceWithExtraOptions(price) {
        this.extraState.extraPrice += price;
        this.priceRange += price;
      },
      addTariff(tariff) {
        this.orderItems.tariff = tariff.name;
        this.priceRange =
          this.getPriceByTariff(tariff, this.extraState.priceMin) +
          this.extraState.extraPrice;
      },
      getPriceByTariff(tariff, rate) {
        const difference =
          new Date(this.extraState.to) - new Date(this.extraState.from);

        if (tariff.unit === "сутки") {
          const extraHours = difference
            ? Math.floor((+difference / 1000 / 60 / 60 - 24) * 7 * 60)
            : 0;

          return rate + tariff.price + extraHours;
        } else if (tariff.unit === "мин") {
          return (
            Math.floor(+difference / 1000 / 60 / 60) * tariff.price * 60 + rate
          );
        } else if (tariff.unit === "7 дней") {
          return rate + tariff.price;
        }
      },
      updateCurrentOrder() {
        // TODO: отрефакторить
        const { id } = this.$route.query;
        const order = {
          ...configItems.value,
          color: this.extraState.colorFilter,
          dateFrom: +this.extraState.from,
          dateTo: +this.extraState.to,
          rateId: this.extraState.tariffModel.filter(
            model => model.id === this.extraState.tariffFilter,
          )[0],
          price: this.priceRange,
          isFullTank: this.extraState.extraOptions.includes("full"),
          isNeedChildChair: this.extraState.extraOptions.includes("child"),
          isRightWheel: this.extraState.extraOptions.includes("rightDrive"),
        };

        try {
          updateOrder(id, order);
          this.$router.push({ name: "Amount", query: { id } });
        } catch (e) {
          Notification.error({ message: e });
        }
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
