<template>
  <el-radio-group v-model="model" @change="updateFilters">
    <el-radio
      v-for="(model, index) in carFilterData"
      :key="index"
      :label="translate(`radioGroup.${model}`)"
    >
      {{ $translate(`radioGroup.${model}`) }}
    </el-radio>
  </el-radio-group></template
>

<script>
  import { ref } from "@vue/composition-api";
  import { useI18n } from "@/lang";

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
      const { translate } = useI18n();
      const model = ref(props.modelData);

      function updateFilters(val) {
        emit("update:modelData", val);
      }

      return { updateFilters, model, translate };
    },
  };
</script>

<style scoped lang="scss">
  .el-radio-group {
    display: flex;
    flex-direction: row;

    @include sm {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  ::v-deep .el-radio__input {
    line-height: 24px;
  }
</style>
