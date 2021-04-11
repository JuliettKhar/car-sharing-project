<template>
  <yandex-map
    :settings="settings"
    :coords="coords"
    show-all-markers
    :controls="controls"
    :zoom="1"
  >
    <ymap-marker
      v-for="(marker, index) in coords"
      :key="index"
      :marker-id="index"
      :coords="marker"
      :icon="markerIcon"
    />
  </yandex-map>
</template>

<script>
  import { yandexMap, ymapMarker } from "vue-yandex-maps";
  import { computed, ref } from "@vue/composition-api";

  export default {
    name: "OrderMap",
    components: { yandexMap, ymapMarker },
    props: {
      coords: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const settings = {
        apiKey: "9fdc1539-95c9-48be-b5fa-5a09fd7b6070",
        lang: "ru_RU",
        coordorder: "latlong",
        version: "2.1",
      };
      // const initCoords = ref(props.coords);
      // const mapCoords = computed({
      //   get: () => initCoords.value,
      //   set: val => (initCoords.value = val),
      // });
      const markerIcon = {
        layout: "default#imageWithContent",
        imageHref: "./images/icons/map-point.svg",
        imageSize: [30, 30],
      };
      const controls = ["zoomControl", "rulerControl"];

      return {
        settings,
        markerIcon,
        controls,
        // mapCoords,
      };
    },
  };
</script>

<style lang="scss">
  .ymap-container {
    width: 80%;
    min-width: 80%;
    max-width: 736px;
    min-height: 353px;
    height: 353px;
  }
</style>
