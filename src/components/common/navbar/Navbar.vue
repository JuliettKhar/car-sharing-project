<template>
  <el-aside>
    <a
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>

    <a role="button" class="navbar-lang">Eng</a>
  </el-aside>
</template>

<script>
  export default {
    name: "Navbar",
  };
</script>

<style scoped lang="scss">
  .navbar-burger {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 32px;
    width: 32px;
    height: 22px;

    & span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 2px;
      margin: 0 auto;
      border: 1px solid $white;
      border-radius: 5px;
      background: #fff;

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

  .navbar-lang {
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
  }
</style>
