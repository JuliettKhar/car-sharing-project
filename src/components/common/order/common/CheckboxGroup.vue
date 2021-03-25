<template>
  <el-checkbox-group v-model="model">
    <el-checkbox
      v-for="(item, index) in checkboxFilterData"
      :key="index"
      :label="item"
    >
      {{ item }}
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

<style scoped></style>
