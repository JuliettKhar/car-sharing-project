import { ref, reactive } from "@vue/composition-api";
import { Notification } from "element-ui";
import { cancelOrderById } from "@/api";
import { useRouter } from "@/router";

const orderItems = reactive({
  city: "",
  model: "",
  color: "",
  rent: {},
  tariff: "",
  tank: "",
});
const orderOptions = ref({
  model: "",
  number: "",
  tank: "",
  available: "",
});
const isLoading = ref(true);
const finalPrice = ref(0);
const { router } = useRouter();

async function cancelOrder(orderId, userData) {
  try {
    await cancelOrderById(orderId, userData);
    await Notification.success("Order cancelled");
    await router.push({ name: "Home" });
  } catch (e) {
    Notification.error({ message: e });
  }
}

export function useConfirmOrder() {
  return {
    orderItems,
    orderOptions,
    isLoading,
    finalPrice,
    cancelOrder,
  };
}
