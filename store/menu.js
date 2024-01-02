export const state = () => ({
  data: [
    {
      icon: "mdi-apps",
      title: "Dashboard",
      to: "/",
      sub: null,
    },
    {
      icon: "mdi-apps",
      title: "Data Kejadian Bencana",
      to: "/incident",
      sub: null,
    },
    {
      icon: "mdi-apps",
      title: "Monitoring Kejadian Bencana",
      to: "/observe-incident",
      sub: null,
    },
    {
      icon: "mdi-apps",
      title: "Call Tree",
      to: "/call-tree",
      sub: null,
    },
    {
      icon: "mdi-apps",
      title: "Pengkinian Dokumen",
      to: "/doc-updating",
      sub: null,
    },
    {
      icon: "mdi-apps",
      title: "Pengujian Aplikasi",
      to: "/app-testing",
      sub: null,
    },
    {
      icon: "mdi-apps",
      title: "Persetujuan Pengujian Aplikasi",
      to: "/approval-app-testing",
      sub: null,
    },
    {
      icon: "mdi-apps",
      title: "Persetujuan Data Kejadian Bencana",
      to: "/approval-incident",
      sub: null,
    },
    {
      icon: "mdi-apps",
      title: "Referensi",
      to: null,
      sub: [
        {
          icon: "mdi-chart-bubble",
          title: "Aplikasi",
          to: "/applications",
          value: false,
        },
        {
          icon: "mdi-chart-bubble",
          title: "Direksi",
          to: "/directors",
          value: false,
        },
        {
          icon: "mdi-chart-bubble",
          title: "Ancaman",
          to: "/threats",
          value: false,
        },
      ],
    },
  ],
  alert: {
    show: false,
    message: "",
    color: "",
  }
});

export const getters = {
  getData(state) {
    return state.data;
  },
  getAlert(state) {
    return state.alert;
  },
};

export const mutations = {
  toggleAlert(state, value) {
    state.alert = value;
  },
};

export const actions = {
  async toggleAlert(context, params) {
    context.commit("toggleAlert", params);
  }
};
