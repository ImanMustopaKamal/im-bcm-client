const domainOrigin = process.env.DOMAIN_ORIGIN;

const formatBaseUrl = (slug) => {
  return process.env.API_SSO + slug;
};

export const state = () => ({
  data: [],
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
};

export const mutations = {
  fetchData(state, value) {
    state.data = value;
    state.error = value.dataCount === undefined ? true : false;
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
};
