<template>
  <div class="model">
    <div class="model__filters">
      <radio-group
        :model-data.sync="carFilter"
        :car-filter-data="filterModel"
      />
    </div>
    <div class="model__cars">
      <div
        v-for="(car, index) in carImages"
        :key="index"
        :class="['model__cars-item', isActiveCar === index ? 'selected' : '']"
        @click="isActiveCar = index"
      >
        <p>{{ car.title }}</p>
        <p>{{ car.subtitle }}</p>
        <img :src="`/images/${car.name}`" :alt="car.name" />
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from "@vue/composition-api";
  import RadioGroup from "@/components/common/order/common/RadioGroup";

  export default {
    name: "Model",
    components: { RadioGroup },
    setup() {
      const filterModel = [
        { value: "all", title: "Все модели" },
        { value: "economy", title: "Эконом" },
        { value: "premium", title: "Премиум" },
      ];
      const carFilter = ref("all");
      const isActiveCar = ref(0);
      const carImages = [
        {
          name: "elantra.png",
          title: "ELANTRA",
          subtitle: "12 000 - 25 000 ₽",
        },
        { name: "i30n.png", title: "i30 N", subtitle: "10 000 - 32 000 ₽" },
        { name: "creta.png", title: "CRETA", subtitle: "12 000 - 25 000 ₽" },
        { name: "sonata.png", title: "SONATA", subtitle: "10 000 - 32 000 ₽" },
        { name: "i30n.png", title: "i30 N", subtitle: "10 000 - 32 000 ₽" },
        { name: "creta.png", title: "CRETA", subtitle: "12 000 - 25 000 ₽" },
      ];

      return { carFilter, filterModel, carImages, isActiveCar };
    },
  };
</script>

<style scoped lang="scss">
  .model {
    &__filters {
      display: flex;
      margin-top: 34px;
    }

    &__cars {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: center;
      margin: 48px 0 0 0;
      border: 1px solid $gray-light;
      max-width: 80%;
      box-sizing: border-box;

      &-item {
        width: 50%;
        box-sizing: border-box;
        padding: 16px;
        cursor: pointer;
        height: 170px;

        &:nth-child(odd) {
          border: none;
          border-right: 1px solid $gray-light;
          border-bottom: 1px solid $gray-light;
        }

        &:nth-child(even) {
          border: none;
          border-bottom: 1px solid $gray-light;
        }

        &:hover {
          border: 1px solid $green;
          transition: border 0.2s ease;
        }

        &.selected {
          border: 1px solid $gray;
        }

        p {
          margin: 0 0 4px 0;
          text-align: left;

          &:first-child {
            font-size: 18px;
            color: $black;
          }

          &:nth-child(2) {
            font-size: 14px;
            color: $gray;
          }
        }

        & img {
          max-width: 100%;
          max-height: 116px;
        }
      }
    }
  }
</style>
