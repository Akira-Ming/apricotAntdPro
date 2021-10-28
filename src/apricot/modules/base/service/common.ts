/*
 * @Author: AkiraMing
 * @Date: 2021-10-21 00:06:26
 * @LastEditTime: 2021-10-25 01:44:25
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\service\common.ts
 */
import { BaseService, Service } from '@/core';

@Service('admin/base/comm')
class Common extends BaseService {
  iconNames() {
    return this.request({
      url: '/iconNames',
    });
  }

  /**
   * 文件上传模式
   */
  uploadMode() {
    return this.request({
      url: '/uploadMode',
    });
  }

  /**
   * 文件上传，如果模式是 cloud，返回对应参数
   *
   * @returns
   * @memberof CommonService
   */
  upload(params: any) {
    return this.request({
      url: '/upload',
      method: 'POST',
      params,
    });
  }

  /**
   * 用户退出
   */
  userLogout() {
    return this.request({
      url: '/logout',
      method: 'POST',
    });
  }

  /**
   * 用户信息
   *
   * @returns
   * @memberof CommonService
   */
  userInfo() {
    return this.request({
      url: '/person',
    });
  }

  /**
   * 用户信息修改
   *
   * @param {*} params
   * @returns
   * @memberof CommonService
   */
  userUpdate(params: any) {
    return this.request({
      url: '/personUpdate',
      method: 'POST',
      data: {
        ...params,
      },
    });
  }

  /**
   * 权限信息
   *
   * @returns
   * @memberof CommonService
   */
  permMenu() {
    return this.request({
      url: '/permmenu',
    });
  }
}

export default Common;
