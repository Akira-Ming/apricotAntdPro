/*
 * @Author: AkiraMing
 * @Date: 2021-10-29 16:07:41
 * @LastEditTime: 2021-10-29 20:00:34
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\components\CommonTable\index.tsx
 */
import { BetaSchemaForm } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { Button, Modal, Row, Col, Space, message } from 'antd';
import { useState } from 'react';
// import { useState } from 'react';
// import React from 'react';
// import { TableListItem } from '../../types';

function refreshProps(props: number) {
  console.log('🚀 ~ file: index.tsx ~ line 18 ~ refreshProps ~ props', props);
}

function CommonTable(props: {
  columns?: any;
  reqParams?: any;
  tableService?: any;
  headerTitle?: any;
  visibleState?: any;
  setVisibleState?: any;
  formInitialValues?: any;
  setFormInitialValues?: any;
  modalTitle?: any;
  setModalTitle?: any;
}) {
  const {
    columns,
    // reqParams,
    tableService,
    headerTitle,

    visibleState,
    setVisibleState,
    formInitialValues,
    setFormInitialValues,
    modalTitle,
    setModalTitle,
  } = props;

  const [reqParams, setReqParams] = useState({});
  refreshProps(1);

  return (
    <>
      {/* <div>{aaa}</div> */}
      <ProTable
        scroll={{
          x: 1300,
          // y: 500,
        }}
        columns={columns}
        params={reqParams}
        request={async (params) => {
          //pagination page: 1 size: 15 total: 4
          const res = (await tableService.page({
            page: params.current,
            size: params.pageSize,
          })) as {
            data: { list: any[]; pagination: { page: number; size: number; total: number } };
          };
          console.log('🚀 ~ file: index.tsx ~ line 112 ~ request={ ~ res', res);
          // 表单搜索项会从 params 传入，传递给后端接口。
          return Promise.resolve({
            data: res.data.list,
            success: true,
            // total: res.data.pagination.total,
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
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setVisibleState(true);
              setModalTitle('新建');
            }}
          >
            新建
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
            // console.log('🚀 ~ file: index.tsx ~ line 174 ~ onFinish={ ~ values', values);
            // return;
            if (modalTitle === '编辑') {
              const updateRes = (await tableService.update({
                ...values,
                id: formInitialValues.id,
              })) as any;
              if (!updateRes.success) return message.error('修改失败');
              message.success('修改成功');
            }
            if (modalTitle === '新建') {
              const updateRes = (await tableService.add({
                ...values,
              })) as any;
              if (!updateRes.success) return message.error('添加失败');
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
