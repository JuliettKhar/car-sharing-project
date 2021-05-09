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
    setup() {
      const settings = {
        apiKey: process.env.VUE_APP_API_MAP_KEY,
        lang: "ru_RU",
        coordorder: "latlong",
        version: "2.1",
      };
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

    @include md-and-down {
      width: 100%;
      min-width: 100%;
    }
  }
</style>
