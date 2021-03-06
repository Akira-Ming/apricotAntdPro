/*
 * @Author: AkiraMing
 * @Date: 2021-10-18 16:02:03
 * @LastEditTime: 2021-11-03 17:41:39
 * @LastEditors: AkiraMing
 * @Description: 用户列表页
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\views\User\index.tsx
 */
import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Select, Space, Tag } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import baseServices from '@/apricot/modules/base/service';
import type { TableListItem } from '../../types';
import CommonTable from '../../../../../components/CommonTable';
import { useRequest } from 'umi';
import AvatarUpload from '../../components/AvatarUpload';
import { useState } from 'react';

const { Option } = Select;

function User() {
  const [modalTitle, setModalTitle] = useState('');
  const [formInitialValues, setFormInitialValues] = useState({} as any);
  // 权限列表
  const roleList: any = useRequest(() => {
    return baseServices.system.role.list({});
  });
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '头像',
      dataIndex: 'headImg',
      hideInSearch: true,
      render: (headImg) => <Avatar shape="square" size="large" src={headImg} />,
      renderFormItem: (a, b, form) => {
        // if (!OSSDataReq) return;
        // console.log(OSSDataReq.data);
        let initImgUrl = '';
        if (form.getFieldValue('headImg')) {
          initImgUrl = form.getFieldValue('headImg')?.includes('http')
            ? form.getFieldValue('headImg')
            : `http://${window.location.host}${form.getFieldValue('headImg')}`;
        }
        return (
          // <AliyunOSSUpload />
          <AvatarUpload
            initImgUrl={initImgUrl}
            getImgUrl={(imgUrl) => {
              // console.log(imgUrl);
              form.setFieldsValue({
                headImg: imgUrl,
              });
            }}
          />
        );
      },
    },
    {
      title: '姓名',
      dataIndex: 'name',
      // width: 100,
      search: false,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
      // width: 100,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '密码',
      dataIndex: 'password',
      hideInTable: true,
      valueType: 'password',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      renderFormItem: (a, b) => {
        console.log(modalTitle);
        if (modalTitle === '新建') a.originProps.formItemProps.rules[0].required = true;
        if (modalTitle === '编辑') a.originProps.formItemProps.rules[0].required = false;
        return b.defaultRender({});
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      // width: 100,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '部门名称',
      dataIndex: 'departmentName',
      // width: 100,
      // render: (departmentId: any) => {
      //   return deptList[departmentId];
      // },
    },
    {
      // width: 150,
      title: '角色',
      dataIndex: 'roleIdList',
      hideInSearch: true,
      initialValue: formInitialValues.roleIdList,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      render: (dom, rowData) => {
        const roleDom = rowData.roleName?.split(',').map((r: string) => (
          <Tag key={r} color="#108ee9">
            {r}
          </Tag>
        ));
        return <Space direction="vertical">{roleDom}</Space>;
      },

      renderFormItem: (schema, config, form) => {
        return (
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="点击选择"
            onChange={(value: any) => {
              form.setFieldsValue({ roleIdList: value });
            }}
          >
            {roleList.data.map((r: any) => (
              <Option key={r.id} value={r.id}>
                {r.name}
              </Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      // width: 100,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      copyable: true,
      search: false,
      hideInSearch: true,
      // width: 100,
    },
    {
      title: '是否启用',
      dataIndex: 'status',
      valueType: 'switch',
      // width: 60,
      hideInSearch: true,
      // initialValue: formInitialValues.status || 1,
      render: (dom, { status }: any) =>
        status ? <Tag color="#87d068">启用</Tag> : <Tag color="#f50">禁用</Tag>,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      // width: 150,
    },
  ];
  return (
    <PageContainer>
      <ProCard>
        {/* <AliyunOSSUpload /> */}
        <CommonTable
          headerTitle="用户列表"
          columns={columns}
          tableService={baseServices.system.user}
          getModalTitle={(value) => {
            setModalTitle(value);
            console.log('🚀 ~ file: index.tsx ~ line 209 ~ User ~ modalTitle', modalTitle);
          }}
          getFormInitialValues={(value: any) => {
            const roleNameArr = value?.roleName?.split(',');
            console.log('🚀 ~ file: index.tsx ~ line 155 ~ User ~ roleNameArr', roleNameArr);
            let defaultValue = roleList.data.filter((r: any) => roleNameArr?.includes(r.name));
            // console.log('🚀 ~ file: index.tsx ~ line 151 ~ User ~ aaa', aaa);
            defaultValue = defaultValue.map((r: { id: number }) => r.id);
            console.log('🚀 ~ file: index.tsx ~ line 151 ~ User ~ defaultValue', defaultValue);

            setFormInitialValues({ ...value, roleIdList: defaultValue });
            console.log('🚀 ~ file: index.tsx ~ line 232 ~ User ~ value', value);
          }}
        />
      </ProCard>
    </PageContainer>
  );
}

export default User;
