/*
 * @Author: AkiraMing
 * @Date: 2021-10-18 16:02:03
 * @LastEditTime: 2021-11-03 10:48:57
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
import { useState } from 'react';
import { useRequest } from 'umi';
import AvatarUpload from '../../components/AvatarUpload';
// import AliyunOSSUpload from '../../components/AliyunOSSUpload';
const { Option } = Select;
// const deptList = {};

function User() {
  // 部门筛选
  // const [key, setKey] = useState('1');
  const [modalVisibleState, setModalVisibleState] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState({} as any);
  const [modalTitle, setModalTitle] = useState('');
  // oss 签名信息
  // const OSSDataReq: any = '';
  // const [OSSData, setOSSData] = useState();
  // const OSSDataReq: any = useRequest(() => {
  //   return baseServices.common.upload({});
  // });
  // setOSSData(OSSDataReq.data);
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
        if (formInitialValues.headImg) {
          initImgUrl = formInitialValues?.headImg.includes('http')
            ? formInitialValues?.headImg
            : `http://${window.location.host}${formInitialValues?.headImg}`;
        }
        return (
          // <AliyunOSSUpload />
          <AvatarUpload
            initImgUrl={initImgUrl}
            getImgUrl={(imgUrl) => {
              console.log(imgUrl);
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
      // width: 100,
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
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      render: (dom, rowData) => {
        // console.log(rowData);
        const roleDom = rowData.roleName?.split(',').map((r: string) => (
          <Tag key={r} color="#108ee9">
            {r}
          </Tag>
        ));
        return <Space direction="vertical">{roleDom}</Space>;
      },

      renderFormItem: (schema, config, form) => {
        // init
        // console.log(roleList.data);

        return (
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="点击选择"
            defaultValue={formInitialValues.roleIdList}
            onChange={(value) => {
              form.setFieldsValue({ roleIdList: value });
              // console.log('🚀 ~ file: index.tsx ~ line 92 ~ User ~ form', schema, config, form);
              // console.log('🚀 ~ file: index.tsx ~ line 85 ~ User ~ value', form.getFieldsValue());
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
      initialValue: formInitialValues.status || 1,
      render: (dom, { status }: any) =>
        status ? <Tag color="#87d068">启用</Tag> : <Tag color="#f50">禁用</Tag>,
      // renderFormItem: ()=>
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      // width: 150,
    },
    {
      title: '操作',
      // width: 150,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      hideInSearch: true,
      render: (dom, rowData) => [
        <a key="link">转移</a>,
        <a
          key="link"
          onClick={async () => {
            console.log(1111);
            const res = await baseServices.system.user.info({ id: rowData.id });
            setFormInitialValues(res.data);
            setModalVisibleState(true);
            // setaaaa(rowData.id);
            // setVisibleState(true);
            setModalTitle('编辑');
          }}
        >
          编辑
        </a>,
        <a key="link">删除</a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProCard>
        {/* <AliyunOSSUpload /> */}
        <CommonTable
          modalTitle={modalTitle}
          setModalTitle={setModalTitle}
          visibleState={modalVisibleState}
          setVisibleState={setModalVisibleState}
          formInitialValues={formInitialValues}
          setFormInitialValues={setFormInitialValues}
          headerTitle="用户列表"
          columns={columns}
          tableService={baseServices.system.user}
        />
      </ProCard>
    </PageContainer>
  );
}

export default User;
