export const state = () => ({
  data: [],
  detail: {},
});

export const getters = {
  gettersData(state) {
    return state.data;
  },
  gettersDetail(state) {
    return state.detail;
  },
};

export const mutations = {
  mutationsData(state, value) {
    state.data = value;
  },
  mutationsDetail(state, value) {
    state.detail = value;
  },
};

export const actions = {
  async fetchData(context, params) {
    try {
      const res = await this.$axios.$get("call-tree", { params });
      if (res.meta.code !== 200) {
        context.commit("mutationsData", []);
        return;
      }
      context.commit("mutationsData", res);
    } catch (error) {
      context.commit("mutationsData", []);
    }
  },

  async importData(context, params) {
    try {
      const { data, meta } = await this.$axios.$post(
        "call-tree/import",
        params
      );
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
      window.location.reload();
    } catch (error) {
      context.commit("mutationsData", []);
    }
  },

  async storeData(context, params) {
    try {
      const { data, meta } = await this.$axios.$post("call-tree", params);
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
      this.$router.push("/call-tree");
    } catch (error) {
      context.commit("mutationsData", []);
    }
  },

  async deleteData(context, params) {
    try {
      const { data, meta } = await this.$axios.$delete(
        `call-tree/${params.id}`
      );
      context.dispatch(
        "menu/toggleAlert",
        {
          show: true,
          message: meta?.message || "Data berhasil dihapus",
          color: meta?.code !== 200 ? "error" : "success",
        },
        { root: true }
      );
      if (meta?.code !== 200) return;
      context.dispatch("fetchData", params.filter);
    } catch (error) {
      context.commit("mutationsData", []);
    }
  },

  async fetchDetail(context, params) {
    try {
      const { data, meta } = await this.$axios.$get(`call-tree/${params.id}`);
      if (meta.code !== 200) {
        context.commit("mutationsDetail", []);
        return;
      }
      context.commit("mutationsDetail", data);
    } catch (error) {
      context.commit("mutationsDetail", []);
    }
  },

  async updateData(context, params) {
    try {
      const { data, meta } = await this.$axios.$put(
        `call-tree/${params.id}`,
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
      this.$router.push("/call-tree");
    } catch (error) {
      context.commit("mutationsData", []);
    }
  },
};
