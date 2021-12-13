/*
 * @Author: AkiraMing
 * @Date: 2021-11-01 22:42:19
 * @LastEditTime: 2021-11-01 22:42:21
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\club\service\index.ts
 */
import Student from './student';
import College from './college';

export default {
  student: new Student(),
  college: new College(),
};
