export default function ({ app, $axios, redirect, $sentry, store }) {
  $axios.onRequest((config) => {
    const id_token = store?.state?.auth?.id_token || null;
    config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    if(id_token) config.headers["Authorization"] = `Bearer ${id_token}`;
  });
  $axios.onError((error) => {
    // console.log("🚀 ~ file: axios.js:7 ~ error:", error);
    // if (error.response) {
    //   if (error.response.status === 401) {
    //     app.$auth.logout()
    //     redirect('/login')
    //   }
    // }
  });
}
