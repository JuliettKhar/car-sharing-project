<template>
  <el-checkbox-group v-model="model" @change="updateFilters">
    <template v-for="(item, index) in checkboxFilterData">
      <el-checkbox
        v-if="item.name"
        :key="index"
        :label="item.name"
        @change="changeValue(item, index)"
      >
        {{ $translate(`checkboxGroup.${item.name}`) }}
      </el-checkbox>
      <el-checkbox
        v-else
        :key="index"
        :label="item"
        @change="changeValue(item, index)"
      >
        {{ $translate(`checkboxGroup.${item}`) }}
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script>
  import { ref, toRefs, watch } from "@vue/composition-api";

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
      const { checkboxModelData } = toRefs(props);
      const model = ref([]);

      watch(checkboxModelData, val => (model.value = val), { immediate: true });

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
