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
      slider
    </div>
  </section>
</template>

<script>
  import Header from "@/components/common/home/Header";
  import Footer from "@/components/common/home/Footer";
  export default {
    name: "Home",
    components: { Header, Footer },
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
    }

    &__main-content {
      display: flex;
      flex: 1;
      align-items: center;

      & > div {
        text-align: left;
      }

      & > div p {
        margin: 0;

        &:first-child {
          font-weight: bold;
          font-size: 70px;
          color: $black;
        }

        &:nth-child(2) {
          margin: 0 0 30px 0;
          font-weight: bold;
          font-size: 70px;
          color: $green;
        }

        &:nth-child(3) {
          margin: 0 0 60px 0;
          font-size: 26px;
          color: $gray;
        }
      }
    }

    &__main-content__button {
      width: 250px;
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
    }

    &__slider {
      width: 50%;
      max-width: 50%;
    }
  }
</style>
