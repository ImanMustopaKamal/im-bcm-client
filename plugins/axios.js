export default function ({ app, $axios, redirect, $sentry }) {
  $axios.onRequest(config => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = "*";
  })
  $axios.onError(error => {
    console.log("🚀 ~ file: axios.js:7 ~ error:", error)
    // if (error.response) {
    //   if (error.response.status === 401) {
    //     app.$auth.logout()
    //     redirect('/login')
    //   }
    // }
  })
}