/*
 * @Author: AkiraMing
 * @Date: 2021-10-30 17:40:21
 * @LastEditTime: 2021-10-30 23:52:43
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\components\MyIconList\index.tsx
 */
import { Space } from 'antd';
import React from 'react';
import MyIcon from '@/components/MyIcon';
import styles from './index.less';

interface Porps {
  iconNameList?: any;
  onChange?: (value: string) => void;
}

/**
 * iconfont 图标选择器
 */
class MyIconList extends React.Component {
  props: Porps = this.props;

  render() {
    const { iconNameList, onChange } = this.props;
    return (
      <Space size={[8, 8]} wrap>
        {iconNameList?.map((iconName: string) => (
          <button
            key={iconName}
            className={styles.icon_wrapper}
            onClick={(e) => {
              // 清除上次选中
              document
                .getElementsByClassName(styles.is_active)[0]
                ?.classList.remove(styles.is_active);
              // 给当前点击添加选中
              e.currentTarget.classList.add(styles.is_active);
              if (onChange) {
                onChange(iconName);
              }
            }}
          >
            <MyIcon type={iconName} style={{ fontSize: '18px' }} />
          </button>
        ))}
      </Space>
    );
  }
}

export default MyIconList;
