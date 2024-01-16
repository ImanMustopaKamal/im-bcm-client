import token from "~/static/token.json";

const getCookies = (headersCookie, name) => {
  const value = `; ${headersCookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

const parseJwt = (token) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

export const state = () => {
  return {
    auth: null,
  };
};
export const mutations = {
  setAuth(state, auth) {
    state.auth = auth;
  },
};
export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req, redirect }) {
    // let idToken = "";
    // let accessToken = "";
    // let refreshToken = "";
    const idToken = getCookies(req.headers.cookie, "IdToken");
    const accessToken = getCookies(req.headers.cookie, "AccessToken");
    const refreshToken = getCookies(req.headers.cookie, "RefreshToken");
    // if (req.headers.cookie) {
    //   idToken = getCookies(req.headers.cookie, "IdToken");
    //   accessToken = getCookies(req.headers.cookie, "AccessToken");
    //   refreshToken = getCookies(req.headers.cookie, "RefreshToken");
    // } else {
    //   idToken = token.AuthenticationResult.IdToken;
    //   accessToken = token.AuthenticationResult.AccessToken;
    //   refreshToken = token.AuthenticationResult.RefreshToken;
    // }
    try {
      if (accessToken) {
        try {
          let auth = {};
          let idTokenParse = parseJwt(idToken);
          auth.id_token = idToken;
          auth.access_token = accessToken;
          auth.refresh_token = refreshToken;
          auth.expiration_date = new Date(idTokenParse.exp * 1000);
          auth.user_id = idTokenParse["custom:user_id"];
          auth.tenant_id = idTokenParse["custom:tenant_id"];
          auth.username = idTokenParse["cognito:username"];
          auth.name = idTokenParse.name;
          auth.auth_time = idTokenParse.auth_time;
          if (!idTokenParse["cognito:groups"]) {
            redirect("/404");
          }
          auth.groups = idTokenParse["cognito:groups"];
          commit("setAuth", auth);

          const get_app_user = await dispatch(
            "sso/GetAll",
            {
              url: `/tenants/${auth.tenant_id}/apps`,
              params: {},
            },
            { root: true }
          );

          if (get_app_user.data.length > 0) {
            let ref_url = get_app_user.data.filter(
              (item) =>
                item.url.indexOf(process.env.APP_URL) !== -1 &&
                item.is_registered === true
            );
              if(ref_url.length === 0){
                redirect("/unauthorized")
              }
          } else {
            redirect("/unauthorized");
          }
        } catch (error) {
          commit("setAuth", null, error);
        }
      }else{
        commit('setAuth', null)
      }
    } catch (error) {
      commit("setAuth", null);
    }
  },
};
