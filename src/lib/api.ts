import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL + "/api",
});

// Add a request interceptor
api.interceptors.request.use(
  (config: any) => {
    config.withCredentials = true;
    return config;
  },
  (error: any) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(`${BASE_URL}/api/auth/refresh`, {
          withCredentials: true,
        });
        const { token } = response.data;

        localStorage.setItem("token", token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        console.error("Error while refreshing token", error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

export const checkAuth = async () => {
  // try {
  //   const isAccessTokenValid = authCheck();
  //   if (isAccessTokenValid) {
  //     return true;
  //   } else {
  //     const user = await api.get("/auth/me");
  //     if (!user) {
  //       return false;
  //     }
  //     return true;
  //   }
  // } catch (e) {
  //   console.error("Error while checking auth", e);
  //   return false;
  // }
};
