/*
 * @Author: AkiraMing
 * @Date: 2021-10-24 01:06:56
 * @LastEditTime: 2021-10-29 17:49:07
 * @LastEditors: AkiraMing
 * @Description: ζθΏ°
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\views\Role\index.tsx
 */
// import React from 'react';
import { Button, Col, message, Modal, Popconfirm, Row, Space } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { useRequest } from 'umi';
import baseServices from '@/apricot/modules/base/service';
import { useState } from 'react';
import { BetaSchemaForm } from '@ant-design/pro-form';
import SearchTree from '../../components/SearchTree';
import { toTreeData } from '@/core/utils/format';

export type TableListItem = {
  id: number;
  label: string;
  name: string;
  remark: string;
  createTime: string;
  updateTime: string;
};
// const tableListDataSource: TableListItem[] = [];

type DataItem = {
  name: string;
  state: string;
};

function keyTitle(data: any, key = 'id', title = 'name', parentId = 'parentId') {
  const res = data.map((r: { id: number; name: string; parentId: number }) => {
    return {
      key: r[key],
      title: r[title],
      parentId: r[parentId],
    };
  });
  return res;
}

export default () => {
  const [visibleState, setVisibleState] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalInitialValues, setModalInitialValues] = useState('' as any);
  const [params1, setParams1] = useState({} as any);

  const rolePageData = useRequest(
    // const { data, run } = useRequest(
    (params) => {
      console.log('π ~ file: index.tsx ~ line 94 ~ aaa', params);
      return baseServices.system.role.page(params);
    },
    { manual: true },
  );
  const menuListData = useRequest(
    // const { data, run } = useRequest(
    () => {
      return baseServices.system.menu.list({});
    },
  );

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'εη§°',
      dataIndex: 'name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'ζ­€ι‘ΉδΈΊεΏε‘«ι‘Ή',
          },
        ],
      },
    },
    {
      title: 'ζ θ―',
      dataIndex: 'label',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'ζ­€ι‘ΉδΈΊεΏε‘«ι‘Ή',
          },
        ],
      },
    },
    {
      title: 'ε€ζ³¨',
      dataIndex: 'remark',
      ellipsis: true,
      copyable: true,
    },
    {
      title: 'εθ½ζι',
      dataIndex: 'menuIdList',
      hideInTable: true,
      renderFormItem: (schema, config, form) => {
        const dataTrreList = keyTitle(menuListData.data);
        console.log(modalInitialValues.menuIdList);

        return (
          <SearchTree
            onCheck={(checkedKeys: number[]) => {
              form.setFieldsValue({ menuIdList: checkedKeys });
            }}
            initExpandedKeys={modalInitialValues.menuIdList}
            dataTrreList={dataTrreList}
            treeData={toTreeData(dataTrreList, { id: 'key', parentId: 'parentId' })}
          />
        );
      },
    },
    {
      title: 'εε»ΊζΆι΄',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: 'ζ΄ζ°ζΆι΄',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: 'ζδ½',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (_dom, a) => [
        <a
          key="link"
          onClick={async () => {
            const res = await baseServices.system.role.info({ id: a.id });
            setModalInitialValues(res.data);
            setVisibleState(true);
            setModalTitle('ηΌθΎ');
          }}
        >
          ηΌθΎ
        </a>,
        <Popconfirm
          key="link1"
          title="ζ―ε¦ε ι€?"
          onConfirm={async () => {
            console.log('π ~ file: index.tsx ~ line 155 ~ onConfirm={ ~ a.id', a.id);
            const res: any = await baseServices.system.role.delete({ ids: [a.id] });
            console.log('π ~ file: index.tsx ~ line 156 ~ onConfirm={ ~ res', res);
            if (!res.success) return message.error('ε ι€ε€±θ΄₯');
            message.success('ε ι€ζε');
            setParams1({ nowTime: new Date().getTime() });
          }}
          okText="ζ―"
          cancelText="ε¦"
        >
          <a href="#">ε ι€</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProCard>
        <ProTable<TableListItem>
          columns={columns}
          params={params1}
          request={async (params) => {
            //pagination page: 1 size: 15 total: 4
            const res = (await rolePageData.run({
              page: params.current,
              size: params.pageSize,
            })) as {
              list: TableListItem[];
              pagination: { page: number; size: number; total: number };
            };
            console.log('π ~ file: index.tsx ~ line 112 ~ request={ ~ res', res);
            // θ‘¨εζη΄’ι‘ΉδΌδ» params δΌ ε₯οΌδΌ ιη»εη«―ζ₯ε£γ
            return Promise.resolve({
              data: res.list,
              success: true,
              total: res.pagination.total,
            });
          }}
          rowKey="id"
          pagination={{
            showQuickJumper: true,
          }}
          search={false}
          dateFormatter="string"
          headerTitle="θ§θ²εθ‘¨"
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                setVisibleState(true);
                setModalTitle('ζ°ε»Ίθ§θ²');
              }}
            >
              ζ°ε»Ίθ§θ²
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
            // params={modalParams}
            initialValues={modalInitialValues}
            submitter={{
              // ιη½?ζι?ζζ¬
              searchConfig: {
                submitText: 'δΏε­',
                resetText: 'εζΆ',
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
              // console.log('π ~ file: index.tsx ~ line 174 ~ onFinish={ ~ values', values);
              // return;
              if (modalTitle === 'ηΌθΎ') {
                const updateRes = (await baseServices.system.role.update({
                  ...values,
                  id: modalInitialValues.id,
                })) as any;
                if (!updateRes.success) return message.error('δΏ?ζΉε€±θ΄₯');
                message.success('δΏ?ζΉζε');
              }
              if (modalTitle === 'ζ°ε»Ίθ§θ²') {
                const updateRes = (await baseServices.system.role.add({
                  ...values,
                })) as any;
                if (!updateRes.success) return message.error('ζ·»ε ε€±θ΄₯');
                message.success('ζ·»ε ζε');
              }
              setVisibleState(false);
              setModalInitialValues({});
              setParams1({ nowTime: new Date().getTime() });
            }}
            onReset={() => {
              setVisibleState(false);
              setModalInitialValues({});
            }}
            columns={columns as any}
          />
        </Modal>
      </ProCard>
    </PageContainer>
  );
};
