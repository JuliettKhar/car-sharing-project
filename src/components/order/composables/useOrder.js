import { ref } from "@vue/composition-api";

const configItems = ref({
  orderStatusId: "607069ad2aed9a0b9b7e5530",
  cityId: "",
  pointId: "",
  carId: {},
  color: "",
  dateFrom: 0,
  dateTo: 0,
  rateId: {},
  price: 0,
  isFullTank: false,
  isNeedChildChair: false,
  isRightWheel: false,
});

export function useOrder() {
  return {
    configItems,
  };
}
