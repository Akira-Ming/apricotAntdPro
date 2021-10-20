/*
 * @Author: AkiraMing
 * @Date: 2021-10-20 23:15:31
 * @LastEditTime: 2021-10-20 23:18:34
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\config\env.ts
 */
import store from 'store';
import { getUrlParam } from '@/core/utils';
// import type { MenuItem } from '@/cool/modules/base/types';

// 路由模式
const routerMode = 'history';

// 开发模式
const isDev: boolean = process.env.NODE_ENV == 'development';

// Host
const host = 'https://show.cool-admin.com';

// 请求地址
const baseUrl: string = (function () {
  let proxy = getUrlParam('proxy');

  if (proxy) {
    store.set('proxy', proxy);
  } else {
    proxy = store.get('proxy') || 'dev';
  }

  return isDev ? `/${proxy}/admin` : `/api/admin`;
})();

// Socket
const socketUrl: string = (isDev ? `${host}` : '') + '/socket';

// 阿里字体图标库 https://at.alicdn.com/t/**.css
const iconfontUrl = ``;

// 程序配置参数
const app: any = store.get('__app__') || {
  name: 'COOL-ADMIN',

  conf: {
    showAMenu: false, // 是否显示一级菜单栏
    showRouteNav: true, // 是否显示路由导航栏
    showProcess: true, // 是否显示页面进程栏
    customMenu: false, // 自定义菜单
  },

  theme: {
    color: '', // 主题色
    url: '', // 主题样式地址
  },
};

// 自定义菜单列表
// const menuList: MenuItem[] = [];
const menuList: any[] = [];

export { routerMode, baseUrl, socketUrl, iconfontUrl, app, isDev, menuList };
