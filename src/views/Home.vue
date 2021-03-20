<template>
  <section class="home">
    <div class="home__main">
      <Header />
      <div class="home__main-content">
        <div>
          <p class="">Каршеринг</p>
          <p>Need for drive</p>
          <p>Поминутная аренда авто твоего города</p>
          <el-button class="home__main-content__button"
            >Забронировать</el-button
          >
        </div>
      </div>
      <Footer />
    </div>
    <div class="home__slider">
      <Carousel :slides="slides" />
    </div>
  </section>
</template>

<script>
  import Header from "@/components/common/home/Header";
  import Footer from "@/components/common/home/Footer";
  import Carousel from "@/components/common/Carousel";

  export default {
    name: "Home",
    components: { Header, Footer, Carousel },
    setup() {
      const slides = [
        {
          name: "parking",
          title: "Бесплатная парковка",
          subtitle:
            "Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.",
        },
        {
          name: "insurance",
          title: "Страховка",
          subtitle: "Полная страховка страховка автомобиля",
        },
        {
          name: "gasoline",
          title: "Бензин",
          subtitle: "Полный бак на любой заправке города за наш счёт.",
        },
        {
          name: "to",
          title: "Обслуживание",
          subtitle: "Автомобиль проходит еженедельное ТО",
        },
      ];

      return { slides };
    },
  };
</script>
<style lang="scss">
  .home {
    display: flex;
    height: 100%;

    &__main {
      display: flex;
      flex-direction: column;
      padding: 32px 64px;
      width: 50%;
      max-width: 50%;
      box-sizing: border-box;

      @include lg {
        padding: 32px 32px;
        width: 60%;
        max-width: 60%;
      }

      @include md-and-down {
        width: 100%;
        max-width: 100%;
        padding: 0;
      }
    }

    &__main-content {
      display: flex;
      flex: 1;
      align-items: center;

      @include md-and-down {
        align-items: flex-start;
      }

      & > div {
        text-align: left;

        @include md-and-down {
          width: 100%;
        }
      }

      & > div p {
        margin: 0;

        @include md-and-down {
          padding: 0 16px;
        }

        &:first-child {
          font-weight: bold;
          font-size: 70px;
          color: $black;

          @include md-and-down {
            font-size: 32px;
          }
        }

        &:nth-child(2) {
          margin: 0 0 30px 0;
          font-weight: bold;
          font-size: 70px;
          color: $green;

          @include md-and-down {
            font-size: 32px;
          }
        }

        &:nth-child(3) {
          margin: 0 0 60px 0;
          font-size: 26px;
          color: $gray;

          @include md-and-down {
            font-size: 18px;
          }
        }
      }
    }

    &__main-content__button {
      width: 250px;
      max-width: 250px;
      background: linear-gradient(
        90deg,
        $green 2.61%,
        $dark-green 112.6%
      ) !important;
      background-blend-mode: darken;
      border-radius: 8px !important;
      color: $white !important;
      font-weight: 500 !important;
      font-size: 18px !important;
      line-height: 21px !important;
      outline: none;

      @include md-and-down {
        width: 100%;
        max-width: 100%;
      }

      &:active {
        background: linear-gradient(
          90deg,
          #076432 2.61%,
          #013c27 112.6%
        ) !important;
      }

      &:hover {
        background: linear-gradient(
          90deg,
          #0b934a 2.61%,
          #026e47 112.6%
        ) !important;
      }

      &:disabled {
        background: $gray-light;
        background: linear-gradient(90deg, #0b934a 2.61%, #026e47 112.6%);
      }

      &:focus {
        background: linear-gradient(
          90deg,
          #0b934a 2.61%,
          #026e47 112.6%
        ) !important;
      }
    }

    &__slider {
      width: 50%;
      max-width: 50%;

      @include lg {
        display: block;
        width: 40%;
        max-width: 40%;
      }

      @include md-and-down {
        display: none;
      }
    }
  }

  .el-button {
    width: 100%;
    border-radius: 0 !important;
  }
</style>
