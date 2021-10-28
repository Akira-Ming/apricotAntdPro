/*
 * @Author: AkiraMing
 * @Date: 2021-10-21 00:06:26
 * @LastEditTime: 2021-10-22 17:00:16
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\service\open.ts
 */
import { BaseService, Service } from '@/core';

@Service('admin/base/open')
class Open extends BaseService {
  /**
   * 用户登录
   *
   * @param {*} { username, password, captchaId, verifyCode }
   * @returns
   * @memberof CommonService
   */
  userLogin({ username, password, captchaId, verifyCode }: any) {
    return this.request({
      url: '/login',
      method: 'POST',
      data: {
        username,
        password,
        captchaId,
        verifyCode,
      },
    });
  }

  /**
   * 图片验证码 svg
   *
   * @param {*} { height, width }
   * @returns
   * @memberof CommonService
   */
  captcha({ height, width }: any) {
    return this.request({
      url: '/captcha',
      params: {
        height,
        width,
      },
    });
  }

  /**
   * 刷新 token
   * @param {string} token
   */
  refreshToken(token: string) {
    return this.request({
      url: '/refreshToken',
      params: {
        refreshToken: token,
      },
    });
  }
}

export default Open;
// export default new Open();
