<template>
  <div class="el-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>promotion management</el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "Breadcrumbs",
  };
</script>

<style scoped lang="scss">
  .el-breadcrumb {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;

    ::v-deep &__inner .is-link {
      color: $green !important;
    }
  }

  .el-breadcrumb__inner.is-link {
    color: $green !important;
  }

  .el-container {
    position: relative;
    @include container;
  }
</style>
