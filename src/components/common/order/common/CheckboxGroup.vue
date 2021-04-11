<template>
  <el-checkbox-group v-model="model" @change="updateFilters">
    <el-checkbox
      v-for="(item, index) in checkboxFilterData"
      :key="index"
      :label="item"
      @change="changeValue(item, index)"
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
    setup(props) {
      const model = ref(props.checkboxModelData);

      return { model };
    },
    methods: {
      changeValue(item, index) {
        this.$emit("change", { item, index });
      },
      updateFilters(val) {
        this.$emit("update:checkboxModelData", val);
      },
    },
  };
</script>

<style scoped lang="scss">
  ::v-deep .el-checkbox__inner::after {
    border: 2px solid $black;
    border-left: 0;
    border-top: 0;
    height: 9px;
    left: 5px;
    top: -3px;
  }

  .el-checkbox-group {
    display: flex;
    flex-direction: row;

    @include md-and-down {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
