import qs from "qs";
import Axios from "axios";
import { Notification } from "element-ui";

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "X-Api-Factory-Application-Id": process.env.VUE_APP_ID,
    "Authorization": `Bearer ${process.env.VUE_APP_AUTH}`,
    "common": {
      "Content-Type": "application/json, text/plain, */*",
    },
  },
});

axios.interceptors.request.use(
  config => {
    /*
     * config.paramsSerializer = params =>
     *   qs.stringify(params, {
     *     encode: false,
     *     skipNulls: true,
     *     arrayFormat: "repeat",
     *   });
     */

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status !== 404 && error.response.status !== 403) {
      Notification.error({
        message: error.response.data.message,
      });
    } else {
      throw new Error(error);
    }
  },
);

export default axios;
