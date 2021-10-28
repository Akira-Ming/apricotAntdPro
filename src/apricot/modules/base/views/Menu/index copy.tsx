/*
 * @Author: AkiraMing
 * @Date: 2021-10-23 17:56:36
 * @LastEditTime: 2021-10-25 18:34:04
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\views\Menu\index.tsx
 */
// import React from 'react';
import { Table, Space, Tag, Button } from 'antd';
import baseServices from '@/apricot/modules/base/service';
import { useRequest } from 'umi';
import { toTreeData } from '@/core/utils/format';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';

import type { ProFormInstance } from '@ant-design/pro-form';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { useRef, useState } from 'react';
// import { MenuType } from '../../types';
// import type { ProColumns } from '@ant-design/pro-table';

type DataItem = {
  name: string;
  state: string;
};

// const valueEnum = {
//   all: { text: '全部', status: 'Default' },
//   open: {
//     text: '未解决',
//     status: 'Error',
//   },
//   closed: {
//     text: '已解决',
//     status: 'Success',
//     disabled: true,
//   },
//   processing: {
//     text: '解决中',
//     status: 'Processing',
//   },
// };
const valueEnum1 = {
  '0': { text: '目录' },
  '1': { text: '菜单' },
  '2': { text: '权限' },
};

function Menu() {
  const [typeState, setTypeState] = useState('0');
  const [visibleState, setVisibleState] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalParams, setModalParams] = useState({});
  const [modalInitialValues, setModalInitialValues] = useState({});
  const restFormRef = useRef<ProFormInstance>();

  const columns: any[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (type: string) => {
        const a = ['目录', '菜单', '权限'];
        console.log(a[type]);
        return <Tag color="#108ee9">{a[type]}</Tag>;
      },
    },
    {
      title: '节点路由',
      dataIndex: 'router',
      ellipsis: true,
    },
    {
      title: '路由缓存',
      dataIndex: 'keepAlive',
    },
    {
      title: '文件路径',
      dataIndex: 'viewPath',
      ellipsis: true,
    },
    {
      title: '权限',
      dataIndex: 'perms',
      width: 230,
      render: (perms: string) => {
        if (!perms) return;
        const b = perms.split(',');
        return (
          <Space direction="vertical">
            {b.map((r) => (
              <Tag key={r} color="#108ee9">
                {r}
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: '排序号',
      dataIndex: 'orderNum',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 170,
    },
    {
      title: '操作',
      width: 150,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      hideInSearch: true,
      render: (a: any) => {
        return (
          <Space>
            <a onClick={() => setVisibleState(true)}>新增</a>
            <a
              onClick={() => {
                console.log('1111111111111', a);
                setModalParams({ id: a.id });
                setModalInitialValues(a);
                setModalTitle('修改');
                setVisibleState(true);
              }}
            >
              修改
            </a>
            <a>删除</a>
          </Space>
        );
      },
    },
  ];
  const editColumns: any[] = [
    {
      title: '节点类型',
      dataIndex: 'type',
      valueType: 'radio',
      valueEnum: valueEnum1,
      fieldProps: {
        onChange: (value: any) => {
          console.log('🚀 ~ file: index.tsx ~ line 133 ~ value', value.target.value);
          setTypeState(value.target.value);
        },
      },
    },
    {
      title: '节点名称',
      dataIndex: 'name',

      valueType: 'text',
      formItemProps: {
        initialValue: modalInitialValues.name,
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '上级节点',
      dataIndex: 'parentId',
      valueType: 'text',
    },
    {
      title: '节点路由',
      dataIndex: 'router',
      hideInForm: typeState !== '1',
      valueType: 'text',
    },
    {
      title: '路由缓存',
      dataIndex: 'keepAlive',
      hideInForm: typeState !== '1',
      valueType: 'switch',
    },
    {
      title: '是否显示',
      dataIndex: 'isShow',
      hideInForm: typeState == '2',
      valueType: 'switch',
    },
    {
      title: '文件路径',
      dataIndex: 'viewPath',
      hideInForm: typeState !== '1',
      valueType: 'text',
    },
    {
      title: '节点图标',
      dataIndex: 'icon',
      hideInForm: typeState == '2',
      valueType: 'text',
    },
    {
      title: '排序号',
      dataIndex: 'orderNum',
      valueType: 'digit',
    },
    {
      title: '权限',
      dataIndex: 'perms',
      hideInForm: typeState !== '2',
      valueType: 'text',
    },
  ];
  const menuData = baseServices.system.menu.list({});
  const { data } = useRequest(() => menuData);

  let data1;
  if (data) {
    data1 = toTreeData(data);
    console.log('🚀 ~ file: index.tsx ~ line 92 ~ Menu ~ data', data1);
  }

  return (
    <PageContainer>
      <ProCard>
        <Space>
          <Button type="primary">新增</Button>
        </Space>
        <Table
          pagination={false}
          bordered
          columns={columns}
          rowKey="id"
          dataSource={data1}
          scroll={{
            x: 1500,
            y: 500,
          }}
        />
        <BetaSchemaForm<DataItem>
          layout="horizontal"
          // layoutType="ModalForm"
          layoutType="ProForm"
          // formProps={{}}
          modalProps={{
            centered: true,
            closable: false,
            destroyOnClose: true,
            maskClosable: false,
          }}
          // formRef={restFormRef}
          // initialValues={modalInitialValues}
          params={modalParams}
          // request={async (params): Promise<any> => {
          //   if (!params.id) return {};
          //   const res = await baseServices.system.menu.info({ id: params.id });
          //   console.log('🚀 ~ file: index.tsx ~ line 247 ~ request={ ~ res', res);
          //   return res.data;
          // }}
          // destroyOnClose
          // submitter={{
          //   // 配置按钮文本
          //   searchConfig: {
          //     // resetText: '重置',
          //     submitText: '保存',
          //   },
          // }}
          onVisibleChange={function (value) {
            setVisibleState(value);
          }}
          title={modalTitle}
          visible={visibleState}
          onFinish={async (values) => {
            console.log(values);
            return true;
          }}
          // onReset={async (values) => {
          //   console.log(values);
          //   return true;
          // }}
          columns={editColumns}
        />
      </ProCard>
    </PageContainer>
  );
}

export default Menu;
