<template>
  <el-aside class="navbar-aside">
    <a
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      @click="openBurger"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>

    <navbar-lang-toggle />
  </el-aside>
</template>

<script>
  import NavbarLangToggle from "@/components/common/navbar/NavbarLangToggle";

  export default {
    name: "Navbar",
    components: { NavbarLangToggle },
    setup(props, { emit }) {
      function openBurger() {
        emit("open");
      }

      return {
        openBurger,
      };
    },
  };
</script>

<style scoped lang="scss">
  .navbar {
    &-aside {
      position: static;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;

      height: 100%;
      background: #151b1f;

      @include md-and-down {
        position: fixed;
        height: 90px;
        background: $white;
      }
    }

    &-burger {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 32px;
      width: 32px;
      height: 22px;
      cursor: pointer;

      @include md-and-down {
        margin-top: 25px;
        height: 18px;
      }

      & span {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 24px;
        height: 2px;
        margin: 0 auto;
        border: 1px solid $white;
        border-radius: 5px;
        background: $white;

        @include md-and-down {
          height: 1px;
          border: 1px solid $black;
          background: $black;
        }

        &:first-child {
          top: 0;
        }

        &:last-child {
          bottom: 0;
        }

        &:nth-child(2) {
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    &-lang {
      position: relative;
      display: block;
      margin-bottom: 32px;
      width: 23px;
      height: 16px;
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 13px;
      color: $green;
      text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      cursor: pointer;

      @include md-and-down {
        display: none;
      }

      &:hover {
        color: $gray-light;
      }

      &:before {
        position: absolute;
        content: "";
        width: 40px;
        height: 40px;
        top: 50%;
        left: 50%;
        border: 1px solid $gray-light;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
      }

      &:hover:before {
        opacity: 1;
        transition: opacity 0.5s ease-in;
      }

      &:active {
        color: $green;
      }
    }
  }
</style>
