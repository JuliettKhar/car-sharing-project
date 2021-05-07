import { computed, ref, reactive } from "@vue/composition-api";
import { getCars, getCategories } from "@/api";
import { Notification } from "element-ui";

const modelState = reactive({
  carFilter: "",
  currentCarItem: {},
  filterModel: ["Все модели"],
  isActiveCar: "",
  isLoading: true,
});
const images = ref([]);
const imagesData = computed(() => images.value);
const carImages = ref(imagesData.value);
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
const orderItems = ref({
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

function changeModel(item) {
  if (item === "Все модели") {
    carImages.value = images.value;
  } else {
    carImages.value = images.value.filter(
      model => model.categoryId.id === item.id,
    );
  }
}

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

export function useModel() {
  return {
    modelState,
    images,
    imagesData,
    carImages,
    selectedModelName,
    selectedModel,
    orderItems,
    priceRange,
    changeModel,
    getModelCategories,
    getModelCars,
  };
}
