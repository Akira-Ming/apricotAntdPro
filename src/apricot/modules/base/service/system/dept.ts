/*
 * @Author: AkiraMing
 * @Date: 2021-10-21 00:06:26
 * @LastEditTime: 2021-10-23 01:50:09
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\service\system\dept.ts
 */
import { BaseService, Service, Permission } from '@/core';

@Service('admin/base/sys/department')
class SysDepartment extends BaseService {
  @Permission('order')
  order(data: any) {
    return this.request({
      url: '/order',
      method: 'POST',
      data,
    });
  }
}

export default SysDepartment;
