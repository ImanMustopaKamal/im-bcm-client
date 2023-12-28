export const state = () => ({
  data: [],
  types: [],
  loading: false,
});

export const getters = {
  getData(state) {
    return state.data;
  },
  getTypes(state) {
    return state.types;
  },
};

export const mutations = {
  fetchData(state, value) {
    state.data = value;
  },
  fetchType(state, value) {
    state.types = value;
  },
};

export const actions = {
  async fetchData(context, params) {
    const { data } = await this.$axios.$get("threats", { params });
    context.commit("fetchData", data);
  },

  async storeData(context, params) {
    const { data } = await this.$axios.$post("threats/add", params);

    this.$router.push("/referensi-ancaman");
  },

  async updateData(context, params) {
    const { data } = await this.$axios.$put(`/threats/${params.id}`, params.data);

    this.$router.push("/threats");
  },

  async deleteData(context, params) {
    const { data } = await this.$axios.$delete(`/threats/${params}`);

    context.dispatch("fetchData");
  },

  async fetchDetail(context, params) {
    const { data } = await this.$axios.$get(`/threats/${params.id}`);

    context.commit("fetchData", data);
  },

  async fetchTypes(context, params) {
    const { data } = await this.$axios.$get("threat_types", { params });

    context.commit("fetchType", data);
  },

  async storeType(context, params) {
    const { data } = await this.$axios.$post("threat_types/add", params);

    this.$router.push("/threat-types");
  },
  
  async deleteType(context, params) {
    const { data } = await this.$axios.$delete(`/threat_types/${params}`);

    context.dispatch("fetchTypes");
  },
  
  async fetchTypeDetail(context, params) {
    const { data } = await this.$axios.$get(`/threat_types/${params.id}`);

    context.commit("fetchType", data);
  },

  async updateType(context, params) {
    const { data } = await this.$axios.$put(`/threat_types/${params.id}`, params.data);

    this.$router.push("/threat-types");
  }
};
