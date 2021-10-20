/*
 * @Author: AkiraMing
 * @Date: 2021-10-20 23:20:48
 * @LastEditTime: 2021-10-21 02:14:26
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\services\apricot\request.ts
 */
import axios from 'axios';
// import store from "@/store";
import { isDev } from '@/config/env';
import { href } from '@/core/utils';
import storage from '@/core/utils/storage';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// import { ElMessage } from "element-plus";

axios.defaults.timeout = 30000;
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://127.0.0.1:8001';

NProgress.configure({
  showSpinner: false,
});

// 请求队列
// const requests: Function[] = [];
const requests: any[] = [];

// Token 是否刷新中
let isRefreshing = false;

// 忽略规则
const ignore = {
  NProgress: ['/sys/info/record'],
  token: ['/login', '/captcha'],
};

// Request
axios.interceptors.request.use(
  (config: any) => {
    // const token = store.getters.token || '';
    const token = storage.get('token');
    console.log('🚀 ~ file: request.ts ~ line 44 ~ token', token);

    if (config.url) {
      if (!ignore.token.some((e) => config.url.includes(e))) {
        config.headers.Authorization = token;
      }

      if (!ignore.NProgress.some((e) => config.url.includes(e))) {
        NProgress.start();
      }
    }

    // 请求信息
    if (isDev) {
      console.group(config.url);
      console.log('method:', config.method);
      console.table('data:', config.method == 'get' ? config.params : config.data);
      console.groupEnd();
    }

    // 验证 token
    if (token) {
      if (config.url.includes('refreshToken')) {
        return config;
      }

      // 判断 token 是否过期
      if (storage.isExpired('token')) {
        // 判断 refreshToken 是否过期
        if (storage.isExpired('refreshToken')) {
          //   store.dispatch('userRemove');
          return href('/login');
        }

        // 是否在刷新中
        if (!isRefreshing) {
          isRefreshing = true;

          //   store.dispatch('refreshToken').then((token: string) => {
          //     requests.forEach((cb) => cb(token));
          //     requests = [];
          //     isRefreshing = false;
          //   });
        }

        return new Promise((resolve) => {
          // 继续请求
          // eslint-disable-next-line @typescript-eslint/no-shadow
          requests.push((token: string) => {
            // 重新设置 token
            config.headers.Authorization = token;
            resolve(config);
          });
        });
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response
axios.interceptors.response.use(
  (res) => {
    NProgress.done();
    const { code, data, message } = res.data as { code: any; data: any; message: any };

    if (!res.data) {
      return res;
    }

    switch (code) {
      case 1000:
        return data;
      default:
        return Promise.reject(message);
    }
  },
  async (error) => {
    NProgress.done();

    if (error.response) {
      const { status, config } = error.response;

      switch (status) {
        case 401:
          //   await store.dispatch('userRemove');
          href('/login');
          break;

        case 403:
          if (isDev) {
            // ElMessage.error(`${config.url} 无权限访问！！`);
            console.log(`${config.url} 无权限访问！！`);
          } else {
            href('/403');
          }
          break;

        case 404:
          break;

        case 500:
          if (!isDev) {
            href('/500');
          }
          break;

        case 502:
          if (isDev) {
            // ElMessage.error(`${config.url} 服务异常！！`);
            console.log(`${config.url} 服务异常！！`);
          } else {
            href('/502');
          }
          break;

        default:
          console.error(status, config.url);
      }
    }

    return Promise.reject(error.message);
  },
);

export default axios;
