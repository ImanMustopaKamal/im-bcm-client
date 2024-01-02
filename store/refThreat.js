export const state = () => ({
  data: [],
  meta: {},
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
  getMeta(state) {
    return state.meta;
  }
};

export const mutations = {
  fetchData(state, value) {
    state.data = value;
  },
  fetchType(state, value) {
    state.types = value;
  },
  fetchMeta(state, value) {
    state.meta = value;
  },
};

export const actions = {
  async fetchData(context, params) {
    const { meta, data } = await this.$axios.$get("threats", { params });
    context.commit("fetchData", data);
    context.commit("fetchMeta", meta);
  },

  async storeData(context, params) {
    const { meta, data } = await this.$axios.$post("threats/add", params);

    context.dispatch(
      "menu/toggleAlert",
      {
        show: true,
        message: meta?.message || "Data berhasil disimpan",
        color: meta?.code !== 201 ? "error" : "success",
      },
      { root: true }
    );
    if(meta?.code !== 201) return;

    this.$router.push("/threats");
  },

  async updateData(context, params) {
    const { meta, data } = await this.$axios.$put(`/threats/${params.id}`, params.data);

    context.dispatch(
      "menu/toggleAlert",
      {
        show: true,
        message: meta?.message || "Data berhasil disimpan",
        color: meta?.code !== 200 ? "error" : "success",
      },
      { root: true }
    );
    if(meta?.code !== 200) return;

    this.$router.push("/threats");
  },

  async deleteData(context, params) {
    const { meta, data } = await this.$axios.$delete(`/threats/${params.id}`);

    context.dispatch(
      "menu/toggleAlert",
      {
        show: true,
        message: meta?.message || "Data berhasil disimpan",
        color: meta?.code !== 200 ? "error" : "success",
      },
      { root: true }
    );
    if(meta?.code !== 200) return;

    context.dispatch("fetchData", params.filter);
  },

  async fetchDetail(context, params) {
    const { meta, data } = await this.$axios.$get(`/threats/${params.id}`);

    context.commit("fetchData", data);
  },

  async fetchTypes(context, params) {
    const { meta, data } = await this.$axios.$get("threat_types", { params });

    context.commit("fetchType", data);
    context.commit("fetchMeta", meta);
  },

  async storeType(context, params) {
    const { meta, data } = await this.$axios.$post("threat_types/add", params);

    context.dispatch(
      "menu/toggleAlert",
      {
        show: true,
        message: meta?.message || "Data berhasil disimpan",
        color: meta?.code !== 201 ? "error" : "success",
      },
      { root: true }
    );
    if(meta?.code !== 201) return;

    this.$router.push("/threat-types");
  },
  
  async deleteType(context, params) {
    const { meta, data } = await this.$axios.$delete(`/threat_types/${params.id}`);

    context.dispatch(
      "menu/toggleAlert",
      {
        show: true,
        message: meta?.message || "Data berhasil disimpan",
        color: meta?.code !== 200 ? "error" : "success",
      },
      { root: true }
    );
    if(meta?.code !== 200) return;

    context.dispatch("fetchTypes", params.filter);
  },
  
  async fetchTypeDetail(context, params) {
    const { meta, data } = await this.$axios.$get(`/threat_types/${params.id}`);

    context.commit("fetchType", data);
  },

  async updateType(context, params) {
    const { meta, data } = await this.$axios.$put(`/threat_types/${params.id}`, params.data);

    context.dispatch(
      "menu/toggleAlert",
      {
        show: true,
        message: meta?.message || "Data berhasil disimpan",
        color: meta?.code !== 200 ? "error" : "success",
      },
      { root: true }
    );
    if(meta?.code !== 200) return;

    this.$router.push("/threat-types");
  }
};
