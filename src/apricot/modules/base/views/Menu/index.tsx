/*
 * @Author: AkiraMing
 * @Date: 2021-10-23 17:56:36
 * @LastEditTime: 2021-10-31 00:39:26
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\views\Menu\index.tsx
 */
// import React from 'react';
import {
  Space,
  Tag,
  Button,
  Modal,
  Row,
  Col,
  Cascader,
  message,
  Input,
  Popconfirm,
  Popover,
} from 'antd';
import baseServices from '@/apricot/modules/base/service';
import { useRequest } from 'umi';
import { toTreeData } from '@/core/utils/format';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { useState } from 'react';
import { storage } from '@/core/utils';
import ProTable from '@ant-design/pro-table';
import MyIconList from '@/components/MyIconList';
import MyIcon from '@/components/MyIcon';

type DataItem = {
  name: string;
  state: string;
};

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
  // 表单初始值
  const [modalInitialValues, setModalInitialValues] = useState({} as any);
  // 表单参数
  const [reqParams, setReqParams] = useState({} as any);
  // 选中图标名称
  const [iconName, setIconName] = useState('');
  // 菜单数据
  const { run, data } = useRequest(() => baseServices.system.menu.list({}), {
    // manual: true,
  }) as any;
  // 图标名称
  const iconNameDataList = useRequest(() => baseServices.common.iconNames());

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
      render: (dom: any, rowData: any) => {
        return rowData.icon ? <MyIcon style={{ fontSize: '20px' }} type={rowData.icon} /> : null;
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
      render: (type: string) => {
        const a = ['目录', '菜单', '权限'];
        // console.log(a[type]);
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
      render: (keepAlive: string) => (keepAlive ? <MyIcon type="icon-check" /> : null),
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
      render: (dom: any, rowData: { id: number }) => {
        return (
          <Space>
            <a
              onClick={() => {
                setModalTitle('新增');
                setModalInitialValues({ parentId: rowData.id });
                setVisibleState(true);
              }}
            >
              新增
            </a>
            <a
              onClick={async () => {
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
                const res: { data: any } = await baseServices.system.menu.info({ id: rowData.id });
                console.log('🚀 ~ file: index.tsx ~ line 178 ~ f ~ a', res);
                setModalInitialValues({
                  ...res.data,
                  type: res.data.type + '',
                  perms: f(res.data.perms),
                });
                setTypeState(res.data.type + '');
                setModalTitle('编辑');
                setVisibleState(true);
              }}
            >
              编辑
            </a>
            <Popconfirm
              key="link1"
              title="是否删除?"
              onConfirm={async () => {
                // console.log('🚀 ~ file: index.tsx ~ line 155 ~ onConfirm={ ~ a.id', rowData.id);
                const res: any = await baseServices.system.menu.delete({ ids: [rowData.id] });
                // console.log('🚀 ~ file: index.tsx ~ line 156 ~ onConfirm={ ~ res', res);
                if (!res.success) return message.error('删除失败');
                message.success('删除成功');
                setReqParams({ nowTime: new Date().getTime() });
              }}
              okText="是"
              cancelText="否"
            >
              <a href="#">删除</a>
            </Popconfirm>
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
      readonly: true,
      render: () => {
        const parentName = data.find((r: any) => r.id == modalInitialValues.parentId);
        return <Input defaultValue={parentName ? parentName.name : '一级菜单'} disabled />;
      },
      // renderFormItem: (schema, config, form) => {
      //   // return <SearchTree />;
      //   return ();
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
      renderFormItem: (schema: any, config: any, form: any) => {
        return (
          <Popover
            content={
              <div style={{ width: '500px', height: '300px', overflow: 'auto' }}>
                <MyIconList
                  iconNameList={iconNameDataList.data}
                  onChange={(value: any) => {
                    // console.log('我是Menu', value);
                    setIconName(value);
                    form.setFieldsValue({
                      icon: value,
                    });
                  }}
                />
              </div>
            }
            trigger="click"
            placement="bottom"
          >
            <Input
              // defaultValue={modalInitialValues.icon}
              value={iconName || modalInitialValues.icon}
              placeholder="请选择"
              allowClear
            />
          </Popover>
        );
      },
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
        <ProTable
          scroll={{
            x: 1500,
            y: 500,
          }}
          columns={columns}
          params={reqParams}
          request={async () => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            // console.log(params, sorter, filter);
            const res = await run();
            // console.log('🚀 ~ file: index.tsx ~ line 375 ~ request={ ~ res', res);
            return Promise.resolve({
              data: toTreeData(res, { id: 'id', parentId: 'parentId' }) as any,
              success: true,
            });
          }}
          rowKey="id"
          pagination={false}
          search={false}
          dateFormatter="string"
          headerTitle="菜单列表"
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                setModalTitle('新增');
                setVisibleState(true);
              }}
            >
              新增
            </Button>,
            <Button type="primary" key="primary" onClick={() => {}}>
              修改路由
            </Button>,
          ]}
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
              // console.log('🚀 ~ file: index.tsx ~ line 426 ~ onFinish={ ~ values', values);

              // return;
              if (modalTitle === '编辑') {
                const updateRes = (await baseServices.system.menu.update({
                  ...values,
                  id: modalInitialValues.id,
                })) as any;
                if (!updateRes.success) return message.error('修改失败');
                message.success('修改成功');
              }
              if (modalTitle === '新增') {
                const updateRes = (await baseServices.system.menu.add({
                  ...values,
                })) as any;
                if (!updateRes.success) return message.error('添加失败');
                message.success('添加成功');
              }
              setVisibleState(false);
              setModalInitialValues({});
              setReqParams({ nowTime: new Date().getTime() });
            }}
            onReset={() => {
              setIconName('');
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
