<template>
  <el-carousel arrow="always" class="carousel">
    <el-carousel-item v-for="(slide, index) in slides" :key="index">
      <div
        :style="{
          background: `url(images/${slide.name}.png)`,
          backgroundPosition: '50% 50%',
          backgroundSize: 'cover',
        }"
      ></div>
      <div class="carousel__content">
        <p>{{ translate(slide.title) }}</p>
        <p>{{ translate(slide.subtitle) }}</p>
        <el-button :class="`carousel__content-btn-${slide.name}`">
          {{ translate("home.slides.more") }}
        </el-button>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  import { useI18n } from "@/lang";

  export default {
    name: "Carousel",
    props: {
      slides: {
        type: Array,
        default: () => [],
      },
    },
    setup() {
      const { translate } = useI18n();
      return { translate };
    },
  };
</script>

<style scoped lang="scss">
  .carousel {
    &__content {
      transform: translate(-50%, -50%);
      position: absolute;
      top: 41%;
      left: 50%;
      font-family: Roboto, sans-serif;
      text-align: left;
      width: 495px;
      max-width: 495px;
      height: min-content;

      @include lg {
        width: 80%;
        max-width: 282px;
      }

      & img {
        filter: brightness(0.7);
      }

      & p {
        margin: 0;

        &:first-child {
          margin-bottom: 10px;
          font-weight: 500;
          font-size: 40px;
          color: $white;

          @include lg {
            font-size: 32px;
          }
        }

        &:nth-child(2) {
          margin-bottom: 32px;
          font-size: 24px;
          color: $gray-light;

          @include lg {
            font-size: 22px;
          }
        }
      }
    }

    &__content-btn {
      &-parking {
        background: linear-gradient(90deg, #13493f 0%, #0c7b1b 100%);
      }

      &-insurance {
        background: linear-gradient(90deg, #132949 0%, #0c7b67 100%);
      }

      &-gasoline {
        background: linear-gradient(90deg, #493013 0%, #7b0c3b 100%);
      }

      &-to {
        background: linear-gradient(90deg, #281349 0%, #720c7b 100%);
      }
    }

    &__content-btn-parking,
    &__content-btn-insurance,
    &__content-btn-to,
    &__content-btn-gasoline {
      width: 164px;
      max-width: 164px;
      color: $white !important;
    }
  }
</style>
