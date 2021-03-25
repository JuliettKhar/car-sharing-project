<template>
  <el-radio-group v-model="model" @change="updateFilters">
    <el-radio
      v-for="(model, index) in carFilterData"
      :key="index"
      :label="model.value"
    >
      {{ model.title }}
    </el-radio>
  </el-radio-group></template
>

<script>
  import { ref } from "@vue/composition-api";

  export default {
    name: "RadioGroup",
    props: {
      carFilterData: {
        type: Array,
        required: true,
      },
      modelData: {
        type: String,
        required: true,
      },
    },
    setup(props, { emit }) {
      const model = ref(props.modelData);

      function updateFilters(val) {
        emit("update:modelData", val);
      }

      return { updateFilters, model };
    },
  };
</script>

<style scoped></style>
