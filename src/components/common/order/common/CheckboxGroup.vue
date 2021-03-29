<template>
  <el-checkbox-group v-model="model">
    <el-checkbox
      v-for="(item, index) in checkboxFilterData"
      :key="index"
      :label="item"
    >
      {{ $translate(`checkboxGroup.${item}`) }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
  import { ref } from "@vue/composition-api";

  export default {
    name: "CheckboxGroup",
    props: {
      checkboxFilterData: {
        type: Array,
        required: true,
      },
      checkboxModelData: {
        type: Array,
        required: true,
      },
    },
    setup(props, { emit }) {
      const model = ref(props.checkboxModelData);

      function updateFilters(val) {
        emit("update:checkboxModelData", val);
      }

      return { updateFilters, model };
    },
  };
</script>

<style scoped lang="scss">
  ::v-deep .el-checkbox__inner::after {
    border: 2px solid #121212;
    border-left: 0;
    border-top: 0;
    height: 9px;
    left: 5px;
    top: -3px;
  }

  .el-checkbox-group {
    display: flex;
    flex-direction: row;

    @include sm {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
