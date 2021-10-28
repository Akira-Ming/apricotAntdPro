/*
 * @Author: AkiraMing
 * @Date: 2021-10-21 00:06:26
 * @LastEditTime: 2021-10-24 15:52:57
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\service\system\log.ts
 */
import { BaseService, Service, Permission } from '@/core';

@Service('admin/base/sys/log')
class SysLog extends BaseService {
  @Permission('clear')
  clear() {
    return this.request({
      url: '/clear',
      method: 'POST',
    });
  }

  @Permission('getKeep')
  getKeep() {
    return this.request({
      url: '/getKeep',
    });
  }

  @Permission('setKeep')
  setKeep(value: any) {
    return this.request({
      url: '/setKeep',
      method: 'POST',
      data: {
        value,
      },
    });
  }
}

export default SysLog;
