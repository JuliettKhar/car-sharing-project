<template>
  <div class="model">
    <div class="model__wrapper">
      <div class="model__filters">
        <radio-group
          :model-data.sync="modelState.carFilter"
          :car-filter-data="modelState.filterModel"
        />
      </div>
      <div class="model__cars">
        <div
          v-for="(car, index) in carImages"
          :key="index"
          :class="[
            'model__cars-item',
            modelState.isActiveCar === index ? 'selected' : '',
          ]"
          @click="isActiveCar = index"
        >
          <p>{{ car.title }}</p>
          <p>{{ car.subtitle }}</p>
          <img :src="`/images/${car.name}`" :alt="car.name" />
        </div>
      </div>
    </div>
    <order-aside :order-items="modelState.orderItems" />
  </div>
</template>

<script>
  import { reactive, ref } from "@vue/composition-api";
  import RadioGroup from "@/components/common/order/common/RadioGroup";
  import OrderAside from "@/components/common/order/OrderAside";

  export default {
    name: "Model",
    components: { RadioGroup, OrderAside },
    setup() {
      const filterModel = ["all", "economy", "premium"];
      const carFilter = ref("all");
      const modelState = reactive({
        carFilter: "all",
        filterModel: ["all", "economy", "premium"],
        orderItems: {
          city: "Ульяновск, Нариманова 42",
          model: "Hyndai, i30 N",
        },
        isActiveCar: 0,
      });
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

      return { carFilter, filterModel, carImages, isActiveCar, modelState };
    },
  };
</script>

<style scoped lang="scss">
  .model {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;

    @include sm {
      flex-wrap: wrap;
    }

    &__filters {
      display: flex;
    }

    &__wrapper {
      padding-top: 32px;
      width: 100%;
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

      @include lg-and-down {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 30px 0 0 0;
        border: none;
      }

      @include md-and-down {
        grid-template-columns: 1fr;
      }

      @include sm {
        max-width: 100%;
        grid-template-columns: 1fr;
      }

      &-item {
        box-sizing: border-box;
        padding: 16px;
        cursor: pointer;
        max-width: 368px;
        max-height: 224px;
        width: 368px;
        height: 224px;
        flex-direction: column;
        align-items: flex-start;

        @include lg-and-down {
          width: 260px;
        }

        &:nth-child(odd) {
          border: none;
          border-right: 1px solid $gray-light;
          border-bottom: 1px solid $gray-light;

          @include lg-and-down {
            width: 100%;
            border: 1px solid #eee;
          }
        }

        &:nth-child(even) {
          border: none;
          border-bottom: 1px solid $gray-light;

          @include lg-and-down {
            width: 100%;
            border: 1px solid #eee;
          }
        }

        &:hover {
          border: 1px solid $gray;
          transition: border 0.2s ease;
        }

        &.selected {
          border: 1px solid $green;

          @include sm {
            height: 100%;
            max-height: 100%;
          }
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

            @include sm {
              font-size: 12px;
            }
          }
        }

        & img {
          margin: 36px auto;

          @include lg-and-down {
            width: auto;
            margin: 25px auto;
          }
        }
      }
    }
  }
</style>
