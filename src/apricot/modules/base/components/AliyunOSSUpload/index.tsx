/*
 * @Author: AkiraMing
 * @Date: 2021-10-31 01:58:11
 * @LastEditTime: 2021-11-01 18:18:54
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\components\AliyunOSSUpload\index.tsx
 */
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import baseServices from '@/apricot/modules/base/service';

class AliyunOSSUpload extends React.Component {
  state: any = {
    OSSData: {},
  };

  async componentDidMount() {
    await this.init();
  }

  init = async () => {
    try {
      // const OSSData = await this.mockGetOSSData();
      const OSSData = await baseServices.common.upload({});
      console.log('🚀 ~ file: index.tsx ~ line 27 ~ AliyunOSSUpload ~ init= ~ OSSData', OSSData);

      this.setState({
        OSSData,
      });
    } catch (error: any) {
      message.error(error);
    }
  };

  // Mock get OSS api
  // https://help.aliyun.com/document_detail/31988.html
  mockGetOSSData = () => ({
    dir: 'user-dir/',
    expire: '1577811661',
    host: 'https://te11.oss-cn-ho-interal.yuncs.com',
    accessId: 'LTAI5tAUSBWqRvgTEk1',
    policy: 'eyJleHBpcmF0aW9uIjoiMjADowMDIiwiY29uZGl0aWsZW5ndGgtcmFuZ2UiLDAsMjA5NzE1MjAwXV19',
    signature: 'jP67jl/sOsZfzpwQ=',
  });

  onChange = ({ fileList }: any) => {
    const { onChange }: any = this.props;
    console.log('Aliyun OSS:', fileList);
    if (onChange) {
      onChange([...fileList]);
    }
  };

  onRemove = (file: { url: any }) => {
    const { value, onChange }: any = this.props;

    const files = value?.filter((v: { url: any }) => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  getExtraData = (file: { url: any }) => {
    const { OSSData }: any = this.state;

    return {
      key: file.url,
      // OSSAccessKeyId: OSSData.accessId,
      OSSAccessKeyId: OSSData.OSSAccessKeyId,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  beforeUpload = async (file: { name: string | string[]; url: any }) => {
    const { OSSData }: any = this.state;
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      await this.init();
    }

    const suffix: any = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.url = OSSData.dir + filename;

    return file;
  };

  render() {
    const { value }: any = this.props;
    const props: any = {
      name: 'file',
      fileList: value,
      action: this.state.OSSData.host,
      onChange: this.onChange,
      // onRemove: this.onRemove,
      data: this.getExtraData,
      // beforeUpload: this.beforeUpload,
    };
    return (
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    );
  }
}

export default AliyunOSSUpload;
