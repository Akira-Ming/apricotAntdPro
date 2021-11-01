/*
 * @Author: AkiraMing
 * @Date: 2021-10-20 13:56:02
 * @LastEditTime: 2021-10-29 13:22:02
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\app.tsx
 */
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import baseServices from '@/apricot/modules/base/service';
import { deepTree } from './core/utils';
import { storage } from '@/core/utils';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      // const msg = await queryCurrentUser();
      const msg = await baseServices.common.userInfo();
      return msg.data as API.CurrentUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    iconfontUrl: '//at.alicdn.com/t/font_2889504_5k1pivzx9i6.js',
    // subMenuItemRender: (_: any, dom: any) => <div>pre {dom}</div>,
    // menuItemRender: (item: any, dom: any) => <div>pre {dom}</div>,
    menu: {
      // type: 'sub',
      locale: false,
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        userId: initialState?.currentUser?.userid,
      },
      request: async () => {
        // console.log('🚀 ~ file: app.tsx ~ line 75 ~ request: ~ defaultMenuData', defaultMenuData);
        // console.log('🚀 ~ file: app.tsx ~ line 75 ~ request: ~ params', params);
        // request: async () => {
        // initialState.currentUser 中包含了所有用户信息
        const menuData: { data: any } = await baseServices.common.permMenu();
        // console.log('🚀 ~ file: app.tsx ~ line 81 ~ //request: ~ menuData', menuData);

        // console.log('111111111', await baseServices.common.iconNames());

        storage.set('permission', menuData.data.perms);
        const newMenus = menuData.data.menus.map(
          (
            menuItem: {
              path: string;
              router: string;
              component: string;
              viewPath: string;
              type: number;
              hideInMenu: boolean;
              perms: any;
              isShow: number;
            },
            index: any,
          ) => {
            menuItem.path = menuItem.router || '/' + index;
            menuItem.component = menuItem.viewPath;
            if (menuItem.perms) {
              if (menuItem.perms.includes(',')) {
                menuItem.perms = menuItem.perms.split(',')[0].split(':');
              } else {
                menuItem.perms = menuItem.perms.split(':');
              }
            }
            if (menuItem.type == 2 || menuItem.isShow == 1) {
              menuItem.hideInMenu = true;
            }
            return menuItem;
          },
        );
        const newTreeMenus = deepTree(newMenus);
        // console.log('🚀 ~ file: app.tsx ~ line 102 ~ request: ~ newTreeMenus', newTreeMenus);
        return newTreeMenus;
      },
    },
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
