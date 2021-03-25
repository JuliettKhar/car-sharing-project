<template>
  <div class="">
    <div class="">
      <p>Цвет</p>
      <radio-group
        :model-data.sync="colorFilter"
        :car-filter-data="colorModel"
      />
      <div>
        <p>Дата аренды</p>
        <div class="">
          <el-date-picker
            v-model="value1"
            type="datetime"
            editable
            :clearable="false"
            clear-icon="el-icon-close"
            placeholder="Select date and time"
          >
          </el-date-picker>
        </div>
        <div class="">
          <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="Select date and time"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="">
        <p>Тариф</p>
        <radio-group
          :model-data.sync="tariffFilter"
          :car-filter-data="tariffModel"
        />
      </div>
      <div class="">
        <p>Доп услуги</p>
        <checkbox-group
          :checkbox-filter-data.sync="extraOptionsData"
          :checkbox-model-data="extraOptions"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from "@vue/composition-api";
  import RadioGroup from "@/components/common/order/common/RadioGroup";
  import CheckboxGroup from "@/components/common/order/common/CheckboxGroup";

  export default {
    name: "Extra",
    components: { RadioGroup, CheckboxGroup },
    setup() {
      const colorFilter = ref("any");
      const tariffFilter = ref("day");
      const extraOptions = ref(["Полный бак, 500р"]);
      const colorModel = [
        { value: "any", title: "Любой" },
        { value: "red", title: "Красный" },
        { value: "blue", title: "Голубой" },
      ];
      const tariffModel = [
        { value: "minute", title: "Поминутно, 7₽/мин" },
        { value: "day", title: "На сутки, 1999 ₽/сутки" },
      ];
      const extraOptionsData = [
        "Полный бак, 500р",
        "Детское кресло, 200р",
        "Правый руль, 1600р",
      ];

      return {
        colorFilter,
        colorModel,
        tariffFilter,
        tariffModel,
        extraOptions,
        extraOptionsData,
      };
    },
  };
</script>

<style scoped></style>
