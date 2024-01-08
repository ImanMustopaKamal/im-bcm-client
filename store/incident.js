export const state = () => ({
  data: [],
  loading: false,
  meta: {},
});

export const getters = {
  getData(state) {
    return state.data;
  },
  getMeta(state) {
    return state.meta;
  },
};

export const mutations = {
  fetchData(state, value) {
    state.data = value;
  },
  fetchMeta(state, value) {
    state.meta = value;
  },
};

export const actions = {
  async fetchData(context, params) {
    const { data, meta } = await this.$axios.$get("disaster", { params });
    const organizations = context?.rootState?.organizations?.data?.data || [];
    data.forEach((item, index) => {
      data[index].disaster_location_name =
        organizations.find((unit) => unit.id === item.disaster_location)
          ?.name || "";
    });
    context.commit("fetchData", data);
    context.commit("fetchMeta", meta);
  },

  async storeData(context, params) {
    const { meta, data } = await this.$axios.$post("disaster/create", params);

    context.dispatch(
      "menu/toggleAlert",
      {
        show: true,
        message: meta?.message || "Data berhasil disimpan",
        color: meta?.code !== 201 ? "error" : "success",
      },
      { root: true }
    );
    if (meta?.code !== 201) return;
    this.$router.push("/incident");
  },

  async updateData(context, params) {
    const { meta, data } = await this.$axios.$put(
      "disaster/" + params.id,
      params.data
    );

    context.dispatch(
      "menu/toggleAlert",
      {
        show: true,
        message: meta?.message || "Data berhasil disimpan",
        color: meta?.code !== 200 ? "error" : "success",
      },
      { root: true }
    );
    if (meta?.code !== 200) return;
    this.$router.push("/incident");
  },

  async deleteData(context, params) {
    const { meta, data } = await this.$axios.$delete("disaster/" + params.id);
    context.dispatch(
      "menu/toggleAlert",
      {
        show: true,
        message: meta?.message || "Data berhasil disimpan",
        color: meta?.code !== 200 ? "error" : "success",
      },
      { root: true }
    );
    if (meta?.code !== 200) return;
    context.dispatch("fetchData", params.filter);
  },

  async fetchDetail(context, params) {
    const { data } = await this.$axios.$get("disaster/" + params.id);

    context.commit("fetchData", data);
  },
};
