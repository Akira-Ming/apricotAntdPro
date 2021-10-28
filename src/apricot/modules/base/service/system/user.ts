/*
 * @Author: AkiraMing
 * @Date: 2021-10-21 00:06:26
 * @LastEditTime: 2021-10-22 02:02:09
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\service\system\user.ts
 */
import { BaseService, Service, Permission } from '@/core';

@Service('admin/base/sys/user')
class SysUser extends BaseService {
  @Permission('move')
  move(data: any) {
    return this.request({
      url: '/move',
      method: 'POST',
      data,
    });
  }
}

export default SysUser;
