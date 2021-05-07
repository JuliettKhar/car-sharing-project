<template>
  <el-radio-group v-model="model" @change="updateFilters">
    <template v-for="(model, index) in carFilterData">
      <el-radio
        v-if="model.name"
        :key="index"
        :label="model.id"
        @change="changeValue(model)"
      >
        {{ model.name }}
      </el-radio>
      <el-radio v-else :key="index" :label="model" @change="changeValue(model)">
        {{ model }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script>
  import { ref, toRefs, watch } from "@vue/composition-api";

  export default {
    name: "RadioGroup",
    props: {
      carFilterData: {
        type: Array,
        required: true,
      },
      modelData: {
        type: String | Object,
        required: true,
      },
    },
    setup(props) {
      const { modelData } = toRefs(props);
      const model = ref("");

      watch(modelData, val => (model.value = val), { immediate: true });

      return { model };
    },
    methods: {
      changeValue(val) {
        this.$emit("change", val);
      },
      updateFilters(val) {
        this.$emit("update:modelData", val);
      },
    },
  };
</script>

<style scoped lang="scss">
  .el-radio-group {
    display: flex;
    flex-direction: row;

    @include md-and-down {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  ::v-deep .el-radio__input {
    line-height: 24px;
  }
</style>
