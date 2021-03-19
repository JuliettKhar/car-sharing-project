<template>
  <el-carousel arrow="always" class="carousel">
    <el-carousel-item v-for="(slide, index) in slides" :key="index">
      <img :src="`./images/${slide.name}.png`" alt="slide" />
      <div class="carousel__content">
        <p>{{ slide.title }}</p>
        <p>{{ slide.subtitle }}</p>
        <el-button :class="`carousel__content-btn-${slide.name}`"
          >Подробнее</el-button
        >
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: "Carousel",
    props: {
      slides: {
        type: Array,
        default: () => [],
      },
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
        }

        &:nth-child(2) {
          margin-bottom: 32px;
          font-size: 24px;
          color: $gray-light;
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
      color: $white !important;
    }
  }
</style>
