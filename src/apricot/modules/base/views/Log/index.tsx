/*
 * @Author: AkiraMing
 * @Date: 2021-10-24 02:32:49
 * @LastEditTime: 2021-10-29 15:36:41
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\views\Log\index.tsx
 */
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { useRequest } from 'umi';
import baseServices from '@/apricot/modules/base/service';

export type TableListItem = {
  id: number;
  label: string;
  name: string;
  remark: string;
  createTime: string;
  updateTime: string;
};
// const tableListDataSource: TableListItem[] = [];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '用户ID',
    dataIndex: 'userId',
  },
  {
    title: '昵称',
    dataIndex: 'name',
  },
  {
    title: '请求地址',
    dataIndex: 'action',
  },
  {
    title: '参数',
    dataIndex: 'params',
    ellipsis: true,
  },
  {
    title: 'ip',
    dataIndex: 'ip',
  },
  {
    title: 'ip地址',
    dataIndex: 'ipAddr',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
  },
];

export default () => {
  const rolePageData = useRequest(
    // const { data, run } = useRequest(
    (params) => {
      console.log('🚀 ~ file: index.tsx ~ line 94 ~ aaa', params);
      return baseServices.system.log.page({
        page: params.current,
        pageSize: params.pageSize,
      });
    },
    { manual: true },
  );

  return (
    <PageContainer>
      <ProCard>
        <ProTable<TableListItem>
          columns={columns}
          request={async (params, sorter, filter) => {
            // console.log(await rolePageData.run(111));
            const { list, pagination } = (await rolePageData.run(params)) as {
              list: TableListItem[];
              pagination: any;
            };
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.log(params, sorter, filter);
            return Promise.resolve({
              data: list,
              success: true,
              total: pagination.total,
            });
          }}
          rowKey="id"
          pagination={{
            showQuickJumper: true,
          }}
          search={false}
          dateFormatter="string"
          headerTitle="角色列表"
          toolBarRender={() => [
            <Button key="show">查看日志</Button>,
            <Button key="out">
              导出数据
              <DownOutlined />
            </Button>,
            <Button type="primary" key="primary">
              创建应用
            </Button>,
          ]}
        />
      </ProCard>
    </PageContainer>
  );
};
