import { getCity, getPoints } from "@/api";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from "@vue/composition-api";
import { useStore } from "@/store";
import {
  citiesLocations,
  streetsLocations,
} from "@/components/order/map/coordinates";
import { Notification } from "element-ui";

export default function useLocation() {
  const locationsOfCities = citiesLocations();
  const locationsOfStreets = streetsLocations();
  const { store } = useStore();
  const cities = computed({
    get: () => store.state.location.cities,
    set: val => store.commit("location/SET_CITIES", val),
  });
  const city = computed({
    get: () => store.state.location.city,
    set: val => store.commit("location/SET_CITY", val),
  });
  let streets = ref([]);
  let street = ref(null);
  let currLocation = ref([]);
  let isLoading = ref(true);
  const isDisabledButton = computed(() =>
    Boolean(!street.value || !city.value),
  );
  const pointsLocations = cityId =>
    locationsOfStreets[cityId] ? locationsOfStreets[cityId] : [];

  const getCityWithLocation = (cities, currCity) => {
    return cities.filter(city =>
      city.name.toLowerCase().includes(currCity.toLowerCase()),
    )[0];
  };

  const getCitiesWithLocation = data => {
    return data.map(city => {
      return { ...city, coords: locationsOfCities[city.id] };
    });
  };

  const fullAddress = computed(
    () => `${city.value?.name || ""}, ${street.value?.address || ""}`,
  );
  const mapCoords = computed({
    get: () => currLocation.value,
    set: val => (currLocation.value = val),
  });

  const getPointsByLocation = async locationId => {
    try {
      const { data } = await getPoints(locationId);
      streets.value = data.data;
    } catch (e) {
      Notification.error({ message: e });
    }
  };

  const updateStreet = () => {
    currLocation.value.push(locationsOfStreets[city.value.id].flat());
  };

  async function updateCity(item) {
    localStorage.setItem("city", item.name);
    store.commit("location/SET_CITY", item);
    street.value = null;
    currLocation.value = [];
    const streetsLocations = pointsLocations(item.id);
    if (!streetsLocations.length) {
      currLocation.value.push(locationsOfCities[item.id]);
    } else {
      streetsLocations.forEach(location => currLocation.value.push(location));
    }
    try {
      await getPointsByLocation(item.id);
    } catch (e) {
      Notification.error({ message: e });
    }
  }

  async function getLocationData() {
    try {
      const { data } = await getCity();
      const LSCity = localStorage.getItem("city");
      const currCity = !LSCity ? "Ульяновск" : LSCity;
      const citiesWithLocations = getCitiesWithLocation(data.data);
      const cityWithLocation = getCityWithLocation(
        citiesWithLocations,
        currCity,
      );

      cities.value = citiesWithLocations;
      city.value = cityWithLocation;

      await getPointsByLocation(cityWithLocation.id);
      const streetsLocations = pointsLocations(cityWithLocation.id);
      if (!streetsLocations.length) {
        currLocation.value.push(cityWithLocation.coords);
      }
      streetsLocations.forEach(location => currLocation.value.push(location));
    } catch (e) {
      Notification.error({ message: e });
    }
  }

  onMounted(() =>
    getLocationData()
      .then(() => (isLoading.value = false))
      .catch(e => Notification.error({ message: e }))
      .finally(() => (isLoading.value = false)),
  );

  onBeforeUnmount(() => {
    streets = ref([]);
    street = ref(null);
    currLocation = ref([]);
    isLoading = ref(true);
  });

  return {
    cities,
    city,
    streets,
    street,
    currLocation,
    isDisabledButton,
    isLoading,
    fullAddress,
    mapCoords,
    getLocationData,
    updateCity,
    updateStreet,
  };
}
