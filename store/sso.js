const domainOrigin = process.env.DOMAIN_ORIGIN;
const ssoAppClientId = process.env.SSO_APP_CLIENT_ID;

const formatBaseUrl = (slug) => {
  return process.env.API_SSO + slug;
};

export const state = () => ({});

export const mutations = {};

export const actions = {
  GetAll: async function ({ commit, rootState }, { url, params }) {
    try {
      var { data } = await this.$axios(formatBaseUrl(url), {
        method: "get",
        params: params,
        headers: {
          "Access-Control-Allow-Origin": domainOrigin,
          "Content-Type": "application/json",
          Authorization: rootState.auth.id_token,
        },
        crossDomain: true,
        crossorigin: true,
      });
      return data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          await this.$axios(formatBaseUrl("/auth/logout"), {
            method: "post",
            headers: {
              "APP-CLIENT-ID": ssoAppClientId,
              "Access-Control-Allow-Origin": domainOrigin,
              Accept: "application/json",
              Content: "application/json",
              Authorization: rootState.auth.access_token,
            },
          })
            .then((res) => {
              commit("setAuth", null, { root: true });
              this.$cookies.removeAll();
              this.$router.push("404");
            })
            .catch((err) => {
              commit("setAuth", null, { root: true });
              this.$cookies.removeAll();
              this.$router.push("404");
            });
        }
      }
    }
  },
  async logout({ commit, rootState }) {
    await this.$axios(formatBaseUrl("/auth/logout"), {
      method: "post",
      headers: {
        "APP-CLIENT-ID": ssoAppClientId,
        "Access-Control-Allow-Origin": domainOrigin,
        Accept: "application/json",
        Content: "application/json",
        Authorization: rootState.auth.access_token,
      },
    })
      .then((res) => {
        commit("setAuth", null, { root: true });
        this.$cookies.removeAll();
        window.location.href = `${process.env.SSO_APP}/login?ref=${process.env.APP_URL}`;
      })
      .catch((err) => {
        commit("setAuth", null, { root: true });
        this.$cookies.removeAll();
        window.location.href = `${process.env.SSO_APP}/login?ref=${process.env.APP_URL}`;
      });
  },
};
