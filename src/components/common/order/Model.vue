<template>
  <div class="model">
    <div class="model__wrapper">
      <div class="model__filters">
        <radio-group
          :model-data.sync="modelState.carFilter"
          :car-filter-data="modelState.filterModel"
          @change="changeModel"
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
          @click="modelState.isActiveCar = index"
        >
          <p>{{ car.name }}</p>
          <p>{{ car.priceMin }} - {{ car.priceMax }}</p>
          <img
            :src="car.thumbnail.path"
            :alt="car.name"
            @error="e => (e.target.src = '/images/car-stub.png')"
          />
        </div>
      </div>
    </div>
    <order-aside :order-items="modelState.orderItems" />
  </div>
</template>

<script>
  import { computed, onBeforeMount, reactive, ref } from "@vue/composition-api";
  import RadioGroup from "@/components/common/order/common/RadioGroup";
  import OrderAside from "@/components/common/order/OrderAside";
  import { getCars, getCategories } from "@/api";

  export default {
    name: "Model",
    components: { RadioGroup, OrderAside },
    setup() {
      const modelState = reactive({
        carFilter: "Все модели",
        filterModel: ["Все модели"],
        orderItems: {
          city: "Ульяновск, Нариманова 42",
          model: "Hyndai, i30 N",
        },
        isActiveCar: 0,
      });
      const images = ref([]);
      const carImages = computed({
        get: () => images.value,
        set: val => (images.value = val),
      });

      async function getModelCategories() {
        const { data } = await getCategories();
        const categories = data.data.map(item => item.name);
        modelState.filterModel.push(...categories);
      }

      async function getModelCars() {
        const { data } = await getCars();
        images.value = data.data;
      }

      function changeModel(label) {
        const filtered = [...images.value];
        carImages.value = filtered.filter(
          model => model.categoryId.name === label,
        );
      }

      onBeforeMount(() => Promise.all([getModelCars(), getModelCategories()]));

      return {
        carImages,
        modelState,
        images,
        changeModel,
      };
    },
    methods: {
      /*
       * changeModel(label) {
       *   this.carImages = this.carImages.filter(model => model.categoryId.name);
       *   console.log(
       *     this.carImages.value.filter(model => model.categoryId.name === label),
       *   );
       * },
       */
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
            max-width: 256px;
            max-height: 116px;
            margin: 25px auto;
          }
        }
      }
    }
  }
</style>
