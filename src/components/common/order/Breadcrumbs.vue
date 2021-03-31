<template>
  <div class="el-container">
    <el-breadcrumb separator-class="el-icon-caret-right">
      <el-breadcrumb-item
        v-for="(route, index) in routes"
        :key="index"
        :to="{ name: route.name }"
        :class="[
          getActiveLinkClass(route.name) ? 'is-link-active' : 'breadcrumbs',
        ]"
      >
        {{ $translate(`breadcrumbs.${route.meta.title}`) }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "Breadcrumbs",
    props: {
      routes: {
        type: Array,
        required: true,
      },
    },
    setup(props, { root }) {
      function getActiveLinkClass(name) {
        return root.$route.path.includes(name.toLowerCase());
      }

      return { getActiveLinkClass };
    },
  };
</script>

<style scoped lang="scss">
  .el-breadcrumb {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;

    @include sm {
      line-height: 20px;
    }
  }

  .el-container {
    position: relative;
    padding: 0 64px;

    @include sm {
      padding: 0 16px;
    }
  }

  ::v-deep .breadcrumbs span,
  ::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    font-weight: bold;
    font-size: 14px;
    color: $gray;
    cursor: pointer;
  }

  ::v-deep .is-link-active span {
    color: $green !important;
  }

  ::v-deep .el-breadcrumb__separator[class*="icon"] {
    margin: 0 16px;
  }

  ::v-deep .el-breadcrumb__inner.is-link:hover {
    color: $green;
    font-weight: bold;
  }
</style>
