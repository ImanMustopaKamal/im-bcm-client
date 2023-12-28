export const state = () => ({
  data: [],
  loading: false,
});

export const getters = {
  getData(state) {
    return state.data;
  },
};

export const mutations = {
  fetchData(state, value) {
    state.data = value;
  },
};

export const actions = {
  async fetchData(context, params) {
    const { data } = await this.$axios.$get(
      "http://localhost:3000/applications?perpage=10&page=1",
      { params }
    );
    context.commit('fetchData', data);
  },

  async storeData(context, params) {
    const { data } = await this.$axios.$post("http://localhost:3000/applications", params);
  },

  async updateData(context, params) {

  },

  async deleteData(context, params) {

  },

  async fetchDetail(context, params) {
    const { data } = await this.$axios.$get(
      "http://localhost:3000/applications/" + params.id
      );

    console.log("🚀 ~ file: refApp.js:41 ~ fetchDetail ~ data:", data)
    // return data;
  }
};
