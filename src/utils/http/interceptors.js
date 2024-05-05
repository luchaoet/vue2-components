import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

import qs from 'qs'
import router from "../../router";
import baseURL from "./baseURL";
import { message as $message } from 'element-ui'

export class Interceptors {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
      withCredentials: true,
    });
    this.init();
  }
  // 初始化拦截器
  init() {
    // 请求接口拦截器
    this.instance.interceptors.request.use(
      (config) => {

        const { url = '', data } = config;
        if (config.method === 'get') {
          config.paramsSerializer = function (params) {
            return qs.stringify(params, { arrayFormat: 'repeat' })
          }
        }

        if (config.method === 'post' && url.indexOf('/console/') > -1) {
          config.data = qs.stringify(data)
        }
        return config;
      },
      (err) => {
        console.error(err);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        const res = response.data;
        if (res.success) {
          return Promise.resolve(res);
        } else {
          return Promise.reject(res);
        }
      },
      (error) => {
        $message({
          message: error,
          type: 'error',
        })
        return Promise.resolve({ success: false });
      }
    );
  }

  getInterceptors() {
    return this.instance;
  }
}