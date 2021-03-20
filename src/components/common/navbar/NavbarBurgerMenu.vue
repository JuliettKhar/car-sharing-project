<template>
  <div :class="['navbar-burger-menu', isMenuOpen ? 'is-active' : '']">
    <div class="navbar-burger-menu-close" @click="closeMenu"></div>
    <nav>
      <router-link v-for="(page, index) in pages" :key="index" to="">
        {{ page }}
      </router-link>
      <ul class="navbar-burger-menu__social">
        <li class="navbar-burger-menu__social-item">
          <a href="#">
            <!--            <img src="images/icons/tg.svg" alt=""/>-->
          </a>
        </li>
        <li class="navbar-burger-menu__social-item">
          <a href="#"><img src="images/icons/fb.svg" alt=""/></a>
        </li>
        <li class="navbar-burger-menu__social-item">
          <a href="#"><img src="images/icons/insta.svg" alt=""/></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "NavbarBurgerMenu",
    props: {
      isMenuOpen: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { emit }) {
      const pages = ["ПАРКОВКА", "СТРАХОВКА", "БЕНЗИН", "ОБСЛУЖИВАНИЕ"];

      function closeMenu() {
        emit("update:isMenuOpen", false);
      }

      return { pages, closeMenu };
    },
  };
</script>

<style scoped lang="scss">
  .navbar-burger-menu {
    display: none;
    opacity: 0;
  }
  .navbar-burger-menu.is-active {
    display: flex;
    position: absolute;
    z-index: 11;
    left: 0;
    top: 0;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(21, 27, 31, 0.81);
    opacity: 1;
    transition: opacity 1s ease-in;

    & nav {
      display: flex;
      flex-direction: column;
      padding: 0 0 0 128px;
      align-items: flex-start;
      box-sizing: border-box;
      height: 100%;
      justify-content: center;
      background: #111518;
      max-width: calc(50% + 33px);
      width: calc(50% + 33px);

      @include lg {
        max-width: calc(60% + 33px);
        width: calc(60% + 33px);
      }

      @include md-and-down {
        padding: 90px 0 0 28px;
        justify-content: flex-start;
        width: 100%;
        max-width: 100%;
      }
    }

    & nav a {
      font-weight: 500;
      font-size: 32px;
      color: $white;
      margin-bottom: 10px;

      @include md-and-down {
        font-size: 22px;
      }

      &:hover {
        color: $green;
        transition: color 0.3s ease-in;
      }
    }
  }

  .navbar-burger-menu-close {
    position: absolute;
    top: 30px;
    left: 16px;
    width: 32px;
    height: 32px;
    cursor: pointer;

    @include md-and-down {
      top: 20px;
    }

    &:before,
    &:after {
      position: absolute;
      content: "";
      top: 50%;
      left: 50%;
      width: 3px;
      height: 24px;
      border-radius: 5px;
      background: $white;
      transform: rotate(0deg);
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
      transition: rotate 0.3s ease;
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
      transition: rotate 0.3s ease;
    }
  }

  .navbar-burger-menu__social {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;

    &-item {
      margin: 45px 20px 0 0;
      width: 32px;
      height: 32px;

      &:first-child a {
        display: block;
        width: 32px;
        height: 32px;
        background: url("../../../assets/icons/tg.svg");

        &:hover {
          fill: #0b934a;
        }
      }
    }
  }
</style>
