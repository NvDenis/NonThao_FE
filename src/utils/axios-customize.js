import axios from "axios";
import { callRefresh } from "../services/api";
import message from "antd/lib/message";

const baseURL = import.meta.env.VITE_BASE_URL + "/api/v1" || "https://localhost:3000/api/v1";
const accessToken = localStorage.getItem("accessToken") || "";

const instance = axios.create({
  baseURL,
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

const handleRefreshToken = async () => {
  try {
    const res = await callRefresh();
    if (res?.vcode == 0) {
      return res.accessToken;
    } else {
      message.error(res.message);
      return "";
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalUrl = error.config.url; // Lưu giá trị ban đầu của error.config.url

    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized" &&
      !originalUrl.includes("/auth/refresh")
    ) {
      const accessToken = await handleRefreshToken();
      if (!accessToken) {
        localStorage.setItem("accessToken", "");
        return error?.response?.data ?? Promise.reject(error);
      }

      localStorage.setItem("accessToken", accessToken);
      error.config.headers.Authorization = `Bearer ${accessToken}`;

      return instance.request(error.config);
    }

    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
