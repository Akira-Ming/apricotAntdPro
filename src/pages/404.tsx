/*
 * @Author: AkiraMing
 * @Date: 2021-10-20 13:56:02
 * @LastEditTime: 2021-11-01 21:56:41
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\pages\404.tsx
 */
import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Back Home
      </Button>
    }
  />
);

export default NoFoundPage;
