const domainOrigin = process.env.DOMAIN_ORIGIN;

const formatBaseUrl = (slug) => {
  return process.env.API_SSO + slug;
};

export const state = () => ({
  data: [],
  structure: [],
  error: false,
  isLoading: false,
  meta: {},
});

export const getters = {
  getData(state) {
    return {
      data: state.data,
      error: state.error,
    };
  },
  getStructure(state) {
    return state.structure;
  },
};

export const mutations = {
  fetchData(state, value) {
    state.data = value;
    state.error = value.dataCount === undefined ? true : false;
  },
  FETCH_STRUCTURE(state, value) {
    state.structure = value;
  },
};

export const actions = {
  async fetchData(context, params) {
    try {
      const { data } = await this.$axios(
        formatBaseUrl(
          `/tenants/${context.rootState.auth.tenant_id}/organizations`
        ),
        {
          method: "get",
          params: params,
          headers: {
            "Access-Control-Allow-Origin": domainOrigin,
            "Content-Type": "application/json",
            Authorization: context.rootState.auth.id_token,
          },
          crossDomain: true,
          crossorigin: true,
        }
      );

      context.commit("fetchData", data);
    } catch (error) {
      context.commit("fetchData", []);
    }
  },

  async fetchStructure(context, params) {
    try {
      const res = await this.$axios.$get("org_structure", { params });
      if (res?.meta?.code !== 200) {
        context.commit("FETCH_STRUCTURE", []);
        return true;
      }
      context.commit("FETCH_STRUCTURE", res);
    } catch (error) {
      context.commit("FETCH_STRUCTURE", []);
    }
  },

  async createStructure(context, params) {
    try {
      const res = await this.$axios.$post("org_structure/add", params);
      context.dispatch(
        "menu/toggleAlert",
        {
          show: true,
          message: res?.meta?.message || "Data berhasil disimpan",
          color: res?.meta?.code !== 201 ? "error" : "success",
        },
        { root: true }
      );
      if(res?.meta?.code !== 201) return;
      context.dispatch("fetchStructure", params.filter);
      this.$router.push("/organization-structure");
    } catch (error) {
      return false;
    }
  },

  async updateStructure(context, params) {
    try {
      const res = await this.$axios.$put(`org_structure/${params.id}`, params.data);
      context.dispatch(
        "menu/toggleAlert",
        {
          show: true,
          message: res?.meta?.message || "Data berhasil disimpan",
          color: res?.meta?.code !== 200 ? "error" : "success",
        },
        { root: true }
      );
      if(res?.meta?.code !== 200) return;
      context.dispatch("fetchStructure", params.filter);
      this.$router.push("/organization-structure");
    } catch (error) {
      return false;
    }
  },

  async deleteStructure(context, params) {
    try {
      const res = await this.$axios.$delete(`org_structure/${params.id}`);
      context.dispatch(
        "menu/toggleAlert",
        {
          show: true,
          message: res?.meta?.message || "Data berhasil disimpan",
          color: res?.meta?.code !== 200 ? "error" : "success",
        },
        { root: true }
      );
      if(res?.meta?.code !== 200) return;
      context.dispatch("fetchStructure", params.filter);
    } catch (error) {
      return false;
    }
  },

  async fetchStructureDetail(context, params) {
    try {
      const res = await this.$axios.$get(`org_structure/${params.id}`);
      if (res?.data === null) {
        context.commit("FETCH_STRUCTURE", []);
        return true;
      }
      context.commit("FETCH_STRUCTURE", res);
    } catch (error) {
      context.commit("FETCH_STRUCTURE", []);
    }
  }
};
