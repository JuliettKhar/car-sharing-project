import { Notification } from "element-ui";
import {
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from "@vue/composition-api";
import { useRouter } from "@/router";
import { getOrderById, updateOrder } from "@/api";
import { useOrder } from "@/components/order/composables/useOrder";

export default function useAmount(orderId) {
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
    image: {},
  });

  const { router } = useRouter();
  let popupIsActive = ref(false);
  let isLoading = ref(true);
  let finalPrice = ref(0);
  const { configItems, updateConfigFields } = useOrder();
  const confirmOrder = () => (popupIsActive.value = true);
  const finishOrder = () => {
    updateOrder(orderId, {
      ...configItems.value,
      orderStatusId: {
        name: "confirmed",
        id: "5e26a1f0099b810b946c5d8b",
      },
    });
    router.push({ name: "Confirm", query: { id: orderId } });
  };

  async function getOrderFromPreviousStep() {
    try {
      const { data } = await getOrderById(orderId);
      updateConfigFields(data.data);

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
      finalPrice.value = configItems.value.price;
      orderOptions.value.number = configItems.value.carId.number;
      orderOptions.value.tank = configItems.value.isFullTank ? "100%" : "";
      orderOptions.value.model = configItems.value.carId.name;
      orderOptions.value.image = {
        ...configItems.value.carId.thumbnail,
        name: configItems.value.carId.name,
      };
      orderOptions.value.available = `${new Date(
        configItems.value.dateFrom,
      ).toLocaleDateString()} ${new Date(
        configItems.value.dateFrom,
      ).getHours()}:${new Date(configItems.value.dateFrom).getMinutes()}`;
    } catch (e) {
      Notification.error({ message: e });
    }
  }

  onMounted(() =>
    getOrderFromPreviousStep().then(() => (isLoading.value = false)),
  );
  onBeforeUnmount(() => {
    orderItems = {};
    orderOptions = {};
    popupIsActive = false;
    isLoading = true;
    finalPrice = 0;
  });

  return {
    popupIsActive,
    isLoading,
    finalPrice,
    orderItems,
    orderOptions,
    finishOrder,
    confirmOrder,
  };
}
