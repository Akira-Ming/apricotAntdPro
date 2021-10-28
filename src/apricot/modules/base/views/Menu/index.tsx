/*
 * @Author: AkiraMing
 * @Date: 2021-10-23 17:56:36
 * @LastEditTime: 2021-10-29 02:46:00
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\views\Menu\index.tsx
 */
// import React from 'react';
import { Table, Space, Tag, Button, Modal, Row, Col, Cascader } from 'antd';
import baseServices from '@/apricot/modules/base/service';
import { useRequest } from 'umi';
import { toTreeData } from '@/core/utils/format';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
// import SearchTree from '../../components/SearchTree';
// import type { ProFormInstance } from '@ant-design/pro-form';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { useState } from 'react';
import { storage } from '@/core/utils';
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
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
  0: { text: '目录' },
  1: { text: '菜单' },
  2: { text: '权限' },
};

function Menu() {
  // 节点类型
  const [typeState, setTypeState] = useState('0');
  // 对话框显影
  const [visibleState, setVisibleState] = useState(false);
  // 弹窗标题
  const [modalTitle, setModalTitle] = useState('');
  // const [modalParams, setModalParams] = useState({});
  // 表单初始值
  const [modalInitialValues, setModalInitialValues] = useState({} as any);
  // 菜单数据
  const { data, run } = useRequest(() => baseServices.system.menu.list({})) as any;

  const columns: any[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      ellipsis: true,
      align: 'center',
      render: (icon: string) =>
        icon ? <IconFont style={{ fontSize: '20px' }} type={icon} /> : null,
    },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
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
      title: '是否隐藏',
      dataIndex: 'isShow',
      align: 'center',
      render: (status: any) =>
        status ? <Tag color="#f50">隐藏</Tag> : <Tag color="#87d068">显示</Tag>,
    },
    {
      title: '路由缓存',
      dataIndex: 'keepAlive',
      align: 'center',
      render: (keepAlive: string) => (keepAlive ? <IconFont type="icon-check" /> : null),
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
      // render: (perms: string) => {
      //   if (!perms) return;
      //   const b = perms.split(',');
      //   return (
      //     <Space direction="vertical">
      //       {b.map((r) => (
      //         <Tag key={r} color="#108ee9">
      //           {r}
      //         </Tag>
      //       ))}
      //     </Space>
      //   );
      // },
    },
    {
      title: '排序号',
      dataIndex: 'orderNum',
      align: 'center',
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
            <a
              onClick={() => {
                setModalTitle('新增');
                setVisibleState(true);
              }}
            >
              新增
            </a>
            <a
              onClick={() => {
                const f = (perms: any) => {
                  let b: any;
                  b = perms;
                  if (perms) {
                    if (perms.includes(',')) {
                      b = perms.split(',')[0].split(':');
                    } else {
                      b = perms.split(':');
                    }
                  }
                  return b;
                };

                setModalInitialValues({ ...a, type: a.type + '', perms: f(a.perms) });
                setTypeState(a.type + '');
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
        // initialValue: 0,
        onChange: (value: any) => {
          // console.log('🚀 ~ file: index.tsx ~ line 133 ~ value', value.target.value);
          setTypeState(value.target.value);
        },
      },
    },
    {
      title: '节点名称',
      dataIndex: 'name',

      valueType: 'text',
      formItemProps: {
        // initialValue: modalInitialValues.name,
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
      // renderFormItem: (schema, config, form) => {
      //   // return <SearchTree />;
      //   return (
      //     <Popover
      //       content={<SearchTree />}
      //       title="Title"
      //       trigger="click"
      //       visible={true}
      //       // onVisibleChange={this.handleVisibleChange}
      //     >
      //       <Button type="primary">Click me</Button>
      //     </Popover>
      //   );
      // },
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
      title: '是否隐藏',
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

      renderFormItem: () => {
        const perms = storage.get('permission');
        const list: any[] = [];
        perms
          .filter((e: string | string[]) => e.includes(':'))
          .map((e: string) => e.split(':'))
          .forEach((arr: string | any[]) => {
            const col = (i: number, d: any[]) => {
              const key = arr[i];

              const index = d.findIndex((e: any) => e.label == key);

              if (index >= 0) {
                col(i + 1, d[index].children);
              } else {
                const isLast = i == arr.length - 1;

                d.push({
                  label: key,
                  value: key,
                  children: isLast ? null : [],
                });

                if (!isLast) {
                  col(i + 1, d[d.length - 1].children || []);
                }
              }
            };

            col(0, list);
          });
        return (
          <Cascader
            // style={{ width: 233 }}
            options={list}
            // onChange={onChange}
            // multiple
            // maxTagCount="responsive"
            displayRender={(label: any, selectedOptions: any) => {
              console.log(
                '🚀 ~ file: index.tsx ~ line 248 ~ Menu ~ selectedOptions',
                selectedOptions,
              );
              console.log('🚀 ~ file: index.tsx ~ line 248 ~ Menu ~ label', label);
              if (label) {
                return <Tag>{label.join(':')}</Tag>;
              }

              // return <Tag>{label.jion(':')}</Tag>;
            }}
          />
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProCard>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              // getMenuData();
              run();
            }}
          >
            新增
          </Button>
        </Space>
        <Table
          pagination={false}
          bordered
          columns={columns}
          rowKey="id"
          dataSource={
            data ? (toTreeData(data, { id: 'id', parentId: 'parentId' }) as any) : undefined
          }
          scroll={{
            x: 1500,
            y: 500,
          }}
        />
        <Modal
          title={modalTitle}
          visible={visibleState}
          closable={false}
          maskClosable={false}
          footer={null}
          destroyOnClose
          onOk={() => {}}
          onCancel={() => {
            setVisibleState(false);
          }}
        >
          <BetaSchemaForm<DataItem>
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // params={modalParams}
            initialValues={modalInitialValues}
            submitter={{
              // 配置按钮文本
              searchConfig: {
                submitText: '保存',
                resetText: '取消',
              },
              render: (_props, dom) => {
                return (
                  <Row justify="center">
                    <Col span={7}>
                      <Space>
                        {dom[0]}
                        {dom[1]}
                      </Space>
                    </Col>
                  </Row>
                );
              },
            }}
            onFinish={async (values) => {
              if (modalTitle === '修改') {
                const updateRes = (await baseServices.system.menu.update({
                  ...values,
                  id: modalInitialValues.id,
                })) as any;
                if (!updateRes.success) return console.log('修改失败');
                setVisibleState(false);
                setModalInitialValues({});
                run();
              }
            }}
            onReset={() => {
              setVisibleState(false);
              setModalInitialValues({});
            }}
            columns={editColumns}
          />
        </Modal>
      </ProCard>
    </PageContainer>
  );
}

export default Menu;
