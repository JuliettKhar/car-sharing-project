import Vue from "vue";
import Vuex from "vuex";
import { location } from "@/store/modules/location";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    location,
  },
});

export const useStore = () => {
  return { store };
};

export default store;
