const state = () => ({
  cities: [],
  city: {},
});
const mutations = {
  SET_CITIES(state, cities) {
    state.cities = cities;
  },
  SET_CITY(state, city) {
    state.city = city;
  },
};

export const location = {
  namespaced: true,
  state,
  mutations,
};
