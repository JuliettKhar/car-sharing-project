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
        <div>
          <template v-if="!modelState.isLoading">
            <div
              v-for="(car, index) in carImages"
              :key="index"
              :class="[
                'model__cars-item',
                modelState.isActiveCar === car.id ? 'selected' : '',
              ]"
              @click="modelState.isActiveCar = car.id"
            >
              <p>{{ car.name }}</p>
              <p>{{ car.priceMin }} - {{ car.priceMax }}</p>
              <img
                :src="car.thumbnail.path"
                :alt="car.name"
                @error="e => (e.target.src = 'images/car-stub.png')"
              />
            </div>
          </template>
          <i v-else class="el-icon-loading"></i>
        </div>
      </div>
    </div>
    <order-aside
      :order-items="orderItems"
      :is-disabled="isDisabledButton"
      :price="priceRange"
      :loading="modelState.isLoading"
      @next="updateCurrentOrder"
    />
  </div>
</template>

<script>
  import { onBeforeMount, onBeforeUnmount } from "@vue/composition-api";
  import RadioGroup from "@/components/order/common/RadioGroup";
  import OrderAside from "@/components/order/OrderAside";
  import { useOrder } from "@/components/order/composables/useOrder";
  import { Notification } from "element-ui";
  import { useModel } from "@/components/order/composables/useModel";

  export default {
    name: "Model",
    components: { RadioGroup, OrderAside },
    setup(props, { root }) {
      const {
        configItems,
        getOrderFromPreviousStep,
        updatingCurrentOrder,
      } = useOrder();
      const {
        modelState,
        images,
        carImages,
        selectedModel,
        orderItems,
        priceRange,
        changeModel,
        getModelCategories,
        getModelCars,
      } = useModel();
      const orderId = root.$route.query.id;

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

      onBeforeMount(() =>
        Promise.all([getPreviousOrder(), getModelCars(), getModelCategories()])
          .then(() => (modelState.isLoading = false))
          .catch(e => Notification.error({ message: e }))
          .finally(() => (modelState.isLoading = false)),
      );
      onBeforeUnmount(() => {
        modelState.carFilter = "";
        modelState.filterModel = [];
      });

      return {
        carImages,
        modelState,
        images,
        changeModel,
        orderItems,
        selectedModel,
        priceRange,
        orderId,
        updateCurrentOrder,
      };
    },
    computed: {
      isDisabledButton() {
        return Boolean(!this.orderItems.model || !this.orderItems.city);
      },
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
      border-right: 1px solid $gray-light;
      border-top: 1px solid $gray-light;
      max-width: 80%;
      box-sizing: border-box;
      min-height: 40px;

      @include lg-and-down {
        border-top: none;
        max-width: 100%;
      }

      @include md-and-down {
        max-width: 100%;
        border: none;
      }

      & > div {
        display: inherit;
        flex-wrap: inherit;
        overflow-y: auto;
        max-height: 760px;

        @include lg-and-down {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: none;
        }

        @include md-and-down {
          grid-template-columns: 1fr 1fr;
          max-width: 100%;
        }

        @include sm {
          max-width: 100%;
          grid-template-columns: 1fr;
        }
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
            border: 1px solid $gray-light;
          }
        }

        &:nth-child(even) {
          border: none;
          border-bottom: 1px solid $gray-light;

          @include lg-and-down {
            width: 100%;
            border: 1px solid $gray-light;
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
          max-width: 256px;
          max-height: 116px;

          @include lg-and-down {
            margin: 25px auto;
          }
        }
      }
    }
  }
</style>
