/*
 * @Author: AkiraMing
 * @Date: 2021-10-21 00:14:46
 * @LastEditTime: 2021-11-03 16:56:28
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\types\index.d.ts
 */
export interface Token {
  expire: number;
  refreshExpire: number;
  refreshToken: string;
  token: string;
}
export interface TableListItem {
  id: number;
  name: string;
  nickName: string;
  headImg?: string;
  email?: string;
  remark?: string;
  status: number;
  createTime: string;
  updateTime: string;
  username: string;
  phone?: string;
  departmentId: number;
  roleName: string;
  departmentName: string;
}

export interface ListRes {
  list: TableListItem[];
  pagination: { page: number; size: number; total: number };
}

export enum MenuType {
  '目录' = 0,
  '菜单' = 1,
  '权限' = 2,
}

export interface MenuItem {
  id: number;
  parentId: number;
  path: string;
  router?: string;
  viewPath?: string;
  type: MenuType;
  name: string;
  icon: string;
  orderNum: number;
  isShow: number;
  keepAlive?: number;
  meta?: {
    label: string;
    keepAlive: number;
  };
  children?: MenuItem[];
}
