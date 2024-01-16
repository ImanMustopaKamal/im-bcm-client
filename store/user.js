// https://authdev.riskobs.com/v1/tenants/H3pZkf7W/users?app_id=2&limit=10&offset=0
export const state = () => ({
  data: [],
  roles: [],
});

export const getters = {
  gettersData(state) {
    return state.data;
  },
  gettersRoles(state) {
    return state.roles;
  },
};

export const mutations = {
  mutationsData(state, value) {
    state.data = value;
  },
  mutationsRoles(state, value) {
    state.roles = value;
  },
};

export const actions = {
  async fetchData(context, params) {
    params.app_id = process.env.SSO_APP_CLIENT_ID;
    try{
      const res = await this.$axios.$get(`${process.env.API_SSO}/tenants/${context.rootState.auth.tenant_id}/users`, { params });
      const data = {
        data: res.data,
        data_count: res.dataCount,
      }
      context.commit("mutationsData", data);
    }catch(error){
      context.commit("mutationsData", []);
    }
  },

  async updateData(context, params) {
    const data = {
      app_id: Number(process.env.SSO_APP_CLIENT_ID)
    }
    try{
      const res = await this.$axios.$post(`${process.env.API_SSO}/tenants/${context.rootState.auth.tenant_id}/users/${params.id}/${params.status}`, data);
      context.dispatch(
        "menu/toggleAlert",
        {
          show: true,
          message: res.message,
          color: "success",
        },
        { root: true }
      );
      context.dispatch("fetchData", params.filter);
    }catch(error){
      return error.response;
    }
  },

  async fetchRoles(context, params) {
    try{
      const res = await this.$axios.$get(`${process.env.API_SSO}/apps/${process.env.SSO_APP_CLIENT_ID}/roles`, { params });
      context.commit("mutationsRoles", res);
    }catch(error){
      context.commit("mutationsRoles", []);
    }
  },
  
  async updateRole(context, params) {
    const data = {
      app_id: Number(process.env.SSO_APP_CLIENT_ID),
      app_role_id: params.role_id
    }
    // v1/tenants/H3pZkf7W/users/6raMLtx1/changeRole
    // v1/tenants/H3pZkf7W/users/6raMLtx1/changeRole
    try{
      const res = await this.$axios.$post(`${process.env.API_SSO}/tenants/${context.rootState.auth.tenant_id}/users/${params.id}/changeRole`, data);
      context.dispatch(
        "menu/toggleAlert",
        {
          show: true,
          message: res.message,
          color: "success",
        },
        { root: true }
      );
      context.dispatch("fetchData", params.filter);
    }catch(error){
      console.log("masuk error")
      return error.response;
    }
  }
};