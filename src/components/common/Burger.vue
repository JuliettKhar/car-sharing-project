<template>
  <a
    role="button"
    class="burger"
    aria-label="menu"
    aria-expanded="false"
    @click="$emit('open')"
  >
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </a>
</template>

<script>
  export default {
    name: "Burger",
  };
</script>

<style scoped lang="scss">
  .burger {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 32px;
    width: 32px;
    height: 22px;
    cursor: pointer;

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
</style>
