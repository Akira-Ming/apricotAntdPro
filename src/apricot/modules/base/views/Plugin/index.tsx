/*
 * @Author: AkiraMing
 * @Date: 2021-10-29 20:25:02
 * @LastEditTime: 2021-10-30 16:31:54
 * @LastEditors: AkiraMing
 * @Description: ζθΏ°
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\views\Plugin\index.tsx
 */
import { Button, Col, message, Modal, Row, Space } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
// import { useRequest } from 'umi';
import baseServices from '@/apricot/modules/base/service';
import { useState } from 'react';
import { BetaSchemaForm } from '@ant-design/pro-form';
// import SearchTree from '../../components/SearchTree';
// import { toTreeData } from '@/core/utils/format';

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

// function keyTitle(data: any, key = 'id', title = 'name', parentId = 'parentId') {
//   const res = data.map((r: { id: number; name: string; parentId: number }) => {
//     return {
//       key: r[key],
//       title: r[title],
//       parentId: r[parentId],
//     };
//   });
//   return res;
// }

export default () => {
  const [visibleState, setVisibleState] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalInitialValues, setModalInitialValues] = useState('' as any);
  const [params1, setParams1] = useState({} as any);
  const [namespace, setNamespace] = useState({} as any);

  // const rolePageData = useRequest(
  //   // const { data, run } = useRequest(
  //   (params) => {
  //     console.log('π ~ file: index.tsx ~ line 94 ~ aaa', params);
  //     return baseServices.system.role.page(params);
  //   },
  //   { manual: true },
  // );

  // const menuListData = useRequest(
  //   // const { data, run } = useRequest(
  //   () => {
  //     return baseServices.system.menu.list({});
  //   },
  // );

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
      title: 'εθ½ζθΏ°',
      dataIndex: 'description',
    },
    {
      title: 'ζ―ε¦εΌε―',
      dataIndex: 'enable',
    },
    {
      title: 'ε½εη©Ίι΄',
      dataIndex: 'namespace',
    },
    {
      title: 'ηΆζ',
      dataIndex: 'status',
    },
    {
      title: 'εε»ΊζΆι΄',
      dataIndex: 'createTime',
    },
    {
      title: 'ζδ½',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (_dom, a: any) => [
        <a
          key="link"
          onClick={async () => {
            const res = await baseServices.plugin.info.getConfig({ namespace: a.namespace });
            setNamespace(a.namespace);
            console.log('π ~ file: index.tsx ~ line 113 ~ onClick={ ~ res', res);
            setModalInitialValues(res.data);
            setVisibleState(true);
            setModalTitle('ιη½?');
          }}
        >
          ιη½?
        </a>,
      ],
    },
  ];

  const columnsOss: any = [
    {
      title: 'accessKeyId',
      dataIndex: 'accessKeyId',
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
      title: 'accessKeySecret',
      dataIndex: 'accessKeySecret',
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
      title: 'bucket',
      dataIndex: 'bucket',
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
      title: 'endpoint',
      dataIndex: 'endpoint',
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
      title: 'timeout',
      dataIndex: 'timeout',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'ζ­€ι‘ΉδΈΊεΏε‘«ι‘Ή',
          },
        ],
      },
    },
  ];

  return (
    <PageContainer>
      <ProCard>
        <ProTable<TableListItem>
          columns={columns}
          params={params1}
          request={async (params: any) => {
            console.log(params);

            //pagination page: 1 size: 15 total: 4
            // const res = (await rolePageData.run({
            //   page: params.current,
            //   size: params.pageSize,
            // })) as {
            //   list: TableListItem[];
            //   pagination: { page: number; size: number; total: number };
            // };
            const res: any = await baseServices.plugin.info.list({});
            // console.log('π ~ file: index.tsx ~ line 112 ~ request={ ~ res', res.data[0].view);
            // θ‘¨εζη΄’ι‘ΉδΌδ» params δΌ ε₯οΌδΌ ιη»εη«―ζ₯ε£γ
            return Promise.resolve({
              data: res.data,
              success: true,
              // total: res.pagination.total,
            });
          }}
          rowKey="id"
          pagination={false}
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
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
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
              console.log(
                'π ~ file: index.tsx ~ line 174 ~ onFinish={ ~ values',
                values,
                modalInitialValues,
              );
              // console.log(await baseServices.plugin.info.getConfig({ namespace: 'oss' }));
              // return;
              if (modalTitle === 'ιη½?') {
                const updateRes = (await baseServices.plugin.info.config({
                  config: values,
                  namespace: namespace,
                })) as any;
                if (!updateRes.success) return message.error('δΏ?ζΉε€±θ΄₯');
                message.success('δΏ?ζΉζε');
              }

              setVisibleState(false);
              setModalInitialValues({});
              setParams1({ nowTime: new Date().getTime() });
            }}
            onReset={() => {
              setVisibleState(false);
              setModalInitialValues({});
            }}
            columns={columnsOss as any}
          />
        </Modal>
      </ProCard>
    </PageContainer>
  );
};
