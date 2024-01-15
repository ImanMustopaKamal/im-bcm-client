export const state = () => ({
  data: [
    {
      icon: "mdi-view-dashboard",
      title: "Dashboard",
      to: "/",
      sub: null,
    },
    {
      icon: "mdi-car-emergency",
      title: "Data Kejadian Bencana",
      to: "/incident",
      sub: null,
    },
    {
      icon: "mdi-view-agenda",
      title: "Monitoring Kejadian Bencana",
      to: "/observe-incident",
      sub: null,
    },
    {
      icon: "mdi-phone-classic",
      title: "Call Tree",
      to: "/call-tree",
      sub: null,
    },
    {
      icon: "mdi-text-box-check",
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
      icon: "mdi-check-decagram",
      title: "Persetujuan Pengujian Aplikasi",
      to: "/approval-app-testing",
      sub: null,
    },
    {
      icon: "mdi-check-decagram",
      title: "Persetujuan Data Kejadian Bencana",
      to: "/approval-incident",
      sub: null,
    },
    {
      icon: "mdi-book",
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
          title: "Ancaman Lv 1",
          to: "/threat-types",
          value: false,
        },
        {
          icon: "mdi-chart-bubble",
          title: "Ancaman Lv 2",
          to: "/threats",
          value: false,
        },
        {
          icon: "mdi-chart-bubble",
          title: "Struktur Organisasi",
          to: "/organization-structure",
          value: false,
        },
        {
          icon: "mdi-chart-bubble",
          title: "Workflow Module",
          to: "/workflow-module",
          value: false,
        },
        {
          icon: "mdi-chart-bubble",
          title: "Workflow Level",
          to: "/workflow-level",
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
