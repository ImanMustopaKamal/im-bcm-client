export const state = () => ({
  stafCondition: [],
  appTestingPeriod: [],
  indirectUnit: [],
  reffCurrency: [],
  error: false
});

export const getters = {
  getStafCondition(state) {
    return state.stafCondition;
  },
  getAppTestingPeriod(state) {
    return state.appTestingPeriod;
  },
  getIndirectUnit(state) {
    return state.indirectUnit;
  },
  getReffCurrency(state) {
    return state.reffCurrency;
  },
  getError(state) {
    return state.error;
  }
};

export const mutations = {
  fetchStafCondition(state, value) {
    state.stafCondition = value;
  },
  fetchAppTestingPeriod(state, value) {
    state.appTestingPeriod = value;
  },
  fetchIndirectUnit(state, value) {
    state.indirectUnit = value;
  },
  fetchReffCurrency(state, value) {
    state.reffCurrency = value;
  },
  fetchError(state, value) {
    state.error = value;
  },
};

export const actions = {
  async fetchStafCondition(context, params) {
    const {data} = await this.$axios.$get("staff_condition", { params });
    context.commit("fetchStafCondition", data);
  },
  async fetchAppTestingPeriod(context, params) {
    const {data} = await this.$axios.$get("app_testing_period", { params });
    context.commit("fetchAppTestingPeriod", data);
  },
  async fetchIndirectUnit(context, params) {
    const {data} = await this.$axios.$get("indirect_unit", { params });
    context.commit("fetchIndirectUnit", data);
  },
  async fetchReffCurrency(context, params) {
    const {data} = await this.$axios.$get("currency", { params });
    context.commit("fetchReffCurrency", data);
  },
}