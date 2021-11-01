/*
 * @Author: AkiraMing
 * @Date: 2021-10-30 16:58:51
 * @LastEditTime: 2021-10-30 23:19:07
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\components\MyIcon\index.tsx
 */
import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
interface Porps {
  type: string;
  style?: any;
}

/**
 * iconfont 图标
 */
class MyIcon extends React.Component {
  props: Porps = this.props;

  render() {
    const { type, style } = this.props;
    return <IconFont type={type} style={style} />;
  }
}

export default MyIcon;
