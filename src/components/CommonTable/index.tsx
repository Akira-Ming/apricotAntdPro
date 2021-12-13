/*
 * @Author: AkiraMing
 * @Date: 2021-10-29 16:07:41
 * @LastEditTime: 2021-11-03 17:26:42
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\components\CommonTable\index.tsx
 */
import { toTreeData } from '@/core/utils/format';
import type { ProFormInstance } from '@ant-design/pro-form';
import { BetaSchemaForm } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { Button, Input, Modal, Row, Col, Space, message, Popconfirm } from 'antd';
import { useState, useRef } from 'react';

const { Search } = Input;

function CommonTable(props: {
  columns?: any;
  tableService?: any;
  headerTitle?: string;
  isTree?: boolean;
  getModalTitle?: (modalTitle: string) => void;
  getFormInitialValues?: (FormInitialValues: any) => void;
  extraButton?: (
    rowData: any,
    setState: {
      setModalTitle: (arg0: string) => void;
      setFormInitialValues: (arg0: any) => void;
      setVisibleState: (arg0: boolean) => void;
    },
    ptUseRef: any,
  ) => any;
}) {
  const {
    columns,
    tableService,
    headerTitle,
    getModalTitle,
    getFormInitialValues,
    isTree,
    extraButton,
  } = props;
  // 表格form ref
  const ptUseRef = useRef<ProFormInstance>();
  // 弹窗显影
  const [visibleState, setVisibleState] = useState(false);
  // 表单初始值
  const [formInitialValues, setFormInitialValues] = useState({} as any);
  // 弹窗标题
  const [modalTitle, setModalTitle] = useState('');
  // protable 参数
  const [reqParams, setReqParams] = useState({});
  const setState = {
    setVisibleState,
    setFormInitialValues,
    setModalTitle,
    setReqParams,
  };
  // 操作列
  const caozuo = {
    title: '操作',
    width: 150,
    key: 'option',
    align: 'center',
    valueType: 'option',
    fixed: 'right',
    hideInSearch: true,
    render: (dom: any, rowData: { id: any; children: [] }) => {
      return (
        <Space>
          {extraButton ? extraButton(rowData, setState, ptUseRef) : null}
          <a
            key="link"
            onClick={async () => {
              // 远程获取行数据
              // const res: any = await tableService.info({ id: rowData.id });
              // setFormInitialValues(res.data);
              // 获取本地行数据
              console.log('🚀 ~ file: index.tsx ~ line 65 ~ onClick={ ~ rowData', rowData);
              // 设置表单默认数据
              setFormInitialValues(rowData);
              // 打开弹窗
              setVisibleState(true);
              // 设置弹窗标题
              setModalTitle('编辑');
              // 返回弹窗标题给父组件
              if (getModalTitle) getModalTitle('编辑');
              // 返回本行数据给父组件
              if (getFormInitialValues) getFormInitialValues(rowData);
            }}
          >
            编辑
          </a>
          <Popconfirm
            key="link1"
            title="是否删除?"
            onConfirm={async () => {
              // console.log('🚀 ~ file: index.tsx ~ line 155 ~ onConfirm={ ~ a.id', rowData.id);
              const res: any = await tableService.delete({ ids: [rowData.id] });
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
  };
  columns?.push(caozuo);

  return (
    <>
      <ProTable
        rowSelection={
          {
            // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
            // 注释该行则默认不显示下拉选项
            // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          }
        }
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => {
          console.log(
            '🚀 ~ file: index.tsx ~ line 110 ~ onConfirm={ ~ selectedRowKeys',
            selectedRowKeys,
          );
          return (
            <Space size={24}>
              <span>
                已选 {selectedRowKeys.length} 项
                <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                  取消选择
                </a>
              </span>
            </Space>
          );
        }}
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => {
          return (
            <Space size={16}>
              <Popconfirm
                key="link1"
                title="是否批量删除?"
                onConfirm={async () => {
                  // console.log('🚀 ~ file: index.tsx ~ line 155 ~ onConfirm={ ~ a.id', rowData.id);
                  const res: any = await tableService.delete({ ids: selectedRowKeys });
                  // console.log('🚀 ~ file: index.tsx ~ line 156 ~ onConfirm={ ~ res', res);
                  if (!res.success) return message.error('删除失败');
                  message.success('删除成功');
                  onCleanSelected();
                  setReqParams({ nowTime: new Date().getTime() });
                }}
                okText="是"
                cancelText="否"
              >
                <a href="#">批量删除</a>
              </Popconfirm>
              ,{/* <a>导出数据</a> */}
            </Space>
          );
        }}
        scroll={{
          x: 1300,
          // y: 500,
        }}
        columns={columns}
        params={reqParams}
        request={async (params) => {
          console.log('🚀 ~ file: index.tsx ~ line 115 ~ request={ ~ params', params);
          //pagination page: 1 size: 15 total: 4
          const res = (await tableService.page({
            ...params,
            page: params.current,
            size: params.pageSize,
            // keyWord: 'bbb',
          })) as {
            data: { list: any[]; pagination: { page: number; size: number; total: number } };
          };
          console.log('🚀 ~ file: index.tsx ~ line 112 ~ request={ ~ res', res);

          // 表单搜索项会从 params 传入，传递给后端接口。
          return Promise.resolve({
            data: isTree
              ? (toTreeData(res.data.list, { id: 'id', parentId: 'parentId' }) as any)
              : res.data.list,
            success: true,
            total: res.data.pagination.total,
          });
        }}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        dateFormatter="string"
        headerTitle={headerTitle}
        toolBarRender={() => [
          <Search
            placeholder="请输入关键字"
            allowClear
            onSearch={(value) => {
              console.log(value);
              setReqParams({ keyWord: value });
            }}
            enterButton
          />,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setVisibleState(true);
              setModalTitle('新建');
              // 返回弹窗标题给父组件
              if (getModalTitle) getModalTitle('新建');
            }}
          >
            新建
          </Button>,
        ]}
        formRef={ptUseRef}
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
        <BetaSchemaForm
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          // params={modalParams}
          initialValues={formInitialValues}
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
          onFinish={async (values: any) => {
            console.log('🚀 ~ file: index.tsx ~ line 174 ~ onFinish={ ~ values', values);
            // return;
            if (modalTitle === '编辑') {
              const updateRes = (await tableService.update({
                ...values,
                id: formInitialValues.id,
              })) as any;
              if (!updateRes.success) return message.error('修改失败');
              message.success('修改成功');
            }
            console.log('🚀 ~ file: index.tsx ~ line 244 ~ onFinish={ ~ modalTitle', modalTitle);
            if (modalTitle === '新建') {
              const addRes = (await tableService.add({
                ...values,
              })) as any;
              console.log('🚀 ~ file: index.tsx ~ line 247 ~ onFinish={ ~ addRes', addRes);
              if (!addRes.success) return message.error('添加失败');
              message.success('添加成功');
            }
            setVisibleState(false);
            setFormInitialValues({});
            setReqParams({ nowTime: new Date().getTime() });
          }}
          onReset={() => {
            setVisibleState(false);
            setFormInitialValues({});
          }}
          columns={columns as any}
        />
      </Modal>
    </>
  );
}

export default CommonTable;
