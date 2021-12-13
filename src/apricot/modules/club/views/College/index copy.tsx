// import React from 'react';
import CommonTable from '@/components/CommonTable';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { Tag } from 'antd';
import { useRequest } from 'umi';
import clubServices from '../../service';

function College() {
  const { data, error, loading } = useRequest(() => clubServices.college.list({}));
  console.log('🚀 ~ file: index.tsx ~ line 7 ~ College ~ loading', loading);
  console.log('🚀 ~ file: index.tsx ~ line 7 ~ College ~ error', error);
  console.log('🚀 ~ file: index.tsx ~ line 7 ~ College ~ data', data);

  const columns: ProColumns[] = [
    {
      title: '类型',
      dataIndex: 'type',
      hideInSearch: true,
      valueType: 'radio',
      valueEnum: { 1: { text: '学院' }, 2: { text: '专业' }, 3: { text: '班级' } },
      // hideInTable:
      render: (dom, { type }) => {
        const a = ['学院', '专业', '班级'];
        // console.log(a[type]);
        return (<Tag color="#108ee9">{a[type - 1]}</Tag>) as any;
      },
    },
    {
      title: '学院名称',
      dataIndex: 'college_name',
      hideInSearch: true,
      // hideInTable:
    },
    {
      title: '专业名称',
      dataIndex: 'major_name',
      hideInSearch: true,
    },
    {
      title: '班级名称',
      dataIndex: 'class_name',
      hideInSearch: true,
    },
    {
      title: '班级时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInForm: true,
    },
  ];
  return (
    <PageContainer>
      <ProCard>
        {/* <AliyunOSSUpload /> */}
        <CommonTable
          isTree={true}
          headerTitle="用户列表"
          columns={columns}
          tableService={clubServices.college}
        />
      </ProCard>
    </PageContainer>
  );
}

export default College;
