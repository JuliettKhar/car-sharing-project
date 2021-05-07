import { ref } from "@vue/composition-api";
import { createOrder } from "@/api";
import { useRouter } from "@/router";
import { Notification } from "element-ui";

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
const { router } = useRouter();

export function updateConfigFields(fields) {
  for (const fieldsKey in fields) {
    if (fields.hasOwnProperty(fieldsKey)) {
      configItems.value[fieldsKey] = fields[fieldsKey];
    }
  }
}

async function creationNewOrder(userData) {
  const order = {
    ...configItems.value,
    ...userData,
  };

  try {
    const { data } = await createOrder(order);
    await router.push({
      name: "Model",
      query: { id: data.data.id },
    });
  } catch (e) {
    Notification.error({ message: e });
  }
}

export function useOrder() {
  return {
    configItems,
    updateConfigFields,
    creationNewOrder,
  };
}
