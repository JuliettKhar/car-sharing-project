import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
} from "@vue/composition-api";
import { Notification } from "element-ui";
import { cancelOrderById } from "@/api";
import { useRouter } from "@/router";
import { useOrder } from "@/components/order/composables/useOrder";

export default function useConfirmOrder(orderId) {
  const { configItems, getOrderFromPreviousStep } = useOrder();
  let orderItems = reactive({
    city: "",
    model: "",
    color: "",
    rent: {},
    tariff: "",
    tank: "",
  });
  let orderOptions = ref({
    model: "",
    number: "",
    tank: "",
    available: "",
  });
  let isLoading = ref(true);
  let finalPrice = ref(0);
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

  async function getPreviousOrder() {
    try {
      await getOrderFromPreviousStep(orderId);

      orderItems.city = `${configItems.value.cityId.name}, ${configItems.value.pointId.address}`;
      orderItems.model = configItems.value.carId.name;
      orderItems.color = configItems.value.color;
      orderItems.rent = configItems.value.dateTo - configItems.value.dateFrom;
      orderItems.tank = configItems.value.isFullTank ? "Да" : "";
      orderItems.child = configItems.value.isNeedChildChair ? "Да" : "";
      orderItems.rightDrive = configItems.value.isRightWheel ? "Да" : "";
      orderItems.rent = {
        to: configItems.value.dateTo,
        from: configItems.value.dateFrom,
      };
      orderOptions.value.number = configItems.value.carId.number;
      orderOptions.value.tank = configItems.value.isFullTank ? "100%" : "";
      orderOptions.value.model = configItems.value.carId.name;
      orderOptions.value.available = `${new Date(
        configItems.value.dateFrom,
      ).toLocaleDateString()} ${new Date(
        configItems.value.dateFrom,
      ).getHours()}:${new Date(configItems.value.dateFrom).getMinutes()}`;
      orderOptions.value.image = {
        ...configItems.value.carId.thumbnail,
        name: configItems.value.carId.name,
      };
      finalPrice.value = configItems.value.price;
    } catch (e) {
      Notification.error({ message: e });
    }
  }

  function cancelUserOrder() {
    cancelOrder(orderId, configItems.value);
  }

  onMounted(() =>
    getPreviousOrder()
      .then(() => (isLoading.value = false))
      .catch(e => Notification.error({ message: e }))
      .finally(() => (isLoading.value = false)),
  );
  onBeforeUnmount(() => {
    orderItems = {};
    orderOptions = {};
    isLoading = true;
    finalPrice = 0;
  });

  return {
    orderItems,
    orderOptions,
    isLoading,
    finalPrice,
    cancelUserOrder,
  };
}
