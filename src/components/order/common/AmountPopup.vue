<template>
  <div :class="['amountPopup', isActive ? 'amountPopup-is-active' : '']">
    <div class="amountPopup__wrapper">
      <p>{{ $translate("orderForm.content.amount.popup.confirm") }}</p>
      <el-button class="accept-btn" @click="acceptClick">
        {{ $translate("orderForm.content.amount.popup.accept") }}
      </el-button>
      <el-button class="finish-btn" @click="cancelClick">
        {{ $translate("orderForm.content.amount.popup.cancel") }}
      </el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: "AmountPopup",
    props: {
      isActive: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { emit }) {
      const cancelClick = () => {
        emit("update:isActive", false);
      };
      const acceptClick = () => {
        emit("accept", true);
      };

      return {
        cancelClick,
        acceptClick,
      };
    },
  };
</script>

<style scoped lang="scss">
  .amountPopup {
    display: none;

    &-is-active {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.9);
      z-index: 99;
    }

    &__wrapper {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
      width: 390px;
      max-width: 390px;

      p {
        width: 100%;
        font-size: 24px;
        color: $black;
      }

      ::v-deep button.accept-btn {
        max-width: 177px;
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color: $white;
        background: linear-gradient(90deg, #0ec261 2.61%, #039f67 112.6%);
        background-blend-mode: darken;
        border-radius: 8px !important;
        padding: 10px 15px;
        margin-bottom: 0;

        @include sm {
          margin-bottom: 20px;
        }
      }

      ::v-deep button.finish-btn {
        font-size: 18px;
        border-radius: 8px !important;
      }
    }
  }
</style>
