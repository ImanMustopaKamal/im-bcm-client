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
      const res = await this.$axios.$get("workflow_module", { params });
      if (res.meta.code !== 200) {
        context.commit("mutationsData", []);
        return;
      }
      res.data.map((item) => {
        item.id = item.code;
      });
      context.commit("mutationsData", res);
    } catch (error) {
      context.commit("mutationsData", []);
    }
  },

  async fetchDetail(context, params) {
    try {
      const res = await this.$axios.$get("workflow_module/detail", { params });
      if (res.meta.code !== 200) {
        context.commit("mutationsDetail", {});
        return;
      }
      context.commit("mutationsDetail", res.data);
    } catch (error) {
      context.commit("mutationsDetail", {});
    }
  },

  async storeData(context, params) {
    try {
      const { data, meta } = await this.$axios.$post("workflow_module/add", params);
      console.log("🚀 ~ file: workflowModule.js:57 ~ storeData ~ data, meta:", data, meta)
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
      context.dispatch("fetchData");
      this.$router.push("/workflow-module");
    } catch (error) {
      context.commit("mutationsData", []);
    }
  },
};
