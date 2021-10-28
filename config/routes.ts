/*
 * @Author: AkiraMing
 * @Date: 2021-10-20 13:56:02
 * @LastEditTime: 2021-10-27 02:31:14
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\config\routes.ts
 */

// export default []
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: '欢迎页',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/sys',
    name: '系统管理',
    icon: 'smile',
    // component: './Welcome',
    routes: [
          {
            path: '/sys/user',
            name: '用户列表',
            icon: 'smile',
            component: '@/apricot/modules/base/views/User',
          },
          {
            path: '/sys/menu',
            name: '菜单列表',
            icon: 'smile',
            component: '@/apricot/modules/base/views/Menu',
          },
          {
            path: '/sys/role',
            name: '角色列表',
            icon: 'smile',
            component: '@/apricot/modules/base/views/Role',
          },
          {
            path: '/sys/log',
            name: '请求日志',
            icon: 'smile',
            component: '@/apricot/modules/base/views/Log',
          }
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
