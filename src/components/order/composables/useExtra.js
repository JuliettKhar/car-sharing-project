import {
  computed,
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
} from "@vue/composition-api";
import { Notification } from "element-ui";
import { getRate } from "@/api";
import { useOrder } from "@/components/order/composables/useOrder";
import isSameDay from "date-fns/isSameDay";
import isSameHour from "date-fns/isSameHour";
import isSameMinute from "date-fns/isSameMinute";

export default function useExtra(orderId) {
  const {
    configItems,
    getOrderFromPreviousStep,
    updatingCurrentOrder,
  } = useOrder();
  const extraState = reactive({
    colorFilter: "",
    colorModel: [],
    tariffFilter: "",
    tariffModel: [],
    extraOptions: [],
    extraOptionsData: [],
    from: new Date(new Date().setDate(+new Date().getDate() - 1)),
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
  const priceRange = ref(0);
  const isRentAccepted = computed(() => {
    return (
      isSameDay(extraState.to, extraState.from) &&
      isSameHour(extraState.to, extraState.from) &&
      isSameMinute(extraState.to, extraState.from)
    );
  });
  const isDisabledButton = computed(
    () =>
      !orderItems.value.color ||
      isRentAccepted.value ||
      !orderItems.value.tariff,
  );

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

  function selectColor(color) {
    orderItems.value.color = color;
  }

  function getPriceWithExtraOptions(price) {
    extraState.extraPrice += price;
    priceRange.value += price;
  }

  function addExtraOptions({ item }) {
    if (orderItems.value[item.name]) {
      orderItems.value[item.name] = "";
      getPriceWithExtraOptions(-item.value);
    } else {
      orderItems.value[item.name] = "Да";
      getPriceWithExtraOptions(item.value);
    }
  }

  function getPriceByTariff(tariff, rate) {
    const difference = new Date(extraState.to) - new Date(extraState.from);

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
      const extraDaysInMinutes = difference
        ? Math.floor((+difference / 1000 / 60 / 60 - 24 * 7) * 60 * 7)
        : 0;

      return rate + tariff.price + extraDaysInMinutes;
    }
  }

  function addTariff(tariff) {
    orderItems.value.tariff = tariff.name;
    priceRange.value =
      getPriceByTariff(tariff, extraState.priceMin) + extraState.extraPrice;
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

  const getPriceByExtraOptions = () => {
    const filteredOptions = ref([]);
    extraState.extraOptions.forEach(item => {
      filteredOptions.value.push(
        ...extraOptionsData.filter(extraItem => extraItem.name === item),
      );
    });
    filteredOptions.value.forEach(item => getPriceWithExtraOptions(item.value));
  };

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
        : new Date().setTime(new Date().getTime() - 1000 * 60 * 60);
      extraState.colorFilter = configItems.value.color.length
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

      orderItems.value.city = `${configItems.value.cityId?.name || ""}, ${
        configItems.value.pointId.address
      }`;
      orderItems.value.model = configItems.value.carId?.name || "";
      orderItems.value.color = configItems.value.color
        ? configItems.value.color
        : "Любой";
      orderItems.value.tariff =
        configItems.value.rateId?.rateTypeId?.name || "";
      configItems.value.carId.colors.length
        ? extraState.colorModel.push(...configItems.value.carId.colors)
        : extraState.colorModel.push("Любой");
      priceRange.value = configItems.value.carId.priceMin;
      orderItems.value.tank = configItems.value.isFullTank ? "Да" : "";
      orderItems.value.child = configItems.value.isNeedChildChair ? "Да" : "";
      orderItems.value.rightDrive = configItems.value.isRightWheel ? "Да" : "";
      priceRange.value = getPriceByTariff(
        {
          price: configItems.value.rateId.price,
          ...configItems.value.rateId.rateTypeId,
        },
        configItems.value.carId.priceMin,
      );
      getPriceByExtraOptions();
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
        price: priceRange.value,
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
    orderItems,
    tariffModel,
    extraOptionsData,
    priceRange,
    isDisabledButton,
    isRentAccepted,
    rent,
    selectColor,
    addExtraOptions,
    addTariff,
    updateCurrentOrder,
  };
}
