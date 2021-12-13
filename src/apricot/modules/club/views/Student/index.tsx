/*
 * @Author: AkiraMing
 * @Date: 2021-11-01 22:33:01
 * @LastEditTime: 2021-11-03 10:43:35
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\club\views\Student\index.tsx
 */

import CommonTable from '@/components/CommonTable';
import { Radio, Tag } from 'antd';
import { useState } from 'react';
import clubServices from '../../service';

function Student() {
  // sex 单选框值
  const [sexRadio, setSexRadio] = useState('');

  // 表单项
  const columns = [
    {
      title: '学号',
      dataIndex: 'student_id',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '姓名',
      dataIndex: 'name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '密码',
      dataIndex: 'password',
      valueType: 'password',
      hideInTable: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueType: 'radio',
      valueEnum: {
        0: { text: '女' },
        1: { text: '男' },
      },
      render: (dom: any, { sex }: any) => (sex == 0 ? '女' : '男'),
      renderFormItem: (
        a: any,
        b: any,
        form: {
          getFieldValue: (arg0: string) => any;
          setFieldsValue: (arg0: { sex: any }) => void;
        },
      ) => {
        return (
          <Radio.Group
            onChange={(e) => {
              //   console.log(e.target.value);
              setSexRadio(e.target.value);
              form.setFieldsValue({ sex: e.target.value });
            }}
            value={sexRadio || form.getFieldValue('sex')}
          >
            <Radio value={0}>女</Radio>
            <Radio value={1}>男</Radio>
          </Radio.Group>
        );
      },
    },
    {
      title: '班级编号',
      dataIndex: 'class_id',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
    },
    {
      title: '是否在线',
      dataIndex: 'status',
      valueType: 'switch',
      hideInSearch: true,
      hideInForm: true,
      render: (dom: any, { status }: any) =>
        status ? <Tag color="#87d068">在线</Tag> : <Tag color="#f50">不在线</Tag>,
    },
  ];
  return (
    <CommonTable headerTitle="学生列表" columns={columns} tableService={clubServices.student} />
  );
}
export default Student;
