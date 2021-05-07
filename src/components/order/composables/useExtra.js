import { computed, ref, reactive } from "@vue/composition-api";
import { Notification } from "element-ui";
import { getRate } from "@/api";

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
let priceRange = ref(0);
const isRentAccepted = computed(() => {
  {
    const toDay = new Date(extraState.to).getDate();
    const toMonth = new Date(extraState.to).getMonth();
    const toHours = new Date(extraState.to).getHours();
    const toMinutes = new Date(extraState.to).getMinutes();

    const fromDay = new Date(extraState.from).getDate();
    const fromMonth = new Date(extraState.from).getMonth();
    const fromHours = new Date(extraState.from).getHours();
    const fromMinutes = new Date(extraState.from).getMinutes();

    return (
      toDay === fromDay &&
      toMonth === fromMonth &&
      toHours === fromHours &&
      toMinutes === fromMinutes
    );
  }
});
const isDisabledButton = computed(() =>
  Boolean(
    !orderItems.value.color || isRentAccepted.value || !orderItems.value.tariff,
  ),
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
  priceRange += price;
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
    return Math.floor(+difference / 1000 / 60 / 60) * tariff.price * 60 + rate;
  } else if (tariff.unit === "7 дней") {
    return rate + tariff.price;
  }
}

function addTariff(tariff) {
  orderItems.value.tariff = tariff.name;
  priceRange =
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

export function useExtra() {
  return {
    extraState,
    orderItems,
    tariffModel,
    extraOptionsData,
    priceRange,
    isDisabledButton,
    isRentAccepted,
    rent,
    getExtraOptions,
    getRateList,
    selectColor,
    addExtraOptions,
    addTariff,
  };
}
