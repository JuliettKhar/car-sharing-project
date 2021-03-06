import Axios from "axios";
import { Notification } from "element-ui";

const axios = Axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? process.env.VUE_APP_API_URL
      : process.env.VUE_APP_API_PROD_URL,
  headers: {
    "X-Api-Factory-Application-Id": process.env.VUE_APP_ID,
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 404 || error.response.status === 403) {
      return Promise.reject(error);
    } else if (error.response.status === 500) {
      Notification.error("Something went wrong. Try again later");
      return Promise.reject(error);
    }
  },
);

export default axios;
