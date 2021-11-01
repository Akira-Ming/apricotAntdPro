/*
 * @Author: AkiraMing
 * @Date: 2021-10-21 00:06:26
 * @LastEditTime: 2021-10-29 20:37:30
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\service\plugin\info.ts
 */
import { BaseService, Service, Permission } from '@/core';

@Service('admin/base/plugin/info')
class PluginInfo extends BaseService {
  @Permission('config')
  config(data: any) {
    return this.request({
      url: '/config',
      method: 'POST',
      data,
    });
  }

  @Permission('getConfig')
  getConfig(params: any) {
    return this.request({
      url: '/getConfig',
      params,
    });
  }

  @Permission('enable')
  enable(data: any) {
    return this.request({
      url: '/enable',
      method: 'POST',
      data,
    });
  }
}

export default PluginInfo;
