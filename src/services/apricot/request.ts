/*
 * @Author: AkiraMing
 * @Date: 2021-10-20 23:20:48
 * @LastEditTime: 2021-11-03 16:34:18
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
import baseServices from '@/apricot/modules/base/service';
import { userRemove, userUtils } from '@/core/utils';
import { message as AntdMessage } from 'antd';

axios.defaults.timeout = 30000;
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = '/api';

NProgress.configure({
  showSpinner: false,
});

// 请求队列
// const requests: Function[] = [];
let requests: any[] = [];

// Token 是否刷新中
let isRefreshing = false;

// 忽略规则
const ignore = {
  NProgress: ['/sys/info/record'],
  token: ['/user/login', '/login', '/captcha'],
};

// Request
axios.interceptors.request.use(
  (config: any) => {
    // const token = store.getters.token || '';
    const token = storage.get('token');
    const refreshToken = storage.get('refreshToken');

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
    // return config;
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
          userRemove();
          return href('/user/login');
        }

        // 是否在刷新中
        if (!isRefreshing) {
          console.log('刷新token', 'color:red');
          isRefreshing = true;
          // baseServices.open.refreshToken(token);
          baseServices.open.refreshToken(refreshToken).then((token1: any) => {
            userUtils.SET_TOKEN(token1.data);
            requests.forEach((cb) => cb(token1.data.token));
            requests = [];
            isRefreshing = false;
          });
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
        return {
          success: true,
          data,
        };
      default:
        AntdMessage.error(message);
        return Promise.reject(message);
    }
  },
  async (error) => {
    NProgress.done();

    if (error.response) {
      console.log('🚀 ~ file: request.ts ~ line 150 ~ error.response', error.response);
      const { status, config } = error.response;

      switch (status) {
        case 401:
          //   await store.dispatch('userRemove');
          userRemove();
          AntdMessage.error('重新登录');
          href('/user/login');
          break;

        case 403:
          if (isDev) {
            // ElMessage.error(`${config.url} 无权限访问！！`);
            AntdMessage.error(`${config.url} 无权限访问！！`);
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
            AntdMessage.error(`${config.url} 服务异常！！`);
            // console.log(`${config.url} 服务异常！！`);
          } else {
            href('/502');
          }
          break;

        default:
          console.error(status, config.url);
      }
    } else {
      AntdMessage.error(error);
    }
    return Promise.reject(error.message);
  },
);

export default axios;
