/*
 * @Author: AkiraMing
 * @Date: 2021-10-18 16:02:03
 * @LastEditTime: 2021-10-29 16:01:12
 * @LastEditors: AkiraMing
 * @Description: 用户列表页
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\views\User\index.tsx
 */
import { PageContainer } from '@ant-design/pro-layout';
// import { useState } from 'react';
import { Avatar, Tag } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
// import { DatePicker } from 'antd';
import baseServices from '@/apricot/modules/base/service';
import type { ListRes, TableListItem } from '../../types';
// import { toTreeData } from '@/core/utils/format';

// const waitTime = (time: number = 100) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };

// const tableListDataSource: TableListItem[] = [];
// let deptListDataSource: any[] = [];
const deptList = {};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '头像',
    dataIndex: 'headImg',
    width: 80,
    // fixed: 'left',
    hideInSearch: true,
    render: (headImg) => <Avatar shape="square" size="large" src={headImg} />,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 100,
    search: false,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 100,
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
    width: 100,
  },
  {
    title: '部门名称',
    dataIndex: 'departmentId',
    width: 100,
    render: (departmentId: any) => {
      return deptList[departmentId];
    },
  },
  {
    width: 150,
    title: '角色',
    dataIndex: 'roleName',
    hideInSearch: true,
    render: (roleName: any) => {
      const roleDom = roleName.split(',').map((r: string) => (
        <Tag key={r} color="#108ee9">
          {r}
        </Tag>
      ));
      return roleDom;
    },
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 100,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    ellipsis: true,
    copyable: true,
    search: false,
    hideInSearch: true,
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 60,
    hideInSearch: true,
    render: (status: any) =>
      status ? <Tag color="#87d068">启用</Tag> : <Tag color="#f50">禁用</Tag>,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '操作',
    width: 150,
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    hideInSearch: true,
    render: () => [<a key="link">转移</a>, <a key="link">编辑</a>, <a key="link">删除</a>],
  },
];

function User() {
  // 部门筛选
  // const [key, setKey] = useState('1');
  return (
    <PageContainer>
      <ProCard>
        <ProTable<TableListItem>
          columns={columns}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
          }}
          // tableRender={(_, dom) => (
          //   <div
          //     style={{
          //       display: 'flex',
          //       width: '100%',
          //     }}
          //   >
          //     {/* <div>组织架构</div> */}
          //     <Menu
          //       onSelect={(e) => setKey(e.key as string)}
          //       style={{ width: '10%' }}
          //       // defaultSelectedKeys={['1']}
          //       defaultOpenKeys={['1']}
          //       mode="inline"
          //     >
          //       {deptListDataSource.map((r) => (
          //         <Menu.SubMenu key={r.id} title={r.name}>
          //           {r.children.map((rSub: any) => (
          //             <Menu.Item key={rSub.id}>{rSub.name}</Menu.Item>
          //           ))}
          //         </Menu.SubMenu>
          //       ))}
          //     </Menu>
          //     <div
          //       style={{
          //         // flex: 1,
          //         width: '90%',
          //       }}
          //     >
          //       {dom}
          //     </div>
          //   </div>
          // )}
          // tableExtraRender={(_, data) => (
          //   <Card>
          //     <Descriptions size="small" column={3}>
          //       <Descriptions.Item label="行">{data.length}</Descriptions.Item>
          //       <Descriptions.Item label="创建">Lili Qu</Descriptions.Item>
          //       <Descriptions.Item label="协会">
          //         <a>421421</a>
          //       </Descriptions.Item>
          //       <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
          //       <Descriptions.Item label="有效时间">2017-10-10</Descriptions.Item>
          //     </Descriptions>
          //   </Card>
          // )}
          params={{}}
          request={async (
            params: any & {
              pageSize: number;
              current: number;
            },
            sort,
            filter,
          ) => {
            console.log('🚀 ~ file: index.tsx ~ line 211 ~ User ~ filter', filter);
            const res = await baseServices.system.user.page({
              page: params.current,
              size: params.pageSize,
              sort: 'desc',
              order: 'createTime',
            });
            const { list, pagination } = res.data as unknown as ListRes;

            return {
              success: true,
              data: list,
              total: pagination.total,
            };
          }}
          dateFormatter="string"
          headerTitle="成员列表"
          scroll={{ x: 1300 }}
        />
      </ProCard>
    </PageContainer>
  );
}

export default User;
