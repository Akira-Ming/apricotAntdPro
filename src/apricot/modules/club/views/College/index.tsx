// import React from 'react';
import CommonTable from '@/components/CommonTable';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { Input, Tag } from 'antd';
import { useRequest } from 'umi';
import clubServices from '../../service';

function College() {
  const { data } = useRequest(() => clubServices.college.list({})) as any;

  const columns: ProColumns[] = [
    {
      title: '名称',
      width: 250,
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '类型',
      // width: 150,
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
      title: '上级',
      dataIndex: 'parentId',
      hideInSearch: true,
      hideInTable: true,
      renderFormItem: (a, b, form) => {
        const pid = form.getFieldValue('parentId');
        console.log('🚀 ~ file: index.tsx ~ line 34 ~ College ~ pid', pid);
        let pname = '';
        if (pid) {
          pname = data.filter((r: { id: any }) => r.id === pid)[0]?.name;
        }
        return <Input value={pname ? pname : '无'} disabled />;
      },
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
          extraButton={(rowData, setState) => {
            // console.log('🚀 ~ file: index.tsx ~ line 47 ~ College ~ rowData', formRef);

            return rowData.type !== '3' ? (
              <a
                onClick={() => {
                  setState.setModalTitle('新建');
                  setState.setFormInitialValues({
                    parentId: rowData.id,
                    type: (parseInt(rowData.type) + 1).toString(),
                  });
                  setState.setVisibleState(true);
                }}
              >
                新增
              </a>
            ) : null;
          }}
        />
      </ProCard>
    </PageContainer>
  );
}

export default College;
