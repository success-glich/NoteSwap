import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5005/api/v1",
  headers: { "Content-Type": "application/json" },
});

//axiosClient->request->request Interceptor->main request response ->
// response Interceptor -> axios instance ->requester

instance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    if (config.data instanceof FormData) {
      config.headers = {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data'",
      };
    } else {
      config.headers = {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      };
    }
  } else {
    config.headers = {
      "Content-Type": "application/json",
    };
  }
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const refreshTheToken = async (refreshToken) => {
      return instance.post("/auth/refresh_token", { refreshToken });
    };
    //Any status code that falls outside the range of 2xxx cause this function to triger
    //Do something with response error
    const response = error.response;
    const originalRequest = error.config;
    if (error.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // const refreshToken = store.getState().auth.refreshToken;
    }
    if (response.status === 401) {
      //Try refresh the refresh token
      if (
        error.config.url !== "/auth/refresh_token" &&
        error.config.url !== "/auth/login" &&
        error.config.url !== "/auth/register" &&
        error.config.url !== "/auth/google/login"
      ) {
        //Now this is a valid response
        const refresh_token = localStorage.getItem("refresh_token");

        //request a new pair of token
        const response = await refreshTheToken(refresh_token);
        const { refreshToken, token } = response.data;
        localStorage.setItem("access_token", token);
        localStorage.setItem("refresh_token", refreshToken);
        error.config.headers["Authorization"] = `Bearer ` + token;
        return instance.request(error.config);
      } else if (response.status === 403) {
        window.alert("No Permission!");
      }
      return Promise.reject(error);
      //Navigate to login
    }
  }
);

export default instance;
