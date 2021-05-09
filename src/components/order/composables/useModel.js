import {
  computed,
  ref,
  reactive,
  onBeforeMount,
  onBeforeUnmount,
} from "@vue/composition-api";
import { getCars, getCategories } from "@/api";
import { Notification } from "element-ui";
import { useOrder } from "@/components/order/composables/useOrder";

export default function useModel(orderId) {
  const {
    configItems,
    getOrderFromPreviousStep,
    updatingCurrentOrder,
  } = useOrder();
  let modelState = reactive({
    carFilter: "",
    currentCarItem: {},
    filterModel: ["Все модели"],
    isActiveCar: "",
    isLoading: true,
  });
  let images = ref([]);
  const imagesData = computed(() => images.value);
  let carImages = ref(imagesData.value);
  const selectedModelName = computed(() => {
    const car = images.value.filter(
      item => item.id === modelState.isActiveCar,
    )[0];
    return car?.name || "";
  });
  const selectedModel = computed(
    () =>
      images.value.filter(item => item.id === modelState.isActiveCar)[0] || {},
  );
  let orderItems = ref({
    city: "",
    model: selectedModelName,
  });
  const priceRange = computed(() => {
    const isPriceExist =
      selectedModel.value?.priceMin && selectedModel.value?.priceMax;
    return isPriceExist
      ? `${selectedModel.value?.priceMin || 0} - ${selectedModel.value
          ?.priceMax || 0}`
      : 0;
  });

  const changeModel = item => {
    if (item === "Все модели") {
      carImages.value = images.value;
    } else {
      carImages.value = images.value.filter(
        model => model.categoryId.id === item.id,
      );
    }
  };
  const isDisabledButton = computed(
    () => !orderItems.value.model || !orderItems.value.city,
  );

  async function getModelCategories() {
    try {
      const { data } = await getCategories();
      modelState.filterModel.push(...data.data);
    } catch (e) {
      Notification.error({ message: e });
    }
  }

  async function getModelCars() {
    try {
      const { data } = await getCars();
      images.value = data.data;
      await changeModel(modelState.currentCarItem);
    } catch (e) {
      Notification.error({ message: e });
    }
  }

  function updateCurrentOrder() {
    updatingCurrentOrder(
      {
        carId: selectedModel.value.id,
        priceMin: selectedModel.value.priceMin,
        priceMax: selectedModel.value.priceMax,
      },
      orderId,
      "Extra",
    );
  }

  async function getPreviousOrder() {
    try {
      await getOrderFromPreviousStep(orderId);
      modelState.carFilter =
        configItems.value.carId?.categoryId?.id || "Все модели";
      modelState.currentCarItem =
        configItems.value.carId?.categoryId || "Все модели";
      modelState.isActiveCar = configItems.value.carId?.id || "";
      orderItems.value.city = `${configItems.value.cityId?.name ||
        ""}, ${configItems.value.pointId?.address || ""}`;
    } catch (e) {
      Notification.error({ message: e });
    }
  }

  onBeforeMount(() =>
    Promise.all([getPreviousOrder(), getModelCars(), getModelCategories()])
      .then(() => (modelState.isLoading = false))
      .catch(e => Notification.error({ message: e }))
      .finally(() => (modelState.isLoading = false)),
  );
  onBeforeUnmount(() => {
    modelState = {
      carFilter: "",
      currentCarItem: {},
      filterModel: ["Все модели"],
      isActiveCar: "",
      isLoading: true,
    };
    images = [];
    carImages = [];
    orderItems = {
      city: "",
      model: "",
    };
  });

  return {
    modelState,
    images,
    imagesData,
    carImages,
    selectedModelName,
    selectedModel,
    orderItems,
    priceRange,
    isDisabledButton,
    changeModel,
    updateCurrentOrder,
  };
}
